const express =require('express')
const authMiddleware = require('../middlewares/authMiddleware')

const { getAllCollectorsController, getAllUserseController ,changeAccountStatus} = require('../controllers/adminCtrl')






const router = express.Router()


router.get('/getAllUsers',authMiddleware,getAllUserseController)

router.get('/getAllCollectors',authMiddleware, getAllCollectorsController)

//post method
router.post('/changeAccountStatus', authMiddleware, changeAccountStatus);
module.exports=router