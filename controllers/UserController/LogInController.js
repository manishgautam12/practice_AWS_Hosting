import signUpModel from '../../models/Signup/Signup.js';
import {onlyEmailValidation} from '../../utils/validation.js';
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";


export const logInUserController = async (req, res, next) => {

    if (onlyEmailValidation(req.body.email)) {
        signUpModel.find({ email: req.body.email })
          .exec()
          .then(user => {
             if (user.length < 1) {
                return res.status(401).json({
                   message: "User not exist"
                })
             }
             bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                   return res.status(401).json({
                      message: "Incorrect password"
                   })
                }
                if (result) {
                   const token = Jwt.sign({
                      email: user[0].email,
                      phone: user[0].phone
                   },
                      process.env.LOGIN_KEY,
                      {
                         expiresIn: "24h"
                      }
                   );
                   res.status(200).json({
                    message:"Login successfull",
                    Token:token,
                    status:true,
                    code:200,
                   })
                }
             })
          })
          .catch(err => {
             res.status(500).json({
                error: err,
                mes: "login failed"
             })
          })
    } else {
       res.status(401).json({
          message: "Email is invalid",
          status: false,
          code: 401,
       })
    }
 }
 export default logInUserController;