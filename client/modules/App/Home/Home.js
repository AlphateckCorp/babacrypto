import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import InfoSection from '../InfoSection/InfoSection';
import { FetchCoinsRequest } from './HomeAction';
import { getCoins } from './HomeReducer';
import DocumentMeta from 'react-document-meta';
import numeral from 'numeral';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinContent: [],
            coinContentList: [],
            datahandle: '',
            symbolSt: '$',
            typeId: 0,
            changeData: false,
            reverseState: false,
            data: ''
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
        // document.title = "List of all CryptoCurrencies at babacrypto.com - 2018";
        // document.head.querySelector('meta[name=description]').content = 'babacrypto.com list all the CryptoCurrency coins, get insights about CryptoCurrency market cap, price, trade volume and chose the best digital currency!';
        this.interval = setInterval(this.tick, 20000);
    };
    componentWillUnmount = (props) => {
        clearInterval(this.interval);
    };
    // componentWillReceiveProps = (prev, next) => {
    //   console.log(prev, "prev")
    //     console.log(next, "next")
    // }


    // changeByPrice = (props) => {
    //     var coinContentList = [];
    //     var coinContent = '';
    //     var dataElement = {};
    //     var self = this.state;
    //     var emptyArr = [];
    //     if (this.props.getCoinsList.length > 0) {
    //         var dataList = this.props.getCoinsList;
    //         const items = dataList
    //             .map((item, i) => {
    //                 return item.coinlistinfos[self.typeId];
    //             })
    //             .sort((a, b) => {
    //                 return b.PRICE - a.PRICE;
    //             })
    //             .map((item, i) => {
    //                 return item;
    //             });

    //         var list = items.map((itemLs, index) => {
    //             var data = dataList.filter(function (datazz, index) {
    //                 return (datazz.Symbol == datazz.CoinInputSymbol);
    //             });
    //             return data;
    //         });

    //         coinContent = list;
    //         return coinContent;

    //     }
    // }

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
    reverseHandle = (props) => {
        var dataArr = [];
        var dataList = '';
        if (this.props.getCoinsList.length > 0) {
            var coinContentList = [];
            var coinContent = '';
            // var marketCap = 0;
            var self = this.state;
            if (this.state.reverseState) {

                dataList = (this.props.getCoinsList).reverse();
                this.state.reverseState = false;
            } else {
                dataList = (this.props.getCoinsList);
                this.state.reverseState = true;
            }
            this.setState(this.state);
            var dataListindex = dataList.length;
            var coinContent = dataList.map(function (data, index) {
                var CoinName = '';

                if ((data.coinlistinfos).length > 0) {
                    CoinName = ((data.CoinName).toLowerCase().trim());
                    CoinName = CoinName.replace(' / ', '_');
                    CoinName = CoinName.replace(' ', '-');
                    var indx = dataListindex - index;

                    return (<tr key={indx}>
                        <td className="headcol" style={{ width: "50px" }}>
                            <span className="bold_number"> {indx} </span>
                        </td>
                        <td className="coinName headcol2 t--blue">
                            <Link to={"/coins/" + CoinName}>
                                <span className="t--blue">{data.CoinName}</span>
                            </Link>
                        </td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].MKTCAP).format('0,0.000')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].PRICE).format('0,0.00')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].SUPPLY).format('0,0.000')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].TOTALVOLUME24H).format('0,0.000')}</td>
                        <td className="t--green">{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].VOLUME24HOUR).format('0,0.000')}</td>
                        <td className={(data.coinlistinfos[self.typeId].CHANGE24HOUR > 0) ? "t--green" : "t--red"}>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].CHANGE24HOUR).format('0,0.000')}</td>
                    </tr>);
                }
                return (<tr key={index}>
                    <td className="loadingClass headcol" colSpan="8">Loading...</td>
                </tr>);
            });
            // coinContent = dataArr;
            // this.state.changeData = true;
            // this.state.data = coinContent;


            // console.log(this.state.reverseState, "reverseState");

            // this.setState(this.state);
            // console.log(coinContent, "coinContent")
            return coinContent;
            // return (coinContent);
        }
    }

    reverseHtml = (props) => {
        var dataArr = [];
        var coinContentList = [];
        var coinContent = '';
        var marketCap = 0;
        if (this.props.getCoinsList.length > 0) {

            var self = this.state;
            var dataList = (this.props.getCoinsList).reverse();

            var dataListindex = dataList.length;
            var coinContent = dataList.map(function (data, index) {
                var CoinName = '';
                if ((data.coinlistinfos).length > 0) {
                    CoinName = ((data.CoinName).toLowerCase().trim());
                    CoinName = CoinName.replace(' / ', '_');
                    CoinName = CoinName.replace(' ', '-');

                    marketCap += parseFloat(data.coinlistinfos[self.typeId].MKTCAP);

                    return (<tr key={dataListindex - index}>
                        <td className="headcol" style={{ width: "50px" }}>
                            <span className="bold_number"> {dataListindex - index} </span>
                        </td>
                        <td className="coinName headcol2 t--blue">
                            <Link to={"/coins/" + CoinName}>
                                <span className="t--blue">{data.CoinName}</span>
                            </Link>
                        </td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].MKTCAP).format('0,0.000')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].PRICE).format('0,0.00')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].SUPPLY).format('0,0.000')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].TOTALVOLUME24H).format('0,0.000')}</td>
                        <td className="t--green">{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].VOLUME24HOUR).format('0,0.000')}</td>
                        <td className={(data.coinlistinfos[self.typeId].CHANGE24HOUR > 0) ? "t--green" : "t--red"}>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].CHANGE24HOUR).format('0,0.000')}</td>
                    </tr>);
                }
                return (<tr key={index}>
                    <td className="loadingClass headcol" colSpan="8">Loading...</td>
                </tr>);
            });

            return coinContent;
        }
    }

    renderHtml = (props) => {
        var coinContentList = [];
        // var coinContent = '';
        var coinContent = [];

        // var coinsList = [];
        var marketCap = 0;
        var self = this.state;
        if (this.props.getCoinsList.length > 0) {

            // var dataList = (this.props.getCoinsList).reverse();

            if (this.state.reverseState) {
                var dataList = (this.props.getCoinsList).reverse();
            } else {
                var dataList = this.props.getCoinsList;
            }
            var coinContent = dataList.map(function (data, index) {
                var CoinName = '';
                if ((data.coinlistinfos).length > 0) {
                    CoinName = ((data.CoinName).toLowerCase().trim());
                    CoinName = CoinName.replace(' / ', '_');
                    CoinName = CoinName.replace(' ', '-');

                    marketCap += parseFloat(data.coinlistinfos[self.typeId].MKTCAP);

                    /*return (
                      <tr key={index}>
                        <td className="headcol" style={{ width: "50px" }}>
                           <span className="bold_number"> {1 + index} </span>
                        </td>
                        <td className="coinName headcol2 t--blue">
                            <Link to={"/coins/" + CoinName}>
                                <span className="t--blue">{data.CoinName}</span>
                            </Link>
                        </td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].MKTCAP).format('0,0.000')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].PRICE).format('0,0.00')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].SUPPLY).format('0,0.000')}</td>
                        <td>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].TOTALVOLUME24H).format('0,0.000')}</td>
                        <td className="t--green">{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].VOLUME24HOUR).format('0,0.000')}</td>
                        <td className={(data.coinlistinfos[self.typeId].CHANGE24HOUR>0)? "t--green" : "t--red"}>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].CHANGE24HOUR).format('0,0.000')}</td>
                    </tr>);
                    */

                    coinContent = {
                        id: index,
                        CoinName: data.CoinName,
                        mkcapital: self.symbolSt + "" + numeral(data.coinlistinfos[self.typeId].MKTCAP).format('0,0.000'),
                        price: self.symbolSt + "" + numeral(data.coinlistinfos[self.typeId].PRICE).format('0,0.00'),
                        supply: self.symbolSt + "" + numeral(data.coinlistinfos[self.typeId].SUPPLY).format('0,0.000'),
                        totalVol24h: self.symbolSt + "" + numeral(data.coinlistinfos[self.typeId].TOTALVOLUME24H).format('0,0.000'),
                        vol24h: self.symbolSt + "" + numeral(data.coinlistinfos[self.typeId].VOLUME24HOUR).format('0,0.000'),
                        change24h: self.symbolSt + "" + numeral(data.coinlistinfos[self.typeId].CHANGE24HOUR).format('0,0.000')
                    }
                }

                return (<tr key={index}>
                    <td className="loadingClass headcol" colSpan="8">Loading...</td>
                </tr>);
            });
            return coinContent;
        }
    }

    render() {

        const meta = {
            title: "List of all CryptoCurrencies at babacrypto.com - 2018",
            description: 'babacrypto.com list all the CryptoCurrency coins, get insights about CryptoCurrency market cap, price, trade volume and chose the best digital currency!',
        };

        var coinContent = [];
        var marketCap = 0;
        var self = this.state;

        if (this.props.getCoinsList.length > 0) {
            var dataList = (this.props.getCoinsList);

            // coinContent = dataList
                // .map(function (data, index) {
                // var CoinName = '';
                // console.log(data.coinlistinfos, "data");

                // if ((data.coinlistinfos).length > 0 && data.CoinName!='') {
                //     CoinName = ((data.CoinName).toLowerCase().trim());
                //     CoinName = CoinName.replace(' / ', '_');
                //     CoinName = CoinName.replace(' ', '-');

                //     marketCap += parseFloat(data.coinlistinfos[self.typeId].MKTCAP);
                //     const datazl = {
                //         "id": index + 1,
                //         "CoinName": data.CoinName,
                //         "mkcapital": data.coinlistinfos[self.typeId].MKTCAP,
                //         "price": data.coinlistinfos[self.typeId].PRICE,
                //         "supply": data.coinlistinfos[self.typeId].SUPPLY,
                //         "totalVol24h":data.coinlistinfos[self.typeId].TOTALVOLUME24H,
                //         "vol24h": data.coinlistinfos[self.typeId].CHANGEPCT24HOUR,
                //         "change24h": data.coinlistinfos[self.typeId].CHANGEPCTDAY
                //     };
                //     return datazl;
                //     return data;
                //     }
                //     // return coinContent;
                //     // console.log(data, "data");
                // })
                // .sort((a, b) => {                
                //     // return b.coinlistinfos.MKTCAP - a.coinlistinfos.MKTCAP;
                //     return b.coinlistinfos[self.typeId].MKTCAP - a.coinlistinfos[self.typeId].MKTCAP;
                // })
                dataList.map((data, index) => {
                    
                    // return item;
                    if ((data.coinlistinfos).length > 0) {
                        var CoinName = '';
                        CoinName = (data.CoinName) ? ((data.CoinName).toLowerCase().trim()) : '';
                        CoinName = CoinName.replace(' / ', '_');
                        CoinName = CoinName.replace(' ', '-');
                        if ((data.coinlistinfos).length > 0) {
                            if(data.coinlistinfos[self.typeId]){

                                marketCap += parseFloat(data.coinlistinfos[self.typeId].MKTCAP);
                                var datazl = {
                                    "id": index + 1,
                                    "CoinName": data.CoinName,
                                    "mkcapital": data.coinlistinfos[self.typeId].MKTCAP,
                                    "price": data.coinlistinfos[self.typeId].PRICE,
                                    "supply": data.coinlistinfos[self.typeId].SUPPLY,
                                    "totalVol24h": data.coinlistinfos[self.typeId].TOTALVOLUME24H,
                                    "vol24h": data.coinlistinfos[self.typeId].CHANGEPCT24HOUR
                                    // "change24h": data.coinlistinfos[self.typeId].CHANGEPCTDAY
                                };
                                coinContent.push(datazl);
                                return datazl;
                            }
                        }
                    } 
                    // else {
                    //     console.log('else');
                    //     return;
                    // }
                    // return coinContent;
                });



        }

        const colorAction = (action, listObj) => {
            var data = '';
            if (action > 0) {
                data = <span className="t--green">{numeral(action).format('0,0.000')} %</span>
            } else {
                data = <span className="t--red">{numeral(action).format('0,0.000')} %</span>
            }
            return (data);
        }
        const LinkAction = (action, listObj) => {
            var CoinName = ((listObj.CoinName).toLowerCase().trim());
            CoinName = CoinName.replace(' / ', '_');
            CoinName = CoinName.replace(' ', '-');
            return (
                <Link to={"/coins/" + CoinName}>
                    <span className="t--blue">{listObj.CoinName}</span>
                </Link>
            );
        }
        const numberLayout = (action, listObj) => {
            if (action == listObj.mkcapital) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            } else if (action == listObj.price) {
                return (self.symbolSt + "" + numeral(action).format('0,0.00'));
            } else if (action == listObj.supply) {
                return (numeral(action).format('0,0.000'));
            } else if (action == listObj.totalVol24h) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            } else if (action == listObj.vol24h) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            } else if (action == listObj.change24h) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            }
        }
        const mkcapitalSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.mkcapital) - Number(a.mkcapital));
            } else {
                return (Number(a.mkcapital) - Number(b.mkcapital));
            }
        }
        const priceSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.price) - Number(a.price));
            } else {
                return (Number(a.price) - Number(b.price));
            }
        }
        const supplySortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.supply) - Number(a.supply));
            } else {
                return (Number(a.supply) - Number(b.supply));
            }
        }
        const totalVol24hSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.totalVol24h) - Number(a.totalVol24h));
            } else {
                return (Number(a.totalVol24h) - Number(b.totalVol24h));
            }
        }
        const vol24hSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.vol24h) - Number(a.vol24h));
            } else {
                return (Number(a.vol24h) - Number(b.vol24h));
            }
        }
        const change24hSortFunc = (a, b, order) => {
            if (order === 'desc') {
                return (Number(b.change24h) - Number(a.change24h));
            } else {
                return (Number(a.change24h) - Number(b.change24h));
            }
        };
        var options = {
            // noDataText: (<span className="loadingClass headcol" colSpan="6"> Record Not Found!! </span>)
            noDataText: (<span className="loadingClass headcol" colSpan="6"> Loading... </span>),
            sortName: 'id',
            // sortName: 'mkcapital',
            // sortOrder: 'desc'
        };

        return (
            <div>
                <DocumentMeta {...meta} />
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
                            <div className="cell small-7 medium-shrink">
                                <p><strong>Total Market Cap: </strong>
                                    {this.state.symbolSt + (numeral(marketCap).format('0,0.000'))}
                                </p>
                            </div>
                            <div className="cell">
                                <div className="table-wrap l-table">                                    
                                    <BootstrapTable data={coinContent} striped hover options={options}  >
                                        <TableHeaderColumn isKey dataField='id' dataSort={true} width='50'>#</TableHeaderColumn>
                                        <TableHeaderColumn dataField='CoinName' dataSort={true} dataFormat={LinkAction} width='150'>Coin</TableHeaderColumn>
                                        <TableHeaderColumn dataField='mkcapital' dataSort sortFunc={mkcapitalSortFunc} dataFormat={numberLayout} width='165'>Market Cap</TableHeaderColumn>
                                        <TableHeaderColumn dataField='price' dataSort sortFunc={priceSortFunc} dataFormat={numberLayout} width='100' >Price</TableHeaderColumn>
                                        <TableHeaderColumn dataField='supply' dataSort sortFunc={supplySortFunc} dataFormat={numberLayout} width='165' > Circulating Supply</TableHeaderColumn>
                                        <TableHeaderColumn dataField='totalVol24h' dataSort sortFunc={totalVol24hSortFunc} dataFormat={numberLayout} width='150' >24h Volume</TableHeaderColumn>
                                        <TableHeaderColumn dataField='vol24h' dataFormat={colorAction} dataSort sortFunc={vol24hSortFunc} width='125'>24h Change</TableHeaderColumn>
                                        {/* <TableHeaderColumn dataField='change24h' dataFormat={colorAction} dataSort sortFunc={change24hSortFunc} width='125'> 1d Change</TableHeaderColumn> */}


                                    </BootstrapTable>
                                </div>
                                {/*                               
                                <BootstrapTable data={products} striped hover>
                                    <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                                </BootstrapTable> */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        getCoinsList: getCoins(state)
    };
}
export default connect(mapStateToProps)(Home);
