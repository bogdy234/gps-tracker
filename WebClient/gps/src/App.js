import "./App.css";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Router>
  );
};

export default App;
