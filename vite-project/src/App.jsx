import axios from "axios";
import { useState, useEffect } from "react";
export const BACK_ENDPOINT1 =
  "https://crio-location-selector.onrender.com/countries";

function App() {
  const [countries, setCountires] = useState([]);
  const [selectedCountry, setCountry] = useState("");
const [states, setStates] = useState("");
  const [selectedState, setState] = useState("");
  const [cities, setcities] = useState("");
  const[city,setCity] =useState("");

  useEffect(() => {
    fetchcountry();
  }, []);

  const handlechange3 = (event) => {
    setCity(event.target.value);
    
  };

  const handlechange2 = (event) => {
    setState(event.target.value);
    fetchcity(selectedCountry,event.target.value);
  };

  const handlechange = (event) => {
    setCountry(event.target.value);
    fetchstate(event.target.value);
  };

  const fetchstate = async (country) => {
    console.log(country);
    const url = `https://crio-location-selector.onrender.com/country=${country}/states`;
    try {
      const response = await axios.get(url);

      setStates(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchcountry = async () => {
    const url = BACK_ENDPOINT1;
    try {
      const response = await axios.get(url);

      setCountires(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchcity = async (countryName, stateName) => {
    const url = `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`;

    try {
      const response = await axios.get(url);

      setcities(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Select location</h1>
      <div>
        <select onChange={handlechange} value={selectedCountry}>
          <option value="">Select Country</option>
          {countries.map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
        </select>
        <select onChange={handlechange2} value={selectedState} disabled={!states}>
          <option value="">Select States</option>
          {states
            ? states.map((val, i) => (
                <option key={i} value={val}>
                  {val}
                </option>
              ))
            : ""}
        </select>
        <select onChange={handlechange3} value={city} disabled={!cities}> 
          <option value="">Select city</option>
          {cities
            ? cities.map((val, i) => (
                <option key={i} value={val}>
                  {val}
                </option>
              ))
            : ""}
        </select>
      </div>
      <div>{
        (selectedCountry && selectedState&& city)?("You selected, " + selectedCountry +" "+ selectedState + " "+ city):""
      }
      </div>
    </>
  );
}

export default App;
