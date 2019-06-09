#[derive(Debug)]
struct Company {
    name: String,
    employees: Vec<Employee>,
}
impl Company {
    fn new(name: &str) -> Company {
        Company {
            name: String::from(name),
            employees: vec![],
        }
    }
    fn add_emplyees(&mut self, mut empls: Vec<Employee>) {
        self.employees.append(&mut empls)
    }
    fn get_employee_from_depart_ment(&self, department: &str) -> Vec<&Employee> {
        let empls = &self.employees;
        let mut depart_empls: Vec<&Employee> = vec![];
        let depart_str = String::from(department);
        for employee in empls {
            if employee.department == depart_str {
                depart_empls.push(&employee);
            }
        }

        depart_empls.sort_by(|a, b| b.level.cmp(&a.level));

        depart_empls
    }
}
#[derive(Debug)]
struct Employee {
    department: String,
    name: String,
    level: i8,
}

impl Employee {
    fn new(department: &str, name: &str, level: i8) -> Employee {
        Employee {
            department: String::from(department),
            name: String::from(name),
            level,
        }
    }
}

fn main() {
    let mut pa = Company::new("pa");
    let zsy = Employee::new("front_end", "zsy", 1);
    let myf = Employee::new("front_end", "myf", 1);
    let lxy = Employee::new("front_end", "lxy", 2);
    let dl = Employee::new("front_end", "dl", 2);

    let zxp = Employee::new("back_end", "zxp", 1);
    let yff = Employee::new("back_end", "yff", 2);

    let mut employees = vec![zsy, myf, lxy, dl, zxp, yff];

    pa.add_emplyees(employees);
    println!("{:?}", pa.get_employee_from_depart_ment("front_end"));
}
