import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignUp from './auth/SignUp.jsx'
import {Provider} from 'react-redux';
import store from './store/store.jsx'
import SignIn from './auth/SignIn.jsx'
import AddRent from './userPages/AddRent.jsx'
//import ImageUpload from './userPages/Home.jsx'
import TestMap from './userPages/TestMap.jsx'
import 'leaflet/dist/leaflet.css';


createRoot(document.getElementById('root')).render(
  
    <Provider store= {store}>
      <AddRent />
    </Provider>
  
)
