import React, { Component } from "react";
import { Link } from "react-router-dom";

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handleNext() {
    const incrementCurrrent = (current, quoteCount) => {
      if (current + 1 == quoteCount || quoteCount == 0) {
        return 0;
      }

      return current + 1;
    };

    this.setState(state => {
      const { current } = this.state;
      const { quotes } = this.props;

      return {
        current: incrementCurrrent(current, quotes.length)
      };
    });
  }

  handlePrevious() {
    const incrementCurrrent = (current, quoteCount) => {
      if (quoteCount == 0) {
        return 0;
      }

      if (current == 0) {
        return quoteCount - 1;
      }

      return current - 1;
    };

    this.setState(state => {
      const { current } = this.state;
      const { quotes } = this.props;
      return {
        current: incrementCurrrent(current, quotes.length)
      };
    });
  }

  render() {
    const { current } = this.state;
    const { quotes } = this.props;

    return (
      <div className="quotes-gallery">
        <div className="open-quote" />
        <div className="content">
          {quotes.length > 0 && (
            <div>
              <h2>{`${quotes[current].quoteText}`}&rdquo;</h2>
              <h5>{quotes[current].attribution}</h5>
            </div>
          )}
        </div>

        <div className="controls">
          <button onClick={this.handleNext}>
            <div className="arrow-right"></div>
          </button>
          <button onClick={this.handlePrevious}>
            <div className="arrow-left"></div>
          </button>
        </div>
      </div>
    );
  }
}

export default Quotes;
