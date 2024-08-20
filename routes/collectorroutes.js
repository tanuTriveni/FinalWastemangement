const express= require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router =express.Router()
const {getDoctorInfoController,updateProfileController}= require('../controllers/collectorCtrl')
//post
router.post('/getCollectorInfo', authMiddleware, getDoctorInfoController)
router.post('/updateProfile', authMiddleware, updateProfileController)
module.exports=router