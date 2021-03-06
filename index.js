const React = require("react");
const Cookies = require("js-cookie");

const FEATURE_PREFIX = "f_";

const setFeatureCookie = (param) => {
  if (!param.includes('=')) {
    Cookies.set(param, true);
  }
  const featureName = param.split('=')[0];
  const featureValue = param.split('=')[1];

  if (featureValue === '_') {
    Cookies.remove(featureName);
  } else {
    Cookies.set(featureName, featureValue);
  }
}

const getFeaturesFromUrl = () => {
  const urlParams = window.location.search.substr(1);
  if (urlParams.includes(FEATURE_PREFIX)) {
    if (urlParams.includes("&")) {
      urlParams
        .split("&")
        .filter(param => param.includes(FEATURE_PREFIX))
        .map(param => featureService.setFeatureCookie(param));
    } else {

      featureService.setFeatureCookie(urlParams);
    }
  }
  return false;
}

const getFeaturesFromCookie = () => {
  return document.cookie
    .split(";")
    .map(cookie => cookie.trim())
    .map(cookie => cookie.split("="))
    .reduce(function (acc, val) {
      if (val[0] !== '' && val[0].slice(0, FEATURE_PREFIX.length) === FEATURE_PREFIX) {
        const currKey = val[0].substr(FEATURE_PREFIX.length);
        acc[currKey] = val[1] === "false" ? false : val[1] === "true" ? true : val[1];
      }
      return acc;
    }, {});
}

const getFeatures = () => {
  getFeaturesFromUrl();
  return getFeaturesFromCookie();
}

const featureService = {
  setFeatureCookie,
  getFeaturesFromUrl,
  getFeaturesFromCookie,
  getFeatures
};

const FeatureContext = React.createContext(null);

const FeatureProvider = ({children}) => React.createElement(
  FeatureContext.Provider,
  {value: getFeatures()},
  children
  );
  
module.exports = FeatureContext;
module.exports.FeatureProvider = FeatureProvider;
module.exports.featureService = featureService;
