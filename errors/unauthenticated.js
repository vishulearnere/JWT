// const {CustomAPIError} = require("./index")  we can't do this because it will not invoke super(messsage)
const  CustomAPIError  = require("./custom-error") //when calling class to get its constructor invoked  use particular file not index.js  
const { StatusCodes } = require('http-status-codes')


class Unauthenticated extends CustomAPIError {
    constructor(message){
        super(message)
        console.log(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
module.exports = Unauthenticated