import React, { useState } from 'react'
import BottomNavi from './BottomNavi'
import routes from '../../configs/routes'
import AppTitleBar from './AppTitleBar'

import { Route } from 'react-router-dom'
export const AppBarContext = React.createContext({ text: 'Streamsets Orchestrator' })

const Home = (props) => {
  const [appBar, setAppBar] = useState({ text: 'Streamsets Orchestrator' })
  const setAppTitle = appBar => setAppBar(appBar)
  return (
    <div>
      <div className='app-bar'>
        <AppTitleBar text={appBar.text} button={appBar.button} />
      </div>
      <div className='app-body'>
        <AppBarContext.Provider value={{
          setAppTitle: setAppTitle
        }}
        >
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
        </AppBarContext.Provider>
      </div>
      <BottomNavi />
    </div>
  )
}

export default Home
