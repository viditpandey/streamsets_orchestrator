import Home from './components/Base/Home'
import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

var ReactDOM = require('react-dom')
require('./index.css')

class App extends React.Component {
  render () {
    return (
      <Router>
        <SnackbarProvider
          maxSnack={3}
          hideIconVariant={false}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={3000}
        >
          <Home />
        </SnackbarProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
