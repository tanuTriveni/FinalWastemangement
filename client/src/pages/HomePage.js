import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row, Col } from 'antd';
import CollectorList from '../components/CollectorList';

export const HomePage = () => {
  const [collectors, setCollectors] = useState([]);

  // Function to get user data
  const getUserData = async () => {
    try {
      const res = await axios.get('api/v1/user/getAllcollector', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        setCollectors(res.data.data);
      }

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row gutter={[10, 10]} style={{ margin: 0, justifyContent:'space-around' }}>
        {collectors && collectors.map((collector, index) => (
          <Col 
            key={index}
            xs={24} sm={12} md={12} lg={12}
            style={{ display: 'flex', boxSizing:'border-box'}}
          >
            <CollectorList collector={collector} />
          </Col>
        ))}
      </Row>
      <div>Homepage</div>
    </Layout>
  );
};

export default HomePage;
