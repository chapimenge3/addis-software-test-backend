const Employee = require("./models");

// Define the Get All Employees with Pagination and filter
const getAllEmployees = async (query) => {
  // Get the page, limit, offset, sort and search params
  // if the page is not defined, set it to 1
  const page = query.page ? query.page : 1;
  // if the limit is not defined, set it to 10
  const limit = query.limit ? query.limit : 10;
  // if the offset is not defined, set it to 0
  const offset = query.offset ? query.offset : 0;
  // if the sort is not defined, set it to name
  const sort = query.sort ? query.sort : "name";
  // if the search is not defined, set it to empty string
  const name = query.name ? query.name : "";
  const gender = query.gender ? query.gender : "";

  // build the query for filtering only by name
  const dbQuery = {
    name: {
      $regex: name,
      $options: "i",
    },
    gender: {
      $regex: gender,
      $options: "i",
    },
  };
  // build the options for the pagination
  const options = {
    page: page,
    limit: limit,
    offset: offset,
    sort: {
      [sort]: 1,
    },
    select: "id name salary birthdate gender",
  };

  // get the employees from the database
  const employees = await Employee.paginate(dbQuery, options);

  // return the employees
  return employees;
};

// Define the Get Employee by Id
const getEmployeeById = async (id) => {
  try {
    // build option for ferching selected fields
    const onlySelectedFields = "id name salary birthdate gender";

    // get the employee from the database
    const employee = await Employee.findById(id, onlySelectedFields);

    // return the employee
    return employee;
  } catch (error) {
    return null;
  }
};

// Define the Create Employee
const createEmployee = async (employee) => {
  // create the employee in the database
  const employeeDetails = await Employee.create(employee);

  // return the employee
  return employeeDetails;
};

// Define the Update Employee
const updateEmployee = async (id, employee) => {
  try {
    // update the employee in the database
    const employeeDetails = await Employee.findByIdAndUpdate(id, employee, {
      new: true,
    });
    return employeeDetails;
  } catch (error) {
    return null;
  }
};

// Define the Delete Employee
const deleteEmployee = async (id) => {
  try {
    // delete the employee from the database
    const employee = await Employee.findByIdAndDelete(id);

    // return the employee
    return employee;
  } catch (error) {
    return null;
  }
};

// Export the functions
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
