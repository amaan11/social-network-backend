import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator"
import { login, registerUser, emailAlreadyExist, updateUser } from "../Models/User";
import secret from "../utils/config";

const router = express.Router();

// Here we are configuring our SMTP Server details.

// need to be moved to utils folder
let smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "asalheen1997@gmail.com",
    pass: "dxsnempsqbyiymgt"
  }
});

router.get("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let statusCode = "";
    let response = {};

    if (!email || !password) {
      statusCode = 401;
      response["isSuccess"] = false;
      response["data"] = "Email or password cannot be empty";
    } else {
      response = await login(email, password);
      if (response["isSuccess"]) {
        statusCode = 200;
      } else {
        statusCode = 401;
      }
    }
    return res.status(statusCode).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/register",
  [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    check('firstName', 'First Name Cannot Be Empty').not().isEmpty(),
    check('lastName', 'Last Name Cannot Be Empty').not().isEmpty()
  ], async (req, res, next) => {
    try {
      let statusCode = "";
      let response = {};
      const { email } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const isValidEmail = await emailAlreadyExist(email);

      if (isValidEmail) {
        statusCode = 500;
        response["isSuccess"] = false;
        response["data"] = "Email Already Exist!You can login  directly!";
      } else {
        statusCode = "200";
        response = await registerUser(req.body);
      }
      return res.status(statusCode).json(response);
    } catch (error) {
      next(error);
    }
  });

router.post("/forget-password", async (req, res, next) => {
  try {
    const { email } = req.body
    const emailExist = await emailAlreadyExist(email)
    let statusCode = ''
    let response = {}

    if (!email) {
      response["isSuccess"] = false
      response["data"] = "Email Cannot Be Empty"
      return res.status(500).json(response)
    }
    else if (!emailExist) {
      response["isSuccess"] = false
      response["data"] = "Requested Email doesn't exist!Please Enter a valid Email"
      return res.status(500).json(response)
    }
    else {
      const token = jwt.sign(email, secret);

      let link = `http://${req.get("host")}/reset-password/${token}`

      let mailOptions = {
        to: email,
        subject: "Reset your Email account",
        html:
          "Hello,<br><h3>To Reset Your Password,Please Click on the link.</h3><br><a href=" +
          link +
          ">Click here to Reset Password</a>"
      };
      await smtpTransport.sendMail(mailOptions, function (error, data) {
        if (error) {
          statusCode = "500";
          response["isSuccess"] = false
          response["data"] = "Something Went Wrong!"
        } else {
          statusCode = "200";
          response["isSuccess"] = true
          response["data"] = "Reset Password Successful!Please Check your email Address"
        }
        return res.status(statusCode).json(response)
      });
    }
  }
  catch (error) {
    next(error)
  }

});
router.put("/reset-password",
  [
    check('email', 'Invalid Email').isEmail(),
    check('newPassword', 'Password must be atleast 8 characters').isLength({ min: 8 }),
  ], async (req, res, next) => {
    let statusCode = ""
    let response = []
    try {
      const { email, newPassword } = req.body
      const emailExist = await emailAlreadyExist(email)

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      if (!emailExist) {
        statusCode = "500";
        response["isSuccess"] = false
        response["data"] = "Email doesn't exist!Please Try again with the registered email"
      }
      else {
        response = await updateUser(email, newPassword)
        statusCode = "200"
      }
      return res.status(statusCode).json(response)
    }
    catch (error) {
      next(error)
    }
  })

router.get("/verify-token", (req, res, next) => {
  const { token } = req.body

  let statusCode = ""
  let response = {}
  try {
    if (!token) {
      statusCode = "500";
      response["isSuccess"] = false
      response["data"] = "Invalid Token"
    }
    else {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          statusCode = "500";
          response["isSuccess"] = false
          response["data"] = "Invalid Token"
        }
        else {
          statusCode = "200";
          response["isSuccess"] = true
          response["data"] = decoded
        }
      });
    }
    return res.status(statusCode).json(response)
  }
  catch (error) {
    next(error)
  }

})

export default router;
