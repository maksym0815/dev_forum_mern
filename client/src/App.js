import MainRouter from "./MainRouter";
import {BrowserRouter as Router} from "react-router-dom";

function App(props) {
  return (
      <Router>
        <MainRouter/>
      </Router>
  );
}

export default App;