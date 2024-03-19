import usermodel from "../models/usermodel.js";

export const registerController = async (req, res, next) => {
    const { name, email, password } = req.body
    // validate
    if (!name || !email || !password) {
        next("Please fill all fields")
    }
    const existingUser = await usermodel.findOne({ email })
    if (existingUser) {
        next("Email already registered")
    }

    const user = await usermodel.create({ name, email, password })
    // token
    const token=user.createJWT()
    res.status(201).send({
        success: true,
        message: 'User created succesfully',
        user:{
            name:user.name,
            last_name:user.last_name,
            email:user.email,
            location:user.location
        },
        token
    });
};

export const loginController=async(req,res,next)=>{
    const{email,password}=req.body;
    // validation
    if(!email||!password){
        next('Please enter all fields');
    }
    // finduserByEmail
    const user=await usermodel.findOne({email}).select("+password")
    if(!user){
        next('Invalid Username or Password ');
    }
    // Compare Password
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        next('Invalid Username or Password');
    }
    user.password=undefined;
    const token=user.createJWT();
    res.status(200).json({
        success:true,
        message:"Login Succesfull",
        user,
        token,
    })
}