import React from 'react';
import InfoIcon from './InfoIcon'
class Header extends React.Component {
    render() {
      return (
        <div className="container">
          <div className="d-flex bd-highlight">
              <div className="p-2 flex-fill bd-highlight">
                  <h1>United States COVID-19 Changepoint Analysis</h1>
              </div>
              <InfoIcon />
          </div> 
        </div>
  )}
}
  
export default Header;
