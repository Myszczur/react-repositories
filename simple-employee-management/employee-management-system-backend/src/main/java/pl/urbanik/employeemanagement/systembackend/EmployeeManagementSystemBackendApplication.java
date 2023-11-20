package pl.urbanik.employeemanagement.systembackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pl.urbanik.employeemanagement.systembackend.model.Employee;
import pl.urbanik.employeemanagement.systembackend.service.EmployeeService;

@SpringBootApplication
public class EmployeeManagementSystemBackendApplication implements CommandLineRunner {

	@Autowired
	private EmployeeService employeeService;

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementSystemBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Employee employee = new Employee();
		employee.setFirstName("TestName");
		employee.setLastName("TestSurname");
		employee.setEmailId("TestEmail@test.pl");
//		employeeService.addEmployee(employee);
//		System.out.println(employee);

		Employee employee2 = new Employee();
		employee2.setFirstName("TestName2");
		employee2.setLastName("TestSurname2");
		employee2.setEmailId("TestEmail2@test.pl");
//		employeeService.addEmployee(employee2);
//		System.out.println(employee2);
	}
}