const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    age: {
      type: Number,
      min: 13,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Not a valid email'+ value);
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!['male', 'female', 'other'].includes(value)) {
          throw new Error('Gender data not valid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error('Please Enter a Strong password..')
        }
      }
    },
    photoUrl: {
      type: String,
      default: "https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=2048x2048&w=is&k=20&c=ghuWTYunO5oRNKtdm6ot58tlfw7oB1WV_o8NzHSjZKc=",
    },
    about: {
      type: String,
      default: 'This is default user about',
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
