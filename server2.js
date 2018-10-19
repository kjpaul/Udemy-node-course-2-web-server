const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 4000;
const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile("server2.log", log + "\n", (err) => {
		if(err){
			console.log("Unable to append to server2.log.");
		}
	});
	next();
});

//app.use((req, res, next) => {
//	res.render("maintenance.hbs", {
//		pageTitle: "Maintenance Page",
//		maintenanceMessage: "We'll be right back<br>We'll be right back...<br>Delete the app.use maintenance for allow site to work again. It is blocking since it does not have a next!"
//	});
//});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
});

app.get("/", (req, res) =>{
	res.render("home.hbs", {
		pageTitle: "Home Page",
		welcomeMessage: "Welcome from Handlebars and Express."
	});
});

app.get("/about", (req, res) =>{
	res.render("about.hbs", {
		pageTitle: "About Page"
	});
});

app.get("/bad", (req, res)=>{
	res.send({
		errorMessage: "Something went wrong."
	});
});


app.listen(port, () => {
	console.log("server is up and port: "+port);
});
