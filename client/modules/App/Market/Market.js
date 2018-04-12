import React, { Component } from 'react';
import { Link } from 'react-router';
import { RingLoader, SyncLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { FetchMarketRequest } from './MarketAction';
import { getMarket } from './MarketReducer';
import numeral from 'numeral';
import ReactTooltip from 'react-tooltip';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            symbolSt: '$',
            typeId: 0,
            symbolName: 'USD',
        }
    }
    componentWillMount(props) {
        var MarketName = this.props.params.market;
        this.props.dispatch(FetchMarketRequest(MarketName));
    }
    componentDidMount(props) {
        var MkName = this.props.params.market;
        var data = MkName.charAt(0).toUpperCase() + MkName.substr(1);
        document.title = data + " Markets";
    }

    onchange = (e) => {
        var checkType = e.target.value;
        var selectTypeByid = '';
        var currencySymbols = '';
        var symbolName = '';
        switch (checkType) {
            case ('EUR'):
                selectTypeByid = 1;
                currencySymbols = '€';
                symbolName = 'EUR';
                break;
            case ('ETH'):
                selectTypeByid = 2;
                currencySymbols = 'Ξ';
                symbolName = 'ETH';
                break;
            case ('BTC'):
                selectTypeByid = 3;
                currencySymbols = 'B';
                symbolName = 'BTC';
                break;
            default:
                selectTypeByid = 0;
                currencySymbols = '$';
                symbolName = 'USD';
        }
        this.state.typeId = selectTypeByid;
        this.state.symbolSt = currencySymbols;
        this.state.symbolName = symbolName;
        this.setState(this.state);
    }

    coinNameCall = (exchangecoin) => {
        var exName = this.props.params.market;
        var excoins = exchangecoin;
        var listofEx = ((Array.from(new Set(excoins))).join(', '));
        var length = '';
        if (excoins.length > 6) {
            length = excoins.length - 6;
        } else {
            length = '';
        }
        var self = this.state;
        return (
            <div>
                <h1 className="top_pad_heading" style={{ textTransform: "capitalize" }}>{this.props.params.market} Review </h1>

                <div className="grid-x mainCoinshow" >

                    <div className="medium-4 small-12">
                        <div className="medium-12" style={{ fontSize: "24px" }}>
                            Exchange Name
                            </div>
                        <div className="medium-12">
                            <div className="medium-12" style={{ fontSize: "24px", color: "#767B7F", textTransform: "capitalize" }}>
                                {exName}
                            </div>
                        </div>
                    </div>
                    <div className="medium-4 small-12">
                        <div className="medium-12" style={{ fontSize: "24px" }}>
                            Supported Coins
                            </div>
                        <div className="medium-12">
                            <div className="medium-12" style={{ fontSize: "18px", color: "#767B7F" }}>


                                {(length != '') ?
                                    <span className="" style={{ fontSize: "16px", fontWeight: "600" }}> {((Array.from(new Set(excoins))).splice(0, 6)).join(', ')}
                                        <span data-tip={listofEx} className="t--blue" style={{ fontSize: "16px", fontWeight: "600" }}> +{length} </span>
                                        <ReactTooltip className="tooltipStyle" type="light" event="click" border={true} />
                                    </span>
                                    : excoins.join(', ')}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        var coinSymbolList = [];
        var errorActive = false;
        var selectType = '';
        var MarketList = '';
        var self = this.state;
        var marketVol24Hour = 0;
        if (this.props.MarketList != undefined && this.props.MarketList.length > 0) {
            MarketList = this.props.MarketList;
            var opArr = ['USD', 'ETH', 'EUR', 'BTC'];
            MarketList.forEach((mk) => {
                if (coinSymbolList.indexOf(mk['FROMSYMBOL']) == '-1') {
                    coinSymbolList.push(mk['FROMSYMBOL']);
                }
            });
            var selectType = opArr.map((data, key) => {
                return (<option key={key} className="abc" value={data}>{data}</option>);
            });

            var datalist = MarketList.filter((data) => {
                return data.TOSYMBOL == self.symbolName;
            });

            if (datalist.length > 0) {
                var exchangeMarketlist = datalist.map((data, key) => {
                    var boundedPrecision = 8;
                    var value = data.PRICE;
                    var CHANGE24HOUR = data.CHANGE24HOUR;
                    marketVol24Hour += parseFloat(data.VOLUME24HOUR);
                    var power = Math.pow(10, 8);
                    function roundingFunction(x) {
                        return Number.parseFloat(x).toFixed(8);
                    }
                    var valueToRound = ((value.toString().indexOf('e') >= 0) ? (value * power) : (value + 'e+' + boundedPrecision));
                    var CHANGE24HOURROUND = ((value.toString().indexOf('e') >= 0) ? (CHANGE24HOUR * power) : (CHANGE24HOUR + 'e+' + boundedPrecision));
                    var outputz = ((roundingFunction(valueToRound) / power).toFixed(boundedPrecision));
                    var change24hours = ((roundingFunction(CHANGE24HOURROUND) / power).toFixed(boundedPrecision));
                    /*
                    return (<tr key={key}>
                        <td className="headcol" style={{ width: "50px" }}>{key + 1}</td>
                        <td className="coinName headcol2 t--blue">{data.FROMSYMBOL}/{data.TOSYMBOL}</td>
                        <td>{self.symbolSt}
                            {(numeral(data.PRICE).format('0,0[.]00000000') == 'NaN') ? outputz : numeral(data.PRICE).format('0,0.00000000')}
                        </td>
                        <td className={(data.CHANGE24HOUR > 0) ? "t--green" : "t--red"}> {numeral(data.CHANGEPCT24HOUR).format('0,0.000')} %</td>
                        <td className={(data.CHANGE24HOUR > 0) ? "t--green" : "t--red"}>{self.symbolSt}
                      
                            {(numeral(data.CHANGE24HOUR).format('0,0[.]00000000') == 'NaN') ? change24hours : numeral(data.CHANGEPCT24HOUR).format('0,0.00000000')}
                        </td>
                        <td>{self.symbolSt}{numeral(data.VOLUME24HOUR).format('0,0.000')}</td>
                    </tr>);
                    */
                    const datazls = {
                        "id": key + 1,
                        "marketName": data.FROMSYMBOL + "/" + data.TOSYMBOL,
                        "price": data.PRICE,
                        "changePct24Hour": data.CHANGEPCT24HOUR,
                        "change24Hour": data.CHANGE24HOUR,
                        "vol24h": data.VOLUME24HOUR
                    }
                    return datazls;

                });
            }
            else {
                errorActive = true;
                exchangeMarketlist = [];

            }
        }

        const numberLayout = (action, listObj) => {


            var power = Math.pow(10, 8);
            function roundingFunction(x) {
                return Number.parseFloat(x).toFixed(8);
            }
            var boundedPrecision = 8;
            var value = action;
            var valueToRound = ((value.toString().indexOf('e') >= 0) ? (value * power) : (value + 'e+' + boundedPrecision));
            var outputz = ((roundingFunction(valueToRound) / power).toFixed(boundedPrecision));


            var data = '';
            if (action == listObj.price) {
                // return (self.symbolSt + "" + numeral(action).format('0,0.00'));
                // return ((numeral(action).format('0,0[.]00000000') == 'NaN') ? outputz : numeral(action).format('0,0.00000000'));
                return (self.symbolSt + "" + ((numeral(action).format('0,0[.]00000000') == 'NaN') ? outputz : numeral(action).format('0,0.00000000')));

            } else if (action == listObj.changePct24Hour) {
                // return data = <span className={(action >= 0)? "t--green": "t--red" }>{self.symbolSt}{numeral(action).format('0,0.000')}</span>

                return data = <span className={(action >= 0) ? "t--green" : "t--red"}> {self.symbolSt} {((numeral(action).format('0,0[.]00000000') == 'NaN') ? outputz : numeral(action).format('0,0.00000000'))} </span>;

            } else if (action == listObj.change24Hour) {
                // return data = <span className={(action >= 0)? "t--green": "t--red" }>{self.symbolSt}{numeral(action).format('0,0.000')}</span>
                return data = <span className={(action >= 0) ? "t--green" : "t--red"}> {self.symbolSt} {((numeral(action).format('0,0[.]00000000') == 'NaN') ? outputz : numeral(action).format('0,0.00000000'))} </span>;

            } else if (action == listObj.vol24h) {
                // return (self.symbolSt + "" + numeral(action).format('0,0.000'));
                return (self.symbolSt + "" + ((numeral(action).format('0,0[.]00000000') == 'NaN') ? outputz : numeral(action).format('0,0.00000000')));
            }
        };
        const vol24hSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.vol24h) - Number(a.vol24h));
            } else {
                return (Number(a.vol24h) - Number(b.vol24h));
            }
        };
        const change24HourSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.change24Hour) - Number(a.change24Hour));
            } else {
                return (Number(a.change24Hour) - Number(b.change24Hour));
            }
        };
        const changePct24HourSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.changePct24Hour) - Number(a.changePct24Hour));
            } else {
                return (Number(a.changePct24Hour) - Number(b.changePct24Hour));
            }
        };
        const priceSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.price) - Number(a.price));
            } else {
                return (Number(a.price) - Number(b.price));
            }
        };
        const blueLayout = (action, listObj) => {
            return (<span className="t--blue"> {action}</span>)
        }
        var options = {
            noDataText: (<span className="loadingClass headcol" colSpan="6"> Record Not Found!! </span>)
            // noDataText: (<span className="loadingClass headcol" colSpan="6"> Loading... </span>)
        };
        return (
            <div>
                <main className="main">
                    <div className="grid-container" style={{ paddingBottom: "35px" }}>

                        {(coinSymbolList.length > 0) ? this.coinNameCall(coinSymbolList) :
                            <div className='sweet-loading' style={{ textAlign: "center" }}>
                                <SyncLoader
                                    color={'#000'}
                                    size={12}
                                    loading={this.state.loading}
                                />
                            </div>

                        }
                    </div>

                    <div className="grid-container">
                        <div className="grid-x align-justify">
                            <h2 className="allTableHeading" style={{ textTransform: "capitalize" }}>{this.props.params.market} Markets  </h2>
                            <div className="cell">
                                <div className="grid-x align-justify">
                                    <div className="cell shrink">
                                        <select id="" onChange={this.onchange} className="selectStyle styler">
                                            {selectType}
                                        </select>
                                    </div>
                                    <div className="cell small-5 medium-shrink">
                                        <p className="t--right"><strong>Total 24h Volume: </strong>
                                            {this.state.symbolSt + (numeral(marketVol24Hour).format('0,0.000'))}
                                        </p>
                                    </div>
                                </div>
                                <div className="table-wrap l-table">
                                    <BootstrapTable data={exchangeMarketlist} striped hover options={options}>
                                        <TableHeaderColumn isKey dataField='id' dataSort={true} width='10px'>#</TableHeaderColumn>
                                        <TableHeaderColumn dataField='marketName' dataSort={true} dataFormat={blueLayout} width='20px'>Market</TableHeaderColumn>
                                        <TableHeaderColumn dataField='price' width='20px' dataSort sortFunc={priceSortFunc} dataFormat={numberLayout}>Price</TableHeaderColumn>
                                        <TableHeaderColumn dataField='changePct24Hour' dataSort sortFunc={changePct24HourSortFunc} dataFormat={numberLayout} width='20px'> 24h % Change</TableHeaderColumn>
                                        <TableHeaderColumn dataField='change24Hour' dataSort sortFunc={change24HourSortFunc} dataFormat={numberLayout} width='15px'>24h Change</TableHeaderColumn>
                                        <TableHeaderColumn dataField='vol24h' dataSort sortFunc={vol24hSortFunc} dataFormat={numberLayout} width='20px' >24h Volume</TableHeaderColumn>

                                    </BootstrapTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </main >


            </div >
        )
    }
}

// export default Market;

function mapStateToProps(state) {
    return {
        MarketList: getMarket(state)
    };
}
export default connect(mapStateToProps)(Market);
