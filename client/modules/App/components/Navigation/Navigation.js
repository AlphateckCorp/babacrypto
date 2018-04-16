
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { slide as Menu } from 'react-burger-menu';
import { WindowResizeListener } from 'react-window-resize-listener'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = { menuOpen: false }
    }
    closeMenu = (event) => {
        // Do not call event.preventDefault() in here
        this.setState({ menuOpen: false })
    }

    render() {
        const t =this;
        return (
            <div>
                <WindowResizeListener onResize={windowSize => {
                    if(windowSize.windowWidth > 768) {
                        t.setState({ menuOpen: false })
                    }
                }}/>
                <nav id="menu">
                    <ul id="menu-closed">
                        <li>
                            <Link className="navbrand"  to="/">
                                <span className="t--blue">baba</span><span>crypto</span><span className="">.com</span>
                            </Link>                        
                        </li>
                        <li>
                            <Link className="" to="/">COINS</Link>
                        </li>
                        <li>
                            <Link className="" to="/exchanges">Exchanges</Link>
                        </li>
                    </ul>
                </nav>
                <Link className="navbrand_logo"  to="/">
                    <span className="t--blue">baba</span><span>crypto</span><span className="">.com</span>
                </Link>
                <Menu right isOpen={this.state.menuOpen}>
                    <Link id="coins" className="menu-item" to="/" onClick={this.closeMenu}>COINS</Link>
                    <Link id="exchanges" className="menu-item" to="/exchanges" onClick={this.closeMenu}>EXCHANGES</Link>
                </Menu>
            </div>

        );
    }
}

export default Navigation;
