import React, { Component } from "react";

export class Autocomplete extends Component {
    render() {
    const {
      onChange,
      onClick,
      activeOption,
      filteredOptions,
      showOptions,
      userInput
    } = this.props;
        
         
    let optionList;
    if (showOptions) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            value={userInput}
          />
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
