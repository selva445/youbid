const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Register = require("../model/register");
const bcrypt = require("bcryptjs");
const {
  check,
  validationResult
} = require("express-validator");
const config = require("config");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

router.post(
  "/",
  [
    check("name", "Your name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
    check("confirmPassword", "Passwords do not match!").custom(
      (value, {
        req,
      }) => {
        if (value !== req.body.password) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match")
        } else {
         // return res.status(400).json(value);
         return value;
        }
      }
    ),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        errors: err.array(),
      });
    }
    const {
      name,
      email,
      password,
      confirmPassword
    } = req.body;
    try {
      let user = await Register.findOne({
        email: email,
      });
      if (user)
        return res.status(400).json({
          errors: [{msg:"User already exists"}],
        });
        var uid           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 6; i++ ) {
           uid += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      user = new Register({
        name,
        email,
        password,
        confirmPassword,
        uid: uid,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();


      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.SEND_GRID_KEY,
          },
        })
      );

      var mailOptions = {
        from: "selva.warne23@gmail.com",
        to: `${email}`,
        subject: "Email Verification",
        text: "Test Email!",
        html: "<div style =" +
          "width:100%; height:100%;  " +
          "><h1 style=" +
          "font-weight:500>Hey, " +
          name +

          "<br>Welcome to GYM </h1><h1>Thanks for Signing up on our app</h1><h3>Your Code for verification is : " + uid + " </h3></div><p>If this request is not made by you kindly ignore this mail.</p><p>Regards, <strong>Selva</strong></p>",

      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info);
          console.log(info)
        }
        
        const payload = {
          user: {
            id: user.id,
            verified: user.verify
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret.jwt"), {
            expiresIn: 432000,
          },
          (err, token) => {
            if (err) throw err;
            res.json(token);
          }
        );
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

module.exports = router;