async function checkToken() {
  const token = localStorage.getItem("accessToken");

  if (!token) return; // No token? Do nothing.

  try {
    // Try verifying access token
    const response = await axios.post("https://sophia-assistant-api.onrender.com/auth/check-token", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.status === 200 && response.data.role) {      
        window.location.href = `/${response.data.role}/dashboard`;
      return;
    }
  } catch (error) {
    if ([403, 400].includes(error.response?.data?.status)) {
      try {
        // Try refreshing token using stored refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        const response2 = await axios.post("https://sophia-assistant-api.onrender.com/auth/refresh-token", {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        });

        if (response2.data.status === 200 && response2.data.role && response2.data.accessToken) {
          localStorage.setItem("accessToken", response2.data.accessToken);  // update access token          
          window.location.href = `/${response2.data.role}/dashboard`;
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // You can optionally clear storage here
      }
    }
  }
}
