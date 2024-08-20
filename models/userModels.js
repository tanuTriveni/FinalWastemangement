const mongoose =require('mongoose')
const userSchema = new mongoose.Schema({

    name :{
        type:String,
        required : true,
    }
    ,
    email:{
        type:String,
        required :true,
    },
    password :{
        type:String,
        requried :true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isCollector:{
type:Boolean,
default:false,

    }
    ,
    notification :{
        type:Array,
        default:[],
    },
    seennotification:{
        type:Array,
        default:[],},
})
const userModel = mongoose.model ("users", userSchema);
module.exports=userModel;// / 3. **Creating the Model:**
//    - `const User = mongoose.model('User', userSchema);`: This line creates a Mongoose model named `User`. A model is a constructor function that corresponds to a collection in the database. The model provides an interface to interact with the database, allowing you to create, read, update, and delete documents in the collection.
