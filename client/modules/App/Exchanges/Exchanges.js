import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import InfoSection from './InfoSection/InfoSection';
import { FetchExchangeRequest } from './ExchangesAction';
import { getExchange } from './ExchangesReducer';
import { browserHistory } from 'react-router';
import DocumentMeta from 'react-document-meta';
import ReactTooltip from 'react-tooltip';
import numeral from 'numeral';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import styles from '../App.css';


class Exchange extends Component {
    limit = 100;
    sort = ['id', 'asc'];
    filter;
    totalRecords = 0;

    constructor(props) {
        super(props);
        this.state = {
            datahandle: '',
            openPopup: false,
            open: false,
            symbolSt: '$',
            typeId: 0,
            sortOrder: {
                market: 'asc',
                VOLUME24HOUR: 'asc'
            },
            name: '',
            sorting: {
                forAll: false,
                market: false,
                VOLUME24HOUR: false
            }
        }
    }

    componentWillMount(props) {
        this.props.dispatch(FetchExchangeRequest(this.limit, this.sort));
    }

    componentDidMount = (props) => {
        window.addEventListener('scroll', this.handleScroll);
    };

    tick = (props) => {
        this.props.dispatch(FetchExchangeRequest(this.limit, this.sort));
    };

    componentWillUnmount = (props) => {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = (e) => {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            // ajax call get data from server and append to the div
            if (this.limit < this.totalRecords) {
                this.limit = this.limit + 100;
                this.tick();
            }
        }
    };


    goToVistExchange = (e) => {
        e.preventDefault();
    }

    onSortChange = (name) => {
        let sorting = this.state.sorting;
        sorting["forAll"] = true;
        sorting[name] = true;
        this.setState({ name: name, sorting });
        let sortOrder = this.state.sortOrder;
        let order = sortOrder[name];
        this.sort = [name, order];
        this.tick();
        order === 'asc' ? sortOrder[name] = 'desc' : sortOrder[name] = 'asc';
        this.setState({ sortOrder });
    }

    renderCustomHeader(headerName, name) {
        let header;
        if (this.state.sorting[name]) {
            header = <p className={styles.header} onClick={() => this.onSortChange(name)}>{headerName}&nbsp;
                {this.state.sortOrder[name] === 'desc' ? <span><i style={{ fontSize: 12 }} className="fa fa-caret-up"></i></span> :
                    <span><i style={{ fontSize: 12 }} className="fa fa-caret-down"></i></span>}
            </p>
        }
        else {
            header = <p className={styles.header} onClick={() => this.onSortChange(name)}>{headerName}&nbsp;
                <i style={{ fontSize: 12, color: "#cfd1d3" }} className="fa fa-caret-down"></i><i style={{ fontSize: 12, color: "#cfd1d3" }} className="fa fa-caret-up"></i>
            </p>
        }
        return header;
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
            var marketName = ((listObj.market).toLowerCase().trim());
            if (listObj.coins) {
                return (
                    <Link to={"/visit-exchange/" + marketName} target="_blank" rel="nofollow" >
                        <button className="primarybtn"> Visit </button>
                    </Link>
                );
            } else {
                return (
                    <button className="disabledbtn" disabled> Visit </button>
                );
            }
        }

        var options = {
            noDataText: (<span className="loadingClass headcol" colSpan="6"> Loading... </span>)
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
                                <div className="cell">
                                    <div className="table-wrap l-table">
                                        <BootstrapTable data={list} striped hover options={options}>
                                            <TableHeaderColumn isKey dataField='id' width='50'>#</TableHeaderColumn>
                                            <TableHeaderColumn dataField='market' dataFormat={LinkAction} width='125'>{this.renderCustomHeader('Exchange', 'market')}</TableHeaderColumn>
                                            <TableHeaderColumn dataField='coins' dataFormat={coinShowAction} width='320'>Coins</TableHeaderColumn>
                                            <TableHeaderColumn dataField='VOLUME24HOUR' dataFormat={vol24hAction} width='150'  >{this.renderCustomHeader('24h volume', 'VOLUME24HOUR')}</TableHeaderColumn>
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
        getExchangeList: getExchange(state),
    };
}
export default connect(mapStateToProps)(Exchange);
