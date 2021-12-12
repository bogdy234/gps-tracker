import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Marker from "../../components/Marker";
import DateTimePickerContainer from "../../components/DateTimePickerContainer";
import IconButton from "../../components/IconButton";

import C from "../../utils/constants";
import { formatDate } from "../../utils/index";

import GoogleMapReact from "google-map-react";
import styles from "./style.module.css";
import api from "../../api";

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
    if (!sessionStorage.getItem(C.IS_LOGGED_IN)) {
      history.push("/");
    }
  }, [history]);

  const handleLogout = () => {
    sessionStorage.removeItem(C.IS_LOGGED_IN);
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
      const jsonResponse = await api.get(C.URL_DATE, {
        terminalId: `${terminalId}`,
        startDate: `${startDate}`,
        endDate: `${endDate}`,
      });
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

  const handleDelete = async (id) => {
    const response = await api.del(C.URL, { value: id });

    if (!response || !response.deleted) return;

    const newCoordinatesData = coordinatesData.filter(
      (coordData) => coordData._id !== id
    );
    console.log(newCoordinatesData);
    setCoordinatesData(newCoordinatesData);
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
                  <td className={styles.centeredCellContent}>
                    <IconButton
                      src="/trash-solid.svg"
                      alt="trash-icon"
                      onClick={() => handleDelete(data._id)}
                      width={20}
                      height={20}
                    />
                  </td>
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
