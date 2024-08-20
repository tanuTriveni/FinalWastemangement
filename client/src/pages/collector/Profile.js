import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Row, TimePicker, Col, Input, message, Button } from 'antd';
import { showLoading, hideLoading } from '../../redux/feautres/alertSlice';
import dayjs from 'dayjs';
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [collector, setCollector] = useState(null);
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/collector/updateProfile", 
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        setCollector(res.data.data);
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Something went wrong", error);
    }
  };

  const getCollectorInfo = async () => {
    try {
      const res = await axios.post(
        '/api/v1/collector/getCollectorInfo',
        { userId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (res.data.data) {
        const collectorData = res.data.data;
        console.log(collectorData.feesPerCunsaltation
        )
        // Convert timings to dayjs objects if needed
        collectorData.timings = collectorData.timings.map(time => dayjs(time));
        setCollector(collectorData);
      }
    } catch (error) {
      console.error("Failed to fetch collector info", error);
    }
  };

  useEffect(() => {
    getCollectorInfo();
  }, []);

  return (
    <Layout>
      {collector && (
        <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={collector}>
          <h4>Personal Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your contact number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="Your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                 label="Fees Per Cunsaltation"
                 name="feesPerCunsaltation"
                 required
                 rules={[{ required: true }]}
              >
 <Input type="text" placeholder="your contact no" />          
     </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
  <TimePicker.RangePicker 
    format="HH:mm"
    onChange={(values) => console.log(values.map(value => dayjs(value)))}
  />
</Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
