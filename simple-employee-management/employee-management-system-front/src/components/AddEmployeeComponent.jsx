import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link, useParams, useNavigate  } from 'react-router-dom';

function AddEmployeeComponent() {
    const initialSate = '';

    const [firstName, setFirstName] = useState(initialSate);
    const [lastName, setLastName] = useState(initialSate);
    const [emailId, setEmailId] = useState(initialSate);

    const navigate = useNavigate();

    const { id } = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, emailId };

        if (id) {
            EmployeeService.updateEmployee(id, employee)
                .then((response) => {
                    navigate('/employees')
                })
                .catch((error) => {
                    console.log('================ERROR====================');
                    console.log(error);
                    console.log('================ERROR====================');
                });
        } else {
            EmployeeService.createEmployee(employee)
                .then((response) => {
                    console.log('=================RESPONSE===================');
                    console.log(response.data);
                    console.log('=================RESPONSE===================');

                    navigate('/employees');
                })
                .catch((error) => {
                    console.log('================ERROR====================');
                    console.log(error);
                    console.log('================ERROR====================');
                });
        }
    };

    useEffect(() => {
        EmployeeService.getEmployeeById(id)
            .then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName);
                setEmailId(response.data.emailId);
            })
            .catch((error) => {
                console.log('================ERROR====================');
                console.log(error);
                console.log('================ERROR====================');
            })
    }, []);

    const title = () => {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add New Employee</h2>
        }
    };

    return (
        <>
            <br /><br />
            <div className='container'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {title()}
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
                            <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                            <Link to='/employees' className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEmployeeComponent;