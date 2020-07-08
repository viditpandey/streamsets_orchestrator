import React from 'react'
import Home from './components/Home'
var ReactDOM = require('react-dom')
require('./index.css')
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from './configs/routes'

class App extends React.Component {
  render () {
    return (
      <Router>
          <Home />
          {routes.map((route, i) => {
            return (
              <Route
                key={i}
                path={route.path}
                exact={route.exact}
                children={<route.component />}
            />
            )
          })}
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
    document.getElementById('app')
)
