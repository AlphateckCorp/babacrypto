import React, { Component } from 'react';
import { Link } from 'react-router';
import { RingLoader, SyncLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { FetchMarketRequest } from './MarketAction';
import { getMarket } from './MarketReducer';
import numeral from 'numeral';

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
    componentDidMount(props){
        document.title = this.props.params.market +" Markets";
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
        var length = '';
            if(excoins.length>6){
                length = excoins.length-6;
            }else{
                length = '';
            }
        var self = this.state;
        return (<div className="grid-x mainCoinshow" >
            <div className="medium-4 small-12">
                <div className="medium-12" style={{ fontSize: "24px" }}>
                    Exchange Name
                            </div>
                <div className="medium-12">
                    <div className="medium-12" style={{ fontSize: "28px", color: "#767B7F" }}>
                        {exName}
                    </div>
                </div>
            </div>
            <div className="medium-4 small-12">
                <div className="medium-12" style={{ fontSize: "24px" }}>
                    Supported Coins
                            </div>
                <div className="medium-12">
                    <div className="medium-12" style={{ fontSize: "28px", color: "#767B7F" }}>


                    {(length != '') ? 
                    <span className="t--black" style={{ fontSize: "20px", fontWeight: "600" }}> {((Array.from(new Set(excoins))).splice(0, 6)).join(', ')} 
                      <span className="t--blue" style={{ fontSize: "20px", fontWeight: "600" }}> +{length} </span>
                     </span>
                     : excoins.join(', ')}
                        
                    </div>
                </div>
            </div>
        </div>
        );
    }
    render() {
        var coinSymbolList = [];
        var selectType = '';
        var MarketList = '';
        var self = this.state;
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
                    
                    var power = Math.pow(10, 8);
                    function roundingFunction(x) {
                        return Number.parseFloat(x).toFixed(8);
                    }
                    var valueToRound = ((value.toString().indexOf('e') >= 0) ? (value * power) : (value + 'e+' + boundedPrecision));
                    var CHANGE24HOURROUND = ((value.toString().indexOf('e') >= 0) ? (CHANGE24HOUR * power) : (CHANGE24HOUR + 'e+' + boundedPrecision));
                    var outputz = ((roundingFunction(valueToRound) / power).toFixed(boundedPrecision));
                    var change24hours = ((roundingFunction(CHANGE24HOURROUND) / power).toFixed(boundedPrecision));

                    return (<tr key={key}>
                        <td className="headcol" style={{ width: "50px" }}>{key + 1}</td>
                        <td className="coinName headcol2 t--blue">{data.FROMSYMBOL}/{data.TOSYMBOL}</td>
                        <td>{self.symbolSt}
                            {(numeral(data.PRICE).format('0,0[.]00000000') == 'NaN') ? outputz : numeral(data.PRICE).format('0,0.00000000')}
                        </td>
                        <td className="t--green"> {numeral(data.CHANGEPCT24HOUR).format('0,0.000')} %</td>
                        <td className="t--red">{self.symbolSt}
                        {/* {numeral(data.CHANGE24HOUR).format('0,0.000')} */}
                        {(numeral(data.CHANGE24HOUR).format('0,0[.]00000000') == 'NaN') ? change24hours : numeral(data.CHANGEPCT24HOUR).format('0,0.00000000')}
                        </td>
                        <td>{self.symbolSt}{numeral(data.VOLUME24HOURTO).format('0,0.000')}</td>
                    </tr>);

                });
            } else {
                exchangeMarketlist = "error";
            }
        }

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
                            <span style={{ padding: "35px 0 0 0 " }}>{this.props.params.market} Markets  </span>
                            <div className="cell">
                                <div className="cell shrink">
                                    <select id="" onChange={this.onchange} className="selectStyle styler">
                                        {selectType}
                                    </select>
                                </div>
                                <div className="table-wrap l-table">

                                    <table className="table responsive js-table">
                                        <thead>
                                            <tr>
                                                <th className="headcol">#</th>
                                                <th className="coinName headcol2">Market</th>
                                                <th className="market-cap-col">Price</th>
                                                <th>24h % Change</th>
                                                <th>24h Change</th>
                                                <th>24h Volume</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(exchangeMarketlist) ? (exchangeMarketlist != "error") ? exchangeMarketlist : <tr><td colSpan={6} style={{ textAlign: "center" }}>Record Not Found</td></tr> :
                                                <tr>
                                                    <td colSpan={6}>
                                                        <div className='sweet-loading' style={{ textAlign: "center" }}>
                                                            <SyncLoader
                                                                color={'#000'}
                                                                size={12}
                                                                loading={this.state.loading}
                                                            />
                                                        </div> </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
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