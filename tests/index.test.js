jest.mock('js-cookie');
const {featureService} = require('../index');
const Cookies = require("js-cookie");

describe('setFeatureCookie', () => {
  test('should call cookie.set with `true` as value', () => {
    const param = 'foo';
    featureService.setFeatureCookie(param);
    
    
    
    expect(Cookies.set).toHaveBeenCalledWith(param, true)
  });

  test('should call cookie.remove', () => {
    const key = 'foo';
    const param = `${key}=_`;
    featureService.setFeatureCookie(param);
    expect(Cookies.remove).toHaveBeenCalledWith(key)
  })
  test('should call cookie.set key and value', () => {
    const key = 'foo';
    const value = 'baz'
    const param = `${key}=${value}`;
    featureService.setFeatureCookie(param);
    expect(Cookies.set).toHaveBeenCalledWith(key, value)
  })
});

describe('getFeaturesFromUrl', () => {
  test('return false when feature preset is not present in the queryParam', () => {
    jsdom.reconfigure({
      url: "https://www.example.com?foo=baz"
    });
    expect(featureService.getFeaturesFromUrl()).toEqual(false);
  });

  test('call setFeatureCookie with the right queryParam', () => {
    const queryParam = 'f_foo=baz';
    featureService.setFeatureCookie = jest.fn();
    jsdom.reconfigure({
      url: `https://www.example.com?${queryParam}`
    });
    featureService.getFeaturesFromUrl();
    expect(featureService.setFeatureCookie).toHaveBeenCalledWith(queryParam);
  });

  test('call setFeatureCookie with the right queryParam', () => {
    const queryParam1 = 'f_foo=baz';
    const queryParam2 = 'f_bar=foo';
    featureService.setFeatureCookie = jest.fn();
    jsdom.reconfigure({
      url: `https://www.example.com?${queryParam1}&${queryParam2}`
    });
    featureService.getFeaturesFromUrl();
    expect(featureService.setFeatureCookie).toHaveBeenCalledWith(queryParam1);
    expect(featureService.setFeatureCookie).toHaveBeenCalledWith(queryParam2);
  })
});