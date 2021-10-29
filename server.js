const express = require("express");
const middle = require("./src/Middleware/index");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json({"limit":"1mb"}));
app.disable('x-powered-by');
const PORT = process.env.PORT || 3001;

app.all('*', function(_, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

//Routes
const register = require('./src/routes/register');
const login = require('./src/routes/login');
const challenges = require('./src/routes/challenges');
const item = require('./src/routes/Item');
const emailsender = require('./src/routes/email-server/email');
const verification = require('./src/routes/verify');

app.post("/register", register.dataValid, register.registerUser, emailsender.sendEmail);
app.post("/login", login.dataValid, login.loginUser);
app.post("/verify", verification.verifyinfo);
app.get("/challenges", middle.authHeader, middle.validSign, challenges.challenges);
// app.get("/item/:id", middle.authHeader, middle.validSign, item.Itemparams);
app.get("/item/:id", item.Itemparams);
app.get("/verify/:id", verification.verifyinfo);

//TEST ROUTES

// app.get("/send", emailsender.sendEmail);
// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });
// app.get("/api", middle.authHeader);
app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
  // res.status(301).redirect('http://localhost:3000/');
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});