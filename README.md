# React Cookie Feature Switch

Cookie based feature switching using React Context API

## How to use

### Installation

install the module using `npm` or `yarn`:
```
npm i react-cookie-fs --save
```
```
yarn add react-cookie-fs
```

### In your code

#### Provider

Import the `FeatureProvider` and wrap your components with it. Remember that everything in the `<FeatureProvider>`'s subtree will have access to the list of features.
```
import {FeatureProvider} from 'react-cookie-fs';
```

```
<FeatureProvider>
    <YourAmazingComponents/>
</FeatureProvider>
```

#### Consumer

Consumer is the way to retrieve feature data from the provider.

__Make sure that you consume the context in the subtree of the `<FeatureProvider>`.__

Import the context:
```
import FeatureContext from 'react-cookie-fs';
```

_using the  Context Hook:_


```
const features = React.useContext(FeatureContext);
if (features['myFeature'] === 'awesome') {
    // render awesome version
} else {
    // render normal version
}
```

_or Consumer:_

```
<FeatureContext.Consumer>
    {features => features['myFeature'] === 'awesome' ? <Awesome/> : <Normal/>}
</FeatureContext.Consumer>
```

### Setting feature cookies

The feature cookies can be set by adding query params to the URL:

`https://example.com/?f_myFeature=awesome`

__Notice the `f_` prefix in the url parameter. This will tell the feature service to set a cookie.__

to remove a feature cookie you have to set the value to `_`:

`https://example.com/?f_myFeature=_`

## Resources

- [Feature Toggles (aka Feature Flags) article from Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)
- [React Context API](https://reactjs.org/docs/context.html)

