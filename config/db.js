//configuration related to mongodb
const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async() =>{
    try{
await mongoose.connect("mongodb+srv://kotguletriveni:MEoOAt7I6z736vC1@wastemanage.xcppozp.mongodb.net/wastemanage?retryWrites=true&w=majority")
console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
    }
    catch(error){
console.log(`Mongodb Server Issue ${error} `.bgRed.white)
    }
}
module.exports= connectDB;