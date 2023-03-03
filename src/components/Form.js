import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";
import { GiWindsock } from "react-icons/gi";
import axios from "axios";

function Form() {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState([]);
  const [error, setError] = useState("");
  const [isData, setIsData] = useState(false);
  const apiKey = "4e7c79174e44b9eb0803edfe4dfd58fa";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCity("");
    await axios(apiUrl)
      .then((res) => {
        setInfo(res.data);
        setIsData(true);
      })
      .catch((err) => {
        setIsData(false);
        setError(err.response.data.message);
      });
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="background"></div>
          <h2>Hava Durumu</h2>
          <input
            type="text"
            onChange={handleChange}
            value={city}
            className="searchText"
          />
          <button type="submit" className="btn">
            Sorgula
          </button>
          {isData ? (
            <>
              <h3 className="location">
                {info.name},{info.sys.country}
                <CiLocationOn />
              </h3>
              <p className="temperature">
                {info.main.temp}
                <TbTemperatureCelsius />
              </p>
              <p className="status">{info.weather[0].description}</p>
              <p className="wind">
                {info.wind.speed} km/h <GiWindsock />
              </p>
            </>
          ) : error && <div className="error">Hata: {error}!</div>}
        </div>
      </form>
    </div>
  );
}

export default Form;
