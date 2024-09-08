const { User } = require('./../models');
// // Get all users
// exports.getAllUsers = async (req, res) => {
//     try {
//       const users = await User.findAll();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to retrieve users' });
//     }
//   };
  
  // Get a user by ID
  exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      console.log("User");
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
//   // Create a new user
//   exports.createUser = async (req, res) => {
//     const { name, email } = req.body;
//     try {
//       const newUser = await User.create({ name, email });
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   };
  
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