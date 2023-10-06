import User from '../../Model/userSchema.js';
import jwt from "jsonwebtoken";

export const signup = async(req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email }).exec();
    
        if (existingUser) {
          return res.status(500).json({
            message: 'User already registered'
          });
        }
    
        const {
          firstName,
          lastName,
          email,
          password, 
        } = req.body;
    
        const _user = new User({
          firstName,
          lastName,
          email,
          password,
          username: Math.random().toString()
        });
    
        const savedUser = await _user.save();
    
        return res.status(200).json({
          user: "User Created Successfully"
        });
      } catch (error) {
        return res.status(500).json({
          message: "Something Went wrong"
        });
      }
}

export const signin = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
    
        if (!user && user.authenticate(req.body.password)) {
          return res.status(500).json({
            message: 'Invalid email or password'
          });
        }
    
        // You can generate and send a JWT token here for authentication if needed
        // For now, let's just send a success message

        const token = jwt.sign({_id: user._id,role: user.role},process.env.JWT_SECRET,{expiresIn:'1hr'});
        const {firstName,lastName,email,role,fullName} = user;
        return res.status(200).json({
          message: 'Signin successful',
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName
          }
        });
      } catch (error) {
        return res.status(500).json({
          message: "Something went wrong"
        });
      }
}