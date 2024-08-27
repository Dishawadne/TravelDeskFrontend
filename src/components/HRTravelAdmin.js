import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HRTravelAdmin.css';

const HRTravelAdmin = () => {
    const [travelRequests, setTravelRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(''); // State for storing user's name
    const Navigate = useNavigate();

    const fetchTravelRequests = async () => {
        try {
            const response = await axios.get('https://localhost:7116/api/TravelAdmin/GetAllRequests');
            console.log('API Response:', response.data);

            if (Array.isArray(response.data)) {
                setTravelRequests(response.data);
            } else {
                console.error('Unexpected data format:', response.data);
                setTravelRequests([]);
            }
        } catch (error) {
            console.error('Error fetching travel requests:', error);
            setTravelRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserDetails = () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const name = decodedToken.name;

                setUserName(name); // Set the user's name in the state
            } catch (error) {
                console.error('Error decoding token:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
        fetchTravelRequests();
    }, []);

    const handleBooking = async (id) => {
        try {
            const bookingDetails = {
                comments: 'Booking confirmed',
                ticketUrl: 'http://example.com/ticket'
            };

            await axios.post(`https://localhost:7116/api/TravelAdmin/BookTicket/${id}`, bookingDetails);
            alert('Ticket booked successfully!');
            await fetchTravelRequests(); // Refresh the list
        } catch (error) {
            console.error('Error booking ticket:', error.response ? error.response.data : error.message);
            alert('Failed to book ticket.');
        }
    };

    const handleReturnToManager = async (id) => {
        try {
            const comments = 'Returning to manager for review';

            await axios.post(`https://localhost:7116/api/TravelAdmin/ReturnToManager/${id}`, { comments });
            alert('Request returned to manager successfully!');
            await fetchTravelRequests(); // Refresh the list
        } catch (error) {
            console.error('Error returning request to manager:', error.response ? error.response.data : error.message);
            alert('Failed to return request to manager.');
        }
    };

    const handleReturnToEmployee = async (id) => {
        try {
            const comments = 'Returning request to employee for more information';

            await axios.post(`https://localhost:7116/api/TravelAdmin/ReturnToEmployee/${id}`, { comments });
            alert('Request returned to employee successfully!');
            await fetchTravelRequests(); // Refresh the list
        } catch (error) {
            console.error('Error returning request to employee:', error.response ? error.response.data : error.message);
            alert('Failed to return request to employee.');
        }
    };

    const handleCloseRequest = async (id) => {
        try {
            const comments = 'Request completed';

            await axios.post(`https://localhost:7116/api/TravelAdmin/CloseRequest/${id}`, { comments });
            alert('Request closed successfully!');
            await fetchTravelRequests(); // Refresh the list
        } catch (error) {
            console.error('Error closing request:', error.response ? error.response.data : error.message);
            alert('Failed to close request.');
        }
    };

    const handleLogout = () => {
        Navigate('/login');
    };

    return (
        <div className='traveladmin-dashboard'>
            <header>
                <h1>TravelDesk</h1>
                <h2>Welcome, {userName}</h2> {/* Display the correct user name */}
                <button className='button' onClick={handleLogout}>Logout</button>
            </header>
            <h1>Travel Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>RequestID</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Project name</th>
                            <th>Reason for Travel</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>From Location</th>
                            <th>To Location</th>
                            <th>Comments</th>
                            <th>Ticket URL</th>
                            <th>Status</th>
                            <th className='width'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travelRequests.length > 0 ? (
                            travelRequests.map((request) => (
                                <tr key={request.requestId}>
                                    <td>{request.requestId}</td>
                                    <td>{request.userId}</td>
                                    <td>{request.user?.firstName} {request.user?.lastName || ''}</td>
                                    <td>{request.projectName}</td>
                                    <td>{request.reasonForTravelling}</td>
                                    <td>{new Date(request.fromDate).toLocaleDateString()}</td>
                                    <td>{new Date(request.toDate).toLocaleDateString()}</td>
                                    <td>{request.fromLocation}</td>
                                    <td>{request.toLocation}</td>
                                    <td>{request.comments ? request.comments : 'N/A'}</td>
                                    <td>
                                        {request.ticketUrl ? (
                                            <a href={request.ticketUrl} target="_blank" rel="noopener noreferrer">View Ticket</a>
                                        ) : 'N/A'}
                                    </td>
                                    <td>{request.status}</td>
                                    <td>
                                        {request.status === 6 ? (
                                            <span>No actions available</span>
                                        ) : (
                                            <>
                                                {request.status === 3 ? (
                                                    <button className="close-button" onClick={() => handleCloseRequest(request.requestId)}>Close Request</button>
                                                ) : (
                                                    <>
                                                        <button className="book-button" onClick={() => handleBooking(request.requestId)}>Book Ticket</button>
                                                        <button className="return-manager-button" onClick={() => handleReturnToManager(request.requestId)}>Return to Manager</button>
                                                        <button className="return-employee-button" onClick={() => handleReturnToEmployee(request.requestId)}>Return to Employee</button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13">No travel requests available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HRTravelAdmin;
