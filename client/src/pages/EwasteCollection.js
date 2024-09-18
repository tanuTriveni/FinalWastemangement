import { Button } from 'antd'
import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Input, message} from "antd";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/feautres/alertSlice';

const EwasteCollection = () => {
    const { user } = useSelector((state) => state.user); // Access the user from Redux state

    const handlebook = async () => {
        try {
            console.log(user._id)
            const values= user._id
            const res = await axios.post(
                'api/v1/user/getthenearesCollector',
                
                { ...values,userId: user._id }, // Use the current user's ID
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            // handle response
        } catch (error) {
            // handle error
        }
    }

    return (
        <div>
            EwasteCollection
            <Button onClick={handlebook}>Book Collector</Button>
        </div>
    );
}


export default EwasteCollection