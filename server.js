const express = require("express");
const middle = require("./src/Middleware/index");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json({"limit":"1mb"}));
app.disable('x-powered-by');
const PORT = process.env.PORT || 3001;

//Routes
const register = require('./src/routes/register');
const login = require('./src/routes/login');
const challenges = require('./src/routes/challenges');
const item = require('./src/routes/Item');
const emailsender = require('./src/email-server/email');

app.all('*', function(_, res, next){
	res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, content-type, auth, Content-Length, X-Requested-With');
	next();
});

app.post("/register", register.dataValid, register.registerUser);
app.post("/login", login.dataValid, login.loginUser);
app.get("/challenges", middle.authHeader, middle.validSign, challenges.challenges);
app.get("/item/:id", middle.authHeader, middle.validSign, item.Itemparams);
app.get("/send", emailsender.sendEmail);

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });
// app.get("/api", middle.authHeader);
app.get("/test", (req, res) => {
  console.log("gg test");
  res.status(301).redirect('http://localhost:3000/');
});

  app.get("/news", (req, res) => {
    res.send({ msg: "Hello from server!" });
    console.log("hola");
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});