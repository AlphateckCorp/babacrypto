import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import InfoSection from '../InfoSection/InfoSection';
import { getCoins } from './HomeReducer';
import DocumentMeta from 'react-document-meta';
import numeral from 'numeral';
import callApi from '../../../util/apiCaller';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Home extends Component {
    limit = 100;
    sort = ['id', 'asc'];
    filter;
    currency = '2866';
    mktCap;


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
            data: '',
            mktCap: null,
            getCoinsList: [],
            sortOrder: {
                CoinName: 'asc',
                mktcap: 'asc',
                price: 'asc',
                supply: 'asc',
                totalvolume24h: 'asc',
                totalvolume24hto: 'asc'
            },
            name: '',
            sorting: false
        }
    }


    getTotalValue = (currency) => {
        return callApi('marketcap?symbol=' + currency).then(res => {
            this.setState({ mktCap: res });
        });
    }

    FetchCoinsRequest = (limit, sort, currency) => {
        return callApi('yours?offset=0&limit=' + limit + '&sort=' + sort.toString() + '&currency=' + currency).then(res => {
            this.setState({ getCoinsList: res });
        });
    }


    componentWillMount(props) {
        this.FetchCoinsRequest(this.limit, this.sort, this.currency);
        this.getTotalValue('USD');
    }

    tick = (props) => {
        this.FetchCoinsRequest(this.limit, this.sort, this.currency);
    };

    componentDidMount = (props) => {
        window.addEventListener('scroll', this.handleScroll);
        this.interval = setInterval(this.tick, 20000);
    };

    componentWillUnmount = (props) => {
        window.removeEventListener('scroll', this.handleScroll);
        clearInterval(this.interval);
    };


    handleScroll = (e) => {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            this.limit = this.limit + 100;
            this.tick();
        }
    };
    onchange = (e) => {
        var checkType = e.target.value;
        var selectTypeByid = '';
        var currencySymbols = '';
        this.getTotalValue(checkType);
        let order = this.state.sortOrder[this.state.name] === 'asc' ? 'desc' : 'asc';
        this.sort = [this.state.name, order];
        switch (checkType) {
            case ('EUR'):
                selectTypeByid = 1;
                currencySymbols = '€';
                if (this.state.sorting) {
                    this.currency = '2867';
                    this.tick();
                }
                break;
            case ('ETH'):
                selectTypeByid = 2;
                currencySymbols = 'Ξ';
                if (this.state.sorting) {
                    this.currency = '2';
                    this.tick();
                }
                break;
            default:
                selectTypeByid = 0;
                currencySymbols = '$';
                if (this.state.sorting) {
                    this.currency = '2866';
                    this.tick();
                }
        }

        this.state.typeId = selectTypeByid;
        this.state.symbolSt = currencySymbols;
        this.setState(this.state);
    }

    onSortChange = (name) => {
        this.setState({ name: name, sorting: true });
        let sortOrder = this.state.sortOrder;
        let order = sortOrder[name];
        this.sort = [name, order];
        this.tick();
        order === 'asc' ? sortOrder[name] = 'desc' : sortOrder[name] = 'asc';
        this.setState({ sortOrder });
    }

    renderCustomHeader(headerName, name) {
        return (
            <p onClick={() => this.onSortChange(name)}>{headerName}</p>
        );
    }

    render() {

        const meta = {
            title: "List of all CryptoCurrencies at babacrypto.com - 2018",
            description: 'babacrypto.com list all the CryptoCurrency coins, get insights about CryptoCurrency market cap, price, trade volume and chose the best digital currency!',
        };

        var coinContent = [];
        var marketCap = this.state.mktCap;
        var self = this.state;


        if (this.state.getCoinsList.length > 0) {
            var dataList = (this.state.getCoinsList);
            dataList.map((data, index) => {
                if ((data.coinlistinfos).length > 0) {
                    var CoinName = '';
                    CoinName = (data.CoinName) ? ((data.CoinName).toLowerCase().trim()) : '';
                    CoinName = CoinName.replace(' / ', '_');
                    CoinName = CoinName.replace(' ', '-');
                    if ((data.coinlistinfos).length > 0) {
                        if (data.coinlistinfos[self.typeId]) {
                            var datazl = {
                                "id": index + 1,
                                "CoinName": data.CoinName,
                                "mktcap": data.coinlistinfos[self.typeId].MKTCAP,
                                "price": data.coinlistinfos[self.typeId].PRICE,
                                "supply": data.coinlistinfos[self.typeId].SUPPLY,
                                "totalvolume24h": data.coinlistinfos[self.typeId].TOTALVOLUME24H,
                                "totalvolume24hto": data.coinlistinfos[self.typeId].CHANGEPCT24HOUR
                            };
                            coinContent.push(datazl);
                        }
                    }
                }
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
            if (action == listObj.mktcap) {
                return (self.symbolSt + "" + action);
            } else if (action == listObj.price) {
                return (self.symbolSt + "" + numeral(action).format('0,0.00'));
            } else if (action == listObj.totalvolume24h) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            } else if (action == listObj.totalvolume24hto) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            } else if (action == listObj.change24h) {
                return (self.symbolSt + "" + numeral(action).format('0,0.000'));
            }
        }

        const supplyLayout = (action, listObj) => {
            return (numeral(action).format('0,0.000'));
        }

        const options = {
            noDataText: (<span className="loadingClass headcol" colSpan="6"> Loading... </span>)
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
                                    <BootstrapTable data={coinContent} options={options} striped hover>
                                        <TableHeaderColumn isKey dataField='id' width='50'>#</TableHeaderColumn>
                                        <TableHeaderColumn dataField='CoinName' dataFormat={LinkAction} width='150'>{this.renderCustomHeader('Coin', 'CoinName')}</TableHeaderColumn>
                                        <TableHeaderColumn dataField='mktcap' dataFormat={numberLayout} width='165'>{this.renderCustomHeader('Market Cap', 'mktcap')}</TableHeaderColumn>
                                        <TableHeaderColumn dataField='price' dataFormat={numberLayout} width='100' >{this.renderCustomHeader('Price', 'price')}</TableHeaderColumn>
                                        <TableHeaderColumn dataField='supply' dataFormat={supplyLayout} width='165' >{this.renderCustomHeader('Circulating Supply', 'supply')}</TableHeaderColumn>
                                        <TableHeaderColumn dataField='totalvolume24h' dataFormat={numberLayout} width='150' >{this.renderCustomHeader('24h Volume', 'totalvolume24h')}</TableHeaderColumn>
                                        <TableHeaderColumn dataField='totalvolume24hto' dataFormat={colorAction} width='125'>{this.renderCustomHeader('24h Change (%)', 'totalvolume24hto')}</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
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
        data: getCoins(state)
    };
}
export default connect(mapStateToProps)(Home);
