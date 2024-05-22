const jwt = require('jsonwebtoken')
const usermodal = require('../modals/User')
const { json } = require('express')
const UserModal = require('../modals/User')

const checkuserauth = async(req,res,next)=>{

    // console.log('hello auth')
    const {token} = req.cookies
    // console.log(token)
    if (!token){
        req.flash('error', 'unauthrized user') 
        res.redirect('/')
    }
    else{
        const verify = jwt.verify(token,'sonamsahu@123456789')
        // console.log(verify)
        const user =await UserModal.findById(verify.ID)
        // console.log(user)
        req.user = user
        next()
    }

}
module.exports = checkuserauth