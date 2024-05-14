import mongoose, { Schema } from "mongoose"


  
  const collabSchema = new mongoose.Schema({
    name: String,
    description: String,
    payment: String,
    owner: String,
    artistsArray: [
      {
        user:String,
        role: String,
        payment: String,
        statusWork: String
    }],
  })

  export default mongoose.model('collabs', collabSchema);
