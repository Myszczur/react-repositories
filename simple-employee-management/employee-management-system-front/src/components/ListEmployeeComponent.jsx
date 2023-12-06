import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

function ListEmployeeComponent() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then((response) => {
                getAllEmployees();
            })
            .catch((error) => {
                console.log('================ERROR====================');
                console.log(error);
                console.log('================ERROR====================');
            });
    };

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
                console.log('=================RESPONSE===================');
                console.log(response.data);
                console.log('=================RESPONSE===================');
            })
            .catch((error) => {
                console.log('================ERROR====================');
                console.log(error);
                console.log('================ERROR====================');
            });
    }

    return (
        <div className="container">
            <h2 className="text-center"> List Employees </h2>
            <Link to="/add-employee" className="btn btn-primary mb-2" > Add Employee </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Id </th>
                    <th> First Name </th>
                    <th> Last Name </th>
                    <th> Email Id </th>
                    <th> Action </th>
                </thead>
                <tbody>
                    {employees.map(
                        (employee) =>
                            <tr key={employee.id}>
                                <td> {employee.id} </td>
                                <td> {employee.firstName} </td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}>Edit</Link>
                                    {/* <Link className='btn btn-danger' to={`/delete-employee/${employee.id}`}>Delete</Link> */}
                                    <button className='btn btn-danger' onClick={() => deleteEmployee(employee.id)}
                                        style={{ marginLeft: '10px' }} >Delete</button>
                                </td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployeeComponent;