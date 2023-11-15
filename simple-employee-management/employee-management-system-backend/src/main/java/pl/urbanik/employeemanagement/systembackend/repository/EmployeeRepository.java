package pl.urbanik.employeemanagement.systembackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.urbanik.employeemanagement.systembackend.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}