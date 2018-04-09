import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import InfoSection from './InfoSection/InfoSection';
import { FetchExchangeRequest } from './ExchangesAction';
import { getExchange } from './ExchangesReducer';
// import styles from './../Home/Home.css';
import DocumentMeta from 'react-document-meta';
import ReactTooltip from 'react-tooltip';
// import { Manager, Reference, Popper } from 'react-popper';
// import Popover from 'react-simple-popover';
class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datahandle: '',
            openPopup: false,
            open: false
        }
    }
    componentWillMount(props) {
        this.props.dispatch(FetchExchangeRequest());
    }
   
    renderTableRows = (finalData) => {
        let rowEle = [];
        const isEmpty = (obj) => {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        }

        if (isEmpty(finalData)) {
            return (<tr><td className="loadingClass headcol" colSpan="8">Loading...</td></tr>);
        }

        for (let market in finalData) {
            var data = finalData[market];
            var listofEx = ((Array.from(new Set(finalData[market]))).join(', '));
            
            var length = '';
            if (data.length > 6) {
                length = data.length - 6;
            } else {
                length = '';
            }
            var marketName = ((market).toLowerCase().trim());
            rowEle.push(
                <tr key={`market-${market}`}>
                    <td className="coinName headcol t--blue">
                        <Link to={"/exchanges/" + marketName}><span className="t--blue">{market} </span></Link>
                    </td>
                    {(length != '') ?
                        <td className="">
                            <span className="t--black">
                                {((Array.from(new Set(finalData[market]))).splice(2, 6)).join(', ')}
                            </span>
                            <span className="" style={{ background: "#fff", border:"1px solid black", padding: "5px", marginLeft: "9px", borderRadius: "5px", display: "inline-block" }}>
                                <span data-tip={listofEx}> +{length} </span>  
                                 <ReactTooltip className="tooltipStyle" type="light" event="click" border="true"/>                                  
                            </span>
                        </td>
                        :
                        <td className="t--blue">
                            <span className="t--black">{finalData[market].join(', ')} </span>
                        </td>
                    }
                    <td className="t--blue">
                        <Link to={"/exchanges/" + marketName}><button className="primarybtn"> Visit </button></Link>
                    </td>


                </tr>
            )
        }

        return rowEle;
    }
    
    render() {
        const meta = {
            title: 'All CryptoCurrency Exchanges List | Crypto Trading Platforms - [2018]',
            description: 'List of all Cryptocurrency Exchanges | Crypto exchanges supported coins and volume amount, Find the best CryptoCurrency trading platforms! -[2018]',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'Digital Currency,react'
                }
            }
        };
        var exchangeList = [];
        var coinContent = '';
        var self = this.state;
        let finalData = {};
        if (this.props.getExchangeList.length > 0) {
            var list = this.props.getExchangeList;
            var listofdata = [];
            var coinSymbol = [];

            list.forEach(function (data, key) {
                if (listofdata.indexOf(data['MARKET']) == '-1') {
                    listofdata.push(data.MARKET);
                }
            });


            listofdata.forEach(element => {
                var datalists = list.filter((data, key) => {
                    return data.MARKET == element;
                }).map(symbol => {
                    return symbol.FROMSYMBOL;
                });
                
                finalData[element] = datalists;
            });
        }

        return (
            <DocumentMeta {...meta}>
                <InfoSection />
                <main className="main">
                    <div className="grid-container">
                        <div className="grid-x align-justify">
                            <div className="cell">
                                <div className="table-wrap l-table">
                                    <table className="table responsive js-table">
                                        <thead>
                                            <tr>
                                                <th className="headcol2" style={{ padding: "6px" }}>Exchange</th>
                                                <th className="market-cap-col">Coins</th>
                                                <th className="market-cap-col">Visit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTableRows(finalData)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </DocumentMeta>
        );
    }
}


function mapStateToProps(state) {
    return {
        getExchangeList: getExchange(state)
    };
}
export default connect(mapStateToProps)(Exchange);
