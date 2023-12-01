package pl.urbanik.employeemanagement.systembackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.urbanik.employeemanagement.systembackend.error.ResourceNotFoundException;
import pl.urbanik.employeemanagement.systembackend.model.Employee;
import pl.urbanik.employeemanagement.systembackend.repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee addNewEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee getEmployee(long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found " + id));
    }

    public Employee updateEmployee(long id, Employee employee) {
        Employee updateEmployee = getEmployee(id);

        updateEmployee.setEmailId(employee.getEmailId());
        updateEmployee.setFirstName(employee.getFirstName());
        updateEmployee.setLastName(employee.getLastName());

        return employeeRepository.save(updateEmployee);
    }

    public void removeEmployee(long id) {
        Employee employeeToDelete = getEmployee(id);
        employeeRepository.deleteById(employeeToDelete.getId());
    }
}