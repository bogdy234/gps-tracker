import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Marker from "../../components/Marker";
import DateTimePickerContainer from "../../components/DateTimePickerContainer";
import styles from "./style.module.css";
import C from "../../utils/constants";
import GoogleMapReact from "google-map-react";
import { formatDate } from "../../utils/index";

const Dashboard = () => {
  const history = useHistory();
  const [terminalId, setTerminalId] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showErrorMessages, setShowErrorMessages] = useState({
    terminalId: false,
    startDate: false,
    endDate: false,
    noData: false,
  });
  const [coordinatesData, setCoordinatesData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem(C.IS_LOGGED_IN)) {
      history.push("/");
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem(C.IS_LOGGED_IN);
    history.push("/");
  };

  const onChangeDate = (value, whatDate) => {
    if (whatDate === C.START_DATE) {
      setStartDate(value);
    } else if (whatDate === C.END_DATE) {
      setEndDate(value);
    }
  };

  const getTerminalId = (e) => {
    setTerminalId(e.target.value);
  };
  const toggleFalseErrorMessages = () => {
    setShowErrorMessages({
      terminalId: false,
      startDate: false,
      endDate: false,
      noData: false,
    });
  };

  const getDataHandler = async () => {
    if (startDate && endDate && terminalId) {
      toggleFalseErrorMessages();
      const response = await fetch(
        C.URL +
          `?terminalId=${terminalId}&startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
        }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setCoordinatesData(jsonResponse);

      if (!jsonResponse.length) {
        setShowErrorMessages((prevValue) => ({ ...prevValue, noData: true }));
      }
    } else {
      setShowErrorMessages({
        terminalId: terminalId ? false : true,
        startDate: startDate ? false : true,
        endDate: endDate ? false : true,
        noData: false,
      });
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.logoutButton}>
        <Button onClick={handleLogout} text={C.LOGOUT} />
      </div>
      <Input
        text={C.TERMINAL_ID}
        value={terminalId}
        getInputValue={getTerminalId}
      />
      {showErrorMessages.terminalId && (
        <div className={styles.errorMessage}>{C.TERMINAL_ID_ERROR}</div>
      )}
      <div className={styles.startDate}>
        <DateTimePickerContainer
          value={startDate}
          onChange={(value) => onChangeDate(value, C.START_DATE)}
          text={C.START_DATE}
        />
        {showErrorMessages.startDate && (
          <div className={styles.errorMessage}>{C.START_DATE_ERROR}</div>
        )}
      </div>
      <div className={styles.endDate}>
        <DateTimePickerContainer
          onChange={(value) => onChangeDate(value, C.END_DATE)}
          value={endDate}
          text={C.END_DATE}
        />
        {showErrorMessages.endDate && (
          <div className={styles.errorMessage}>{C.END_DATE_ERROR}</div>
        )}
      </div>
      <Button text={C.GET_DATA} onClick={getDataHandler} />
      {showErrorMessages.noData && (
        <div className={styles.noDataMessage}>{C.NO_DATA_MESSAGE}</div>
      )}
      <div style={{ height: "100vh", width: "100%", paddingTop: "20px" }}>
        <GoogleMapReact
          bootstrapURLKeys={process.env.REACT_APP_API_KEY}
          defaultCenter={{ lat: 46.75971479746877, lng: 23.61481273331003 }}
          defaultZoom={12}
        >
          {coordinatesData.map((data, index) => {
            return (
              <Marker
                lat={data.latitude}
                lng={data.longitude}
                key={index}
              ></Marker>
            );
          })}
        </GoogleMapReact>
      </div>
      <div className={styles.dataContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>{C.LATITUDE}</th>
              <th>{C.LONGITUDE}</th>
              <th>{C.DATE}</th>
            </tr>
          </thead>
          <tbody>
            {coordinatesData.map((data, index) => {
              return (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.latitude}</td>
                  <td>{data.longitude}</td>
                  <td>{formatDate(data.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
