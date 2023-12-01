package pl.urbanik.employeemanagement.systembackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public Employee addNewEmployee(@RequestBody Employee employee) {
        return employeeService.addNewEmployee(employee);
    }

    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable long id) {
        Employee employee = employeeService.getEmployee(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Employee> removeEmployee(@PathVariable long id) {
        employeeService.removeEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}