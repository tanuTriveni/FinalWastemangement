import { Tabs, message } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/feautres/alertSlice';
import axios from 'axios';

const NotificationPage = () => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        
            if (res.data.message) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };

    const handleDeleteAllRead = async() => {
        // Implement the logic to delete all read notifications
        try{

            dispatch(showLoading());
            
             const res = await axios.post('/api/v1/user/delete-all-notification', { userId:user._id},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                }
        })
    
    dispatch(hideLoading())

if(res.data.success){
    message.success(res.data.message)
}
else {
    message.error(res.data.message)
}
}



        catch(error){
            console.log(error);
            message.error("something went wrong ");
        }
    };

    return (
        <Layout>
            <div className='p-3 text-center'>Notification Page</div>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Unread" key="1">
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' onClick={handleMarkAllRead} style={{ cursor: 'pointer' }}>Mark All Read</h4>
                    </div>
                    {
                        user?.notification.map((notificationMgs) => (
                            <div className='card' style={{ cursor: "pointer" }} key={notificationMgs.id}>
                                <div className='card-text' onClick={() => navigate(notificationMgs.onClickPath)}>
                                    {notificationMgs.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key="2">
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2 text-primary'
                        
                        
                        onClick={handleDeleteAllRead} style={{ cursor: 'pointer' }}>Delete All Read</h4>
                    </div>
                    { 
                        user?.seennotification.map((notificationMgs) => (
                            <div className='card' style={{ cursor: "pointer" }} key={notificationMgs.data.id}>
                                <div className='card-text' onClick={() =>
                                 
                               
                                 navigate(notificationMgs.data.onClickPath, {
                                    state: { id: notificationMgs.data.userId },
                                  })
                                  }>
                                    {notificationMgs.message}
                                </div>

                                
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
};

export default NotificationPage;
