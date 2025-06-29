const checkAccess = async () => {
  try {
    const res = await axios.post("https://sophia-assistant-api.onrender.com/auth/check-token",{}, {
      withCredentials: true,
    });

    const role = res.data.role;
    const path = window.location.pathname.split("/")[1];

 
    if ((role === "user" && path === "") || role === path) {
      
    } else {
      window.location.href = `/${role}/dashboard`;
    }

  } catch (err) {
  	console.log(err)
    if (err.response?.status === 400 || err.response?.status === 403) {
      try {
        await axios.post("https://sophia-assistant-api.onrender.com/auth/refresh-token", {
          withCredentials: true,
        });

        return await checkAccess();
      } catch(error){
        console.log(error)
      window.location.href = "/failed";
      }
    } else {
      
      window.location.href = "/login";
    }
  }
};
