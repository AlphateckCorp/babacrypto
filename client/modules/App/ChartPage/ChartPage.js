import React, { Component } from 'react';
import { Link } from 'react-router';
import { RingLoader, SyncLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { FetchCoinsListRequest, FetchExchangeListRequest } from './ChartPageAction';
import { getCoinsList } from './ChartPageReducer';
import { getExchangeList } from './ChartMarketReducer';

import numeral from 'numeral';

class ChartPage extends Component {
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
        var coinInputSymbol = this.props.params.coin;
        this.props.dispatch(FetchCoinsListRequest(coinInputSymbol));
        this.props.dispatch(FetchExchangeListRequest(coinInputSymbol));
    }
    componentDidMount(props) {
        var fsym = this.props.params.coin;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = "https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=" + fsym + "&tsyms=USD,EUR,ETH";
        s.async = true;
        // s.innerHTML = "document.write('This is output by document.write()!')";
        s.innerHTML = "This is output by";
        this.instance.appendChild(s);

    }
    componentWillReceiveProps(prev, next) {
        if (this.props.exchangeCoinsList != "undefined" && this.props.exchangeCoinsList.length > 0) {
            var coinName = this.props.exchangeCoinsList[0].CoinName;
            var fsym = this.props.params.coin;
            document.title = "[" + coinName + "] Charts [" + coinName + "] Markets ([" + fsym + "]/[USD])";
            // document.head.querySelector('meta[name=description]').content = 'New Description'
        //     var description = document.querySelector('meta[name="description"]');
        // description.setAttribute('content', "abc" ? "head.description" : '');  
        }

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
        var self = this.state;
        var totalCoinSupply = exchangecoin[0].TotalCoinSupply
        var coindtls = exchangecoin[0].coinlistinfos;
        var coinlistDtl = coindtls.filter((data, index) => {
            return self.typeId == index;
        });

        var coindata = coinlistDtl.map((data, index) => {
            return (<div key={index} className="grid-x mainCoinshow">
                <div className="medium-4 small-12">
                    <div className="medium-12 chartHeadSt">
                        Price
                            </div>
                    <div className="medium-12">
                        <div className="medium-12 chartHeading">
                            {self.symbolSt}{numeral(data.PRICE).format('0,0')}  <span className={(data.CHANGEPCT24HOUR>0)? "t--green" : "t--red"} style={{ fontSize: "16px", color: "#5BB85D" }}> {numeral(data.CHANGEPCT24HOUR).format('0,0.00')} %</span>
                        </div>
                        <div className="medium-12 chartSubHeading">
                            Open: <span style={{ color: "#7F8386" }}> {self.symbolSt}{numeral(data.OPENDAY).format('0,0')}  </span>
                        </div>
                        <div className="medium-12 chartSubHeading">
                            High: <span style={{ color: "#7F8386" }}> {self.symbolSt}{numeral(data.HIGHDAY).format('0,0')}   </span>
                        </div>
                        <div className="medium-12 chartSubHeading">
                            Low: <span style={{ color: "#7F8386" }}> {self.symbolSt}{numeral(data.LOWDAY).format('0,0')}  </span>
                        </div>
                    </div>
                </div>
                <div className="medium-4 small-12">
                    <div className="medium-12 chartHeadSt">
                        Market Cap
                            </div>
                    <div className="medium-12">
                        <div className="medium-12 chartHeading">
                            {self.symbolSt}{numeral(data.MKTCAP).format('0,0.000')}
                        </div>
                        <div className="medium-12 chartSubHeading">
                            24H Trade Volume: <span style={{ color: "#7F8386" }}> {self.symbolSt}{numeral(data.TOTALVOLUME24H).format('0,0.000')}</span>
                        </div>
                    </div>
                </div>
                <div className="medium-4 small-12">
                    <div className="medium-12 chartHeadSt">
                        Available Supply
                            </div>
                    <div className="medium-12">
                        <div className="medium-12 chartHeading">
                            {self.symbolSt}{numeral(data.SUPPLY).format('0,0')}
                        </div>
                        <div className="medium-12 chartSubHeading">
                            Max Supply: <span style={{ color: "#7F8386" }}> {self.symbolSt}{numeral(totalCoinSupply).format('0,0.000')}</span>
                        </div>
                    </div>
                </div>
            </div>
            );
        })

        return coindata;

    }
    render() {
        var exchangecoin = '';
        var coinlist = '';
        var selectType = '';

        var self = this.state;
        if (this.props.exchangeCoinsList != undefined && this.props.exchangeCoinsList.length > 0) {
            exchangecoin = this.props.exchangeCoinsList;

            coinlist = exchangecoin[0];
            var list = exchangecoin[0].coinlistinfos;
            var selectType = list.map((data, key) => {
                return (<option key={key} className="abc" value={data.TOSYMBOL}>{data.TOSYMBOL}</option>);
            });
        }
        if (this.props.exchangeMarketList != undefined && this.props.exchangeMarketList.length > 0) {
            var exchangeMarket = this.props.exchangeMarketList;

            var datalist = exchangeMarket.filter((data) => {
                return data.TOSYMBOL == self.symbolName;
            });
            if (datalist.length > 0) {
                var exchangeMarketlist = datalist.map((data, key) => {
                    return (<tr key={key}>
                        <td className="headcol" style={{ width: "50px" }}>
                            {key + 1}
                        </td>
                        <td className="coinName headcol2 t--blue">
                            {data.MARKET}
                        </td>
                        <td>{self.symbolSt}{numeral(data.PRICE).format('0,0.00')}</td>
                        <td className="t--green">{numeral(data.CHANGEPCT24HOUR).format('0,0.000')} %</td>
                        <td className="t--red">{self.symbolSt}{numeral(data.CHANGE24HOUR).format('0,0.000')}</td>
                        <td>{self.symbolSt}{numeral(data.VOLUME24HOURTO).format('0,0.000')}</td>
                        <td> <Link to={"/exchanges/" + data.MARKET}><button className="primarybtn"> Visit </button></Link></td>
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
                        <div className="grid-x align-justify">
                            {(coinlist) ?
                                <div className="cell shrink">
                                    <span> {coinlist.CoinName}</span><span>({coinlist.Name}) </span>
                                    <select id="" onChange={this.onchange} className="selectStyle styler">
                                        {selectType}
                                    </select>
                                </div>
                                : ''}
                        </div>

                        {(exchangecoin) ? this.coinNameCall(exchangecoin) :
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

                            <div ref={el => (this.instance = el)} style={{ width: "100%" }} />
                        </div>
                    </div>

                    <div className="grid-container">
                        <div className="grid-x align-justify">
                            <span className="allTableHeading">{coinlist.CoinName} Markets  </span>
                            <div className="cell">
                                <div className="table-wrap l-table">

                                    <table className="table responsive js-table">
                                        <thead>
                                            <tr>
                                                <th className="headcol">#</th>
                                                <th className="coinName headcol2">Exchange</th>
                                                <th className="market-cap-col">Price</th>
                                                <th>24h % Change</th>
                                                <th>24h Change</th>
                                                <th>24h Volume</th>
                                                <th>Visit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(exchangeMarketlist) ? (exchangeMarketlist != "error") ? exchangeMarketlist : <tr><td colSpan={6} style={{ textAlign: "center" }}>Record Not Found</td></tr> :
                                                // <tr>
                                                //     <td colSpan={6}>
                                                //         <div className='sweet-loading' style={{ textAlign: "center" }}>
                                                //             <SyncLoader
                                                //                 color={'#000'}
                                                //                 size={12}
                                                //                 loading={this.state.loading}
                                                //             />
                                                //         </div> </td>
                                                // </tr>
                                                <tr >
                                                    <td className="loadingClass headcol" colSpan="8">Loading...</td>
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

// export default ChartPage;

function mapStateToProps(state) {
    return {
        exchangeCoinsList: getCoinsList(state),
        exchangeMarketList: getExchangeList(state)
    };
}
export default connect(mapStateToProps)(ChartPage);