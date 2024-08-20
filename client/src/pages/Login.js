import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/RegisterStyles.css'
import { Form, Input, message, Button }
  from "antd"
  import { useDispatch } from 'react-redux'
  import { showLoading,hideLoading } from '../redux/feautres/alertSlice'
import axios from 'axios'


const Login = () => {
  const navigate = useNavigate()

const dispatch=useDispatch()

  const onFinishHandler = async (values) => {
    try {
dispatch(showLoading())
      console.log(values);
      const res = await axios.post('api/v1/user/login', values);
      dispatch(hideLoading())
      console.log(res)
      if (res.data.success) { // Check if status code is 200 (OK)
        localStorage.setItem("token", res.data.token);
        message.success('Login Success');
        navigate('/');
      } else {
        message.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (




    <div className="form-container">

      <Form layout="vertical" onFinish={onFinishHandler} className='card p-4'>

        <h3 className="text-center">Login From</h3>
        {/* <Form.Item label="Name" name ="name">
    <Input type ="text"  required/>
    </Form.Item> */}
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/login" className="m-5">Not a user register here </Link>
        <button type="btn btn-primary">Login</button>


      </Form>
    </div>
  )
}

export default Login