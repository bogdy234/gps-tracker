import DateTimePicker from "react-datetime-picker";

const DateTimePickerContainer = ({ value, onChange, text }) => {
  return (
    <>
      <div>{text}</div>
      <DateTimePicker
        onChange={onChange}
        value={value}
        format="dd-MM-y h:mm:ss a"
      />
    </>
  );
};

export default DateTimePickerContainer;
