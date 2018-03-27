import React, { Component } from 'react';

class InfoSection extends Component {
    render() {
        return (
            <section className="c-head-promo l-head-promo">
                <div className="grid-container">
                    <div className="grid-y align-center">
                        <div className="c-promo l-promo">
                            <h1 className="heading heading--1">Cryptocurrency Exchanges List</h1>
                            <h2 className="heading heading--2 t--dark-blue">Find the best crypto exchange trading platform!</h2>

                            <p className="t--white c-promo__text" >The full list of all available CryptoCurrency Exchanges in the world!
Use the below list to find the best CryptoCurrency trading platform for you, for each exchange on the
list you'll find its supported coins (currencies which are available on its platform) and the trading
volume in the last 24 hours, which can help you understand the popularity of each exchange. For
more info or to start trading, use the VISIT button and you'll be directed to your desired exchange.
                            </p>
                            <p className="t--white c-promo__text">List of all Cryptocurrency Exchanges | Crypto exchanges supported coins
and volume amount, Find the best CryptoCurrency trading platforms! -
[2018]                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default InfoSection;