jest.mock('js-cookie');
const { featureService } = require('../index');
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

describe('getFeaturesFromCookie', () => {
  beforeEach(() => {
    document.cookie = "fake=aaa;expires='Wed, 31 Oct 2012 08:50:17 GMT'"
    document.cookie = "f_legit=bbb;expires='Wed, 31 Oct 2012 08:50:17 GMT'"
    document.cookie = "f_legit2=ccc;expires='Wed, 31 Oct 2012 08:50:17 GMT'"
    document.cookie = "f_falsy=false;expires='Wed, 31 Oct 2012 08:50:17 GMT'"
    document.cookie = "f_truthy=true;expires='Wed, 31 Oct 2012 08:50:17 GMT'"
  });
  test('return empty object if no cookie is set', () => {
    document.cookie = "";
    expect(featureService.getFeaturesFromCookie()).toEqual({});
  });

  test('return feature object from cookie', () => {
    document.cookie = "fake=aaa";
    document.cookie = "f_legit=bbb";
    document.cookie = "f_legit2=ccc";
    expect(featureService.getFeaturesFromCookie()).toEqual({ legit: 'bbb', legit2: 'ccc' });
  });

  test('return with boolean value', () => {
    document.cookie = "f_falsy=false";
    document.cookie = "f_truthy=true";
    expect(featureService.getFeaturesFromCookie()).toEqual({ falsy: false, truthy: true });
  });

});