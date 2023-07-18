import React,{ useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddEmp from "./components/AddEmp";
import EmpList from './components/EmpList';
import "./App.css"

function App() {
  const [empId, setEmpId] = useState("");

  const getEmpHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setEmpId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home"  className="logo">Employee CRUD</Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddEmp id={empId} setId={setEmpId} />
          </Col>
        </Row>
      </Container>
      <br></br>
      <br></br>
      <Container>
        <Row>
          <Col>
            <EmpList getEmpId={getEmpHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;