import AirportList from "./components/AirportList";
import FloatingIcon from "./FloatingIcon";
import { Container, Navbar } from "react-bootstrap";

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="mb-5">
        <Container fluid>
          <Navbar.Brand
            className="mx-auto text-center"
            style={{ width: "100%", whiteSpace: "normal" }}
          >
            {" "}
            {/* Add whiteSpace: "normal" */}
            Airport Tracker - Vite + React + TS + Bootstrap CSS
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <AirportList />
      </Container>

      <FloatingIcon />
    </div>
  );
}

export default App;
