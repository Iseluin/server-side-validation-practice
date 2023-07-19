const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");

const usedEmails = [
  "halit@re-coded.com",
  "derya@re-coded.com",
  "ammar@re-coded.com",
  "kishi@re-coded.com",
  "maher@re-coded.com",
];

const createBasicValidationChain = (field, minLength) =>
  body(field)
    .notEmpty()
    .withMessage("Username should not be empty")
    .isLength({ min: minLength })
    .withMessage(`Username must be at least ${minLength} characters long`);

const customEmailValidation = (field) =>
  body(field)
    .notEmpty()
    .withMessage("Email should not be empty.")
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .withMessage("Invalid email");

const emailChecker = (email) => {
  return usedEmails.every((existingEmail) => existingEmail !== email);
};

const basicPasswordValidation = (field, minLength) => 
  body(field)
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: minLength })
    .withMessage(`Password must be at least ${minLength} characters long`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/)
    .withMessage("Password must contain a number, uppercase and lowercase");

// const isPasswordAndConfirmPasswordSame = (confirmPassword) => {
//   return confirmPassword === req.body.password;
// };


app.get("/", (req, res) => {
  res.render("index");
});

app.post(
  "/users",
  [
    createBasicValidationChain("username", 4)
      .matches(/^[^\s]+$/)
      .withMessage("Username should not include spaces"),

    customEmailValidation("email")
      .custom(emailChecker)
      .withMessage("Email already exists"),

    basicPasswordValidation("password", 5),

    body("confirmPassword")
      .custom((value, {req}) => value === req.body.password).withMessage('Passwords are not matching'),
  ],
  (req, res) => {
    //validation
    const successMessage = "Congratulations, your account has been successfully created!";

    const errors = validationResult(req);

    console.log(errors)

    if (!errors.isEmpty()) {
      return res.render("index", { errors: errors.array(), successMessage: null });
    }
    console.log("Before", usedEmails)
    usedEmails.push(req.body.email);
    console.log("After", usedEmails)
    res.render("index", { successMessage, errors: null });
  }
);

app.listen(port, () => console.log(`Application running on port ${port}`));

module.exports = app;
