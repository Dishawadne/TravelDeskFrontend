import React from 'react';
import './Home.css'; // Ensure this file exists and is in the same directory

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-content">
        <h1>Welcome to Travel Desk</h1>
        <p>We are a fully integrated, programmatic media services team powered by an ad tech hub with one focus: reaching travelers across the globle. Leveraging proprietary data relationships and travel industry experience, TravelDesk empowers advertisers by seamlessly integrating high-impact ad formats with targeted data strategies to deliver maximum campaign effectiveness and efficiency.</p>
      </div>
      <div className="image-content">
        <img src="/images/image1.jpg" alt="Travel by Travel Desk" />
      </div>
    </div>
  );
};

export default Home;
