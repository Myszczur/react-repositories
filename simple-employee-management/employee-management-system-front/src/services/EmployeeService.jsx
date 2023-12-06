import axios from 'axios';


const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/employees';


class EmployeeService {
    getAllEmployees() {
        return axios.get(EMPLOYEE_BASE_REST_API_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_BASE_REST_API_URL, employee);
    }

    updateEmployee(id, employee) {
        return axios.put(EMPLOYEE_BASE_REST_API_URL + `/${id}`, employee);
    }

    getEmployeeById(id) {
        return axios.get(EMPLOYEE_BASE_REST_API_URL + `/${id}`);
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + `/${id}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployeeService();