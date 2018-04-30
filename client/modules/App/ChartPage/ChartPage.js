import React, { Component } from 'react';
import { Link } from 'react-router';
import { RingLoader, SyncLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { FetchCoinsListRequest, FetchExchangeListRequest } from './ChartPageAction';
import { getCoinsList } from './ChartPageReducer';
import { getExchangeList } from './ChartMarketReducer';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DocumentMeta from 'react-document-meta';
import numeral from 'numeral';

class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            symbolSt: '$',
            typeId: 0,
            symbolName: 'USD',
            showChart: false,
            meta:false,
            metaTitle : '',
            metaDescription:''
        }
    }

    tick = (props) => {
        if (this.props.exchangeCoinsList != "undefined" && this.props.exchangeCoinsList.length > 0) {
            this.state.showChart = true;
            this.setState(this.state);
            var coinName = this.props.exchangeCoinsList[0].CoinName;
            var symbol = this.props.exchangeCoinsList[0].Symbol;

            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = "https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=" + symbol + "&tsyms=USD,EUR,ETH";
            s.async = true;
            // s.innerHTML = "document.write('This is output by document.write()!')";
            s.innerHTML = "This is output by";
            this.instance.appendChild(s);
        }

    }
    componentDidMount = (props) => {
        this.interval = setTimeout(this.tick, 5000);
        this.updateMetaTitle(props);
    };
    updateMetaTitle = (props) => {
        if (this.props.exchangeCoinsList != "undefined" && this.props.exchangeCoinsList.length > 0) {
            this.state.coinList = this.props.exchangeCoinsList;
            var coinName = this.props.exchangeCoinsList[0].CoinName;
            var symbol = this.props.exchangeCoinsList[0].Symbol;
            var symbolName = this.state.symbolName;
            this.state.metaTitle = coinName +"("+symbol+") Overview | "+coinName +" Price, Charts and Market Cap";
            this.state.metaDescription = "Complete Overview of "+coinName+ " ("+symbol+") CryptoCurrency | Updated "+ coinName + " Price, "+ coinName +  " Charts and " +coinName + " Market Capitalization at Babacrypto.com";
            this.setState(this.state);
        }
    }
    componentWillUnmount = (props) => {
        clearInterval(this.interval);
    };
    componentWillMount(props) {
        var coinInputSymbol = this.props.params.coin;
        // console.log(coinInputSymbol, "coinInputSymbol");
        this.props.dispatch(FetchCoinsListRequest(coinInputSymbol));
        this.props.dispatch(FetchExchangeListRequest(coinInputSymbol));
    }
    componentWillReceiveProps(prev, next) {
        if (this.props.exchangeCoinsList != "undefined" && this.props.exchangeCoinsList.length > 0) {
            this.state.coinList = this.props.exchangeCoinsList;
            var coinName = this.props.exchangeCoinsList[0].CoinName;
            var symbol = this.props.exchangeCoinsList[0].Symbol;
            var symbolName = this.state.symbolName;
            this.state.metaTitle = coinName +"("+symbol+") Overview | "+coinName +" Price, Charts and Market Cap";
            this.state.metaDescription = "Complete Overview of "+coinName+ " ("+symbol+") CryptoCurrency | Updated "+ coinName + " Price, "+ coinName +  " Charts and " +coinName + " Market Capitalization at Babacrypto.com";
            this.setState(this.state);
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
        var self = this.state;
        var totalCoinSupply = exchangecoin[0].TotalCoinSupply
        var coindtls = exchangecoin[0].coinlistinfos;
        // var TOTALVOLUME24HList = 0;
        var coinlistDtl = coindtls.filter((data, index) => {
            // return self.typeId == index;
            
            return self.symbolName == data.TOSYMBOL;
        });
        // var TOTALVOLUME24HList = coindtls.reduce((ls, data) => {
        //     console.log(data, "data")
        //     console.log(data.LASTMARKET, "LASTMARKET")
        //     console.log(data.VOLUME24HOUR, "VOLUME24HOUR");
        //     console.log(data.VOLUME24HOURTO, "VOLUME24HOURTO");
            
        //     console.log(data.TOTALVOLUME24H, "TOTALVOLUME24H");
        //     console.log(ls, "ls")
        //     var aa = parseFloat(data.TOTALVOLUME24H);
        //     return ls += aa;
        // }, 0);
        
        

        var coindata = coinlistDtl ? coinlistDtl.map((data, index) => {
            
            return (<div key={index} className="grid-x mainCoinshow">
                <div className="medium-4 small-12">
                    <div className="medium-12 chartHeadSt">
                        Price
                            </div>
                    <div className="medium-12">
                        <div className="medium-12 chartHeading">
                            {self.symbolSt}{numeral(data.PRICE).format('0,0')}  <span className={(data.CHANGEPCT24HOUR > 0) ? "t--green" : "t--red"} style={{fontSize:"18px"}} > {numeral(data.CHANGEPCT24HOUR).format('0,0.00')} %</span>
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
                            24H Trade Volume: <span style={{ color: "#7F8386" }}> 
                            {self.symbolSt}{numeral(data.VOLUME24HOUR).format('0,0.000')}
                            
                            
                            </span>
                        </div>
                    </div>
                </div>
                <div className="medium-4 small-12">
                    <div className="medium-12 chartHeadSt">
                        Available Supply
                            </div>
                    <div className="medium-12">
                        <div className="medium-12 chartHeading">
                            {numeral(data.SUPPLY).format('0,0')}
                        </div>
                        <div className="medium-12 chartSubHeading">
                            Max Supply: <span style={{ color: "#7F8386" }}>{numeral(totalCoinSupply).format('0,0.000')}</span>
                        </div>
                    </div>
                </div>
            </div>
            );
        }) : '';

        return coindata;

    }
    render() {
      const meta = {
        title: this.state.metaTitle,
        description: this.state.metaDescription
      };
        var exchangeMarketlist = [];
        var exchangecoin = '';
        var coinlist = '';
        var selectType = '';

        var self = this.state;
        if (this.props.exchangeCoinsList != undefined && this.props.exchangeCoinsList.length > 0) {
            exchangecoin = this.props.exchangeCoinsList;

            coinlist = exchangecoin[0];
            var list = exchangecoin[0].coinlistinfos;
            // console.log(list, "list");
            // console.log(coinlist, "coinlist");
            // // var selectType = list ? list.filter((data, key) => {
            //     return data.TOSYMBOL!= 'BTC';
            // }).map((data, key) =>{
            //     return (<option key={key} className="abc" value={data.TOSYMBOL}>{data.TOSYMBOL}</option>);
            // }):'';
            var selectType = list ? list.map((data, key) => {
                if(data.TOSYMBOL!="BTC"){
                return (<option key={key} className="abc" value={data.TOSYMBOL}>{data.TOSYMBOL}</option>);  
                }
            }):'';
        }
        if (this.props.exchangeMarketList != undefined && this.props.exchangeMarketList.length > 0) {
            var exchangeMarket = this.props.exchangeMarketList;
            // console.log(exchangeMarket, "exchangeMarket");
           
            
            var datalist = exchangeMarket.filter((data) => {
                return data.TOSYMBOL == self.symbolName;
            });
            /*
            if (datalist.length > 0) {
                var exchangeMarketlist = datalist.map((data, key) => {
                    var marketName = ((data.MARKET).toLowerCase().trim());
                    return (<tr key={key}>
                        <td className="headcol" style={{ width: "50px" }}>
                            <span className="bold_number">{key + 1}</span>
                        </td>
                        <td className="coinName headcol2 t--blue">
                            <Link to={"/exchanges/" + marketName}><span className="t--blue">{data.MARKET} </span></Link>
                        </td>
                        <td>{self.symbolSt}{numeral(data.PRICE).format('0,0.00')}</td>
                        <td className={(data.CHANGEPCT24HOUR > 0) ? "t--green" : "t--red"}>{numeral(data.CHANGEPCT24HOUR).format('0,0.000')} %</td>
                        <td className={(data.CHANGE24HOUR > 0) ? "t--green" : "t--red"} >{self.symbolSt}{numeral(data.CHANGE24HOUR).format('0,0.000')}</td>
                        <td>{self.symbolSt}{numeral(data.VOLUME24HOURTO).format('0,0.000')}</td>
                        <td> <Link to={"/exchanges/" + marketName}><button className="primarybtn"> Visit </button></Link></td>
                    </tr>);

                });
            } else {
                exchangeMarketlist = "error";
            }
            */


            if (datalist.length > 0) {
                var datazls = [];
                exchangeMarketlist =  datalist ? datalist.map((data, key) => {
                //   console.log(data, "data");
                    const datazls = {
                        "id": key + 1,
                        "marketName": data.MARKET,
                        "price": data.PRICE,
                        "changePct24Hour": data.CHANGEPCT24HOUR,
                        "change24Hour":data.CHANGE24HOUR,
                        "vol24h": data.VOLUME24HOUR,
                        "visit": data.MARKET
                    }
                    return datazls;

                }) : [];
            } 
        } 

    
        const visitAction = (action, listObj) => {
            var marketName = ((action).toLowerCase().trim());
            return (
                <Link to={"/exchanges/" + marketName}>
                    <button className="primarybtn"> Visit </button>
                </Link>
            );
        }
       
        const numberLayout = (action, listObj) => {
            var data = '';
            if (action == listObj.price) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            } else if (action == listObj.changePct24Hour) {
                return data = <span className={(action >= 0)? "t--green": "t--red" }>{numeral(action).format('0,0.000')} %</span>
            } else if (action == listObj.change24Hour) {
                return data = <span className={(action >= 0)? "t--green": "t--red" }>{self.symbolSt}{numeral(action).format('0,0.000')}</span>
                 
            } else if (action == listObj.vol24h) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            }
        };
        const vol24hSortFunc = (a, b, order) =>{
            if (order === 'desc') {
                return (Number(b.vol24h) - Number(a.vol24h));
            } else {
                return (Number(a.vol24h) - Number(b.vol24h));
            }
        };
        const change24HourSortFunc = (a, b, order) =>{
            if (order === 'desc') {
                return (Number(b.change24Hour) - Number(a.change24Hour));
            } else {
                return (Number(a.change24Hour) - Number(b.change24Hour));
            }
        };
        const changePct24HourSortFunc = (a, b, order) =>{
            if (order === 'desc') {
                return (Number(b.changePct24Hour) - Number(a.changePct24Hour));
            } else {
                return (Number(a.changePct24Hour) - Number(b.changePct24Hour));
            }
        };
        const priceSortFunc = (a, b, order) =>{
            if (order === 'desc') {
                return (Number(b.price) - Number(a.price));
            } else {
                return (Number(a.price) - Number(b.price));
            }
        };
        const blueLayout = (action, listObj) =>{
            var marketName = ((action).toLowerCase().trim());
            return (
                <Link to={"/exchanges/" + marketName}>
                    <span className="t--blue">{action}</span>
                </Link>
            );
        };
        

        return (
          <div>
            <DocumentMeta {...meta} />
                <main className="main">
                    <div className="grid-container" style={{ paddingBottom: "35px" }}>
                        <div className="grid-x align-justify">
                            {(coinlist) ?
                                <div className="cell shrink">
                                    <h1 className="float_left top_pad_heading">
                                        {coinlist.CoinName} <span> ({coinlist.Name}) </span>
                                    </h1>
                                    <select id="" onChange={this.onchange} className="selectStyle styler float_left">
                                        {selectType}
                                    </select>
                                    <div className="clear"></div>
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
                        {(this.state.showChart) ?
                            <div className="grid-x align-justify">
                                <h2 className="allTableHeading">{(coinlist) ? coinlist.CoinName : ''} Charts</h2>
                                <div ref={el => (this.instance = el)} style={{ width: "100%" }} />
                            </div>
                            :
                            <div className="container">
                             <h2 className="allTableHeading">{(coinlist) ? coinlist.CoinName : ''} Charts</h2>
                            <div className='sweet-loading' style={{ textAlign: "center" }}>
                                <SyncLoader
                                    color={'#000'}
                                    size={12}
                                    loading={this.state.loading}
                                />
                            </div>
                            </div>
                        }
                    </div>

                    <div className="grid-container">
                        <div className="grid-x align-justify">
                            <h2 className="allTableHeading">{coinlist.CoinName} Markets  <span>  ({coinlist.Name + "/" + self.symbolName}) </span>  </h2>
                            
                            <div className="cell">
                                <div className="table-wrap l-table">
                                    <BootstrapTable data={exchangeMarketlist} striped hover >
                                        <TableHeaderColumn isKey dataField='id' dataSort={true} width='50'>#</TableHeaderColumn>
                                        <TableHeaderColumn dataField='marketName' dataSort={true} dataFormat={blueLayout} width='125'>Exchange</TableHeaderColumn>
                                        <TableHeaderColumn dataField='price' dataSort sortFunc={priceSortFunc} dataFormat={numberLayout} width='125'>Price</TableHeaderColumn>
                                        <TableHeaderColumn dataField='changePct24Hour'  dataSort sortFunc={changePct24HourSortFunc} dataFormat={numberLayout} width='125'> 24h % Change</TableHeaderColumn>
                                        <TableHeaderColumn dataField='change24Hour'  dataSort sortFunc={change24HourSortFunc} dataFormat={numberLayout} width='125'>24h Change</TableHeaderColumn>
                                        <TableHeaderColumn dataField='vol24h' dataSort sortFunc={vol24hSortFunc}  dataFormat={numberLayout} width='125' >24h Volume</TableHeaderColumn>
                                        <TableHeaderColumn dataField='visit' dataFormat={visitAction} width='150'> Visit</TableHeaderColumn>

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

// export default ChartPage;

function mapStateToProps(state) {
    return {
        exchangeCoinsList: getCoinsList(state),
        exchangeMarketList: getExchangeList(state)
    };
}
export default connect(mapStateToProps)(ChartPage);