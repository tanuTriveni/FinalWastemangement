const express =require('express')
const authMiddleware = require('../middlewares/authMiddleware')

const { getAllCollectorsController, getAllUserseController ,changeAccountStatus,book} = require('../controllers/adminCtrl')






const router = express.Router()


router.get('/getAllUsers',authMiddleware,getAllUserseController)
router.post('/book',authMiddleware,book)
router.get('/getAllCollectors',authMiddleware, getAllCollectorsController)


//post method
router.post('/changeAccountStatus', authMiddleware, changeAccountStatus);
module.exports=router