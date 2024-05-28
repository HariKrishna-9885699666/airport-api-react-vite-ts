import AirportList from "./components/AirportList";
import FloatingIcon from "./FloatingIcon";

function App() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light mb-5">
        <div className="container-fluid d-flex justify-content-center">
          <span className="navbar-brand mb-0 h1 text-center">
            Airport Tracker - Vite + React + TS + Bootstrap CSS
          </span>
        </div>
      </nav>
      <AirportList />
      <FloatingIcon />
    </div>
  );
}

export default App;
