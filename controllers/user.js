const getGoogleProfileInfo = require('../utils/googleOAuth');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const UserModal = require('../models/users.js');
//const { updateMyProfile } = require('../client/src/api');


const secret = process.env.ACCESS_SECRET;


// Users
const registerHandler = async (req, res) => {
    const { userType, email, password, firstName, lastName, company } = req.body;
    try {
      const oldUser = await UserModal.findOne({ email });
      if (oldUser) return res.status(400).json({ message: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await UserModal.create({ userType, email, password: hashedPassword, name: `${firstName} ${lastName}`, company });
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" });      
      res.cookie('token', token, {
        httpOnly: true,
        //Un-comment for production
        //secure: true         
      })
      res.status(201).json({ result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
}

const signInHandler = async (req, res) => {
    const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    res.cookie('token', token, {      
      httpOnly: true,
      //Un-comment for production
      //secure: true 
    })
    res.status(200).json({ result: oldUser })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const googleSignInHandler = async (req, res) => {
  try {
    const code = req.body.code;
    const profile = await getGoogleProfileInfo(code);
    const email = profile.email
    /*const user = {
      googleId: profile.sub,
      name: profile.name,
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      profilePic: profile.picture,
    };*/
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    res.cookie('token', token, {      
      httpOnly: true,
      //Un-comment for production
      //secure: true 
    })
    res.status(200).json({ result: oldUser });
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
}

const logOutHandler = async (req, res) => {
  res.clearCookie("token")
  res.send({success: true})
}


// User profiles
const updateUserProfileHandler = async (req, res) => {
    const {id} = req.params;    
    try {
      console.log(id)
      const updatedUser = await UserModal.findByIdAndUpdate({_id: id}, req.body, {new: true});
      res.json(updatedUser);
    } catch (error) {
      res.send(error.message)
    }
    
}

const findProfileHandler = async (req, res) => {
  const userId = req.body.userId;
  try {
      const profile = await UserModal.findOne({ _id: userId });        
      res.status(200).json(profile);
  } catch (error) {
      res.send(error.message)
  }
}


module.exports = { registerHandler, signInHandler, googleSignInHandler, updateUserProfileHandler, findProfileHandler, logOutHandler }