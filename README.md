# currency-converter

Implementation the currency converter-calculator using Privatbank API (it lags sometimes, probably update info, so try to make another request latter in case of failure)

The application doesn't use any building tools, so to run it you need a simple http-server. I also used SASS which can be compiled by standart npm package. 
Packages are shown in dependencies in package.json.

In the root derictory of project:

1. npm install
2. http-server ./ -c-1 (last option to turn off cashing)
3. sass ./src/css/style.sass  ./src/css/style.css (prepend it with --watch to update automatically) 

Last piece of functionality has been unfinished yet.

