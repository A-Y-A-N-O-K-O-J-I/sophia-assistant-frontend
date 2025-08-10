async function getAllInfo() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const role = localStorage.getItem("role");

  if (!accessToken) {
    window.location.href = "/login";
    return;
  }

  try {
    const response = await axios.get("https://sophia-assistant-api.onrender.com/super-admin/dashboard", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    document.getElementById("verified").textContent = response.data.verified;
    document.getElementById("not-verified").textContent = response.data.notVerified;
    document.getElementById("banned").textContent = response.data.banned;

  } catch (error) {
  console.log(error)
    if (error.response?.data?.status === 403 || error.response?.data?.status === 401) {
      try {
        const response = await axios.post("https://sophia-assistant-api.onrender.com/refresh-token", {
          refreshToken
        });

        localStorage.setItem("accessToken", response.data.accessToken);
        return await getAllInfo();

      } catch(error) {
        	console.error(error)
        if (role === "user") {
          window.location.href = "/login";
        	localStorage.clear();
        } else {
          window.location.href = `/${role}/login`;
        	localStorage.clear();
        }
      }
    }
  }
}
