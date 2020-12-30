import React from 'react';

class Header extends React.Component {
    render() {
      return (
        <div className="container">
        <div className="d-flex bd-highlight">
            <div className="p-2 flex-fill bd-highlight">
                <h1>United States COVID-19 Changepoint Analysis</h1>
            </div>
            <div className="p-2 flex-fill bd-highlight">
                <h1><span data-toggle="modal" data-target="#exampleModal">
                        <i className="fa fa-info" aria-hidden="true"></i></span></h1>
            </div>
        </div>
    </div>
  )}
}
  
export default Header;
