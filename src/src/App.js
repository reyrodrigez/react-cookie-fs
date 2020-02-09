import React from "react"
import ReactDOM from "react-dom"

import { FeatureProvider } from "react-cookie-fs"

import Hero from "./componets/hero"
import Features from "./componets/features"
import Main from "./componets/main"

const App = () => (
  <FeatureProvider>
    <Hero title="React Cookie FS">Cookie based feature switching with React</Hero>
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column sidebar">
            <div className="container sticky">
              <h4 className="title is-4">Features</h4>
              <Features />
            </div>
          </div>
          <div className="column is-9 main">
            <Main />
          </div>
        </div>
      </div>
    </div>
  </FeatureProvider>

)

var mountNode = document.getElementById("app")
ReactDOM.render(<App />, mountNode)