import {  FETCH_CITIES, ADD_RENT } from '../actions/actionType.jsx';


const initialState = {
    cities: [],
    announces: [],
    users: [],      // {type: '',id: null, nom: '', prenom: '', email: '', ville: '', password: ''}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        /*case FETCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };*/

            case FETCH_CITIES:
                return {
                    ...state,
                    cities: action.payload,
                };

            case ADD_RENT :
                return {
                    ...state,
                    announces: [...state.announces, action.payload]
                }

        default:
            return state;
    }
};
export default reducer;