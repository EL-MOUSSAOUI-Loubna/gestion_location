import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignUp from './auth/SignUp.jsx'
import {Provider} from 'react-redux';
import store from './store/store.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';

import SignIn from './auth/SignIn.jsx'
import AddRent from './adminPages/AddRent.jsx'
//import ImageUpload from './userPages/Home.jsx'
import TestMap from './adminPages/TestMap.jsx'
import Dashboard from './adminPages/Dashboard.jsx'
import Home from './adminPages/Home.jsx'


createRoot(document.getElementById('root')).render(
  
    <Provider store= {store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  
)
