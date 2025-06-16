// import express library
import express from "express";

// create router
const router = express.Router();

// export router
export default router;

import employees from "#db/employees";

router
  .route("/")
  .get((req, res) => {
    res.send(employees);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");
    const { name } = req.body;
    if (!name) return res.status(400).send("Please include a name.");
    const employee = { id: employees.length + 1, name };
    employees.push(employee);
    res.status(201).send(employee);
  });

router.route("/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});
