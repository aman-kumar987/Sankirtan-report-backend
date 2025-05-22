import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    index: true,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^((\+91|0)?)?\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema);
export default User;