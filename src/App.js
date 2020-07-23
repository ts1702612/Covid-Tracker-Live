import React from "react";

import Cards from "./components/cards/Cards";
import Charts from "./components/charts/Charts";
import CountryPicker from "./components/countrypicker/CountryPicker";

import styles from "./App.module.css";
import { fetchData } from "./api";
import covidImage from "./Image/COVID.jpg";

class App extends React.Component {
  //  constructor state
  state = {
    data: {},
    cntry: "",
  };

  //await needs to wrap in func synchronous
  async componentDidMount() {
    const fetcheddata = await fetchData();
    this.setState({ data: fetcheddata });
  }
  handleCountryChange = async (cntry) => {
    //fetch data
    const fetcheddata = await fetchData(cntry);
    // console.log(fetcheddata);
    //set state
    //  console.log(cntry);
    this.setState({ data: fetcheddata, cntry: cntry });
  };

  render() {
    const { data, cntry } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={covidImage} alt="covid-Image" />
        <Cards data={data} />

        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} cntry={cntry} />
      </div>
    );
  }
}
export default App;
