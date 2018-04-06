import React from 'react';
import { Link } from 'react-router';
import Navigation from '../Navigation/Navigation';
export function Header() {
  // const languageNodes = props.intl.enabledLanguages.map(
  //   lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected >{lang}</li>
  // );

  return (
    <div>
      <header className="c-header l-header">
        {/* <div className="grid-container"> */}
        <div className="">
          <div className="grid-container">
            <div className="cell">
              <div className="">
              <Navigation />
              </div>
            </div>
          </div>
        </div>
      </header>
      
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
