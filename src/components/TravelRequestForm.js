import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TravelRequestForm.css';
import { useNavigate } from 'react-router-dom';

const TravelRequestForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    reasonForTravelling: '',
    managerId: '',
    projectName: '',
    fromLocation: '',
    toLocation: '',
    fromDate: '',
    toDate: '',
    status: 'Pending',
    name: '',
    comments:'',
  });
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [travelRequests, setTravelRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const navigate = useNavigate();

  const fetchTravelRequests = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7116/api/TravelRequest/user/${userId}`);
      setTravelRequests(response.data);
    } catch (error) {
      console.error('Error fetching travel requests:', error);
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
        const userId = decodedToken.id;
        const name = decodedToken.name;
        const managerId = decodedToken.managerid;

        setFormData(prevData => ({
          ...prevData,
          userId: userId,
          name: name,
          managerId: managerId,
        }));

        fetchTravelRequests(userId);
        setLoading(false);
      } catch (error) {
        console.error('Error decoding token:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAadhaarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('UserId', formData.userId);
    form.append('ReasonForTravelling', formData.reasonForTravelling);
    form.append('ManagerId', formData.managerId);
    form.append('ProjectName', formData.projectName);
    form.append('FromLocation', formData.fromLocation);
    form.append('ToLocation', formData.toLocation);
    form.append('FromDate', formData.fromDate);
    form.append('ToDate', formData.toDate);
    form.append('Status', formData.status);
    form.append('Comments', formData.comments);

    if (aadhaarFile) {
      form.append('AddharCard', aadhaarFile); 
    }

    try {
      if (isEdit) {
        // Update request
        await axios.put(`https://localhost:7116/api/TravelRequest/${currentRequestId}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Travel request updated successfully!');
      } else {
        // Create new request
        await axios.post('https://localhost:7116/api/TravelRequest', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Travel request created successfully!');
      }

      fetchTravelRequests(formData.userId);
      setShowForm(false); 
      setIsEdit(false); // Reset edit mode
      setCurrentRequestId(null); // Reset current request ID
    } catch (error) {
      console.error('Error submitting the travel request:', error);
      alert('Error submitting the travel request.');
    }
  };

  const handleCreateNewRequest = () => {
    setShowForm(true);
    setIsEdit(false);
    setFormData({
      userId: formData.userId,
      reasonForTravelling: '',
      managerId: formData.managerId,
      projectName: '',
      fromLocation: '',
      toLocation: '',
      fromDate: '',
      toDate: '',
      status: 'Pending',
      name: formData.name,
      comments: '',
    });
  };

  const handleEditRequest = (request) => {
    setFormData({
      userId: formData.userId,
      reasonForTravelling: request.reasonForTravelling,
      managerId: formData.managerId,
      projectName: request.projectName,
      fromLocation: request.fromLocation,
      toLocation: request.toLocation,
      fromDate: formatDateForInput(request.fromDate),
      toDate: formatDateForInput(request.toDate),
      status: request.status,
      name: formData.name,
      comments: request.comments || '',
    });
    setCurrentRequestId(request.requestId);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.log('Invalid date received:', dateString);
      return '';
    }
    return date.toISOString().split('T')[0];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.log('Invalid date received:', dateString);
      return 'Invalid Date';
    }
    return date.toLocaleDateString();
  };

  return (
    <div className='travel-request'>
      <header>
         <h1>TravelDesk</h1>
        <div>Welcome, {formData.name}</div>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {!showForm && (
        <button className="createBtn" onClick={handleCreateNewRequest}>
          Create New Travel Request
        </button>
      )}

      {showForm && (

        <form className='travel-form' onSubmit={handleSubmit}>
          <h1>Add TravelRequest</h1>
          <div>
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="managerId">Manager ID:</label>
            <input
              type="number"
              id="managerId"
              name="managerId"
              value={formData.managerId}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="reasonForTravelling">Reason for Travelling:</label>
            <input
              type="text"
              id="reasonForTravelling"
              name="reasonForTravelling"
              value={formData.reasonForTravelling}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="fromLocation">From Location:</label>
            <input
              type="text"
              id="fromLocation"
              name="fromLocation"
              value={formData.fromLocation}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="toLocation">To Location:</label>
            <input
              type="text"
              id="toLocation"
              name="toLocation"
              value={formData.toLocation}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="aadhaarFile">Aadhar Card:</label>
            <input
              type="file"
              id="aadhaarFile"
              name="aadhaarFile"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">
            {isEdit ? 'Update Request' : 'Submit Request'}
          </button>
        </form>
      )}

      <div className='travel-requests-table'>
      <h2>Travel Request History</h2>
        <thead>
            <tr>
              <th>Request ID</th>
              <th className='nameWidth'>Name</th> 
              <th>Reason for Travelling</th>
              <th>Project Name</th>
              <th>From Location</th>
              <th>To Location</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {travelRequests.map(request => (
              <tr key={request.requestId}>
                <td>{request.requestId}</td>
                <td>{formData.name}</td>
                <td>{request.reasonForTravelling}</td>
                <td>{request.projectName}</td>
                <td>{request.fromLocation}</td>
                <td>{request.toLocation}</td>
                <td>{formatDate(request.fromDate)}</td>
                <td>{formatDate(request.toDate)}</td>
                <td>{request.status}</td>
                <td>{request.comments ? request.comments : 'N/A'}</td>
                <td>
                   {request.status === 'Rejected' && (
                   <button className="editBtn" onClick={() => handleEditRequest(request)}>Edit</button>
                 )}
               </td>
              </tr>
            ))}
          </tbody>
        
      </div>
    </div>
  );
};

export default TravelRequestForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './TravelRequestForm.css';
// import { useNavigate } from 'react-router-dom';
// const TravelRequestForm = () => {
//   const [formData, setFormData] = useState({
//     userId: '',
//     reasonForTravelling: '',
//     managerId: '',
//     projectName: '',
//     fromLocation: '',
//     toLocation: '',
//     fromDate: '',
//     toDate: '',
//     status: 'Pending',
//     name: '',
//     comments:'',
//   });
//   const [aadhaarFile, setAadhaarFile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [travelRequests, setTravelRequests] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const navigate = useNavigate();

//   const fetchTravelRequests = async (userId) => {
//     try {
//       const response = await axios.get(`https://localhost:7116/api/TravelRequest/user/${userId}`);
//       setTravelRequests(response.data);
//     } catch (error) {
//       console.error('Error fetching travel requests:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchUserDetails = () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setLoading(false);
//           return;
//         }

//         const decodedToken = JSON.parse(atob(token.split('.')[1]));
//         const userId = decodedToken.id;
//         const name = decodedToken.name;
//         const managerId = decodedToken.managerid;

//         setFormData(prevData => ({
//           ...prevData,
//           userId: userId,
//           name: name,
//           managerId: managerId,
//         }));

//         fetchTravelRequests(userId);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setAadhaarFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('UserId', formData.userId);
//     form.append('ReasonForTravelling', formData.reasonForTravelling);
//     form.append('ManagerId', formData.managerId);
//     form.append('ProjectName', formData.projectName);
//     form.append('FromLocation', formData.fromLocation);
//     form.append('ToLocation', formData.toLocation);
//     form.append('FromDate', formData.fromDate);
//     form.append('ToDate', formData.toDate);
//     form.append('Status', formData.status);
//     form.append('Comments', formData.comments);

//     if (aadhaarFile) {
//       form.append('AddharCard', aadhaarFile); 
//     }

//     try {
//       const response = await axios.post('https://localhost:7116/api/TravelRequest', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Travel request created successfully!');
//       fetchTravelRequests(formData.userId);
//       setShowForm(false); 
//     } catch (error) {
//       console.error('Error submitting the travel request:', error);
//       console.log('Error details:', {
//         userId: formData.userId,
//         reasonForTravelling: formData.reasonForTravelling,
//         managerId: formData.managerId,
//         projectName: formData.projectName,
//         fromLocation: formData.fromLocation,
//         toLocation: formData.toLocation,
//         fromDate: formData.fromDate,
//         toDate: formData.toDate,
//         status: formData.status,
//         aadhaarFile: aadhaarFile ? aadhaarFile.name : null,
      
//       });
//       alert('Error submitting the travel request.');
//     }
//   };

//   const handleCreateNewRequest = () => {
//     setShowForm(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       console.log('Invalid date received:', dateString);
//       return 'Invalid Date';
//     }
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className='travel-request'>
//       <header>
//          <h1>TravelDesk</h1>
//         <div>Welcome, {formData.name}</div>
//         <button onClick={handleLogout}>Logout</button>
//       </header>

//       {!showForm && (
//         <button className="createBtn" onClick={handleCreateNewRequest}>
//           Create New Travel Request
//         </button>
//       )}

//       {showForm && (
//         <form className='travel-form' onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="userId">User ID:</label>
//             <input
//               type="text"
//               id="userId"
//               name="userId"
//               value={formData.userId}
//               onChange={handleChange}
//               readOnly
//             />
//           </div>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               readOnly
//             />
//           </div>
//           <div>
//             <label htmlFor="managerId">Manager ID:</label>
//             <input
//               type="number"
//               id="managerId"
//               name="managerId"
//               value={formData.managerId}
//               onChange={handleChange}
//               readOnly
//             />
//           </div>
//           <div>
//             <label htmlFor="reasonForTravelling">Reason for Travelling:</label>
//             <input
//               type="text"
//               id="reasonForTravelling"
//               name="reasonForTravelling"
//               value={formData.reasonForTravelling}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="projectName">Project Name:</label>
//             <input
//               type="text"
//               id="projectName"
//               name="projectName"
//               value={formData.projectName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="fromLocation">From Location:</label>
//             <input
//               type="text"
//               id="fromLocation"
//               name="fromLocation"
//               value={formData.fromLocation}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="toLocation">To Location:</label>
//             <input
//               type="text"
//               id="toLocation"
//               name="toLocation"
//               value={formData.toLocation}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="fromDate">From Date:</label>
//             <input
//               type="date"
//               id="fromDate"
//               name="fromDate"
//               value={formData.fromDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="toDate">To Date:</label>
//             <input
//               type="date"
//               id="toDate"
//               name="toDate"
//               value={formData.toDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="aadhaarFile">Aadhaar Card:</label>
//             <input
//               type="file"
//               id="aadhaarFile"
//               name="aadhaarFile"
//               onChange={handleFileChange}
//             />
//           </div>
//           <button type="submit">Submit Request</button>
//         </form>
//       )}

//       <h2>Travel Request History</h2>

//       <table className='travel-requests-table'>
//         <thead>
//           <tr>
//             <th>Request ID</th>
//             <th>Name</th> 
//             <th>Project Name</th>
//             <th>From Location</th>
//             <th>To Location</th>
//             <th>From Date</th>
//             <th>To Date</th>
//             <th>Status</th>
//             <th>Comments</th>
//             <th>Actions</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {travelRequests.map(request => (
//             <tr key={request.requestId}>
//               <td>{request.requestId}</td>
//               <td>{formData.name}</td>
//               <td>{request.projectName}</td>
//               <td>{request.fromLocation}</td>
//               <td>{request.toLocation}</td>
//               <td>{formatDate(request.fromDate)}</td>
//               <td>{formatDate(request.toDate)}</td>
//               <td>{request.status}</td>
//               <td>{request.comments ? request.comments : 'N/A'}</td>
//               <td>
//                 {/* {request.status === 'Rejected' && (
//                   <button onClick={() => handleEditRequest(request)}>Edit</button>
//                 )} */}
//               </td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TravelRequestForm;


