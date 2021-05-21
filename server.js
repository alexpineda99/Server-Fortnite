const express = require("express");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json({"limit":"1mb"}));
app.disable('x-powered-by');
const PORT = 3001;

const register = require('./src/routes/register');

app.all('*', function(_, res, next){
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'auth, Content-Type, Content-Length, X-Requested-With');
	next();
});

app.post("/register", register.dataValid, register.registerUser);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});