import React, { Component } from 'react';
import callApi from '../../../util/apiCaller';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getMask } from './visitexchangereducer';
import { maskStatus } from './visitexchangeaction';


class Mask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeName: props.location.query.exchange,
    }
  }

  componentDidMount() {
    if (this.props.maskstatus) {
      browserHistory.push('exchanges');
    }
    else {
      callApi('exchangeMarket?market=' + this.state.exchangeName).then(res => {
        if (res.externalLink) {
          // window.location = res.externalLink;
          window.open(res.externalLink, '_blank');
          browserHistory.push('exchanges');
        }
        else {
          this.props.dispatch(maskStatus(true));
          browserHistory.push('/exchanges/' + this.state.exchangeName);
        }
      });
    }
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


function mapStateToProps(state) {
  return {
    maskstatus: getMask(state)
  };
}

export default connect(mapStateToProps)(Mask);
