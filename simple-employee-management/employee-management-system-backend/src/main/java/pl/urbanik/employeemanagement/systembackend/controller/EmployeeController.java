package pl.urbanik.employeemanagement.systembackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.urbanik.employeemanagement.systembackend.model.Employee;
import pl.urbanik.employeemanagement.systembackend.service.EmployeeService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getEmployees() {
        return employeeService.getEmployees();
    }

    @PostMapping
    public  Employee addNewEmployee(@RequestBody Employee employee) {
        return employeeService.addNewEmployee(employee);
    }
}