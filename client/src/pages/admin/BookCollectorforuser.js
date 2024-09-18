import React from 'react';
import Layout from '../../components/Layout';
import { Button } from 'antd';
import { showLoading, hideLoading } from '../../redux/feautres/alertSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios if needed for API calls

const BookCollectorforuser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(location.state)
    const { id, name } = location.state || {};
    const values = id;
    // Event handler for booking a collector
    const nearestcollectornearuser = async () => {
        try {

            // Replace with your API call
            const response = await axios.post('/api/v1/admin/book', { values },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            // Handle response

        } catch (error) {
            console.error('Error booking collector:', error);
        }
    };

    return (
        <Layout>
            <div>
                <h1>Book Collector for User</h1>
                <div>
                    <p>ID: {id}</p>
                    <p>Name: {name}</p>
                </div>
                <Button onClick={nearestcollectornearuser}>Book Collector from here</Button>
            </div>
        </Layout>
    );
};

export default BookCollectorforuser;
