const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "auth" folder
app.use(express.static(path.join(__dirname, 'public')));
app.get("/super-admin/login",(req,res) =>{
	res.sendFile(path.join(__dirname,"auth","super-admin-login.html"));
})
app.get("/super-admin/signup",(req,res) =>{
	res.sendFile(path.join(__dirname,"auth","super-admin-signup.html"));
})
app.get("/login",(req,res) =>{
	res.sendFile(path.join(__dirname,"auth","user-login.html"));
})
app.get("/super-admin/dashboard",(req,res) =>{
	res.sendFile(path.join(__dirname,"dash","super-admin-dash.html"));
})
app.get("/super-admin/charts.js",(req,res) =>{
	res.sendFile(path.join(__dirname,"dash","charts.js"));
})
app.get("/super-admin/sidebar.js",(req,res) =>{
	res.sendFile(path.join(__dirname,"dash","sidebar.js"));
})

app.get("/admin/login",(req,res) =>{
	res.sendFile(path.join(__dirname,"auth","admin-login.html"));
})


app.listen(3000, '0.0.0.0', () => {
  console.log('Running at localhost 3000 :)');
});
