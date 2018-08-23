import React, { Component } from 'react';
import callApi from '../../../util/apiCaller';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Mask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeName: props.location.query.exchange,
    }
  }

  componentDidMount() {
    callApi('exchangeMarket?market=' + this.state.exchangeName).then(res => {
      if (res.externalLink) {
        window.open(res.externalLink, '_blank');
        browserHistory.goBack();
      }
      else {
        browserHistory.replace('/exchanges/' + this.state.exchangeName);
      }
    });
  }

  render() {

    return (
      <div>
        <div style={{
          textAlign: "center",
          marginTop: "19%",
          fontSize: "18px"
        }}>
          Working on exchange please wait...
        </div>
        <div style={{
          textAlign: "center",
          marginTop: "20%",
          fontSize: "18px"
        }}>
          {/* Working on exchange please wait... */}
        </div>
      </div>
    )
  }
}


export default Mask;
