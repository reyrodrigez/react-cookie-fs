import React from "react"

const Main = () =>
  <>
    <div id="demo" className="container">
      <h4 className="title is-4">Demo</h4>
      <ol>
        <li>Switch on your first feature by adding <code>f_scifi=startrek</code> to your url or <a href="?f_scifi=startrek"><i>click here.</i></a></li>
        <li>But hey, what if Volcan is not your thing? Switch to <code>f_scifi=starwars</code> by <a href="?f_scifi=starwars"><i>clicking here</i></a>.</li>
        <li>Okay, maybe you're not into sci-fi... Try to remove the query params from the url, let's see if that help.</li>
        <li>Well, that didn't work, did it? It's because these features are set as cookies. You can delete it by using: <code>f_scifi=_</code> to your url or <a href="?f_scifi=_"><i>click here.</i></a></li>
      </ol>
    </div>
    <div id="uage" className="container">
      <h4 className="title is-4">Usage</h4>
      <h5 className="title is-5">Installation</h5>
      <p>install the module using <code>npm</code> or <code>yarn</code>:</p>
      <pre><code>
        npm i react-cookie-fs --save
      </code></pre><br/>
      <pre><code>
        yarn add react-cookie-fs
      </code></pre>
      <h5 className="title is-5">In your code</h5>
      <h6 className="title is-6">Provider</h6>
      <p>Import the <code>FeatureProvider</code> and wrap your components with it. Remember that everything in the <code>{`<FeatureProvider></FeatureProvider>`}</code>'s subtree will have access to the list of features.</p>
      <pre><code>
        {`import {FeatureProvider} from 'react-cookie-fs';`}<br/>
       {`
<FeatureProvider>
  <YourAmazingComponents/>
</FeatureProvider>
      `}
      </code></pre>
      <h5 className="title is-5">Consumer</h5>
      <p>Consumer is the way to retrieve feature data from the provider.</p>
      <p><strong>Make sure that you consume the context in the subtree of the <code>{`<FeatureProvider></FeatureProvider>`}</code>.</strong></p>
      <p>Import the context:</p>
      <pre><code>
        import FeatureContext from 'react-cookie-fs';<br/><br/>
        <em>// using the  Context Hook:</em><br/>
      {`const features = React.useContext(FeatureContext);
if (features['myFeature'] === 'awesome') {
  // render awesome version
} else {
  // render normal version
}`}<br/><br/>
  <em>// or Consumer:</em><br/>
      {`<FeatureContext.Consumer></FeatureProvider>
  {features = & gt; features['myFeature'] === 'awesome' ? <Awesome/></FeatureProvider> : <Normal/></FeatureProvider>}
</FeatureContext.Consumer></FeatureProvider>`}
</code></pre>
      <h5 className="title is-5">Setting feature cookies</h5>
      <p>The feature cookies can be set by adding query params to the URL:</p>
      <p><code>https://example.com/?f_myFeature=awesome</code></p>
      <p><strong>Notice the <code>f_</code> prefix in the url parameter. This will tell the feature service to set a cookie.</strong></p>
      <p>to remove a feature cookie you have to set the value to <code>_</code>:</p>
      <p><code>https://example.com/?f_myFeature=_</code></p>
    </div> 
  </>

export default Main