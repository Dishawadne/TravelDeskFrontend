import React from 'react';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="text-content">
          <h1>Welcome to Travel Desk</h1>
          <p>We are a fully integrated, programmatic media services team powered by an ad tech hub with one focus: reaching travelers across the globe. Leveraging proprietary data relationships and travel industry experience, TravelDesk empowers advertisers by seamlessly integrating high-impact ad formats with targeted data strategies to deliver maximum campaign effectiveness and efficiency.</p>
        </div>
        <div className="image-content">
          <img src="/images/image1.jpg" alt="Travel by Travel Desk" />
        </div>
      </div>
    </div>
  );
};

export default Home;