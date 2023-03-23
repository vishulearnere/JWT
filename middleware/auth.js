const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authorizationMiddleware = async(req, res, next)=>{
const authHeader = req.headers.authorization
console.log(authHeader,"ghh")
if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomAPIError('No token provided', 401)
}
const token = authHeader.split(' ')[1]

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const {id, username} = decoded
    req.user = {id,username} // here the request will got to dashboard after this middleware that's why req.user will be there
    //  otherwise every req is independent in http
    // process.env.username = username
    next()
}
catch (error) {
    throw new CustomAPIError('Not authorized to access this route ', 401) }
}
module.exports = authorizationMiddleware
