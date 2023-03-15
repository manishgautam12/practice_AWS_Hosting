import signUpModel from '../../models/Signup/Signup.js';
import bcrypt from "bcrypt";
import {
  onlyAlphabetsValidation,
  onlyEmailValidation,
  onlyPasswordPatternValidation,
  phoneNumberValidation,
} from "../../utils/validation.js";

const responseData = (res, message, ErrorCode, status) => {
  return res.status(ErrorCode).json({
    message: message,
    status: status,
    code: ErrorCode,
  });
};
export const signupController = async (req,res,next)=>{
    const allErroesArray = [];
    if (
      req.body.firstName.length < 2 ||
      !onlyAlphabetsValidation(req.body.firstName)
    ) {
      allErroesArray.push({
        firstNameError:
          "Minimum length of first name is 2 and Number and special character is not allow",
      });
    }
    if (
      req.body.lastName.length < 2 ||
      !onlyAlphabetsValidation(req.body.lastName)
    ) {
      allErroesArray.push({
        lastNameError:
          "Minimum length of last name is 2 and Number and special character is not allow",
      });
    }
    if (!onlyEmailValidation(req.body.email)) {
      allErroesArray.push({ emailError: "Invalid Email" });
    }
    if (req.body.phone.length != 10 || phoneNumberValidation(req.body.phone)) {
      allErroesArray.push({ phoneNumberError: "Invalid Phone Number" });
    }
  
    if (!onlyPasswordPatternValidation(req.body.password)) {
      allErroesArray.push({ passwordError: "please enter a strong password" });
    }
    if (allErroesArray.length > 0) {
      console.log(allErroesArray);
      responseData(res, allErroesArray , 401, false);
  
    } else if (req.body.password !== req.body.confirmpassword) {
      responseData(res, "confirm password not mached" , 401, false);
    } else {
      // ************************* for check email and phone number is already exist or not*******************//
      const emailExist =
        (await signUpModel.find({ email: { $eq: req.body.email } }).count()) > 0;
      const phoneExist =
        (await signUpModel.find({ phone: { $eq: req.body.phone } }).count()) > 0;
      if (emailExist) {
          responseData(res, "Email already exist" , 401, false);
      } else if (phoneExist) {
          responseData(res, "Phone number  already exist" , 401, false);
        
      } else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          if (err) {
            responseData(res, "please enter strong password" , 401, false);
          } else {
            const newUserData = new signUpModel({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              // confirmpassword: req.body.confirmpassword,
              phone: req.body.phone,
              status: false,
            });
            newUserData
              .save()
              .then((result) => {
                  responseData(res, "User created successfully" , 200, true);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    }
}
export default signupController;