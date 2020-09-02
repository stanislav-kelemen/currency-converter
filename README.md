# currency-converter

Implementation of the currency converter-calculator using Privatbank API (it lags sometimes, probably update info, so try to make another request later in case of failure).

The application doesn't use any building tools, so to run it you need a simple http server. I also used SASS which can be compiled by standart npm package. 
Packages are shown in dependencies in package.json.

In the root derictory of project:

1. npm install
2. `http-server ./ -c-1` (last option to turn off cashing)
3. (optional) `sass ./src/css/style.sass  ./src/css/style.css` (`sass --watch` to update automatically) 

Last piece of functionality will be finished ASAP.

#### P. S. If you're insterested in more detailed info and the current state of the project, please, check the _extraReadme.md_ file.

