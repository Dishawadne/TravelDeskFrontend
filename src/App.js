import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './components/AdminDashboard';
import TravelRequestForm from './components/TravelRequestForm';
import HRTravelAdminDashboard from './components/HRTravelAdmin';
 
import ManagerDashboard from './components/ManagerDashboard';
import './App.css';
 
 
const App = () => {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
         
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-dashboard" element={<TravelRequestForm />}/>
          <Route path="/hr-travel-admin-dashboard" element={<HRTravelAdminDashboard/>} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};
 
export default App;