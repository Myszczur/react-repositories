import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

function ListEmployeeComponent() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        EmployeeService.getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
                console.log('====================================');
                console.log(response.data);
                console.log('====================================');
            })
            .catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            });
    }, []);

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
                </thead>
                <tbody>
                    {employees.map(
                        (employee) =>
                            <tr key={employee.id}>
                                <td> {employee.id} </td>
                                <td> {employee.firstName} </td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployeeComponent;