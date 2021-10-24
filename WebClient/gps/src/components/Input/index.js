const Input = ({ text, type = "text" }) => {
  return (
    <div>
      <div>{text}</div>
      <input type={type}></input>
    </div>
  );
};

export default Input;
