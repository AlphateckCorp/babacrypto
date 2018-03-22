
import React, { Component } from 'react';
import { Link } from 'react-router';

class Navigation extends Component {

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className=" navbar-brand" href="javascript:;">BABACRYPTO.COM</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-left">
                            <li><Link to="/"> CoinList</Link> </li>
                            <li><Link to="/chart"> Chart</Link> </li>
                            {/* <li><Link to="/"> CoinList</Link> </li> */}

                        </ul>
                        {/* <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="javascript:;" className= " dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Action <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link style={{ cursor: "pointer" }} to="/customer">Customer</Link></li> 
                                    <li role="separator" className="divider"></li>
                                    <li><Link style={{ cursor: "pointer" }} onClick={this.logOutUser}>Logout</Link></li>
                                </ul>
                            </li>
                            
                        </ul> */}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;