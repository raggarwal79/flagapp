import React, { Component } from 'react';
import './App.css';
import Autocomplete from "./Autocomplete";
import { CONTINENT_CONFIG } from "./constants/continents";

class App extends Component {
  state = {
    activeOption: 0,
    filteredOptions: [],
    filteredCountriesOptions: [],
    showOptions: false,
    showCountriesOptions: false,
    userInput: "",
    showCountries: false,
    selectedCountry: "",
    selectedFlag: ""
  };

  // function to get all continents
  handleContinent = () => {
    return CONTINENT_CONFIG.map((continent, index) => continent.continent);
  };

  // function to get countries
  handleCountries = selectedContinent => {
    const options = this.handleContinent();

    if (selectedContinent) {
      const filteredOptions = CONTINENT_CONFIG.filter(
        optionName => optionName.continent == selectedContinent
      );
      console.log("filteredOptions", filteredOptions.length);
      //return filteredOptions[0].countries;
      const filteredCountriesOptions = filteredOptions[0].countries.map(
        (country, index) => country.name
      );
      
      this.setState({
        activeOption: 0,
        filteredCountriesOptions: filteredCountriesOptions,
        showOptions: true,
        showCountries: true,
        showCountriesOptions: true
      });
    }
  };

  // function to handle change event
  handleChange = e => {
    const options = this.handleContinent();
    const userInput = e.target.value;
    const filteredOptions = options.filter(
      optionName =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  // function to handle click event
  handleClick = e => {
    this.handleCountries(e.currentTarget.innerText);
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // function to handle country click event
  handleCountryClick = e => {
    //console.log("final selected", e.currentTarget.innerText);
    //console.log(this.state.userInput);
    //console.log(CONTINENT_CONFIG);
    const flagSelected = "";
    const filteredOptions = CONTINENT_CONFIG.filter(
      optionName => optionName.continent == this.state.userInput
    );
    // console.log(filteredOptions[0].countries);
    const filteredCountry = filteredOptions[0].countries.filter(
      optionName => optionName.name == e.currentTarget.innerText
    );

    console.log(filteredCountry[0].name);
    console.log(filteredCountry[0].flag);
    //flagSelected.push(filteredCountry[0].flag);
    //this.handleCountries(e.currentTarget.innerText);
    this.setState({
      selectedCountry: filteredCountry[0].name,
      selectedFlag: this.state.selectedFlag + "" + filteredCountry[0].flag
    });
  };

  // function to handle click event
  clearFlags = e => {
     
    this.setState({
      selectedFlag: "",

      showCountriesOptions: false
    });
  };

  render() {
    return (
      <div>
        <div className="center">
          <div className="heading_text">
            <span>Flag Picker</span>
          </div>
          <div>
            <span className="sub_heading_text">
              This app will help you learn flags around the world in{" "}
              <u>3 steps</u>
            </span>
          </div>
        </div>
        <div className="App">
          Step 1:
          <Autocomplete
            options={this.handleContinent()}
            onChange={this.handleChange}
            onClick={this.handleClick}
            activeOption={this.state.activeOption}
            filteredOptions={this.state.filteredOptions}
            showOptions={this.state.showOptions}
            userInput={this.state.userInput}
          />
        </div>
        <div className="App">
          {this.state.showCountries ? (
            <div>
              <div>Step 2</div>
              <div>
                <Autocomplete
                  options={this.handleCountries()}
                  onClick={this.handleCountryClick}
                  activeOption={this.state.activeOption}
                  filteredOptions={this.state.filteredCountriesOptions}
                  showOptions={this.state.showCountriesOptions}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div>
          {this.state.selectedFlag ? (
            <div>
              <div className="flag">{this.state.selectedFlag}</div>
              <div>
                <button onClick={this.clearFlags}>Clear Flag</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
