const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "auth" folder
app.get("/super-admin/login",(req,res) =>{
	res.sendFile(path.join(__dirname,"auth","super-admin-login.html"));
})
app.get("/super-admin/signup",(req,res) =>{
	res.sendFile(path.join(__dirname,"auth","super-admin-signup.html"));
})
app.get("/admin/login",(req,res) =>{
	res.sendFile(path.join(__dirname,"auth","admin-login.html"));
})


app.listen(3000, '0.0.0.0', () => {
  console.log('Running at localhost 3000 :)');
});
