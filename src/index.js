import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './App'
import { HashRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
