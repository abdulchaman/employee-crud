import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EmpDataService from "../services/emp.services";

const EmpList = ({getEmpId}) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getEmps();
  }, []);
  const getEmps = async () => {
    const data = await EmpDataService.getAllEmps();
    console.log(data.docs);
    setEmployees(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })));
  };

  const deleteHandler= async(id)=>{
    await EmpDataService.deleteEmp(id);
    getEmps();
  }
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getEmps}>
          Refresh List
        </Button>
      </div>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.empid}</td>
                <td>{doc.name}</td>
                <td>{doc.salary}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getEmpId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default EmpList;