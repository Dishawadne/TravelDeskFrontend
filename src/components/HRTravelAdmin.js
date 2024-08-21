import React, { useState } from 'react';

const HRTravelAdminDashboard = () => {
  const [comments, setComments] = useState('');

  const handleCommentChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log('Submitted Comments:', comments);
  };

  return (
    <div>
      <h1>HR Travel Admin Dashboard</h1>
      <textarea
        value={comments}
        onChange={handleCommentChange}
        placeholder="Enter your comments"
      />
      <button onClick={handleSubmit}>Submit</button>
      {/* Add other components and logic as needed */}
    </div>
  );
};

export default HRTravelAdminDashboard;
