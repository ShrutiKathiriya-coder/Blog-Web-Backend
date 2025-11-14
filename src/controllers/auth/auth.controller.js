const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../../utils/responseformate');
const { msg } = require('../../utils/message');
const UserServices = require('../../services/auth/auth.services');


const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
// const { log } = require('console');
// const { token } = require('morgan');

const userService = new UserServices();

exports.registerUser = async (req, res) => {

    try {
        console.log(req.body);
        const exitUser = await userService.fetchSingalUser({ email: req.body.email })
        if (exitUser) {
            return res.json(ErrorResponse(StatusCodes.BAD_REQUEST, true, msg.USER_EXISTS))
        }

        req.body.password = await bcrypt.hash(req.body.password, 11);
        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss a');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss a');

        const newuser = userService.registerUser(req.body)
        return res.json(SuccessResponse(StatusCodes.OK, false, msg.REGISTER), newuser);

    } catch (error) {
        console.log(error);
         return res.json(ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,true,msg.SERVER_ERROR))
    }
}

// exports.loginUser = async (req, res) => {
//     try {
//         console.log(req.body);

//          console.log("BEFORE QUERY");
//       const user= await  userService.fetchSingalUser({email : req.body.email})
        
       
//         console.log("AFTER QUERY");


//       if(!user){
//         return res.json(ErrorResponse(StatusCodes.BAD_REQUEST,true,msg.USER_NOT_FOUND));
//       }
        
//     } catch (error) {
//          console.log(error);
//           return res.json(ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,true,msg.SERVER_ERROR))
//     }
// }

exports.loginUser = async (req, res) => {
    try {
        // console.log(req.body);
        
        const user = await userService.fetchSingalUser({ email: req.body.email });


        if (!user) {
            return res.json(ErrorResponse(StatusCodes.BAD_REQUEST, true, msg.USER_NOT_FOUND));
        }

       const matchpassword= await bcrypt.compare(req.body.password, user.password);

       if(!matchpassword){
        return res.json(ErrorResponse(StatusCodes.BAD_REQUEST,true,msg.PASSWORD_NOT_MATCH))
       }

       const payload= {
        id :user.id
       }
       const token= jwt.sign(payload,process.env.JWT_TOKEN);


       return res.json(SuccessResponse(StatusCodes.OK,false,msg.LOGIN_SUCCESS,{token}));
        // return res.json({
        //     success: true,
        //     message: "Login successful",
            
        // });

    } catch (error) {
        console.log(error);
        return res.json(ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, msg.SERVER_ERROR));
    }
};
