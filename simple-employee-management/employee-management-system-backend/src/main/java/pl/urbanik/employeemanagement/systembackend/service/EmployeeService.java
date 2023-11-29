package pl.urbanik.employeemanagement.systembackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.urbanik.employeemanagement.systembackend.model.Employee;
import pl.urbanik.employeemanagement.systembackend.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

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

    public Optional<Employee> getEmployee(long id) {
        return employeeRepository.findById(id);
    }
}