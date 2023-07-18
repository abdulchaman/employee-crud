import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import EmpDataService from "../services/emp.services";

const AddEmp = ({id,setId}) => {
  const [empid, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const [status, setStatus] = useState("available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (empid === "" || name === "" || salary === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newEmp = {
      empid,
      name,
      salary,
      status
    };
    console.log(newEmp);

    try {
      if (id !== undefined && id !== "") {
        await EmpDataService.updateEmp(id, newEmp);
        setId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await EmpDataService.addEmps(newEmp);
        setMessage({ error: false, msg: "New Employee added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }


    setEmpId("");
    setName("");
    setSalary(0);

  };
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await EmpDataService.getEmp(id);
      console.log("the record is :", docSnap.data());
      setEmpId(docSnap.data().empid);
      setName(docSnap.data().name);
      setSalary(docSnap.data().salary);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };
  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">

        {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            >
              {message?.msg}
            </Alert>
          )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmpId">
            <InputGroup>
              <InputGroup.Text id="formEmpId">Employee Id</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Employee Id"
                value={empid}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmpName">
            <InputGroup>
              <InputGroup.Text id="formEmpName">Employee Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmpSalary">
            <InputGroup>
              <InputGroup.Text id="formEmpSalary">Employee Salary</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Employee Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("not available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddEmp;