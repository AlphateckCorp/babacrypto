import React, { Component } from 'react';
import callApi from '../../../util/apiCaller';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { browserHistory } from 'react-router';

class Mask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeName: props.params.marketname,
      meta:{
        title:'Visit Exchange'
      }
    }
  }

  componentWillMount() {
    callApi('exchangeMarket?market=' + this.state.exchangeName).then(res => {
      if (res.externalLink) {
        window.location.replace(res.externalLink);
        // browserHistory.goBack();
      }
      else {
        if (this.props.location.state && this.props.location.state.prevPath === '/exchanges/' + this.state.exchangeName) {
          browserHistory.goBack();
        } else {
          browserHistory.replace('/exchanges/' + this.state.exchangeName);
        }
      }
    });
  }

  render() {
    return (
      <DocumentMeta {...this.state.meta}>
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
      </DocumentMeta>
    )
  }
}


export default Mask;
