
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const UserModal = require('../models/users.js')


const secret = process.env.ACCESS_SECRET;


// Users
const registerHandler = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
      const oldUser = await UserModal.findOne({ email });
      if (oldUser) return res.status(400).json({ message: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );      
      res.status(201).json({ result, token });
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
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}


// User profiles
const updateUserProfileHandler = async (req, res) => {
    const {id} = req.params;    
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = await UserModal.findByIdAndUpdate({_id: id}, req.body, {new: true});
    res.json(updatedUser);
}

const findProfileHandler = async (req, res) => {
  const name = req.body.name;
  try {
      const profile = await UserModal.findOne({name});        
      res.status(200).json(profile);
  } catch (error) {
      console.log(error);
  }
}


module.exports = { registerHandler, signInHandler, updateUserProfileHandler, findProfileHandler }