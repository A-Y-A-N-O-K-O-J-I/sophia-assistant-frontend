async function checkToken() {
  try {
    // First: check token
    const response = await axios.post("https://sophia-assistant-api.onrender.com/auth/check-token", {}, {
      withCredentials: true
    });

    if (response.data.status === 200 && response.data.role) {
      window.location.href = `/${response.data.role}/dashboard`;
      return;
    }
    
  } catch (error) {
  console.log(error);
  	if([403,400].includes(error.response.data.status)){
  		const response2 = await axios.post("https://sophia-assistant-api.onrender.com/auth/refresh-token", {}, {
  		    withCredentials: true
  		  });

  		  if (response2.data.status === 200 && response2.data.role) {
  		   window.location.href = `/${response2.data.role}/dashboard`;
  		  }
  	}
  }
}
