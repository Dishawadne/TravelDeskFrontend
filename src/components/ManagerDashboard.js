import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get('https://api.example.com/manager/requests');
      setRequests(response.data);
    };
    fetchRequests();
  }, []);

  const handleAction = (id, action, comments) => {
    axios.post(`https://api.example.com/requests/${id}/${action}`, { comments })
      .then(() => {
      })
      .catch(err => {
      });
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      {requests.map((request) => (
        <div key={request.id}>
          <p>Request ID: {request.id}</p>
          <p>Status: {request.status}</p>
          <textarea
            placeholder="Comments"
          />
          <button onClick={() => handleAction(request.id, 'approve')}>Approve</button>
          <button onClick={() => handleAction(request.id, 'disapprove')}>Disapprove</button>
          <button onClick={() => handleAction(request.id, 'return')}>Return to Employee</button>
        </div>
      ))}
    </div>
  );
};

export default ManagerDashboard;
