
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Navigation.css';
class Navigation extends Component {

    render() {
        return (
            <nav className={styles.navbar + " " + styles.navbarInverse}>
                <div className={styles.containerFluid}>
                    <div className={styles.navbarHeader}>
                        <button type="button" className={styles.navbarToggle} data-toggle="collapse" data-target="#myNavbar">
                            <span className={styles.navbarToggleIconBar}></span>
                            <span className={styles.navbarToggleIconBar}></span>
                            <span className={styles.navbarToggleIconBar}></span>
                        </button>
                        <Link className={styles.navbarBrand} to="/">
                            <span className="t--blue">baba</span><span>crypto</span><span className="">.com</span>
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className={[styles.nav + " " + styles.navbarNav]}>
                            {/* <li className={[styles.floatLeft + " " + styles.navLi]}>
                                <Link className={styles.navbarLiA + " " + styles.navLiA} to="/">Home</Link>
                            </li> */}
                            <li className={[styles.floatLeft + " " + styles.navLi]}>
                                <Link className={styles.navbarLiA + " " + styles.navLiA} to="/chart">Chart</Link>
                            </li>
                            {/* <li className={[styles.floatLeft + " " + styles.navLi]}><a className={styles.navbarLiA + " " + styles.navLiA} href="#">Page 3</a></li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;