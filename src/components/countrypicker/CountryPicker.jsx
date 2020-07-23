import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      setCountry(await fetchCountries());
    };

    fetchCountry();
  }, [setCountry]);
  // console.log(country);
  return (
    <FormControl className={styles.FormControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        {/* how options should be */}
        <option value="">Global</option>
        {country.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
export default CountryPicker;
