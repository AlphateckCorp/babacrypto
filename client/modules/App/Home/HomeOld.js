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
            typeId: 0,
            changeData:false,
            reverseState:false,
            data : ''
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
    // componentWillReceiveProps = (prev, next) => {
    //   console.log(prev, "prev")
    //     console.log(next, "next")
    // }
    
    
    changeByPrice=(props)=>{
      var coinContentList = [];
      var coinContent = '';
      var dataElement = {};
      var self = this.state;
      var emptyArr = [];
      if (this.props.getCoinsList.length > 0) {
        var dataList = this.props.getCoinsList;
        
      /*
        var listOFcoin = dataList.map(function (data, index) {
            var CoinName = '';
            if ((data.coinlistinfos).length > 0) {
                CoinName = ((data.CoinName).toLowerCase().trim());
                CoinName = CoinName.replace(' / ','_');
                CoinName = CoinName.replace(' ','-');
                return (data.coinlistinfos[self.typeId]);
            }
        });*/
        const items = dataList
            .map((item, i) => {
                return item.coinlistinfos[self.typeId];
            })
            .sort((a, b) => {
              return b.PRICE - a.PRICE;
            })
            .map((item, i) => {
              console.log(item, "item");
                return item;
            });
            
            var list = items.map((itemLs, index)=>{
                var data = dataList.filter(function (datazz, index) {
                    return (datazz.Symbol == itemLs.CoinInputSymbol);
                });
                      /*
                      .map((data, index=>{
                        
                            var CoinName = '';
                            CoinName = ((data.CoinName).toLowerCase().trim());
                            CoinName = CoinName.replace(' / ','_');
                            CoinName = CoinName.replace(' ','-');
                            var indx =dataListindex - index;
                            
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
                                <td className={(data.coinlistinfos[self.typeId].CHANGE24HOUR>0)? "t--green" : "t--red"}>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].CHANGE24HOUR).format('0,0.000')}</td>
                        
                           return data;
                        */
                console.log(data, "data"); 
                return data;
                });        
                
                 console.log(list, "list");
                
            coinContent = list;
            // console.log(coinContent, "coinContent");
        return coinContent;
        
      }
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
    reverseHandle=(props)=>{
      var dataArr = [];
      var dataList = '';
        if (this.props.getCoinsList.length > 0) {
            var coinContentList = [];
            var coinContent = '';
            // var marketCap = 0;
            var self = this.state;
            if(this.state.reverseState){
              
              dataList = (this.props.getCoinsList).reverse();
              this.state.reverseState = false;
            }else{
              dataList = (this.props.getCoinsList);
              this.state.reverseState = true;
            }
            this.setState(this.state);
            var dataListindex = dataList.length;
            var coinContent = dataList.map(function (data, index) {
                var CoinName = '';
                if ((data.coinlistinfos).length > 0) {
                    CoinName = ((data.CoinName).toLowerCase().trim());
                    CoinName = CoinName.replace(' / ','_');
                    CoinName = CoinName.replace(' ','-');
                    var indx =dataListindex - index;
                    
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
                        <td className={(data.coinlistinfos[self.typeId].CHANGE24HOUR>0)? "t--green" : "t--red"}>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].CHANGE24HOUR).format('0,0.000')}</td>
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
  
    reverseHtml=(props) => {
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
                    CoinName = CoinName.replace(' / ','_');
                    CoinName = CoinName.replace(' ','-');
                    
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
                        <td className={(data.coinlistinfos[self.typeId].CHANGE24HOUR>0)? "t--green" : "t--red"}>{self.symbolSt}{numeral(data.coinlistinfos[self.typeId].CHANGE24HOUR).format('0,0.000')}</td>
                    </tr>);
                }
                return (<tr key={index}>
                    <td className="loadingClass headcol" colSpan="8">Loading...</td>
                </tr>);
            });
        
            return coinContent;
        }
    }
    
    renderHtml= (props) =>{
      var coinContentList = [];
      var coinContent = '';
      var marketCap = 0;
      var self = this.state;
      if (this.props.getCoinsList.length > 0) {
          
          // var dataList = (this.props.getCoinsList).reverse();
          
          if(this.state.reverseState){
              var dataList = (this.props.getCoinsList).reverse();
          }else{
            var dataList = this.props.getCoinsList;
          }
          var coinContent = dataList.map(function (data, index) {
              var CoinName = '';
              if ((data.coinlistinfos).length > 0) {
                  CoinName = ((data.CoinName).toLowerCase().trim());
                  CoinName = CoinName.replace(' / ','_');
                  CoinName = CoinName.replace(' ','-');
                  
                  marketCap += parseFloat(data.coinlistinfos[self.typeId].MKTCAP);

                  return (<tr key={index}>
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
            title: 'List of all CryptoCurrencies at babacrypto.com 2018',
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
        var dataList = '';
        var dataLength = 0;
        
        if (this.props.getCoinsList.length > 0) {
            if(this.state.reverseState){
            dataList = (this.props.getCoinsList).reverse();
          }else{
          dataList = (this.props.getCoinsList);
        }
        dataLength = dataList.length;
            var coinContent = dataList.map(function (data, index) {
                var CoinName = '';
                if ((data.coinlistinfos).length > 0) {
                    CoinName = ((data.CoinName).toLowerCase().trim());
                    CoinName = CoinName.replace(' / ','_');
                    CoinName = CoinName.replace(' ','-');
                    
                    marketCap += parseFloat(data.coinlistinfos[self.typeId].MKTCAP);

                    return (<tr key={index}>
                        <td className="headcol" style={{ width: "50px" }}>
                           <span className="bold_number">  {(self.reverseState)? dataLength-index : 1+index} </span>
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
                                                <th className="headcol"># 
                                                 <button onClick={this.reverseHandle}> Rev</button> 
                                                </th>
                                                <th className="coinName headcol2">Coin</th>
                                                <th className="market-cap-col">Market Cap</th>
                                                <th>Price 
                                                <i className="fa fa-sort-desc"></i>
                                                <button onClick={this.changeByPrice}> Rev</button> 
                                                </th>
                                                <th>Circulating Supply</th>
                                                <th>24h Volume</th>
                                                <th>24h Change</th>
                                                <th>7d Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 
                                              (coinContent != '') ? coinContent : 
                                              <tr><td className="loadingClass headcol" colSpan="8">Loading...</td></tr>
                                            }
                                            {
                                              /*
                                            (this.state.reverseState)? this.reverseHtml() : this.renderHtml()
                                            */
                                            }  
                                            
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
