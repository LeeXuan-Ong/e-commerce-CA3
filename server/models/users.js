const mongoose = require(`mongoose`)

let usersSchema = new mongoose.Schema(
   {
        name: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String,required:true},        
        accessLevel: {type: Number, default:parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)},
   },
   {
       collection: `users`
   })

module.exports = mongoose.model(`users`, usersSchema)