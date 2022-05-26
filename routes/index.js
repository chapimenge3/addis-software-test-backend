var express = require("express");
var router = express.Router();

const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../db/actions");

// Entrie point for the API
// router for getting all employee
router.get("/", async function (req, res, next) {
  console.log("Query", req.query);
  // Get all employees
  const response = await getAllEmployees(req.query);

  // change the response key docs to employees
  response.employees = response.docs.map((employee) => {
    return {
      id: employee._id,
      name: employee.name,
      salary: employee.salary,
      birthdate: employee.birthdate,
      gender: employee.gender,
    };
  });

  // Delete docs key from response
  delete response.docs;

  // send the result
  res.send(response);
});

// router for creating employee
router.post("/", async function (req, res, next) {
  // get the request body
  console.log("Query", req.query);
  if (!req.body.name) {
    return res.status(400).send("name is required");
  }
  // check if salary is not string
  if (!req.body.salary) {
    return res.status(400).send("salary is required");
  } else {
    // check if salary is number not string
    if (typeof req.body.salary !== "number") {
      return res.status(400).send("salary should be number");
    }
  }
  if (!req.body.gender) {
    return res.status(400).send("gender is required");
  }

  if (!req.body.birthdate) {
    return res.status(400).send("birthdate is required");
  } else {
    const isValid =
      new Date(req.body.birthdate) !== "Invalid Date" &&
      !isNaN(new Date(req.body.birthdate));
    if (!isValid) {
      return res.status(400).send("birthdate is invalid");
    }
  }

  const employee = {
    name: req.body.name,
    salary: req.body.salary,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
  };

  const response = await createEmployee(employee);

  // send the result
  res.status(201).send({
    id: response.id,
    name: response.name,
    salary: response.salary,
    birthdate: response.birthdate,
    gender: response.gender,
  });
});

// router for getting employee by id
router.get("/:id", async function (req, res, next) {
  // get the employee id
  const id = req.params.id;

  // get the employee from the database
  const employee = await getEmployeeById(id);

  // if employee is not found
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.send({
    id: employee._id,
    name: employee.name,
    salary: employee.salary,
    birthdate: employee.birthdate,
    gender: employee.gender,
  });
});

// router for updating employee
router.put("/:id", async function (req, res, next) {
  // get the employee id
  const id = req.params.id;

  // get the request body and validate
  const employee = {};
  if (req.body.name) {
    employee.name = req.body.name;
  }
  if (req.body.salary) {
    // check if salary is not string
    if (typeof req.body.salary !== "number") {
      return res.status(400).send("salary should be a number");
    }
    employee.salary = req.body.salary;
  }
  if (req.body.birthdate) {
    const isValid =
      new Date(req.body.birthdate) !== "Invalid Date" &&
      !isNaN(new Date(req.body.birthdate));
    if (!isValid) {
      return res.status(400).send("birthdate is invalid");
    }
    employee.birthdate = req.body.birthdate;
  }
  if (req.body.gender) {
    employee.gender = req.body.gender;
  }

  // update the employee in the database
  const response = await updateEmployee(id, employee);

  // if employee is not found
  if (!response) {
    return res.status(404).send("Employee not found");
  }

  // send the result
  res.send({
    id: response._id,
    name: response.name,
    salary: response.salary,
    birthdate: response.birthdate,
    gender: response.gender,
  });
});

// router for deleting employee
router.delete("/:id", async function (req, res, next) {
  // get the employee id
  const id = req.params.id;

  // delete the employee from the database
  const response = await deleteEmployee(id);

  // if employee is not found
  if (!response) {
    return res.status(404).send("Employee not found");
  }

  // send the result
  res.send({
    id: response._id,
    name: response.name,
    salary: response.salary,
    birthdate: response.birthdate,
    gender: response.gender,
  });
});

module.exports = router;
