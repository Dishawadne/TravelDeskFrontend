import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
    const [employeeData, setEmployeeData] = useState({
        employeeName: '',
        employeeId: '',
        departmentName: '',
        projectName: '',
        reasonForTraveling: '',
        airBooking: {
            bookingDate: '',
            flightType: '',
            aadharCardNumber: '',
            passportNumber: '',
            passportFile: null,
            visaFile: null
        },
        hotelBooking: {
            bookingDate: '',
            daysOfStay: '',
            mealRequired: '',
            mealPreference: ''
        }
    });
    useEffect(() => {
        const fetchEmployeeData = async () => {
            if (!employeeData.employeeId) {
                console.log("No employee ID provided.");
                return;
            }
    
            try {
                const response = await axios.get('https://localhost:7116/api/Employee');
                console.log('API Response:', response.data); // This should be an array of employees
    
                const selectedEmployee = response.data.find(emp => emp.employeeId === employeeData.employeeId);
                if (selectedEmployee) {
                    setEmployeeData(selectedEmployee);
                } else {
                    console.error('Employee not found');
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
    
        fetchEmployeeData();
    }, [employeeData.employeeId]); 
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');

        if (section && field) {
            setEmployeeData((prevState) => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [field]: value
                }
            }));
        } else {
            setEmployeeData({
                ...employeeData,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const [section, field] = name.split('.');

        setEmployeeData((prevState) => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [field]: files[0]
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('employeeName', employeeData.employeeName);
        formData.append('projectName', employeeData.projectName);
        formData.append('departmentName', employeeData.departmentName);
        formData.append('reasonForTraveling', employeeData.reasonForTraveling);
        formData.append('airBooking.bookingDate', employeeData.airBooking.bookingDate);
        formData.append('airBooking.flightType', employeeData.airBooking.flightType);
        formData.append('airBooking.aadharCardNumber', employeeData.airBooking.aadharCardNumber);
        formData.append('airBooking.passportNumber', employeeData.airBooking.passportNumber);
        if (employeeData.airBooking.passportFile) {
            formData.append('airBooking.passportFile', employeeData.airBooking.passportFile);
        }
        if (employeeData.airBooking.visaFile) {
            formData.append('airBooking.visaFile', employeeData.airBooking.visaFile);
        }
        formData.append('hotelBooking.bookingDate', employeeData.hotelBooking.bookingDate);
        formData.append('hotelBooking.daysOfStay', employeeData.hotelBooking.daysOfStay);
        formData.append('hotelBooking.mealRequired', employeeData.hotelBooking.mealRequired);
        formData.append('hotelBooking.mealPreference', employeeData.hotelBooking.mealPreference);

        try {
            const response = await axios.post('https://localhost:7116/api/Employee/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Employee information uploaded successfully!');
        } catch (error) {
            console.error('Error uploading employee information:', error);
        }
    };

    return (
        <div>
            <h2>Employee Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee Name:</label>
                    <input
                        type="text"
                        name="employeeName"
                        value={employeeData.employeeName}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>

                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={employeeData.employeeId}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>

                <div>
                    <label>Department Name:</label>
                    <input
                        type="text"
                        name="departmentName"
                        value={employeeData.departmentName}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>

                <div>
                    <label>Project Name:</label>
                    <input
                        type="text"
                        name="projectName"
                        value={employeeData.projectName}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Reason for Traveling:</label>
                    <input
                        type="text"
                        name="reasonForTraveling"
                        value={employeeData.reasonForTraveling}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <h3>Air Booking Information</h3>

                    <label>Booking Date:</label>
                    <input
                        type="date"
                        name="airBooking.bookingDate"
                        value={employeeData.airBooking?.bookingDate || ''}
                        onChange={handleInputChange}
                    />

                    <label>Flight Type:</label>
                    <input
                        type="text"
                        name="airBooking.flightType"
                        value={employeeData.airBooking?.flightType || ''}
                        onChange={handleInputChange}
                    />

                    <label>Aadhar Card Number:</label>
                    <input
                        type="text"
                        name="airBooking.aadharCardNumber"
                        value={employeeData.airBooking?.aadharCardNumber || ''}
                        onChange={handleInputChange}
                    />

                    <label>Passport Number:</label>
                    <input
                        type="text"
                        name="airBooking.passportNumber"
                        value={employeeData.airBooking?.passportNumber || ''}
                        onChange={handleInputChange}
                    />

                    <label>Passport File:</label>
                    <input
                        type="file"
                        name="airBooking.passportFile"
                        onChange={handleFileChange}
                    />

                    <label>Visa File:</label>
                    <input
                        type="file"
                        name="airBooking.visaFile"
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <h3>Hotel Booking Information</h3>

                    <label>Booking Date:</label>
                    <input
                        type="date"
                        name="hotelBooking.bookingDate"
                        value={employeeData.hotelBooking?.bookingDate || ''}
                        onChange={handleInputChange}
                    />

                    <label>Days of Stay:</label>
                    <input
                        type="number"
                        name="hotelBooking.daysOfStay"
                        value={employeeData.hotelBooking?.daysOfStay || ''}
                        onChange={handleInputChange}
                    />

                    <label>Meal Required:</label>
                    <input
                        type="checkbox"
                        name="hotelBooking.mealRequired"
                        checked={employeeData.hotelBooking?.mealRequired || false}
                        onChange={handleInputChange}
                    />

                    <label>Meal Preference:</label>
                    <input
                        type="text"
                        name="hotelBooking.mealPreference"
                        value={employeeData.hotelBooking?.mealPreference || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EmployeeDashboard;







// import React, { useState } from "react";

// const EmployeeDashboard = () => {
//     const [formData, setFormData] = useState({
//         employeeId: "",
//         employeeName: "",
//         projectName: "",
//         departmentName: "",
//         reasonForTravelling: "",
//         typeOfBooking: "", // Default selection
//         domesticOrInternational: "",
//         aadharCard: "",
//         passportNumber: "",
//         passportFile: null,
//         visaFile: null,
//         date: "",
//         daysOfStay: "",
//         mealRequired: "",
//         mealPreference: "",
//     });

//     const [message, setMessage] = useState("");

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         const { name } = e.target;
//         setFormData({ ...formData, [name]: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const requestData = new FormData();
//         for (const key in formData) {
//             requestData.append(key, formData[key]);
//         }

//         try {
//             const response = await fetch("https://localhost:7116/api/TravelRequest", {
//                 method: "POST",
//                 body: requestData,
//             });

//             if (response.ok) {
//                 setMessage("Travel request submitted successfully");
//                 setFormData({
//                     employeeId: "",
//                     employeeName: "",
//                     projectName: "",
//                     departmentName: "",
//                     reasonForTravelling: "",
//                     typeOfBooking: "",
//                     domesticOrInternational: "",
//                     aadharCard: "",
//                     passportNumber: "",
//                     passportFile: null,
//                     visaFile: null,
//                     date: "",
//                     daysOfStay: "",
//                     mealRequired: "",
//                     mealPreference: "",
//                 });
//             } else {
//                 const errorData = await response.json();
//                 setMessage(`Error: ${errorData.message}`);
//             }
//         } catch (error) {
//             setMessage(`Error: ${error.message}`);
//         }
//     };

//     const renderFlightFields = () => {
//         return (
//             <>
//                 {formData.domesticOrInternational === "Domestic" && (
//                     <>
//                         <label>Aadhar Card:</label>
//                         <input
//                             type="text"
//                             name="aadharCard"
//                             value={formData.aadharCard}
//                             onChange={handleInputChange}
//                             required
//                         />

//                         <label>Date:</label>
//                         <input
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </>
//                 )}

//                 {formData.domesticOrInternational === "International" && (
//                     <>
//                         <label>Passport Number:</label>
//                         <input
//                             type="text"
//                             name="passportNumber"
//                             value={formData.passportNumber}
//                             onChange={handleInputChange}
//                             required
//                         />

//                         <label>Upload Passport File:</label>
//                         <input
//                             type="file"
//                             name="passportFile"
//                             onChange={handleFileChange}
//                             required
//                         />

//                         <label>Upload Visa File:</label>
//                         <input
//                             type="file"
//                             name="visaFile"
//                             onChange={handleFileChange}
//                             required
//                         />

//                         <label>Date:</label>
//                         <input
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleInputChange}
//                             required
//                         />

//                         <label>Aadhar Card:</label>
//                         <input
//                             type="text"
//                             name="aadharCard"
//                             value={formData.aadharCard}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </>
//                 )}
//             </>
//         );
//     };

//     const renderHotelFields = () => {
//         return (
//             <>
//                 <label>Date:</label>
//                 <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     required
//                 />

//                 <label>Days of Stay:</label>
//                 <input
//                     type="number"
//                     name="daysOfStay"
//                     value={formData.daysOfStay}
//                     onChange={handleInputChange}
//                     required
//                 />

//                 <label>Meal Required:</label>
//                 <select
//                     name="mealRequired"
//                     value={formData.mealRequired}
//                     onChange={handleInputChange}
//                     required
//                 >
//                     <option value="Lunch">Lunch</option>
//                     <option value="Dinner">Dinner</option>
//                     <option value="Both">Both</option>
//                 </select>

//                 <label>Meal Preference:</label>
//                 <select
//                     name="mealPreference"
//                     value={formData.mealPreference}
//                     onChange={handleInputChange}
//                     required
//                 >
//                     <option value="Veg">Veg</option>
//                     <option value="Non-Veg">Non-Veg</option>
//                 </select>
//             </>
//         );
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>Employee ID:</label>
//             <input
//                 type="text"
//                 name="employeeId"
//                 value={formData.employeeId}
//                 onChange={handleInputChange}
//                 required
//             />

//             <label>Employee Name:</label>
//             <input
//                 type="text"
//                 name="employeeName"
//                 value={formData.employeeName}
//                 onChange={handleInputChange}
//                 required
//             />

//             <label>Project Name:</label>
//             <input
//                 type="text"
//                 name="projectName"
//                 value={formData.projectName}
//                 onChange={handleInputChange}
//                 required
//             />

//             <label>Department Name:</label>
//             <input
//                 type="text"
//                 name="departmentName"
//                 value={formData.departmentName}
//                 onChange={handleInputChange}
//                 required
//             />

//             <label>Reason for Travelling:</label>
//             <input
//                 type="text"
//                 name="reasonForTravelling"
//                 value={formData.reasonForTravelling}
//                 onChange={handleInputChange}
//                 required
//             />

//             <label>Type of Booking:</label>
//             <select
//                 name="typeOfBooking"
//                 value={formData.typeOfBooking}
//                 onChange={handleInputChange}
//                 required
//             >
//                 <option value="Air Ticket">Air Ticket</option>
//                 <option value="Hotel">Hotel</option>
//                 <option value="Air Ticket + Hotel">Air Ticket + Hotel</option>
//             </select>

//             {(formData.typeOfBooking === "Air Ticket" || formData.typeOfBooking === "Air Ticket + Hotel") && (
//                 <>
//                     <label>Domestic or International:</label>
//                     <select
//                         name="domesticOrInternational"
//                         value={formData.domesticOrInternational}
//                         onChange={handleInputChange}
//                         required
//                     >
//                         <option value="Domestic">Domestic</option>
//                         <option value="International">International</option>
//                     </select>

//                     {renderFlightFields()}
//                 </>
//             )}

//             {(formData.typeOfBooking === "Hotel" || formData.typeOfBooking === "Air Ticket + Hotel") && (
//                 renderHotelFields()
//             )}

//             <button type="submit">Submit Request</button>
//             {message && <p>{message}</p>}
//         </form>
//     );
// };

// export default EmployeeDashboard;


// import React, { useState, useEffect } from "react";

// const EmployeeDashboard = () => {
//     const [formData, setFormData] = useState({
//         employeeId: "",
//         employeeName: "",
//         projectName: "",
//         departmentName: "",
//         reasonForTravelling: "",
//         typeOfBooking: "", // Default selection
//         domesticOrInternational: "",
//         aadharCard: "",
//         passportNumber: "",
//         passportFile: null,
//         visaFile: null,
//         date: "",
//         daysOfStay: "",
//         mealRequired: "",
//         mealPreference: "",
//     });

//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await fetch('https://localhost:7116/api/User'); 
//                 const userData = await response.json();
//                 setFormData({
//                     ...formData,
//                     employeeId: userData.id,
//                     employeeName: `${userData.firstName} ${userData.lastName}`,
//                     departmentName: userData.departmentName,
//                 });
//             } catch (error) {
//                 console.error("Error fetching user data", error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         const { name } = e.target;
//         setFormData({ ...formData, [name]: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const requestData = new FormData();
//         for (const key in formData) {
//             requestData.append(key, formData[key]);
//         }

//         try {
//             const response = await fetch("https://localhost:7116/api/TravelRequest", {
//                 method: "POST",
//                 body: requestData,
//             });

//             if (response.ok) {
//                 setMessage("Travel request submitted successfully");
//                 setFormData({
//                     employeeId: "",
//                     employeeName: "",
//                     projectName: "",
//                     departmentName: "",
//                     reasonForTravelling: "",
//                     typeOfBooking: "",
//                     domesticOrInternational: "",
//                     aadharCard: "",
//                     passportNumber: "",
//                     passportFile: null,
//                     visaFile: null,
//                     date: "",
//                     daysOfStay: "",
//                     mealRequired: "",
//                     mealPreference: "",
//                 });
//             } else {
//                 const errorData = await response.json();
//                 setMessage(`Error: ${errorData.message}`);
//             }
//         } catch (error) {
//             setMessage(`Error: ${error.message}`);
//         }
//     };

//     const renderFlightFields = () => {
//         return (
//             <>
//                 {formData.domesticOrInternational === "Domestic" && (
//                     <>
//                         <label>Aadhar Card:</label>
//                         <input
//                             type="text"
//                             name="aadharCard"
//                             value={formData.aadharCard}
//                             onChange={handleInputChange}
//                             required
//                         />

//                         <label>Date:</label>
//                         <input
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </>
//                 )}

//                 {formData.domesticOrInternational === "International" && (
//                     <>
//                         <label>Passport Number:</label>
//                         <input
//                             type="text"
//                             name="passportNumber"
//                             value={formData.passportNumber}
//                             onChange={handleInputChange}
//                             required
//                         />

//                         <label>Upload Passport File:</label>
//                         <input
//                             type="file"
//                             name="passportFile"
//                             onChange={handleFileChange}
//                             required
//                         />

//                         <label>Upload Visa File:</label>
//                         <input
//                             type="file"
//                             name="visaFile"
//                             onChange={handleFileChange}
//                             required
//                         />

//                         <label>Date:</label>
//                         <input
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleInputChange}
//                             required
//                         />

//                         <label>Aadhar Card:</label>
//                         <input
//                             type="text"
//                             name="aadharCard"
//                             value={formData.aadharCard}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </>
//                 )}
//             </>
//         );
//     };

//     const renderHotelFields = () => {
//         return (
//             <>
//                 <label>Date:</label>
//                 <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     required
//                 />

//                 <label>Days of Stay:</label>
//                 <input
//                     type="number"
//                     name="daysOfStay"
//                     value={formData.daysOfStay}
//                     onChange={handleInputChange}
//                     required
//                 />

//                 <label>Meal Required:</label>
//                 <select
//                     name="mealRequired"
//                     value={formData.mealRequired}
//                     onChange={handleInputChange}
//                     required
//                 >
//                     <option value="Lunch">Lunch</option>
//                     <option value="Dinner">Dinner</option>
//                     <option value="Both">Both</option>
//                 </select>

//                 <label>Meal Preference:</label>
//                 <select
//                     name="mealPreference"
//                     value={formData.mealPreference}
//                     onChange={handleInputChange}
//                     required
//                 >
//                     <option value="Veg">Veg</option>
//                     <option value="Non-Veg">Non-Veg</option>
//                 </select>
//             </>
//         );
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>Employee ID:</label>
//             <input
//                 type="text"
//                 name="employeeId"
//                 value={formData.employeeId}
//                 onChange={handleInputChange}
//                 required
//                 readOnly
//             />

//             <label>Employee Name:</label>
//             <input
//                 type="text"
//                 name="employeeName"
//                 value={formData.employeeName}
//                 onChange={handleInputChange}
//                 required
//                 readOnly
//             />

//             <label>Project Name:</label>
//             <input
//                 type="text"
//                 name="projectName"
//                 value={formData.projectName}
//                 onChange={handleInputChange}
//                 required
//             />

//             <label>Department Name:</label>
//             <input
//                 type="text"
//                 name="departmentName"
//                 value={formData.departmentName}
//                 onChange={handleInputChange}
//                 required
//                 readOnly
//             />

//             <label>Reason for Travelling:</label>
//             <input
//                 type="text"
//                 name="reasonForTravelling"
//                 value={formData.reasonForTravelling}
//                 onChange={handleInputChange}
//                 required
//             />

//             <label>Type of Booking:</label>
//             <select
//                 name="typeOfBooking"
//                 value={formData.typeOfBooking}
//                 onChange={handleInputChange}
//                 required
//             >
//                 <option value="Air Ticket">Air Ticket</option>
//                 <option value="Hotel">Hotel</option>
//                 <option value="Air Ticket + Hotel">Air Ticket + Hotel</option>
//             </select>

//             {(formData.typeOfBooking === "Air Ticket" || formData.typeOfBooking === "Air Ticket + Hotel") && (
//                 <>
//                     <label>Domestic or International:</label>
//                     <select
//                         name="domesticOrInternational"
//                         value={formData.domesticOrInternational}
//                         onChange={handleInputChange}
//                         required
//                     >
//                         <option value="Domestic">Domestic</option>
//                         <option value="International">International</option>
//                     </select>

//                     {renderFlightFields()}
//                 </>
//             )}

//             {(formData.typeOfBooking === "Hotel" || formData.typeOfBooking === "Air Ticket + Hotel") && (
//                 renderHotelFields()
//             )}

//             <button type="submit">Submit Request</button>
//             {message && <p>{message}</p>}
//         </form>
//     );
// };

// export default EmployeeDashboard;


