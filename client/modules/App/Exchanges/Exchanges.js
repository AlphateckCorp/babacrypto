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
    limit = 100;
    sort = ['id','asc'];
    filter;
    totalRecords = 0;

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
        this.props.dispatch(FetchExchangeRequest(this.limit,this.sort));
    }

    componentDidMount = (props) => {
        window.addEventListener('scroll', this.handleScroll);
    };

    tick = (props) => {              
        this.props.dispatch(FetchExchangeRequest(this.limit,this.sort));
    };

    componentWillUnmount = (props) => {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = (e) => {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            // ajax call get data from server and append to the div
            if(this.limit < this.totalRecords) {
                this.limit = this.limit+100;
                this.tick();
            }
        }
    };

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
        var list;
        if (this.props.getExchangeList.rows && this.props.getExchangeList.rows.length > 0) {
            var records = this.props.getExchangeList;
            list = records.rows;
            this.totalRecords = records.count;        
        }

        const LinkAction = (action, listObj) => {
            var marketName = ((action).toLowerCase().trim());
            if (listObj.coins) {
                return (
                    <Link to={"/exchanges/" + marketName}>
                        <span className="t--blue">{action}</span>
                    </Link>
                );
            } else {
                return (
                <span className="t--gray">{action}</span>
                );
            }
        };

        const visitAction = (action, listObj) => {                        
            if (action == '') {
                var marketName = ((listObj.market).toLowerCase().trim());
                if (listObj.coins) {
                    return (
                        <Link to={"/exchanges/" + marketName} target="_blank" rel="nofollow">
                            <button className="primarybtn"> Visit </button>
                        </Link>
                    );
                } else {
                    return (
                        <button className="disabledbtn" disabled> Visit </button>
                    );
                }
            } else {
                return (
                    <a href={action} target="_blank" rel="nofollow">
                        <button className="primarybtn"> Visit </button>
                    </a>
                )
            }

        }

        var options = {
            noDataText: (<span className="loadingClass headcol" colSpan="6"> Loading... </span>),
            onSortChange: (sortName, sortOrder) => {
                this.sort = [sortName, sortOrder];
                this.tick();
            }
        };
        
        const coinShowAction = (action, listObj) => {
            if (action) {
                var data = action.split(',');
                var listofEx = data.join(', ');
                var showCoins = '';
                var showCoinslist = '';
                var length = '';
                if (data.length > 6) {
                    length = data.length - 6;
                    showCoins = data.splice(1, 6).join(', ');
                    showCoinslist = (
                        <div>
                            <span className="t--black">{showCoins}</span>
                            <span className="" style={{ background: "#fff", border: "1px solid black", padding: "5px", marginLeft: "9px", borderRadius: "5px", display: "inline-block" }}>
                                <span data-tip={listofEx}> +{length} </span>
                                <ReactTooltip className="tooltipStyle" type="light" event="click" border={true} />
                            </span>
                        </div>);
                } else {
                    length = '';
                    showCoins = data.join(', ');
                    showCoinslist = <span className="t--black">{showCoins} </span>
                }

                return (
                    <div>
                        {showCoinslist}
                    </div>
                );
            }
        };

        const vol24hAction = (action, listObj) => {
            // var data = action.filter(function (v) { return v !== '' });
            return (self.symbolSt + "" + numeral(action).format('0,0.000'))
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
                                        {/* <BootstrapTable data={this.renderTableRows(finalData, volData, lists)} striped hover options={options}>
                                            <TableHeaderColumn isKey dataField='id' dataSort={true} width='50'>#</TableHeaderColumn>
                                            <TableHeaderColumn dataField='marketName' dataSort={true} dataFormat={LinkAction} width='125'>Exchange</TableHeaderColumn>
                                            <TableHeaderColumn dataField='coins' width='320' dataFormat={coinShowAction}>Coins</TableHeaderColumn>
                                            <TableHeaderColumn dataField='vol24h' width='150' dataSort sortFunc={vol24hSortFunc} dataFormat={vol24hAction} >24h volume</TableHeaderColumn>
                                            <TableHeaderColumn dataField='visit' width='150' dataFormat={visitAction} > Visit</TableHeaderColumn>
                                        </BootstrapTable> */}
                                        <BootstrapTable data={list} striped hover options={options}>
                                            <TableHeaderColumn isKey dataField='id' width='50'>#</TableHeaderColumn>
                                            <TableHeaderColumn dataField='market' dataSort dataFormat={LinkAction} width='125'>Exchange</TableHeaderColumn>
                                            <TableHeaderColumn dataField='coins' dataFormat={coinShowAction} width='320'>Coins</TableHeaderColumn>
                                            <TableHeaderColumn dataField='VOLUME24HOUR' dataSort dataFormat={vol24hAction} width='150'  >24h volume</TableHeaderColumn>
                                            <TableHeaderColumn dataField='externalLink' dataFormat={visitAction} width='150' > Visit</TableHeaderColumn>
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
