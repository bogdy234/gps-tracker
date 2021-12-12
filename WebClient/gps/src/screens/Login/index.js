import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Input from "../../components/Input";
import C from "../../utils/constants";
import styles from "./style.module.css";

const hardcodedUserData = { username: "fili", password: "parola" };

const Login = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({ username: "", password: "" });

  const getValue = (data, value) => {
    let newData;
    switch (data) {
      case C.USERNAME:
        newData = { ...userData, username: value };
        break;
      case C.PASSWORD:
        newData = { ...userData, password: value };
        break;
      default:
        newData = { ...userData };
    }
    setUserData(newData);
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, []);

  const loginFailed = () => {
    console.log("fail");
  };

  const loginSuccessfully = () => {
    console.log("success");
    sessionStorage.setItem("isLoggedIn", true);
    history.push("/dashboard");
  };

  const handleLogin = () => {
    const { username, password } = userData;
    console.log(`My username: ${username}, My password: ${password}`);
    if (
      username === hardcodedUserData.username &&
      password === hardcodedUserData.password
    ) {
      loginSuccessfully();
    } else {
      loginFailed();
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.usernameInput}>
        <Input
          text="Username"
          getInputValue={(e) => getValue(C.USERNAME, e.target.value)}
          value={userData.username}
        />
      </div>
      <div className={styles.passwordInput}>
        <Input
          text="Password"
          type="password"
          getInputValue={(e) => getValue(C.PASSWORD, e.target.value)}
          value={userData.password}
        />
      </div>
      <button onClick={handleLogin} className={styles.loginButton}>
        Login
      </button>
    </div>
  );
};

export default Login;
