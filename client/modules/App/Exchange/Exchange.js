import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import InfoSection from './InfoSection/InfoSection';
import { FetchExchangeRequest } from './ExchangeAction';
import { getExchange } from './ExchangeReducer';
import styles from './../Home/Home.css';

class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datahandle: '',
        }
    }
    componentWillMount(props) {
        this.props.dispatch(FetchExchangeRequest());
    }

    renderTableRows = (finalData) => {
        let rowEle = [];
        const isEmpty = (obj) => {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
        
            return true;
        }

        if(isEmpty(finalData)) {
            return (<tr><td className={styles.loadingClass + " headcol"} colSpan="8">Loading...</td></tr>);
        }

        for (let market in finalData) {
            var data = finalData[market];
            console.log(data);
            // var showCoins = [];
            // if(data.length>6){
            //     var list = []
            //     // finalData[market].join(', ')
            //     // for(var i=0; i<=finalData[market].length; i++){
            //     //     console.log(finalData[market][i]);
            //     //     list.push(finalData[market][i]);
            //     // }
            //     // showCoins = list;

            // }else{
            //     showCoins = finalData[market].join(', ');
            // }
            rowEle.push(
                <tr key={`market-${market}`}>
                    {/* <td className="headcol" style={{ width: "50px" }}>
                        #
                    </td> */}
                    <td className={styles.coinName + " headcol2 t--blue"}> <br />
                        <span className="t--green">{market} </span>
                    </td>
                    <td className={styles.coinName + " headcol2 t--blue"}> 
                        <span className="t--green">{finalData[market].join(', ')} </span>
                    </td>
                </tr>
            )
        }

        return rowEle;
    }
    // tick = (props) => {
    //     var coinData = (this.props.getCoinsList);
    //     this.props.dispatch(FetchCoinsRequest());
    // };
    // componentDidMount = (props) => {
    //     this.interval = setInterval(this.tick, 10000);
    // };
    // componentWillUnmount = (props) => {
    //     clearInterval(this.interval);
    // };


    render() {
        var exchangeList = [];
        var coinContent = '';
        var self = this.state;
        let finalData = {};

        if (this.props.getExchangeList.length>0) {
            var list = this.props.getExchangeList;
            var listofdata = [];
            var coinSymbol = [];

            list.forEach(function (data, key) {
                if (listofdata.indexOf(data['MARKET']) == '-1') {
                    listofdata.push(data.MARKET);
                }
            });


            listofdata.forEach(element => {
                var datalists = list.filter((data, key) => {
                    return data.MARKET == element;
                }).map(symbol => {
                    return symbol.FROMSYMBOL;
                });

                finalData[element] = datalists;
            });
        }

        return (
            <div>
                <InfoSection />
                <main className="main">
                    <div className="grid-container">
                        <div className="grid-x align-justify">
                            {/* <div className="cell shrink">
                                <select id="" onChange={this.onchange} className={styles.selectStyle + " styler"}>
                                    <option className="abc" value="USD">USD</option>
                                    <option className="abc" value="EUR">EUR</option>
                                    <option className="abc" value="ETH">ETH</option>
                                </select>
                            </div>
                            <div className="cell small-5 medium-shrink">
                                <p className="t--right"><strong>Total Market Cap:</strong> $148,862,390,050</p>
                            </div> */}
                            <div className="cell">
                                <div className="table-wrap l-table">
                                    <table className="table responsive js-table">
                                        <thead>
                                            <tr>
                                                {/* <th className="headcol">#</th> */}
                                                <th className={styles.coinName + " headcol2"}>Exchange Name</th>

                                                <th className="market-cap-col">Symbols</th>
                                                {/* <th>Price</th>
                                                <th>Circulating Supply</th>
                                                <th>24h Volume</th>
                                                <th>24h Change</th>
                                                <th>7d Change</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTableRows(finalData)}
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
        getExchangeList: getExchange(state)
    };
}
export default connect(mapStateToProps)(Exchange);
