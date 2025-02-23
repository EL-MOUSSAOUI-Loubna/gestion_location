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
import AddRent from './pages/AddRent.jsx'
//import ImageUpload from './userPages/Home.jsx'
import TestMap from './pages/TestMap.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/DetailsAnnonce.jsx'
import Reservations from './pages/Reservations.jsx'
import ManageAnnonces from './pages/ManageAnnonces.jsx'
import Statistics from './pages/HomeAdmin.jsx'

createRoot(document.getElementById('root')).render(
  
    <Provider store= {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  
)
