import React from 'react';
import './ScrollToTop.css'

export default class ScrollToTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonClassName: "top-link hide"};
    this.handleClick = this.handleClick.bind(this);
    this.scrollFunc = this.scrollFunc.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  componentDidMount() {
      window.addEventListener("scroll", this.scrollFunc);
  }
  // Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
  scrollFunc() {
    // Get the current scroll value
    let y = window.scrollY;
    const c = document.documentElement.scrollTop || document.body.scrollTop;

    // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
    if (y > 0) {
      // this.state.className = "top-link show";
      this.setState({ buttonClassName: "top-link show"});
      console.log('top-link show', y, c);
    } else {
      // this.state.className = "top-link hide";
      this.setState({ buttonClassName: "top-link hide"});
      console.log('top-link hide', y, c);

    }
  }
  render() {
    return (
    <div className={this.state.buttonClassName} id="js-top" onClick = {this.handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6">
            <path d="M12 6H0l6-6z" /></svg>
        <span className="screen-reader-text">Back to top</span>
    </div>
    )
  }
  scrollToTop () {
    // Let's set a variable for the number of pixels we are from the top of the document.
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    
    // If that number is greater than 0, we'll scroll back to 0, or the top of the document.
    // We'll also animate that scroll with requestAnimationFrame:
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop);
      // ScrollTo takes an x and a y coordinate.
      // Increase the '10' value to get a smoother/slower scroll!
      window.scrollTo(0, c - c / 10);
    }
  }
  handleClick(e) {
    e.preventDefault();
    console.log("in func");
    this.scrollToTop();
  }
}
