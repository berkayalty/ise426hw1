import React, { useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import First from "./First";
import Second from "./Second";
import Third from "./Third";

function App() {
  const [keys, setKeys] = useState({
    public: { eNum: null, nNum: null },
    private: { dNum: null, nNum: null },
  });
  console.log("keys ->", keys);
  return (
    <div className="h-100 p-4">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Key Selection</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" disabled={!keys.private.dNum}>
                  Encryption
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third" disabled={!keys.private.dNum}>
                  Decryption
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <First setKeys={setKeys} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Second keys={keys} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Third keys={keys} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default App;
