const { DynamoDB, Client } = require("./dynamo");

//
class Employee {
  constructor(name, gender, birthdate, salary, id=null) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.birthdate = birthdate;
    this.salary = salary;
  }
}

class Response {
    constructor(employees, count) {
        this.employees = employees
        this.count = count
    }
}

// Create Employee
const createEmployee = async (employee) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: employee,
  };
  return await Client.put(params).promise();
};

// Get All Employees with pagination
const getAllEmployees = async (page = 1, limit = 10) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Limit: limit,
  };
  const data = await Client.scan(params).promise();
  const employees = [];
  data.Items.forEach((item) => {
    employees.push(
      new Employee(
        item.name.S,
        item.gender.S,
        item.birthdate.S,
        item.salary.N,
        item.id.N,
      )
    );
  });
  return new Response(employees, data.Count)
};

// Get Employee by id
const getEmployee = async (id) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: id,
    },
  };
  return await Client.get(params).promise();
};

// Delete Employee by id
const deleteEmployee = async (id) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: id,
    },
  };
  return await Client.delete(params).promise();
};

// Update Employee using by id
const updateEmployee = async (id, employee) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: id,
    },
    UpdateExpression:
      "set name = :name, salary = :salary, birthdate = :birthdate, gender = :gender",
    ExpressionAttributeValues: {
      ":name": employee.name,
      ":salary": employee.salary,
      ":birthdate": employee.birthdate,
      ":gender": employee.gender,
    },
    ReturnValues: "UPDATED_NEW",
  };
  return await Client.update(params).promise();
};

// Export All Methods
module.exports = {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployee,
  Employee,
  Response
};
