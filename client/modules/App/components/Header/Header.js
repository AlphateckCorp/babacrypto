import React from 'react';

export function Header() {
  // const languageNodes = props.intl.enabledLanguages.map(
  //   lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  // );

  return (
    // header
    <header className="c-header l-header">
      <div className="grid-container">
        <div className="grid-x align-center">
          <div className="cell shrink">
            {/* c-logotype */}
            <div className="c-logotype">
              <a href="/">
                <div className="c-logotype__text">
                  <span className="t--blue">baba</span><span>crypto</span><span className="c-logotype__small">.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
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
