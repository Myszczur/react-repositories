import React, { useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function AddEmployeeComponent() {
    const initialSate = '';

    const [firstName, setFirstName] = useState(initialSate);
    const [lastName, setLastName] = useState(initialSate);
    const [emailId, setEmailId] = useState(initialSate);

    // const history = useHistory();

    const saveEmployee = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, emailId };

        EmployeeService.createEmployee(employee)
            .then((response) => {
                console.log('====================================');
                console.log(response.data);
                // history.push('/employees');
                console.log('====================================');
            })
            .catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            });
    };

    return (
        <>
            <h1>Add New Employee</h1>
            <br /><br />
            <div className='container'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Add Employee</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input type='text' placeholder='Enter First Name' name='firstName' className='form-control' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input type='text' placeholder='Enter Last Name' name='lastName' className='form-control' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email Adress:</label>
                                <input type='text' placeholder='Enter Email' name='emailId' className='form-control' value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                            </div>
                            <button className='btn btn-success' onClick={(e) => saveEmployee(e)}>Submit</button>
                            <Link to='/employees' className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEmployeeComponent;