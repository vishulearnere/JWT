// check username, password in post(login) request
// if exists create new JWT
// send back to front end 
// setup authothication so only dashboard can be accesesd if token is there 

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error') // here we are importing class 


const login = async (req, res)=> {
    console.log(req.url, req.body)
    const {username, password} = req.body 
// mongoose validation 
// JOI
// Check in conteroller like we are doing now 

    if(!username || !password){
        req.user = username
        throw new CustomAPIError('Please provide email and password', 400) // this will be handeled by the middleware(error-handler)
    }
    const id = new Date().getDate() 

    // in payload we will use id while signing so later when authorizing(getting dashboard),
    //  we can get id from token and provide resource of that particular userID 
    // keep payload smaller  and jwt- secret smaller and complex
    const token = jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'30d'})
    return res.status(200).json({ msg:'user created ', token })
}

const dashboard = async (req, res)=> {
       
    randomNumber = Math.floor(Math.random(0, 100) * 100)
    res.status(200).json({ msg: `Hi, ${req.username}`, secret:` your secret Number is  ${randomNumber} ` })

}

module.exports = { login, dashboard }