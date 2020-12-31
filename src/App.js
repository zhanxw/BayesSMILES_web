import React from 'react';
import Header from './Header'
import Content from './Content'
import ScrollToTop from './ScrollToTop'

import background from "./background.png";

class App extends React.Component {
  render() {
    return (
      <div style={{ backgroundImage: `url(${background})`}} 
      >
        <Header />
        <Content />
        <ScrollToTop />
      </div>
    )
  }
}

export default App;
