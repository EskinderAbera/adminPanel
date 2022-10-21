import React, { Component } from "react";
import styles from "./ErrorBoundary.module.css";
import sadDog from "./resources/images/sadDog.png";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <img src={sadDog} alt="error" />
          <h1>Aaaah! Something went wrong</h1>
          <h2>Try refreshing the page or try again later.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
