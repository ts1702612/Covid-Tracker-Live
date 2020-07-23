import axios from "axios";

const url = "https://covid19.mathdro.id/api";
// we have asynchronus data
export const fetchData = async (cntry) => {
  let changeUrl = url;
  if (cntry) {
    changeUrl = `${url}/countries/${cntry}`;
  }
  // if fetch suucessful
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeUrl);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    // if fetch fails
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    // data here is array
    const { data } = await axios.get(`${url}/daily`);
    //as data is array use map
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    // console.log(response);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
