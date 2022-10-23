import React from 'react'
import {
  Navigate,
  Outlet,
  Route,
  Routes as ReactRouterRoutes,
} from 'react-router-dom'

import PrivateRoute from './App/PrivateRoute'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import Home from './Pages/Home'
import Header from './components/Header'
import Main from './components/__styled__/Main'

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      <Route
        element={
          <PrivateRoute>
            <>
              <Header />
              <Main>
                <Outlet />
              </Main>
            </>
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </ReactRouterRoutes>
  )
}

export default React.memo(Routes)
