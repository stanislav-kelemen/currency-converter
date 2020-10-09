# currency-converter

Prototype of the currency converter-calculator using Privatbank API (it lags sometimes, probably update info, so try to make another request later in case of failure).

The application doesn't use any building tools, so to run it you need only a simple http server. I also used SASS which can be compiled by an eponymous npm package. 
Packages are displayed in devDependencies in package.json.

Run in the root derictory of project:

1. npm install
2. `http-server . -c-1` (last option to turn off cashing)
3. (optional) `sass ./src/css/style.sass  ./src/css/style.css` (`sass --watch` to update automatically)