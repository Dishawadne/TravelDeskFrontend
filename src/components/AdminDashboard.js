// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {useNavigate} from "react-router-dom";
// import "./AdminDashboard.css";
 
// const AdminDashboard = () => {
//     const [formData, setFormData] = useState({
//         FirstName: '',
//         LastName: '',
//         Address: '',
//         Email: '',
//         MobileNum: '',
//         Password: '',
//         Department: '',
//         RoleId: '',
//         ManagerId: ''
//     });
//     const [roles, setRoles] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [managers, setManagers] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [message, setMessage] = useState('');
//     const [editMode, setEditMode] = useState(false);
//     const [editUserId, setEditUserId] = useState(null);
//     const navigate=useNavigate();
 
//     useEffect(() => {
//         fetchRoles();
//         fetchDepartments();
//         fetchManagers();
//         fetchUsers();
//     }, []);
 
//     const fetchRoles = async () => {
//         try {
//             const response = await axios.get('https://localhost:7116/api/Role');
//             setRoles(response.data);
//         } catch (error) {
//             console.error('Error fetching roles:', error);
//         }
//     };
 
//     const fetchDepartments = async () => {
//         try {
//             const response = await axios.get('https://localhost:7116/api/Departments');
//             setDepartments(response.data);
//         } catch (error) {
//             console.error('Error fetching departments:', error);
//         }
//     };
 
//     const fetchManagers = async () => {
//         try {
//             const response = await axios.get('https://localhost:7116/api/User/managers');
//             setManagers(response.data);
//         } catch (error) {
//             console.error('Error fetching managers:', error);
//         }
//     };
 
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('https://localhost:7116/api/User');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };
 
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };
 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
 
//         try {
//             if (editMode) {
//                 const response = await axios.put(`https://localhost:7116/api/User/${editUserId}`, formData);
//                 if (response.status === 200) {
//                     setMessage('User updated successfully');
//                     setEditMode(false);
//                     setEditUserId(null);
//                 }
//             } else {
//                 const response = await axios.post('https://localhost:7116/api/User', formData);
//                 if (response.status === 201) {
//                     setMessage('User added successfully');
//                 }
//             }
//             setFormData({
//                 FirstName: '',
//                 LastName: '',
//                 Address: '',
//                 Email: '',
//                 MobileNum: '',
//                 Password: '',
//                 Department: '',
//                 RoleId: '',
//                 ManagerId: ''
//             });
//             fetchUsers();
//         } catch (error) {
//             setMessage(editMode ? 'Failed to update user' : 'Failed to add user');
//         }
//     };
//     const handleDeleteUser = async (userId) => {
//         try {
//             const response = await axios.delete(`https://localhost:7116/api/User/${userId}`);
//             if (response.status === 200) {
//                 setMessage('User deleted successfully');
//                 fetchUsers();
//             }
//         } catch (error) {
//             setMessage('Failed to delete user');
//         }
//     };
//    const handleEditUser = (userId) => {
//         const user = users.find(u => u.id === userId);
//         setFormData({
//             FirstName: user.firstName,
//             LastName: user.lastName,
//             Address: user.address,
//             Email: user.email,
//             MobileNum: user.mobileNum,
//             Password: user.password,
//             Department: user.department,
//             RoleId: user.roleId,
//             ManagerId: user.managerId
//         });
//         setEditUserId(userId);
//         setEditMode(true);
//     };
   
//   const handleLogout = () => {
//     navigate('/login');
//   };
 
//     return (
//         <div className='main-content'>
//             <header>
//              <h2>Welcome Admin User</h2>
//             <button className='button' onClick={handleLogout}>Logout</button>
//         </header>
//             <form onSubmit={handleSubmit}>
//             <h1 className='heading'>Admin Dashboard</h1>
//                 <div>
//                     <label>First Name</label>
//                     <input
//                         type="text"
//                         name="FirstName"
//                         value={formData.FirstName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Last Name</label>
//                     <input
//                         type="text"
//                         name="LastName"
//                         value={formData.LastName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Address</label>
//                     <input
//                         type="text"
//                         name="Address"
//                         value={formData.Address}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="Email"
//                         value={formData.Email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Mobile Number</label>
//                     <input
//                         type="text"
//                         name="MobileNum"
//                         value={formData.MobileNum}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="Password"
//                         value={formData.Password}
//                         onChange={handleChange}
//                         required={!editMode} // Password is not required in edit mode
//                     />
//                 </div>
//                 <div>
//                     <label>Role</label>
//                     <select
//                         name="RoleId"
//                         value={formData.RoleId}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select a role</option>
//                         {roles.map((role) => (
//                             <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Department</label>
//                     <select
//                         name="Department"
//                         value={formData.Department}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select a department</option>
//                         {departments.map((department) => (
//                             <option key={department} value={department}>{department}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Manager</label>
//                     <select
//                         name="ManagerId"
//                         value={formData.ManagerId}
//                         onChange={handleChange}
//                     >
//                         <option value="">Select a manager</option>
//                         {managers.map((manager) => (
//                             <option key={manager.id} value={manager.id}>{manager.firstName} {manager.lastName}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <button className='btn' type="submit">{editMode ? 'Update User' : 'Add User'}</button>
//                 {message && <p>{message}</p>}
//             </form>
            
 
//             <div className='usertable'>
//                 <h2>Total Users: {users.length}</h2>
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Employee ID</th>
//                             <th>FirstName</th>
//                             <th>LastName</th>
//                             <th>Department</th>
//                             <th>Role</th>
//                             <th>Manager Name</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user.id}>
//                                 <td>{user.id}</td>
//                                 <td>{user.firstName}</td>
//                                 <td>{user.lastName}</td>
//                                 <td>{user.department}</td>
//                                 <td>{user.role?.roleName}</td>
//                                 <td>{user.manager?.firstName} {user.manager?.lastName}</td>
//                                 <td>
//                                     <button className="editBtn" onClick={() => handleEditUser(user.id)}>Edit</button>
//                                     <button className="delBtn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
 
// export default AdminDashboard;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Address: '',
        Email: '',
        MobileNum: '',
        Password: '',
        Department: '',
        RoleId: '',
        ManagerId: ''
    });
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [managers, setManagers] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
        fetchDepartments();
        fetchManagers();
        fetchUsers();
    }, []);

    const getToken = () => {
        return localStorage.getItem('token'); // Retrieve the token from local storage
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('https://localhost:7116/api/Role', {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('https://localhost:7116/api/Departments', {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchManagers = async () => {
        try {
            const response = await axios.get('https://localhost:7116/api/User/managers', {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            setManagers(response.data);
        } catch (error) {
            console.error('Error fetching managers:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7116/api/User', {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                const response = await axios.put(`https://localhost:7116/api/User/${editUserId}`, formData, {
                    headers: { 'Authorization': `Bearer ${getToken()}` }
                });
                if (response.status === 200) {
                    setMessage('User updated successfully');
                    setEditMode(false);
                    setEditUserId(null);
                }
            } else {
                const response = await axios.post('https://localhost:7116/api/User', formData, {
                    headers: { 'Authorization': `Bearer ${getToken()}` }
                });
                if (response.status === 201) {
                    setMessage('User added successfully');
                }
            }
            setFormData({
                FirstName: '',
                LastName: '',
                Address: '',
                Email: '',
                MobileNum: '',
                Password: '',
                Department: '',
                RoleId: '',
                ManagerId: ''
            });
            fetchUsers();
        } catch (error) {
            setMessage(editMode ? 'Failed to update user' : 'Failed to add user');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`https://localhost:7116/api/User/${userId}`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            if (response.status === 200) {
                setMessage('User deleted successfully');
                fetchUsers();
            }
        } catch (error) {
            setMessage('Failed to delete user');
        }
    };

    const handleEditUser = (userId) => {
        const user = users.find(u => u.id === userId);
        setFormData({
            FirstName: user.firstName,
            LastName: user.lastName,
            Address: user.address,
            Email: user.email,
            MobileNum: user.mobileNum,
            Password: user.password,
            Department: user.department,
            RoleId: user.roleId,
            ManagerId: user.managerId
        });
        setEditUserId(userId);
        setEditMode(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/login');
    };

    return (
        <div className='main-content'>
            <header>
                <h2>Welcome Admin User</h2>
                <button className='button' onClick={handleLogout}>Logout</button>
            </header>
            <form onSubmit={handleSubmit}>
                <h1 className='heading'>Admin Dashboard</h1>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="Address"
                        value={formData.Address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        name="MobileNum"
                        value={formData.MobileNum}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        required={!editMode} // Password is not required in edit mode
                    />
                </div>
                <div>
                <label>Role</label>
                <select
                    name="RoleId"
                    value={formData.RoleId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                        <option key={role.roleId} value={role.roleId}>
                            {role.roleName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Department</label>
                <select
                    name="Department"
                    value={formData.Department}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a department</option>
                    {departments.map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>
                <div>
                    <label>Manager</label>
                    <select
                        name="ManagerId"
                        value={formData.ManagerId}
                        onChange={handleChange}
                    >
                        <option value="">Select a manager</option>
                        {managers.map((manager) => (
                            <option key={manager.id} value={manager.id}>{manager.firstName} {manager.lastName}</option>
                        ))}
                    </select>
                </div>
                <button className='btn' type="submit">{editMode ? 'Update User' : 'Add User'}</button>
                {message && <p>{message}</p>}
            </form>

            <div className='usertable'>
                <h2>Total Users: {users.length}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Manager Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.department}</td>
                                <td>{user.role?.roleName}</td>
                                <td>{user.manager?.firstName} {user.manager?.lastName}</td>
                                <td>
                                    <button onClick={() => handleEditUser(user.id)}>Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
