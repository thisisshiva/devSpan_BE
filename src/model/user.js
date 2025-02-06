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
      enum: {
        values: ['male', 'female', 'other'],
        message: `{VALUE} Gender is not valid`,
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
      default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
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

userSchema.index({userName:1, email:1,gender:1})    //compound index makes db query fast

userSchema.pre('save',function(next){
  if(this.gender){
  this.gender = this.gender.toLowerCase();
}
next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
