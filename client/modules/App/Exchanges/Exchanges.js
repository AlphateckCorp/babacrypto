import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import InfoSection from './InfoSection/InfoSection';
import { FetchExchangeRequest } from './ExchangesAction';
import { getExchange } from './ExchangesReducer';
// import styles from './../Home/Home.css';
import DocumentMeta from 'react-document-meta';
import ReactTooltip from 'react-tooltip';
import numeral from 'numeral';

// import { Manager, Reference, Popper } from 'react-popper';
// import Popover from 'react-simple-popover';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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

    sumOfVol = (market, volData) => {
        var dataElem = [];
        for (let len in volData) {
            let counts = 0;
            var count = volData[len];
            var data = count.map((data, key) => {
                if (len == market) {
                     return (counts += data);
                }
                return counts = '';
            });
            dataElem.push(counts);
        }
        return dataElem;
    }

    renderTableRows = (finalData, volData, lists) => {
        var rowEle = [];
        const isEmpty = (obj) => {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        }
        // if (isEmpty(finalData)) {
        //     return (<tr><td className="loadingClass headcol" colSpan="8">Loading...</td></tr>);
        // }
        // if (isEmpty(volData)) {
        //     return (<tr><td className="loadingClass headcol" colSpan="8">Loading...</td></tr>);
        // }

        var i = 1;
        for (let market in finalData) {

            var visitLinkj = lists.find(data=> {
                return data.MARKET == market;
            });

            var data = finalData[market];
            var listofEx = ((Array.from(new Set(finalData[market]))).join(', '));

            var length = '';
            if (data.length > 6) {
                length = data.length - 6;
            } else {
                length = '';
            }
            var marketName = ((market).toLowerCase().trim());
           
            // rowEle.push({
            //     id: i++,
            //     marketName: market,
            //     coins: finalData[market],
            //     vol24h: this.sumOfVol(market, volData),
            //     visit: market
            // });
            rowEle.push({
                id: i++,
                marketName: market,
                coins: finalData[market],
                vol24h: this.sumOfVol(market, volData),
                visit: visitLinkj
            });
        }
        return rowEle;
    }
    
    render() {
        var rowEle = [];
        const meta = {
            title: 'All CryptoCurrency Exchanges List | Crypto Trading Platforms - 2018',
            description: 'List of all Cryptocurrency Exchanges | Crypto exchanges supported coins and volume amount, Find the best CryptoCurrency trading platforms! - 2018',
        };
        var exchangeList = [];
        var coinContent = '';
        var self = this.state;
        let finalData = {};
        let srtData = {};
        let volData = {};
        var lists = {};
        if (this.props.getExchangeList.length > 0) {
            var list = this.props.getExchangeList;
            lists = list;
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
        const LinkAction = (action, listObj) => {
            var marketName = ((action).toLowerCase().trim());
            return (
                <Link to={"/exchanges/" + marketName}>
                    <span className="t--blue">{action}</span>
                </Link>
            );
        };
        const visitAction = (action, listObj) => {
            
            if(action.externalLink==''){
                var marketName = ((action.MARKET).toLowerCase().trim());
                return (
                    <Link to={"/exchanges/" + marketName} target="_blank" rel="nofollow">
                        <button className="primarybtn"> Visit </button>
                    </Link>
                );
            }else{
                return (
                    <a href={action.externalLink} target="_blank"> 
                    <button className="primarybtn"> Visit </button>
                    </a>
                )
            }

        }
        var options = {
            // noDataText: (<span className="loadingClass headcol" colSpan="6"> Record Not Found!! </span>)
            noDataText: (<span className="loadingClass headcol" colSpan="6"> Loading... </span>)
        };
        const coinShowAction = (action, listObj) => {
            var data = (Array.from(new Set(action)))
            var listofEx = ((Array.from(new Set(action))).join(', '));
            var showCoins = '';
            var showCoinslist = '';
            var length = '';
            if (data.length > 6) {
                length = data.length -6;
                showCoins = ((Array.from(new Set(action))).splice(1, 6)).join(', ');
                showCoinslist =(
                <div>
                    <span className="t--black">{showCoins}</span>
                    <span className="" style={{ background: "#fff", border: "1px solid black", padding: "5px", marginLeft: "9px", borderRadius: "5px", display: "inline-block" }}>
                        <span data-tip={listofEx}> +{length} </span>
                        <ReactTooltip className="tooltipStyle" type="light" event="click" border={true} />
                    </span>
                </div>);
            } else {
                length = '';
                showCoins = (Array.from(new Set(action))).join(', ');
                showCoinslist =  <span className="t--black">{showCoins} </span>
            }
           
            return (
                <div>
                    {showCoinslist}
                </div>
            );

        };

        const vol24hAction = (action, listObj) =>  {
            var data = action.filter(function(v){return v!==''});
            return (self.symbolSt + "" + numeral(data).format('0,0.000'))
        }
        const vol24hSortFunc = (a, b, order) => {
            var aData = (a.vol24h).filter(function(v){return v!==''});  
            var bData = (b.vol24h).filter(function(x){return x!==''});  
            if (order === 'desc') {
                return (Number(bData) - Number(aData));
            } else {
                return (Number(aData) - Number(bData));
            }
        }

        
        return (
          <div>
            <DocumentMeta {...meta}>
                <InfoSection />
                <main className="main">
                    <div className="grid-container">
                        <div className="grid-x align-justify">
                            <div className="cell shrink">
                            </div>
                            {/*                         
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
                            </div> */}
                            <div className="cell">
                            <div className="table-wrap l-table">
                            <BootstrapTable data={this.renderTableRows(finalData, volData, lists)} striped hover options={options}>
                                <TableHeaderColumn isKey dataField='id' dataSort={true} width='50'>#</TableHeaderColumn>
                                <TableHeaderColumn dataField='marketName' dataSort={true} dataFormat={LinkAction} width='125'>Exchange</TableHeaderColumn>
                                <TableHeaderColumn dataField='coins' width='320' dataFormat={coinShowAction}>Coins</TableHeaderColumn>
                                <TableHeaderColumn dataField='vol24h' width='150' dataSort sortFunc={vol24hSortFunc}  dataFormat={vol24hAction} >24h volume</TableHeaderColumn>
                                <TableHeaderColumn dataField='visit' width='150' dataFormat={visitAction} > Visit</TableHeaderColumn>
                            </BootstrapTable>
                            </div>
                            </div>
                        </div>
                    </div>
                </main>
            </DocumentMeta >
          </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        getExchangeList: getExchange(state)
    };
}
export default connect(mapStateToProps)(Exchange);
