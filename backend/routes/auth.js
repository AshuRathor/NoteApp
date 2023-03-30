const express= require("express")
const User = require("../models/user")
const router = express.Router()
var jwt = require('jsonwebtoken'); 
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = 'Ayushisagoodboy';

//route 1 - create a user using : POST "/api/auth/createuser". doesn't require auth - no login require
router.post('/createuser',[
    body('name',"Name must have atleast 2 letters").isLength({ min: 2 }),
    body('email', "Please enter a valid email").isEmail(),
    body('password', "Your password must have atleast 5 letters").isLength({ min: 5 })
],
    async (req,res) =>{
        let success = false
    
        // const errors = validationResult(Req)
        // if(!errors.isEmpty()){
        //     return res.status(400).json({errors:errors.array()})
        // }
        // res.send(req.body)

        //better method using express-validator

        //if there are errors return bad request and the errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
            // check whehther the user with same email exist already
        
            let user = await User.findOne({email:req.body.email})
            if(user){
                return res.status(400).json(
                        {success,error: "Sorry a user with this email is already exist"}
                    )
            }
            else{
                success= true
            }
            
            const salt = await bcrypt.genSalt(10)
            var secPass = await bcrypt.hash(req.body.password, salt)

            //saving of data in database
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });


            const data ={
                user:{ id:user.id }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log(authtoken)
            res.json({success,authtoken:authtoken}) //or res.json({authtoken})

            // .then(user => res.json(user)) //no need of then function as we are using then function here
            // .catch(err =>{ console.log(err)
            // res.json(
            //     {error: "Please enter a unique value for email", message: err.message}
            // )
            // })
            // res.json({user})


        } 
        catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured")
        }
})


//route 2 - Authenticate a user using : POST "/api/auth/login" - no login required

router.post('/login',[
    // body('name',"Name must have atleast 2 letters").isLength({ min: 2 }),
    body('email', "Please enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req,res) =>{
    let success = false
    const errors = validationResult(req)
    if((!errors.isEmpty())){
        return res.status(400).json({errors: errors.array()})
    }
    const {email,password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            success = false
            return res.status(400).json({success, errors: "Please try to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            success = false
            return res.status(400).json({success, errors: "Please try to login with correct credentials"})   
        }
        
        const data  ={
            user:{ id:user.id }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({success, authtoken})
    }catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error")
        }
})


//route 3 - Get logged in user details using : POST "/api/auth/getuser" - Login required

router.post("/getuser", fetchuser,async (req,res) =>{
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("internal server error")
    }

})


module.exports= router