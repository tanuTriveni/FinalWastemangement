const collectorModel= require('../models/CollectorModel')
const updateProfileController=async(req, res)=>{

  try{

    const collector= await collectorModel.findOneAndUpdate(
      {userId:req.body.userId},
      req.body
    );
    res.status(201).send({
      success:true,
      message : "Profile updated", data: collector,
    })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Update issue is htere'
      ,error
    })

  }
}

const getDoctorInfoController=async(req, res)=>{
  try{
    const collector= await collectorModel.findOne({userId: req.body.userId})
    res.status(200).send({
      success:true,
      message: "Data info fetched successfully",
      data:collector
    })

  }
  catch(error){
console.log(error)
res.status(500).send({
  success:false,
  error,
  message:'Error in Fetching the detail'
})
  }
  
}

module.exports ={getDoctorInfoController,updateProfileController};
