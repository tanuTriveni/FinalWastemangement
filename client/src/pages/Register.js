import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/RegisterStyles.css';
import { Form, Input, message, Button } from "antd";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/feautres/alertSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());

            // Capture the user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        // Add location coordinates to the form values
                        values.location = { latitude, longitude };

                        // Make the API call to register the user
                        const res = await axios.post('api/v1/user/register', values);
                        dispatch(hideLoading());

                        if (res.data.success) {
                            message.success("Registered Successfully");
                            navigate("/login");
                        } else {
                            message.error(res.data.message);
                        }
                    },
                    (error) => {
                        console.log(`Error: ${error.message}`);
                        dispatch(hideLoading());
                        message.error("Failed to retrieve location.");
                    }
                );
            } else {
                message.error("Geolocation is not supported by this browser.");
                dispatch(hideLoading());
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong.");
        }
    };

    return (
        <div className="form-container">
            <Form layout="vertical" onFinish={onFinishHandler} className='card p-4'>
                <h3 className="text-center">Register Form</h3>
                <Form.Item label="Name" name="name">
                    <Input type="text" required />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Address" name="address">
                    <Input type="text" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <Link to="/login" className="m-5">Already a user? Login here</Link>
                <Button type="primary" htmlType="submit">Register</Button>
            </Form>
        </div>
    );
}

export default Register;


//redux information
// In summary, Redux provides a structured and scalable way to manage the state of a JavaScript application. It addresses common challenges in state management by promoting a single source of truth, a predictable state flow, and a separation of concerns. While it adds some boilerplate code, its benefits become more apparent as applications grow in size and complexity. It has become a popular choice for state management in the React ecosystem and beyond.
// In the context of Redux and React, the term "state" refers to the data that represents the current condition or snapshot of a part of your application. It's essentially the information you want to keep track of and potentially display in your user interface.






// // The code snippet you provided is using the `fetch` function to make a POST request to the "/api/auth/signup" endpoint. Let's break down the code:

// // ```javascript
// const res = await fetch("/api/auth/signup", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(formData),
// });
// ```

// // 1. **Endpoint:**
// //    - `"/api/auth/signup"`: This is the URL endpoint to which the POST request is being made. It's typically the endpoint for user signup/authentication.

// // 2. **Request Method:**
// //    - `method: 'POST'`: This specifies that the HTTP request method being used is POST. In the context of user signup/authentication, this is common for submitting user registration data.

// // 3. **Headers:**
// //    - `headers: { 'Content-Type': 'application/json' }`: This sets the request headers. In this case, it specifies that the request payload (body) is in JSON format. The `'Content-Type': 'application/json'` header informs the server that the data being sent is in JSON format.

// 4. **Request Body:**
//    - `body: JSON.stringify(formData)`: This is the actual data being sent with the request. `formData` is assumed to be an object containing user input or registration data. `JSON.stringify` is used to convert the JavaScript object into a JSON string, which can be sent in the request body.

// 5. **Asynchronous Request:**
//    - `const res = await fetch(...)`: This line uses the `await` keyword to wait for the `fetch` operation to complete. The result (`res`) is an HTTP response object.

// The `fetch` function is a modern JavaScript function for making network requests (HTTP requests) in the browser or in environments that support the Fetch API (such as Node.js with appropriate polyfills). In this context, it is commonly used in web applications, especially with front-end frameworks like React, to communicate with a server and handle user authentication or form submissions.