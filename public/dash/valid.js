const checkAccess = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // If no token at all, bounce the user
  if (!accessToken && !refreshToken) {
    return window.location.href = "/login";
  }

  try {
    // Try to verify access token
    const res = await axios.post(
      "https://sophia-assistant-api.onrender.com/auth/check-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const role = res.data.role;
    const path = window.location.pathname.split("/")[1];

    // If user is on the wrong dashboard, redirect them
    if ((role === "user" && path === "") || role === path) {
      // They’re on the correct page
      return;
    } else {
      window.location.href = `/${role}/dashboard`;
    }

  } catch (err) {
    console.log("Access token invalid or expired:", err);

    // If access token is invalid and we still have refresh token, try to refresh
    if (refreshToken && [400, 403].includes(err.response?.status)) {
      try {
        const res = await axios.post(
          "https://sophia-assistant-api.onrender.com/auth/refresh-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          }
        );

        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          return await checkAccess(); // Retry now with new access token
        }

        throw new Error("No access token received from refresh");

      } catch (refreshErr) {
        console.log("Refresh failed:", refreshErr);
        setTimeout(() => window.location.href = "/failed", 10000);
      }

    } else {
      // No refresh token or other error
      setTimeout(() => window.location.href = "/login", 10000);
    }
  }
};
