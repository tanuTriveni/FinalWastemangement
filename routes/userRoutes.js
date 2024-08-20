const express =require('express');
const { loginController, registerController, authCntroller ,applyCollectorController,deleteALLNotificationController,getALLNotificationController,getAllCollector} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
//routers
router.post('/login', loginController)
router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authCntroller)


router.post('/apply-collection',authMiddleware,applyCollectorController)

router.post('/get-all-notification',authMiddleware,getALLNotificationController)

router.post('/delete-all-notification',authMiddleware,deleteALLNotificationController)

router.get('/getAllcollector', authMiddleware, getAllCollector)
module.exports=router