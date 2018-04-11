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
            open: false,
            symbolSt: '$',
            typeId: 0
        }
    }
    componentWillMount(props) {
        this.props.dispatch(FetchExchangeRequest());
    }
    
    onchange = (e) => {
        var checkType = e.target.value;
        var selectTypeByid = '';
        var currencySymbols = '';
        switch (checkType) {
            case ('EUR'):
                selectTypeByid = 1;
                currencySymbols = '€';
                break;
            case ('ETH'):
                selectTypeByid = 2;
                currencySymbols = 'Ξ';
                break;
            default:
                selectTypeByid = 0;
                currencySymbols = '$';
        }
        this.state.typeId = selectTypeByid;
        this.state.symbolSt = currencySymbols;
        this.setState(this.state);
    }

    sumOfVol= (market, volData)=>{
        var dataElem =[];
        for (let len in volData){
          let counts = 0;
            var count = volData[len];
            var data = count.map((data, key)=>{
              if(len== market){
                return (counts += data);
              }
              return counts = null;
            });
            dataElem.push(counts);
        }
        return dataElem;
    }
   
    renderTableRows = (finalData, volData) => {
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
        if (isEmpty(volData)) {
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
                                 <ReactTooltip className="tooltipStyle" type="light" event="click"/>                                  
                            </span>
                        </td>
                        :
                        <td className="t--blue">
                            <span className="t--black">{finalData[market].join(', ')} </span>
                        </td>
                    }
                    <td className="t--blue">
                             <span className="t--black">${this.sumOfVol(market, volData)}  </span>
                        </td>
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
        let srtData = {};
        let volData = {};
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
                    return symbol.VOLUME24HOUR;
                });
                
                volData[element] = datalists;
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
                        <div className="cell shrink">
                            <select id="" onChange={this.onchange} className="selectStyle styler">
                                <option className="abc" value="all">ALL</option>
                                <option className="abc" value="USD">USD</option>
                                <option className="abc" value="EUR">EUR</option>
                                <option className="abc" value="ETH">ETH</option>
                            </select>
                        </div>
                            <div className="cell">
                                <div className="table-wrap l-table">
                                    <table className="table responsive js-table">
                                        <thead>
                                            <tr>
                                                <th className="headcol2" style={{ padding: "6px" }}></th>
                                                <th className="market-cap-col">Coins</th>
                                                <th className="market-cap-col">24h volume</th>
                                                <th className="market-cap-col">Visit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTableRows(finalData, volData)}
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
