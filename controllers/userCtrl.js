const userModel = require('../models/userModels');
const bcrypt =require('bcryptjs')

const collectormodel=require('../models/CollectorModel')
const  jwt = require ('jsonwebtoken') 











const registerController=async (req, res)=>{
try{
    const existinguser =await userModel.findOne({email:req.body.email});
    if(existinguser){
        return res
        .status(200)
        .send({message :"User already Exist", success :false});}
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password ,salt)
        req.body.password= hashedPassword;
        const newUser = new userModel(req.body); //here instance is created and then it is saved in the data base
         await newUser.save();
         res.status(201).send({message:"Register Successfully", success:true});
         
    
}
catch(error){
    console.log(error);
    res.status(500).send({success:false, message :  `Register controller ${error.message}`})
}
}







const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ message: 'Login success', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Login controller error: ${error.message}` });
    }
};



const authCntroller = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };

  const applyCollectorController = async (req, res) => {
    try {

      const { location, address } = req.body;
      if (!location || !address) {
        return res.status(400).send({
          success: false,
          message: 'Location and address are required fields'
        });
      }

      // Create a new collector with status 'pending'
      const newCollector = new collectormodel({
        ...req.body,
        status: "pending"
      });
  
      // Save the new collector
      await newCollector.save();
  
      // Find the admin user
      const adminUser = await userModel.findOne({ isAdmin: true });
      if (!adminUser) {
        return res.status(404).send({
          success: false,
          message: 'Admin user not found'
        });
      }
  
      // Update admin notifications
      const notification = adminUser.notification;
      notification.push({
        type: 'apply-collector-request',
        message: `${newCollector.firstName} ${newCollector.lastName} has requested for the collection.`,
        data: {
          userId: newCollector._id,
          name: `${newCollector.firstName} ${newCollector.lastName}`,
          onClickPath: '/admin/collector'
        }
      });
  
      // Save the updated notifications
      await userModel.findByIdAndUpdate(adminUser._id, { notification });
  
      // Send success response
      res.status(200).send({
        success: true,
        message: 'Collector application submitted successfully'
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: 'Error while applying for the collection'
      });
    }
  };

const deleteALLNotificationController =async(req,res)=>{
try{
const user=await userModel.findOne({
  _id:req.body.userId
})
user.notification=[]
user.seennotification=[]
const updateUser=await user.save();
updateUser.password=undefined

res.status(200).send({
  success:true,
  message:"Notification deleted succesfully",
  data:updateUser,
});
}
catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:"unable to delte all notfications", error
  })
}
}

  const getALLNotificationController=async(req, res)=>{
try{
  const user = await userModel.findOne({ _id: req.body.userId });

  // Move all notifications to seennotification
  user.seennotification.push(...user.notification);
  user.notification = []; // Clear the notification array

  const updateUser = await user.save();
  
  res.status(200).send({
    success: true,
    message: "Notification updated successfully",
    data: updateUser
  });
}

catch(error){
  console.log(error);
  res.status(500).send({
    message:'Error in notification',
    success: false,
    error,
})
  }
}
const getthenearesCollectornotfication= async (req, res)=>{


  try{
  const {id}= req;
  const user = await userModel.findOne({ _id: req.body.userId });
console.log(user.location);

const adminUser = await userModel.findOne({ isAdmin: true });
if (!adminUser) {
  return res.status(404).send({
    success: false,
    message: 'Admin user not found'
  });
}


const notification = adminUser.notification;
notification.push({
  type: 'book-collector-request',
  message: `${user.name} has requested the booking of a collector .`,
  data: {
    userId: user._id,
    name: `${user.name} `,
    onClickPath: '/admin/allocatecollector'
  }
});

// Save the updated notifications
await userModel.findByIdAndUpdate(adminUser._id, { notification });

}
catch(error){
  console.error(error); // Log the error for server-side debugging
    
    // Sending error response
    res.status(500).send({
      success: false,
      message: "Error while fetching the data",
      error: error.message, // Send only the error message, not the whole error object
    });
}
  // const newUser= await userModel.findOne({})

}

const getAllCollector = async (req, res) => {
  try {
    const collectors = await collectormodel.find({ status: "approved" });
    console.log(collectors);
    // Sending success response
    res.status(200).send({
      success: true,
      message: "All collectors fetched successfully",
      data: collectors,  
    });




  } catch (error) {
    console.error(error); // Log the error for server-side debugging
    
    // Sending error response
    res.status(500).send({
      success: false,
      message: "Error while fetching the data",
      error: error.message, // Send only the error message, not the whole error object
    });
  }
};
module.exports ={loginController,applyCollectorController,registerController,getALLNotificationController,
  deleteALLNotificationController,authCntroller,getAllCollector,getthenearesCollectornotfication}