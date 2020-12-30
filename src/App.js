import React from 'react';
import Header from './Header'
import Content from './Content'
import ScrollToTop from './ScrollToTop'

// import './scroll_to_top.css';
// import scroll_to_to from './scroll_to_top'

//import 'bootstrap';

// require('bootstrap')  
// import logo from './logo.svg';
// import './App.css';

//export default 

///export default 

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Content />
//       <BackToTop />
//     </div>
//   );
// }

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
        <ScrollToTop />
      </div>
    )
  }
}

export default App;
