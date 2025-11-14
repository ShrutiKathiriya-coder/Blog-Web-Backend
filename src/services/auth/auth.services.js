const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../../utils/responseformate");
const { msg } = require("../../utils/message");
const User = require("../../models/user.model")

module.exports = class UserServices {

    //user register
    async registerUser(body) {
        try {
            await User.create(body)
        } catch (error) {
            console.log(error);
            return ErrorResponse(StatusCodes.BAD_REQUEST, true, msg.SERVER_ERROR)
        }
    }

    //fetch singal user
   async fetchSingalUser(body) {
        try {
            return await User.findOne(body);
        } catch (error) {
            console.log(error);
            return ErrorResponse(StatusCodes.BAD_REQUEST, true, msg.SERVER_ERROR)
        }
    }

    //update user
    updateUser() {
        try {

        } catch (error) {
            console.log(error);
            return ErrorResponse(StatusCodes.BAD_REQUEST, true, msg.SERVER_ERROR)
        }
    }

    //fetch all user 

    fetchAllUser() {
        try {

        } catch (error) {
            console.log(error);
            return ErrorResponse(StatusCodes.BAD_REQUEST, true, msg.SERVER_ERROR)
        }
    }

    //delete user

    deleteUser() {
        try {

        } catch (error) {
            console.log(error);
            return ErrorResponse(StatusCodes.BAD_REQUEST, true, msg.SERVER_ERROR)
        }
    }

    //login

    loginUser() {

    }
}