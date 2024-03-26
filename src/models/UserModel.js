
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String // Mime type of the image
  },
  createdDate: {
    type: Date,
    default: Date.now
  },

  

},

{versionKey:false }

);

// Create and export the User model
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
