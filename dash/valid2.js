async function refreshToken() {
  try {
    const response = await axios.post("https://sophia-assistant-api.onrender.com/refresh-token", {}, {
      withCredentials: true
    });

    if (response.data.status === 200) {
      const check = await checkToken();
      if (check === "super-admin") {
        setTimeout(() => {
          window.location.href = "/super-admin/dashboard";
        }, 2000);
      } else if(check === "admin"){
      	  window.location.href = "/admin/dashboard";
      }else if(check === "user"){
      	  window.location.href = "/dashboard";
      } else{
      	if(!check){
      		window.location.href = "/login";
      	}
      	window.location.href = `/${check}/login`
      }
    } else {
    	if(!check){
      		window.location.href = "/login";
      	}
      	window.location.href = `/${check}/login`
      
  } catch (err) {
    // Network or token refresh failed
    window.location.href = "/login";
  }
}


async function checkToken() {
  try {
    const response = await axios.post("https://sophia-assistant-api.onrender.com/check-token", {}, {
      withCredentials: true
    });

    if (response.data.status === 200) {
      return response.data.role;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
