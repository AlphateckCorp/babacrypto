import React, { Component } from 'react';

class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.focusFile = this.focusFile.bind(this);
    }
   
    componentDidMount() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = "https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=BTC&tsyms=USD,EUR,CNY,GBP";
        s.async = true;
        // s.innerHTML = "document.write('This is output by document.write()!')";
        s.innerHTML = "This is output by";
        this.instance.appendChild(s);
        console.log("didmountwork");
    }
    focusFile(e) {
        
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = "https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=BTC&tsyms=USD,EUR,CNY,GBP";
        s.async = true;
        s.innerHTML = "This is output by";
        console.log(s, "inn");
        // return {_html:};
        return {__html: 'First &middot; Second'};
        // return {__div: 'First &middot; Second'};
    }
    // componentDidMount() {
    //     const s = document.createElement('script');
    //     s.type = 'text/javascript';
    //     s.async = true;
    //     s.innerHTML = "document.write('This is output by document.write()!')";
    //     this.instance.appendChild(s);
    //   }
    render() {
        return (
            <div>
                <main className="main">
                    <div className="grid-container">
                        <div className="grid-x align-justify">
                            <div ref={el => (this.instance = el)} style={{ width: "100%" }}  />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default ChartPage;