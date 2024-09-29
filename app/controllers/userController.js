const { User } = require('./../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  
  // Get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
        console.log(error.errors);
        const errors = error.errors.map(err => err.message);
        return res.status(400).json({ errors });
        }  
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.authenticate = async (req, resp) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({ 
      where: {
        email: email
      }
    });
    if(!user){
      return resp.status(401).json({ error: 'Email or password is inconrrect' });
    }
    const validPassword = await user.isValidPassword(password);
    if(user && validPassword){
      const accessToken = jwt.sign({ username: user.email, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      resp.status(201).json({ id: user.id, email: user.email,  accessToken: accessToken}); 
    }else{
      resp.status(401).json({ error: 'Email or password is inconrrect' }); 
    }
      
  } catch(error) {
    resp.status(500).json({ error: error.message });
  }
}  
//   // Update a user
//   exports.updateUser = async (req, res) => {
//     const { userId } = req.params;
//     const { name, email } = req.body;
//     try { 
//       const user = await User.findByPk(userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       user.name = name;
//       user.email = email;
//       await user.save();
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to update user' });
//     }
//   };
  
//   // Delete a user
//   exports.deleteUser = async (req, res) => {
//     const { userId } = req.params;
//     try {
//       const user = await User.findByPk(userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       await user.destroy();
//       res.status(200).json({ message: 'User deleted' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to delete user' });
//     }
//   };