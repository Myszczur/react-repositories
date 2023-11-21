/* eslint-disable array-callback-return */
import React, { useState } from 'react';

function ListEmployeeComponent() {

    const [employees, setEmployees] = useState([]);

    return (
        <>
            <div className='container'>
                <h2 className='text-center'>List of Employees</h2>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <th>Employee Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {employees.map((employee) => {
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListEmployeeComponent;