import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import InfoSection from '../InfoSection/InfoSection';
import { FetchCoinsRequest } from './HomeAction';
import { getCoins } from './HomeReducer';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinContent: [],
            coinContentList: []
        }
    }
    componentWillMount(props) {
        // console.log("componentWillMount");
        this.props.dispatch(FetchCoinsRequest());
    }
    onchange = (e) => {
        var checkType= e.target.value;
        /*
        var selectTypeByid='';
        switch(checkType){
            case ('EUR'): 
                selectTypeByid = 1;
                break;
            case ('ETH'): 
                selectTypeByid = 2;
                break;
            case ("BTC"): 
                selectTypeByid = 3;
                break;
            default:
                selectTypeByid = 0;
        }
        if (this.props.getCoinsList) {
            var dataList = this.props.getCoinsList;
            var coinContents = '';
            var coinContents = dataList.map(function (data, index) {
                var keyId = data.coinlistinfos[selectTypeByid];
                // console.log(keyId, "keyid");
                // return (
                //     <tr key={index}>
                //         <td className="headcol">{data.SortOrder}</td>
                //         <td className="headcol2 t--blue">{data.CoinName}</td>
                        
                //     </tr>
                // );
                return ({keyId});
            }); 
        }
    */
    }
    render() {
        var coinContentList = [];
        var coinContent = '';
       
        if (this.props.getCoinsList) {
            var dataList = this.props.getCoinsList;
            // console.log(dataList, 'dataList');
            var coinContent = dataList.map(function (data, index) {
                return (<tr key={index}>
                    <td className="headcol">{data.SortOrder}</td>
                    <td className="headcol2 t--blue">{data.CoinName}</td>
                    <td>$ {data.coinlistinfos[0].MKTCAP}</td>
                    <td>$ {data.coinlistinfos[0].PRICE}</td>
                    <td>$ {data.coinlistinfos[0].SUPPLY}</td>
                    <td>$ {data.coinlistinfos[0].TOTALVOLUME24H}</td>
                    <td className="t--green">$ {data.coinlistinfos[0].VOLUME24HOUR}</td>
                    <td className="t--red">$ {data.coinlistinfos[0].CHANGE24HOUR}</td>
                </tr>);
            });
    
        }
    
        return (
            <div>
                <InfoSection />
                <main className="main">
                    <div className="grid-container">
                        <div className="grid-x align-justify">
                            <div className="cell shrink">
                                <select id="" onChange={this.onchange} className="styler">
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="ETH">ETH</option>
                                </select>
                            </div>
                            <div className="cell small-5 medium-shrink">
                                <p className="t--right"><strong>Total Market Cap:</strong> $148,862,390,050</p>
                            </div>
                            <div className="cell">
                                <div className="table-wrap l-table">
                                    <table className="table responsive js-table">
                                        <thead>
                                            <tr>
                                                <th className="headcol">#</th>
                                                <th className="headcol2">Coin</th>
                                                <th className="market-cap-col">Market Cap</th>
                                                <th>Price</th>
                                                <th>Circulating Supply</th>
                                                <th>24h Volume</th>
                                                <th>24h Change</th>
                                                <th>7d Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {coinContent}

                                            {/*
                                            <tr>
                                                <td className="headcol">1</td>
                                                <td className="headcol2 t--blue">Bitcoin</td>
                                                <td>$11,600,105</td>
                                                <td>$3,774,181</td>
                                                <td>$16,586,412</td>
                                                <td>$984,687,000</td>
                                                <td className="t--green">1.60%</td>
                                                <td className="t--red">-2.10%</td>
                                                <td className="t--green">3.50%</td>
                                            </tr>
                                            <tr>
                                                <td className="headcol">2</td>
                                                <td className="headcol2 t--blue">Ethereum Classic</td>
                                                <td>$27,160,471,470</td>
                                                <td>$94,812,199</td>
                                                <td>$438,884,000</td>
                                                <td>$984,687,000</td>
                                                <td className="t--green">1.60%</td>
                                                <td className="t--green">22.10%</td>
                                                <td className="t--green">3.50%</td>
                                            </tr>
                                            <tr>
                                                <td className="headcol">3</td>
                                                <td className="headcol2 t--blue">Bitcoin</td>
                                                <td>$62,600,105,442</td>
                                                <td>$3,774,181</td>
                                                <td>$16,586,412</td>
                                                <td>$984,687,000</td>
                                                <td className="t--green">1.60%</td>
                                                <td className="t--red">-2.10%</td>
                                                <td className="t--green">3.50%</td>
                                            </tr>
                                            <tr>
                                                <td className="headcol">4</td>
                                                <td className="headcol2 t--blue">Ethereum</td>
                                                <td>$27,160,471,470</td>
                                                <td>$94,812,199</td>
                                                <td>$438,884,000</td>
                                                <td>$984,687,000</td>
                                                <td className="t--green">1.60%</td>
                                                <td className="t--green">22.10%</td>
                                                <td className="t--green">3.50%</td>
                                            </tr>
                                            <tr>
                                                <td className="headcol">5</td>
                                                <td className="headcol2 t--blue">Bitcoin</td>
                                                <td>$62,600,105,442</td>
                                                <td>$3,774,181</td>
                                                <td>$16,586,412</td>
                                                <td>$984,687,000</td>
                                                <td className="t--green">1.60%</td>
                                                <td className="t--red">-2.10%</td>
                                                <td className="t--green">3.50%</td>
                                            </tr>
                                            <tr>
                                                <td className="headcol">6</td>
                                                <td className="headcol2 t--blue">Ethereum</td>
                                                <td>$27,160,471,470</td>
                                                <td>$94,812,199</td>
                                                <td>$438,884,000</td>
                                                <td>$984,687,000</td>
                                                <td className="t--green">1.60%</td>
                                                <td className="t--green">22.10%</td>
                                                <td className="t--green">3.50%</td>
                                            </tr>
                                            */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}




// export default Home;
function mapStateToProps(state) {
    return {
        getCoinsList: getCoins(state)
    };
}
export default connect(mapStateToProps)(Home);
