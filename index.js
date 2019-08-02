const React = require("react");
const Cookies = require("js-cookie");

const FEATURE_PREFIX = "f_";

function setFeatureCookie(param) {
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

function getFeaturesFromUrl() {
  const urlParams = window.location.search.substr(1);

  if (urlParams.includes(FEATURE_PREFIX)) {
    if (urlParams.includes("&")) {
      urlParams
        .split("&")
        .filter(param => param.includes(FEATURE_PREFIX))
        .map(param => setFeatureCookie(param));
    } else {
      setFeatureCookie(urlParams);
    }
  }
}

function getFeaturesFromCookie() {
  return document.cookie
    .split(";")
    .map(cookie => cookie.trim())
    .map(cookie => cookie.split("="))
    .reduce(function (acc, val) {
      if (val[0] !== '') {
        const currKey = val[0].substr(2);
        acc[currKey] = val[1] === "false" ? false : val[1] === "true" ? true : val[1];
      }
      return acc;
    }, {});
}

function getFeatures() {
  getFeaturesFromUrl();
  return getFeaturesFromCookie();
}

module.exports = React.createContext(getFeatures());
