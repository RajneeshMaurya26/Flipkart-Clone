import User from '../../Model/userSchema.js';
import jwt from "jsonwebtoken";

export const signup = async(req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email }).exec();
    
        if (existingUser) {
          return res.status(500).json({
            message: 'Admin already registered'
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
          username: Math.random().toString(),
          role: 'admin'
        });
    
        const savedUser = await _user.save();
    
        return res.status(200).json({
          user: "Admin Created Successfully"
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
    
        if (!user || !user.authenticate(req.body.password)) {
          return res.status(500).json({
            message: 'Invalid email or password'
          });
        }
    
        // You can generate and send a JWT token here for authentication if needed
        // For now, let's just send a success message

        const token = jwt.sign({_id: user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'});
        const {firstName,lastName,email,role,fullName} = user;
        res.cookie('token', token, { expiresIn: '1d' });
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

export const signout = async (req, res) => {
  try {
    await res.clearCookie('token'); // Clear the token cookie and specify the path
    return res.status(200).json({ message: 'Signout Successful' });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred while signing out',
      error: error.message, // Provide a more user-friendly error message
    });
  }
};
