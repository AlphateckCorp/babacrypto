import React, { Component } from 'react';
import { RingLoader, SyncLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { FetchCoinsListRequest } from './ChartPageAction';
import { getCoinsList } from './ChartPageReducer';
class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.focusFile = this.focusFile.bind(this);

    }
    componentWillMount(props){
        var coinInputSymbol= this.props.params.coin;
        this.props.dispatch(FetchCoinsListRequest(coinInputSymbol));
    }
    componentDidMount() {
        var fsym = this.props.params.coin;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = "https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym="+fsym+"&tsyms=USD,EUR,ETH";
        s.async = true;
        // s.innerHTML = "document.write('This is output by document.write()!')";
        s.innerHTML = "This is output by";
        this.instance.appendChild(s);
    }
    focusFile(e) {

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = "https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=BTC&tsyms=USD,EUR,ETH";
        s.async = true;
        s.innerHTML = "This is output by";
        return { __html: 'First &middot; Second' };
    }
    render() {         
        console.log(this.props, "props");
        return (
            <div>
                <main className="main">
                    {/* <div className='sweet-loading'>
                        <SyncLoader
                            color={'#ccc'}
                            size={12}
                            loading={this.state.loading}
                        />
                    </div> */}
                    <div className="grid-container">
                        <div className="grid-x align-justify">
                        
                            <div ref={el => (this.instance = el)} style={{ width: "100%" }} />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

// export default ChartPage;

// export default Home;
function mapStateToProps(state) {
    return {
        exchangeCoinsList: getCoinsList(state)
    };
}
export default connect(mapStateToProps)(ChartPage);