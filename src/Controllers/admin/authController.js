const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const User = require("../../Models/user");
var nodemailer = require("nodemailer");
const user = require("../../Models/user");

exports.register = (req, res) => {
  let { firstName, lastName, email, password, role } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.json(error);
  } else {
    User.findOne({ email }).exec((err, myEmail) => {
      if (err) return res.status(400).json(err);
      if (myEmail) {
        return res.json({
          success: false,
          msg: "با این ایمیل قبلا ثبت نام شده است",
        });
      }
      let token = jwt.sign(
        { email, password, role, firstName, lastName },
        process.env.ACTIVATION_JWT,
        { expiresIn: "15m" }
      );

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "saebfat@gmail.com",
          pass: "saeb123876",
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
      console.log(email);
      var mailOptions = {
        from: "saebfat@gmail.com",
        to: email,
        subject: `hi ${firstName}`,
        text: `this is a email from saeb jafari`,
        html: `<p>hello ${firstName}</p>
              <p>For Activation Click the Activation button</p>
             <p>${token}</p>
      `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json({
            err: error,
            error: "دوباره امتحان کنید",
            success: false,
          });
        } else {
          res.json({
            msg: "لینک فعل سازی حساب کاربری به ایمیل شما ارسال شد",
            success: true,
          });
        }
      });
    });
  }
};

exports.activateAccount = (req, res) => {
  let { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.ACTIVATION_JWT, async (err, decode) => {
      if (err) {
        return res.json({
          success: false,
          msg: "دوباره امتحان کنید",
        });
      }
      if (decode) {
        const { email, firstName, lastName, role, password } = decode;
        const hashed_password = await bcrypt.hash(password, 10);
        let user = new User({
          email,
          firstName,
          userName: shortid.generate(),
          lastName,
          role,
          hashed_password,
        });
        user.save((err, user) => {
          if (err) return res.status(400).json(err);
          if (user) {
            return res.json({
              success: true,
              msg: "با موفقیت وارد سایت شدید",
            });
          }
        });
      }
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  user.findOne({ email }).exec((err, user) => {
    if (err || !user)
      return res.json({
        success: false,
        msg: "هیچ کاربری با این ایمیل وجود ندارد لطفا ثبت نام کنید",
      });
    if (user) {
      const { _id, email, role, fullName } = user;
      if (user.authenticate(req.body.password) && role == "admin") {
        let token = jwt.sign({ _id, role }, process.env.LOGIN_JWT, {
          expiresIn: "24h",
        });
        return res.json({ token, user, msg: "با موفقیت ثبت نام کردید" });
      } else {
        return res.json({ msg: "رمز و یا نام کاربری شما اشتباه است" });
      }
    }
  });
};
