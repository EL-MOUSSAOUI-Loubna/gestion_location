import { FETCH_CITIES, ADD_RENT, SIGNUP_USER, LOGIN_USER,
  DELETE_ANN, RESERVE_ANN, ACCEPT_RES, REJECT_RES, UPDATE_ANN,
  ACCEPT_ANN, REJECT_ANN
 } from './actionType.jsx'
import axios from 'axios';


export const fetchCities = () => (dispatch) => {
    const apiUrl = "https://countriesnow.space/api/v0.1/countries/cities";
        const requestBody = {
          country: "Morocco",
        };

        axios
          .post(apiUrl, requestBody)
          .then((response) => {
            dispatch ({ type: FETCH_CITIES, payload: response.data.data }) ;

          })
          .catch((error) => {
            // Handle errors
            console.error("Error fetching cities:", error);
          });
}

export const logInUser = (id)=>{
  return {type: LOGIN_USER, payload: id}
}
export const signUp_user = (newUser)=> {
  //console.log({type: SIGNUP_USER, payload: newUser});
  return {type: SIGNUP_USER, payload: newUser}
}

export const addRent = (newRent) => {
  return {type: ADD_RENT, payload: newRent};
}

export const delete_ann = (idAnn)=>{
  return {type: DELETE_ANN, payload: idAnn};
}
export const reserveAnn = (newReserve)=>{
  return {type: RESERVE_ANN, payload: newReserve};
}
export const acceptRes = (resDone)=>{
  return {type: ACCEPT_RES, payload: resDone};   //to delete res from pendingRes and push it to acceptedRes
}
export const rejectRes = (id)=>{
  return {type: REJECT_RES, payload: id};   // delete res from pendingRes
}

export const updateAnn = (updatedAnn) => {
  return {type: UPDATE_ANN, payload: updatedAnn};
}

export const acceptAnn = (idAnn) => {
  return {type: ACCEPT_ANN, payload: idAnn};
}
export const idAnnToRej = (idAnn) => {
  return {type: REJECT_ANN, payload: idAnn};
}








/* export const fetchCountries = (dispatch) => {
  axios.get('/api/countries')
      .then(response => {
          const countryNames = response.data.map(country => country.name);
          dispatch ({ type: FETCH_COUNTRIES, payload: countryNames }) ;
      })
      .catch(error => {
          console.error('Error fetching the country data:', error);
      });
} */