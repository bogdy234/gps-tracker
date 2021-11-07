import "./App.css";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginContextProvider } from "./utils/login/loginContext";

const App = () => {
  return (
    <LoginContextProvider>
      <Router>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Router>
    </LoginContextProvider>
  );
};

export default App;
