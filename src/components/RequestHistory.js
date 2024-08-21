// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const RequestHistory = () => {
//     const [requests, setRequests] = useState([]);
//     const employeeId = 1; // Replace with dynamic employee ID based on logged-in user

//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 const response = await axios.get(`/api/TravelRequest/${employeeId}/history`);
//                 setRequests(response.data);
//             } catch (error) {
//                 console.error('Error fetching request history:', error);
//             }
//         };

//         fetchHistory();
//     }, [employeeId]);

//     const handleSubmitForApproval = async (requestId) => {
//         try {
//             await axios.post(`/api/TravelRequest/${requestId}/submit`);
//             alert('Request submitted for approval.');
//         } catch (error) {
//             console.error('Error submitting request for approval:', error);
//         }
//     };

//     const handleDeleteRequest = async (requestId) => {
//         try {
//             await axios.delete(`/api/TravelRequest/${requestId}`);
//             setRequests(requests.filter(request => request.travelRequestId !== requestId));
//             alert('Request deleted successfully.');
//         } catch (error) {
//             console.error('Error deleting request:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Your Travel Requests</h2>
//             <ul>
//                 {requests.map(request => (
//                     <li key={request.travelRequestId}>
//                         <p>Request ID: {request.travelRequestId}</p>
//                         <p>Reason: {request.reasonForTravel}</p>
//                         <p>Status: {request.status}</p>
//                         <button onClick={() => handleSubmitForApproval(request.travelRequestId)}>
//                             Submit for Approval
//                         </button>
//                         <button onClick={() => handleDeleteRequest(request.travelRequestId)}>
//                             Delete Request
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default RequestHistory;


import React, { useEffect, useState } from 'react';

const RequestHistory = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch("https://localhost:7116/api/TravelRequest");
                if (response.ok) {
                    const data = await response.json();
                    setRequests(data);
                } else {
                    setError("Failed to fetch request history");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div>
            <h2>Request History</h2>
            {error && <p>{error}</p>}
            <ul>
                {requests.map((request) => (
                    <li key={request.travelRequestId}>
                        <p>Request ID: {request.travelRequestId}</p>
                        <p>Employee ID: {request.employeeId}</p>
                        <p>Reason for Travelling: {request.reasonForTravelling}</p>
                        <p>Status: {request.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RequestHistory;
