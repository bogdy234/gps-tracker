import "./App.css";
import Input from "./components/Input";

const App = () => {
  return (
    <div className="App">
      <Input text="Username" />
      <Input text="Password" type="password" />
    </div>
  );
};

export default App;
