import React from "react"
import FeatureContext from 'react-cookie-fs'

const Hero = (props) => {

  return <section className="hero is-primary">
    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-7">
            <h1 className="title">
              {props.title}
            </h1>
            <FeatureContext.Consumer>
              {features => {
                if (!features['hideSubtitle']) {
                  return <h2 className="subtitle">
                    {props.children}
                  </h2>
                }
              }}
            </FeatureContext.Consumer>
          </div>
          <div className="column is-5 hero-icons has-text-centered">
            <a className="link-icon" href="https://www.npmjs.com/package/react-cookie-fs">
              <span className="icon">
                <i className="fab fa-npm fa-3x"></i>
              </span>
            </a>
            <a className="link-icon" href="https://github.com/reyrodrigez/react-cookie-fs">
              <span className="icon">
                <i className="fab fa-github fa-3x"></i>
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
}

export default Hero