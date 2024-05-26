const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/middleware");

// const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemailer-sendgrid-transport')

// const transporter = nodemailer.createTransport(sendgridTransport({
//   auth:{
//     api_key: process.env.MAIL_KEY
//   }
// }))

router.get("/", (req, res) => {
  res.send("Hello");
});

/*****************  SIGN UP  ********************************************  */

router.post("/signup", async (req, res) => {
  try {
    const { name, lastname, email, phone, password, pic } = req.body;

    const exist = await User.findOne({ email });
    const exist1 = await User.findOne({ name });

    if (!name || !email || !password) {
      return res.status(422).json({ message: "Please fill all fields" });
    }
    if (exist1) {
      return res.status(400).json({ message: "Name already exist" });
    }
    if (exist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password must be > 5 chars long.." });
    }
    let user = new User({
      name,
      lastname,
      email,
      phone,
      password,
      pic,
    });
    await user.save();

    // .then(user=>{
    //     transporter.sendMail({
    //       to:user.email,
    //       from:"cvr.maradox@gmail.com",
    //       subject:"Signup Successfull to Rentify...",
    //       html:`<h1>Hello ${user.name} </h1>   <h4>Welcome to Rentify...</h4> `
    //     })
    // })
    
    const token = jwt.sign({ _id: user._id }, "abcdefgh");
    // const exist2 = await User.findOne({ email });

    res
      .status(200)
      .json({
        token,
        _id: user._id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        pic: user.pic,
      });

  } catch (error) {
    console.log("error in register", error);
    return res.status(400).json({ error: "Unable to add User" });
  }
});

/*****************  SIGN IN ********************************************  */

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).json({ message: "Invalid Email.." });
    }
    if (exist.password !== password) {
      return res.status(400).json({ message: "Invalid Password..!" });
    }

    const token = jwt.sign({ _id: exist._id }, "abcdefgh");

    res.json({
      token,
      _id: exist._id,
      email: exist.email,
      name: exist.name,
      lastname: exist.lastname,
      phone: exist.phone,
      pic: exist.pic,
    });
  } catch (error) {
    console.log("error in register", error);
    return res.status(400).json({ error: "Unable to Sign in..." });
  }
});

module.exports = router;
