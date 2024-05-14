import mongoose, { Schema } from "mongoose"


const userSchema = new mongoose.Schema({
  username: String,
  password: String
});


  export default mongoose.model('users', userSchema)
