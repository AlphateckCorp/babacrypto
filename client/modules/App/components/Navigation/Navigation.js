
import React, { Component } from 'react';
import { Link } from 'react-router';
import { slide as Menu } from 'react-burger-menu'

class Navigation extends Component {

    render() {
        return (
            // <nav className="navbar">
            //     <div className="containerFluid">
            //         <div className="navbarHeader">
            //             <button type="button" className="navbarToggle" data-toggle="collapse" data-target="#myNavbar">
            //                 <span className="navbarToggleIconBar"></span>
            //                 <span className="navbarToggleIconBar"></span>
            //                 <span className="navbarToggleIconBar"></span>
            //             </button>
            //             <Link className="navbarBrand" to="/">
            //                 <span className="t--blue">baba</span><span>crypto</span><span className="">.com</span>
            //             </Link>
            //         </div>
            //         <div className="collapse navbar-collapse" id="myNavbar">
            //             <ul className="nav navbarNav">
            //                 <li className="floatLeft navLi">
            //                     <Link className="navbarLiA navLiA" to="/">COINS</Link>
            //                 </li>                         
            //                 <li className="floatLeft  navLi">
            //                     <Link className="navbarLiA navLiA" to="/exchanges">Exchanges</Link>
            //                 </li>
            //             </ul>
            //         </div>
            //     </div>
            // </nav>

            <div>
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
                <li> <Link className="" to="/exchanges">Exchanges</Link></li>
                <li><a href="#menu-closed">&#215; </a></li>
                <li><a href="#menu">&#9776;</a></li>
            </ul>
        </nav>
        <Link className="navbrand_logo"  to="/">
                           <span className="t--blue">baba</span><span>crypto</span><span className="">.com</span>
                    </Link>
            <Menu right>
                <Link id="coins" className="menu-item" to="/">COINS</Link>
                <Link id="exchanges" className="menu-item" to="/exchanges">EXCHANGES</Link>
            </Menu>
        </div>

        );
    }
}

export default Navigation;
