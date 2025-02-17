import { FETCH_CITIES, ADD_RENT} from './actionType.jsx'
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

export const addRent = (newRent) => {
  return {type: ADD_RENT, payload: newRent};
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