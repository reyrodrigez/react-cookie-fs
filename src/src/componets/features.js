import React from "react"

import FeatureContext from 'react-cookie-fs'

const Features = () => {
  const features = React.useContext(FeatureContext)
  switch (features['scifi']) {
    case 'startrek':
      return <div className="notification is-warning has-text-centered">
        <span className="icon">
          <i className="fas fa-hand-spock fa-3x"></i>
        </span>
        <h6 className="title is-5">
          Live long and prosper!
           </h6>
        <p>You have enabled the <strong>Star Trek</strong> feature.</p>
      </div>
    case 'starwars':
      return <div className="notification is-info has-text-centered">
        <span className="icon">
          <i className="fas fa-jedi fa-3x"></i>
        </span>
        <h6 className="title is-5">
          Let the force be with you!
      </h6>
        <p>You have enabled the <strong>Star Wars</strong> feature.</p>
      </div>
    default:
      return <p>No enabled features.</p>;
  }
}

export default Features