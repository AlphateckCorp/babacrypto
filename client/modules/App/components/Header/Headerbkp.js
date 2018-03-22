import React from 'react';
import { Link } from 'react-router';
import Navigation from '../Navigation/Navigation';
export function Header() {
  // const languageNodes = props.intl.enabledLanguages.map(
  //   lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected >{lang}</li>
  // );

  return (
    <header className="c-header l-header">
      <div className="grid-container">
        <div className="grid-x align-center">
          <div className="cell shrink">
            {/* c-logotype */}
            <div className="c-logotype">
              <Link to="/">
                <div className="c-logotype__text">
                  <span className="t--blue">baba</span><span>crypto</span><span className="c-logotype__small">.com</span>
                  
                </div>
              </Link>
              <Link to="chart">Chart </Link>
              {/* <Navigation /> */}
              {/* <nav className="navbar navbar-inverse navbar-static-top">
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
                            <li><Link to="/"> Top CASINOS</Link> </li>
                            <li><Link to="/"> Payment</Link> </li>

                        </ul>
                    </div>
                </div>
            </nav> */}
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
    <div>
      <Navigation />
      </div>
  );
}

// Header.contextTypes = {
//   router: React.PropTypes.object,
// };

// Header.propTypes = {
//   toggleAddPost: PropTypes.func.isRequired,
//   switchLanguage: PropTypes.func.isRequired,
//   intl: PropTypes.object.isRequired,
// };

export default Header;
