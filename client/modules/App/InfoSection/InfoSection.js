import React, { Component } from 'react';

class InfoSection extends Component {
    render() {
        return (
            <section className="c-head-promo l-head-promo">
                <div className="grid-container">
                    <div className="grid-y align-center">
                        <div className="c-promo l-promo">
                            <h1 className="heading heading--1">All cryptocurrencies list at babacrypto.com</h1>
                            <h2 className="heading heading--2 t--dark-blue">Find the next best digital coin!</h2>
                            <p className="t--white c-promo__text">
                                Welcome to babacrypto.com! World's leading site for CryptoCurrency Analysis.
    Our goal is to provide CryptoCurrency enthusiasts with the best set of tools to make the right investing decisions. Below you'll find a detailed list which shows all the digital coins in the world, use
    the statistics to learn about each coin's behavior and invest wisely based on facts rather than on "gut
    currency!
    feeling"!
                            </p>
                            <p className="t--white c-promo__text" >
                            babacrypto.com list all the CryptoCurrency coins, get insights about
CryptoCurrency market cap, price, trade volume and chose the best digital currency!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default InfoSection;