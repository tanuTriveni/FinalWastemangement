import {configureStore} from  '@reduxjs/toolkit'
import { alertSlice } from './feautres/alertSlice'
import { userSlice } from './feautres/userSlice'


export default configureStore({
    reducer: {  
        alerts:alertSlice.reducer,
        user:userSlice.reducer
    }
})