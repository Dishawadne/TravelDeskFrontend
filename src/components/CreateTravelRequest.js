// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateTravelRequest = () => {
//     const [employeeId, setEmployeeId] = useState('');
//     const [reasonForTravel, setReasonForTravel] = useState('');
//     const [typeOfBooking, setTypeOfBooking] = useState('');
//     const [documents, setDocuments] = useState([]);

//     const handleDocumentChange = (e) => {
//         setDocuments(e.target.files);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('employeeId', employeeId);
//         formData.append('reasonForTravel', reasonForTravel);
//         formData.append('typeOfBooking', typeOfBooking);

//         for (let i = 0; i < documents.length; i++) {
//             formData.append('documents', documents[i]);
//         }

//         try {
//             const response = await axios.post('/api/TravelRequest', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             alert('Travel request created successfully!');
//         } catch (error) {
//             console.error('Error creating travel request:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Create Travel Request</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Employee ID:</label>
//                     <input
//                         type="text"
//                         value={employeeId}
//                         onChange={(e) => setEmployeeId(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Reason for Travel:</label>
//                     <textarea
//                         value={reasonForTravel}
//                         onChange={(e) => setReasonForTravel(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Type of Booking:</label>
//                     <input
//                         type="text"
//                         value={typeOfBooking}
//                         onChange={(e) => setTypeOfBooking(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Documents:</label>
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleDocumentChange}
//                     />
//                 </div>
//                 <button type="submit">Create Request</button>
//             </form>
//         </div>
//     );
// };

// export default CreateTravelRequest;


import React from 'react';

import EmployeeDashboard from './EmployeeDashboard';

const CreateTravelRequest = () => {
    return (
        <div>
            <h2>Create Travel Request</h2>
            <EmployeeDashboard />
        </div>
    );
}

export default CreateTravelRequest;
