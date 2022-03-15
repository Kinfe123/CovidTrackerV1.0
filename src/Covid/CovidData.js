import React from "react";
import "./CovidData.css";
import NumberFormat from "react-number-format";
import { Input, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
const CovidData = () => {
  const [flag, setFlag] = useState(null);
  const [country, setCountry] = useState("");
  const [cases, setCases] = useState("");
  const [recovered, setRecovered] = useState("");
  const [death, setDeath] = useState("");
  const [todayCases, setTodayCases] = useState("");
  const [deathCases, setDeathCases] = useState("");
  const [recoveredCases, setRecoveredCases] = useState("");
  const [cont, setCont] = useState("");
  const [input, setInput] = useState("");
  const [critical, setCritical] = useState("");
  const [tests, setTests] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [info, setInfo] = useState({});
  function handler(event) {
    setInput(event.target.value);
  }
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setInfo(data);
      });
  }, []);
  const setData = (data) => {
    setCountry(data.country);
    setFlag(data.countryInfo.flag);

    setCases(data.cases);
    setRecovered(data.recovered);
    setDeath(data.deaths);
    setTodayCases(data.todayCases);
    setDeathCases(data.todayDeaths);
    setRecoveredCases(data.todayRecovered);
    setCont(data.continent);
    setCritical(data.critical);
    setTests(data.tests);
    setCode2(data.countryInfo.iso2);
    setCode3(data.countryInfo.iso3);
  };
  function handleClick(event) {
    event.preventDefault();
    fetch(`https://disease.sh/v3/covid-19/countries/${input}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setInfo(data);
      });
  }
  console.log(info);

  return (
    <>
      <h2>📈 Covid 19 Tracker App </h2>
      <form onSubmit={handleClick}>
        <Input type="text" value={input} onChange={handler} />

        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          placeholder="Country name"
          style={{ margin: 10 }}
          onClick={handleClick}
        >
          Search
        </Button>
      </form>
      {country ? (
        <div>
          {flag ? <img src={flag} alt="countries flag" /> : "No flag to show"}

          <h4>ℹ️ COUNTRY INFO</h4>
          <p>🏠 Country ➡️ {country}</p>
          <p>🌎 Continent ➡️ {cont}</p>
          <p>
            Country code ➡️ {code2} {" | | "} {code3}{" "}
          </p>

          <h4>📊 COVID STATUS</h4>
          <p>Deaths ➡ {death}</p>

          <p>Cases ➡️ {cases}</p>
          <p>Tests ➡️ {tests}</p>
          <p>Recovered ➡️ {recovered}</p>
          <p>Critical ➡️ {critical}</p>
          <p>Cases Today ➡️ {todayCases}</p>

          <p>Deaths Today ➡️{deathCases}</p>

          <p>Recovered Today ➡️ {recoveredCases}</p>
        </div>
      ) : (
        "wait or nothing to display"
      )}
    </>
  );
};
export default CovidData;
