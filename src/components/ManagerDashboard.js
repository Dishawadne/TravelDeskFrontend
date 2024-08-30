import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [managerName, setManagerName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const managerId = getLoggedInManagerId();
        if (managerId) {
            fetchRequests();
        }
    }, []);

    const fetchRequests = async () => {
        try {
            const managerId = getLoggedInManagerId();
            if (!managerId) {
                setError('Manager ID not found');
                return;
            }

            const response = await axios.get(`https://localhost:7116/api/TravelRequest/manager/${managerId}`);
            setRequests(response.data);
        } catch (err) {
            setError('Failed to fetch requests');
            console.error(err);
        }
    };

    const getLoggedInManagerId = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            return null;
        }

        try {
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);

            const managerId = decodedToken.id;
            const name = decodedToken.name || decodedToken.fullName || decodedToken.username || ''; 
            

            setManagerName(name); 
            return managerId ? parseInt(managerId) : null;
        } catch (error) {
            console.error('Failed to decode token', error);
            return null;
        }
    };

    const handleRequestAction = async (requestId, action) => {
        try {
            const comments = prompt('Enter comments:');
            if (!comments) return;

            const requestData = JSON.stringify({ comments: comments });

            await axios.post(`https://localhost:7116/api/TravelRequest/${requestId}/${action}`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            fetchRequests();
        } catch (err) {
            setError('Failed to update request');
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className='manager-table'>
            <header>
                <h1>TravelDesk</h1>
                <div>Welcome, {managerName}</div> {/* Display the manager's name */}
                <button onClick={handleLogout}>Logout</button>
            </header>
            <h1>Manager Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Name</th>
                        <th>Reason</th>
                        <th>Project Name</th>
                        <th>From Location</th>
                        <th>To Location</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Comments</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length > 0 ? (
                        requests.map(request => (
                            <tr key={request.requestId}>
                                <td>{request.requestId}</td>
                                <td>{request.userName}</td> 
                                <td>{request.reasonForTravelling}</td>
                                <td>{request.projectName}</td>
                                <td>{request.fromLocation}</td>
                                <td>{request.toLocation}</td>
                                <td>{new Date(request.fromDate).toLocaleDateString()}</td>
                                <td>{new Date(request.toDate).toLocaleDateString()}</td>
                                <td>{request.comments ? request.comments : 'N/A'}</td>
                                <td>{request.status}</td>
                                <td>
                                    <button className="approve" onClick={() => handleRequestAction(request.requestId, 'approve')}>Approve</button>
                                    <button className="reject" onClick={() => handleRequestAction(request.requestId, 'reject')}>Reject</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No requests available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManagerDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'; // Use the correct import for jwt-decode
// import { useNavigate } from 'react-router-dom';
// import './ManagerDashboard.css';

// const ManagerDashboard = () => {
//     const [requests, setRequests] = useState([]);
//     const [error, setError] = useState(null);
//     const [managerName, setManagerName] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchTravelRequests();
//     }, []);

//     const fetchTravelRequests = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setError('No token found');
//                 return;
//             }

//             const decodedToken = jwtDecode(token);
//             const managerId = decodedToken.managerid;
//             const managerName = decodedToken.name;

//             setManagerName(managerName);

//             if (!managerId) {
//                 setError('Manager ID not found');
//                 return;
//             }

//             const response = await axios.get(`https://localhost:7116/api/TravelRequest/manager/${managerId}`);
//             setRequests(response.data);
//         } catch (err) {
//             setError('Failed to fetch requests');
//             console.error(err);
//         }
//     };

//     const handleRequestAction = async (requestId, action) => {
//         try {
//             const comments = prompt('Enter comments:');
//             if (!comments) return;

//             const requestData = JSON.stringify({ comments });

//             await axios.post(`https://localhost:7116/api/TravelRequest/${requestId}/${action}`, requestData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             fetchTravelRequests();
//         } catch (err) {
//             setError('Failed to update request');
//             console.error(err);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/');
//     };

//     return (
//         <div className='manager-table'>
//             <header>
//                 <h1>TravelDesk</h1>
//                 <div>Welcome, {managerName}</div> {/* Display the manager's name */}
//                 <button onClick={handleLogout}>Logout</button>
//             </header>
//             <h1>Manager Dashboard</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Request ID</th>
//                         <th>Name</th>
//                         <th>Reason</th>
//                         <th>Project Name</th>
//                         <th>From Location</th>
//                         <th>To Location</th>
//                         <th>From Date</th>
//                         <th>To Date</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {requests.length > 0 ? (
//                         requests.map(request => (
//                             <tr key={request.requestId}>
//                                 <td>{request.requestId}</td>
//                                 <td>{request.userName}</td> {/* Display user name from response */}
//                                 <td>{request.reasonForTravelling}</td>
//                                 <td>{request.projectName}</td>
//                                 <td>{request.fromLocation}</td>
//                                 <td>{request.toLocation}</td>
//                                 <td>{new Date(request.fromDate).toLocaleDateString()}</td>
//                                 <td>{new Date(request.toDate).toLocaleDateString()}</td>
//                                 <td>{request.status}</td>
//                                 <td>
//                                     <button className="approve" onClick={() => handleRequestAction(request.requestId, 'approve')}>Approve</button>
//                                     <button className="reject" onClick={() => handleRequestAction(request.requestId, 'reject')}>Reject</button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="10">No requests available</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ManagerDashboard;
