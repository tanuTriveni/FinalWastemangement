import React,{useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading } from '../redux/feautres/alertSlice';
import { hideLoading } from '../redux/feautres/alertSlice';
import { setUser } from '../redux/feautres/userSlice';
const Protectedroutes = ({ children }) => {

const dispatch=useDispatch()
const {user}=useSelector(state => state.user)
const getUser = async()=>{
  try{ dispatch(showLoading());
    const res = await axios.post(
      "/api/v1/user/getUserData",
      { token: localStorage.getItem("token") },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(hideLoading());
    if (res.data.success) {
      dispatch(setUser(res.data.data));
    } else {
      localStorage.clear();
      <Navigate to="/login" />;
      localStorage.clear();
    } }
    catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protectedroutes;
