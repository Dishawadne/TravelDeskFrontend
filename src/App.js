// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './components/AdminDashboard';

import HRTravelAdminDashboard from './components/HRTravelAdmin';
import ManagerDashboard from './components/ManagerDashboard';
import './App.css';



import TravelRequestForm from './components/TravelRequestForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
         
          <Route path="/login" element={<Login />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-dashboard" element={<TravelRequestForm />} />
          <Route path="/hr-travel-admin-dashboard" element={<HRTravelAdminDashboard/>} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
