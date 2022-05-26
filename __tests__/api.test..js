const request = require("supertest");
const app = require("../app");
const {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
} = require("../db/actions");

// Connection to the database
const db = require("../db/connections");

// Test the root path
describe("Testing the root path /", () => {
  beforeAll: () => {
    db.connect();
  };

  afterAll: () => {
    db.disconnect();
  };

  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

// Test the Employee Create path
describe("Testing the Employee Create path POST /", () => {
  beforeAll: () => {
    db.connect();
  };

  afterAll: () => {
    db.disconnect();
  };

  test("It should response the POST method", async () => {
    // Create the employee
    const employee = {
      name: "John Doe",
      salary: 50000,
      birthdate: "01/01/2000",
      gender: "male",
    };

    const response = await request(app).post("/").send(employee);

    // Assertions
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("salary");
    expect(response.body).toHaveProperty("birthdate");
    expect(response.body).toHaveProperty("gender");

    // Make sure the employee payload is correct
    expect(response.body.name).toBe(employee.name);
    expect(response.body.salary).toBe(employee.salary);
    expect(response.body.gender).toBe(employee.gender);

    // Delete the employee
    await deleteEmployee(response.body.id);
  });
});

// Test the Employee Details API /:id path
describe("Testing the Employee Details API /:id path", () => {
  beforeAll: () => {
    db.connect();
  };

  afterAll: () => {
    db.disconnect();
  };

  test("It should response the GET method", async () => {
    // create test employee
    const employee = {
      name: "Test Employee",
      salary: 10000,
      birthdate: "2000-01-01",
      gender: "male",
    };
    const employeeDetails = await createEmployee(employee);

    const response = await request(app).get(`/${employeeDetails.id}`);

    // Must Match with the test employee
    expect(response.body.name).toBe(employee.name);
    expect(response.body.salary).toBe(employee.salary);
    expect(response.body.gender).toBe(employee.gender);
    expect(response.statusCode).toBe(200);

    // Delete the test employee
    await deleteEmployee(employeeDetails.id);
  });
});

// Test the Employee Update API /:id path
describe("Testing the Employee Update API /:id path", () => {
  beforeAll: () => {
    db.connect();
  };

  afterAll: () => {
    db.disconnect();
  };

  test("It should response the PUT method", async () => {
    // Create the employee
    const employee = {
      name: "John Doe",
      salary: 50000,
      birthdate: "01/01/2000",
      gender: "female",
    };
    const employeeDetails = await createEmployee(employee);

    // Update the employee
    const updateEmployee = {
      name: "John Doe Updated",
      salary: 10000,
      birthdate: "01/01/2000",
      gender: "male",
    };
    const response = await request(app)
      .put(`/${employeeDetails.id}`)
      .send(updateEmployee);

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("salary");
    expect(response.body).toHaveProperty("birthdate");
    expect(response.body).toHaveProperty("gender");

    // Make sure the employee payload is correct
    expect(response.body.name).toBe(updateEmployee.name);
    expect(response.body.salary).toBe(updateEmployee.salary);
    expect(response.body.gender).toBe(updateEmployee.gender);

    // Delete the employee
    await deleteEmployee(employeeDetails.id);
  });
});

// Test the Employee Delete API /:id path
describe("Testing the Employee Delete API /:id path", () => {
  beforeAll: () => {
    db.connect();
  };

  afterAll: () => {
    db.disconnect();
  };

  test("It should response the DELETE method", async () => {
    // Create the employee
    const employee = {
      name: "John Doe",
      salary: 50000,
      birthdate: "01/01/2000",
      gender: "gender",
    };
    const employeeDetails = await createEmployee(employee);

    // Delete the employee
    const response = await request(app).delete(`/${employeeDetails.id}`);

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("salary");
    expect(response.body).toHaveProperty("birthdate");
    expect(response.body).toHaveProperty("gender");

    // Make sure the employee payload is correct
    expect(response.body.name).toBe(employee.name);
    expect(response.body.salary).toBe(employee.salary);
    expect(response.body.gender).toBe(employee.gender);

    // Make Sure the employee is deleted using getEmployeeById
    const getEmployee = await getEmployeeById(employeeDetails.id);
    expect(getEmployee).toBe(null);
  });
});
