import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import request from 'request';
// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import DocumentMeta from 'react-document-meta';
// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// Run Webpack dev server in development mode
if (isDevMode) {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/post.routes';
import dummyData from './dummyData';
import serverConfig from './config';

// Apply body Parser and server public assets and routes
app.use(compression());
// app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
// app.use('/api', posts);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/*', function (req, res, next) {
//   if (req.headers.host.match(/^www/) == null) res.redirect(301, 'https://www.babacrypto.com' + req.url);
//   else next();
// });

app.use('/api', function (req, res) {
  // var url = "http://babacrypto.local" + req.url;
  var url = "http://api.babacrypto.com" + req.url;
  // var url = "http://devapi.babacrypto.com" + req.url;

  req.pipe(request(url)).pipe(res);
});

// Render Initial HTML
const renderFullPage = (html, initialState, requestedPage) => {
  const pageMeta = {};
  const requestedPageUrl = requestedPage.url.split('/');

  if (requestedPageUrl[1] == '') {
    pageMeta.title = "List of all CryptoCurrencies at babacrypto.com - 2018";
    pageMeta.description = 'babacrypto.com list all the CryptoCurrency coins, get insights about CryptoCurrency market cap, price, trade volume and chose the best digital currency!';
  } else if (requestedPageUrl[1] == 'exchanges') {
    if (requestedPageUrl[2]) {
      let coinName = requestedPageUrl[2].charAt(0).toUpperCase() + requestedPageUrl[2].substr(1).toLowerCase();
      pageMeta.title = coinName + " Exchange Review | Updated " + coinName + " Market Prices - 2018";
      pageMeta.description = "Full Review of " + coinName + " Exchange Platform | Full list of " + coinName + " Prices per Market and " + coinName + " Supported Coins at Babacrypto.com -2018"
    } else {
      pageMeta.title = 'All CryptoCurrency Exchanges List | Crypto Trading Platforms - 2018';
      pageMeta.description = 'List of all Cryptocurrency Exchanges | Crypto exchanges supported coins and volume amount, Find the best CryptoCurrency trading platforms! - 2018';
    }
  } else if (requestedPageUrl[1] == 'coins') {
    let coinName = requestedPageUrl[2].charAt(0).toUpperCase() + requestedPageUrl[2].substr(1).toLowerCase();
    pageMeta.title = coinName + " Overview | " + coinName + " Price, Charts and Market Cap";
    pageMeta.description = "Complete Overview of " + coinName + " CryptoCurrency | Updated " + coinName + " Price, " + coinName + " Charts and " + coinName + " Market Capitalization at Babacrypto.com";
  }

  const head = Helmet.rewind();
  const metas = DocumentMeta.rewind();
  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
      ${head.base.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
        ${head.script.toString()}
        <title data-react-helmet='true'>${pageMeta.title}</title>
        <meta name='description' content='${pageMeta.description}' data-rdm=''/>
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NR43GS2');</script>
        ${isProdMode ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link rel='stylesheet' href='${isProdMode ? assetsManifest['/stylesCustom.css'] : '/stylesCustom.css'}' />
        <link rel="shortcut icon" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      </head>
      <body>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NR43GS2"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${isProdMode ?
      `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${isProdMode ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${isProdMode ? assetsManifest['/app.js'] : '/app.js'}'></script> 
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"> </script>
      </body>
    </html>
  `;
};

const renderError = (err, req) => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = isProdMode ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {}, req);
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err, req));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();
        console.log('req', req);

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState, req));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
