import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
export const HomePage = () => {
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post('api/v1/user/getUserData', {}, {

        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData()
  }, [])
  return (

    <Layout><div>Homepage</div></Layout>



  )
}
export default HomePage
