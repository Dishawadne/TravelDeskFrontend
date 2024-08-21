
// import React, { useState } from 'react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';
 
// const Login = () => {
//     const [formData, setFormData] = useState({ Email: '', Password: '' });
//     const [message, setMessage] = useState('');
//     const navigate=useNavigate();
 
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };
 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//             const response = await axios.post('https://localhost:7116/api/auth', formData);
//             console.log('Full response data:', response.data); 
//     //decode Token 
//             if (response.status === 200) {
                
//                 const { id,roleId } = response.data.user || {}; // Safely extract RoleId
//                 console.log('Role ID:', roleId);
    
//                 if (roleId === 4) {
//                     navigate('/employee-dashboard', { state: { employeeId: id } });
//                 } else if (roleId === 3) {
//                     navigate('/manager-dashboard');
//                 } else if (roleId === 2) {
//                     navigate('/hr-travel-admin-dashboard');
//                 } else if (roleId === 1) {
//                     navigate('/admin-dashboard');
//                 } else {
//                     setMessage('Access restricted');
//                 }
    
//                 setMessage('Login successful');
//             }
//         } catch (error) {
//             console.error(error);
//             setMessage('Login failed');
//         }
//     };
    
 
//     return (
//         <div className='loginform'>
//             <h1 className='heading'>LOGIN PAGE</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email</label>
//                     <input className='form2'
//                         type="email"
//                         name="Email"
//                         value={formData.Email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input className='form2'
//                         type="password"
//                         name="Password"
//                         value={formData.Password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button className='btn1' type="submit">Login</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };
 
// export default Login;
 


// import React, { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'; // Import jwt-decode library
// import './Login.css';

// const Login = () => {
//     const [formData, setFormData] = useState({ Email: '', Password: '' });
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('https://localhost:7116/api/auth', formData);
//             console.log('Full response data:', response.data);

//             if (response.status === 200) {
//                 const { token } = response.data; // Extract token from response
//                 const decodedToken = jwtDecode(token); // Decode the token using jwt-decode

//                 const { sid: id, role: roleId } = decodedToken; // Extract user ID and role ID
//                 console.log('User ID:', id);
//                 console.log('Role ID:', roleId);

//                 // Navigate based on roleId
//                 if (roleId === 4) {
//                     navigate('/employee-dashboard', { state: { employeeId: id } });
//                 } else if (roleId === 3) {
//                     navigate('/manager-dashboard');
//                 } else if (roleId === 2) {
//                     navigate('/hr-travel-admin-dashboard');
//                 } else if (roleId === 1) {
//                     navigate('/admin-dashboard');
//                 } else {
//                     setMessage('Access restricted');
//                 }

//                 setMessage('Login successful');
//             }
//         } catch (error) {
//             console.error(error);
//             setMessage('Login failed');
//         }
//     };

//     return (
//         <div className='loginform'>
//             <h1 className='heading'>LOGIN PAGE</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email</label>
//                     <input className='form2'
//                         type="email"
//                         name="Email"
//                         value={formData.Email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input className='form2'
//                         type="password"
//                         name="Password"
//                         value={formData.Password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button className='btn1' type="submit">Login</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode library
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ Email: '', Password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7116/api/auth', formData);
            console.log('Full response data:', response.data);

            if (response.status === 200) {
                const { token } = response.data; // Extract token from response
                localStorage.setItem('token', token); // Store the token in local storage



                // Decode the token using jwt-decode
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);

                const id = decodedToken.sid; // Extract user ID
                const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Extract role using correct key
                
                console.log('User ID:', id);
               // console.log('Role:', role);

                // Navigate based on role
                if (role === 'Employee') {
                    navigate('/employee-dashboard', { state: { employeeId: id } });
                } else if (role === 'Manager') {
                    navigate('/manager-dashboard');
                } else if (role === 'HR TravelAdmin') {
                    navigate('/hr-travel-admin-dashboard');
                } else if (role === 'Admin') {
                    navigate('/admin-dashboard');
                } else {
                    setMessage('Access restricted');
                }

                setMessage('Login successful');
            }
        } catch (error) {
            console.error(error);
            setMessage('Login failed');
        }
    };

    return (
        <div className='loginform'>
            <h1 className='heading'>LOGIN PAGE</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        className='form2'
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        className='form2'
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className='btn1' type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
