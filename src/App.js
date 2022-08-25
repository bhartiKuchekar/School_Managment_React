import { useEffect } from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  BrowserRouter,
  Switch,
} from "react-router-dom";
import Form from "./components/Form";
import Registration from "./components/registration";
import Dashboard from "./App1";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <div className="App">
              <Form />
            </div>
          </Route>
          <Route exact path={"/register"}>
            <div className="App">
              <Registration />
            </div>
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard />
          </Route>
          <Route exact path="*">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
      {/* <BrowserRouter>
        <Router>
          <Route exact path="/" element={<Form />} />
          <Route exact path="/register" element={<Registration />} />
        </Router>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
