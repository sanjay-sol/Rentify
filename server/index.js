const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: "*" }));
require('./models/user');
require('./models/post');



const PORT = 3001;

/*****************  MONGOOSE CONNECTION  ********************************************  */

mongoose.connect(
  "mongodb+srv://sanjaysirangi:PmIbsf9fwIE22Qx8@cluster0.np2f8sy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

mongoose.connection.on('connected',()=>{
    console.log("db connected");
})
mongoose.connection.on('error',(err)=>{
    console.log("error in connecting...",err);
})

/*****************  ROUTES ********************************************  */

app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.get("/", (req, res) => {
  return res.send("Hello from Rentify.....");
});

app.listen(PORT || 3003, () =>
  console.log(`Listening on Port ${PORT}`)
);
