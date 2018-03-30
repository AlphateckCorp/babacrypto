import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import InfoSection from '../InfoSection/InfoSection';
import { FetchCoinsRequest } from './HomeAction';
import { getCoins } from './HomeReducer';
import DocumentMeta from 'react-document-meta';
import numeral from 'numeral';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinContent: [],
            coinContentList: [],
            datahandle: '',
            symbolSt: '$',
            typeId: 0
        }
    }
    componentWillMount(props) {
        this.props.dispatch(FetchCoinsRequest());
    }
    tick = (props) => {
        var coinData = (this.props.getCoinsList);
        this.props.dispatch(FetchCoinsRequest());
    };
    componentDidMount = (props) => {
        // document.title = "List of all CryptoCurrencies at babacrypto.com - [2018]";
        // document.head.querySelector('meta[name=description]').content = 'babacrypto.com list all the CryptoCurrency coins, get insights about CryptoCurrency market cap, price, trade volume and chose the best digital currency!';
        this.interval = setInterval(this.tick, 10000);
    };
    componentWillUnmount = (props) => {
        clearInterval(this.interval);
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
        const meta = {
            title: 'List of all CryptoCurrencies at babacrypto.com - [2018]',
            description: 'babacrypto.com list all the CryptoCurrency coins, get insights about CryptoCurrency market cap, price, trade volume and chose the best digital currency!',
            meta: {
              charset: 'utf-8',
              name: {
                keywords: 'Digital Currency, react'
              }
            }
          };
        var coinContentList = [];
        var coinContent = '';
        var marketCap = 0;
        var self = this.state;
        if (this.props.getCoinsList.length > 0) {
            var dataList = this.props.getCoinsList;

            var coinContent = dataList.map(function (data, index) {
                if ((data.coinlistinfos).length > 0) {
                    marketCap += parseFloat(data.coinlistinfos[self.typeId].MKTCAP);

                    return (<tr key={index}>
                        <td className="headcol" style={{ width: "50px" }}>
                            <img src={"https://cryptocompare.com" + data.ImageUrl} width="30" />
                        </td>
                        <td className="coinName headcol2 t--blue">
                            <Link to={"/coins/" + data.Symbol}>
                                {data.CoinName} <br />
                                <span className="t--green">{data.Symbol} </span>
                            </Link>
                        </td>
                        <td>{self.symbolSt} {numeral(data.coinlistinfos[self.typeId].MKTCAP).format('0,0.000')}</td>
                        <td>{self.symbolSt} {numeral(data.coinlistinfos[self.typeId].PRICE).format('0,0.00')}</td>
                        <td>{self.symbolSt} {numeral(data.coinlistinfos[self.typeId].SUPPLY).format('0,0.000')}</td>
                        <td>{self.symbolSt} {numeral(data.coinlistinfos[self.typeId].TOTALVOLUME24H).format('0,0.000')}</td>
                        <td className="t--green">{self.symbolSt} {numeral(data.coinlistinfos[self.typeId].VOLUME24HOUR).format('0,0.000')}</td>
                        <td className={(data.coinlistinfos[self.typeId].CHANGE24HOUR>0)? "t--green" : "t--red"}>{self.symbolSt} {numeral(data.coinlistinfos[self.typeId].CHANGE24HOUR).format('0,0.000')}</td>
                    </tr>);
                }
                return (<tr key={index}>
                    <td className="loadingClass headcol" colSpan="8">Loading...</td>
                </tr>);
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
                                    <option className="abc" value="USD">USD</option>
                                    <option className="abc" value="EUR">EUR</option>
                                    <option className="abc" value="ETH">ETH</option>
                                </select>
                            </div>
                            <div className="cell small-5 medium-shrink">
                                <p className="t--right"><strong>Total Market Cap: </strong>
                                    {this.state.symbolSt + (numeral(marketCap).format('0,0.000'))}
                                </p>
                            </div>
                            <div className="cell">
                                <div className="table-wrap l-table">
                                    <table className="table responsive js-table">
                                        <thead>
                                            <tr>
                                                <th className="headcol">#</th>
                                                <th className="coinName headcol2">Coin</th>

                                                <th className="market-cap-col">Market Cap</th>
                                                <th>Price</th>
                                                <th>Circulating Supply</th>
                                                <th>24h Volume</th>
                                                <th>24h Change</th>
                                                <th>7d Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(coinContent != '') ? coinContent : <tr><td className="loadingClass headcol" colSpan="8">Loading...</td></tr>}
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
        getCoinsList: getCoins(state)
    };
}
export default connect(mapStateToProps)(Home);
