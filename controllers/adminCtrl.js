const collectormodel= require('../models/CollectorModel');
const userModel=require('../models/userModels')


const getAllUserseController= async(req, res)=>{

    try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
}
const getAllCollectorsController=async(req,res)=>{
    try{
        const collector=await collectormodel.find({})
        res.status(200).send({
            success:true,
            message:"all collectors list",
            data:collector,
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'erro while fetching users',
            error
        })
    }
}
const changeAccountStatus=async(req, res)=>{
  try{
    const {collectorId, status}= req.body
    const collector =await collectormodel.findByIdAndUpdate(collectorId,{status})
    const user= await userModel.findOne({_id:collector.userId})
    const notification =user.notification
    notification.push({
      type:'collector-account-update-req',
      message:`Your Collector Account Request has ${status}`,
      onClikcPath:'/notification'
    })
    user.isCollector = status === "approved" ? true : false;
    await user.save()
    ;

    res.status(201).send({
      success: true,
      message: "account status updated",
      data: collector,
    });


}
catch(error){
  console.log(error)
        res.status(500).send({
            success:false,
            message:'erro in account status',
            error
        })}}
module.exports={getAllCollectorsController, getAllUserseController, changeAccountStatus}