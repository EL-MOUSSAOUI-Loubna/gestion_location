import { FETCH_COUNTRIES } from '../actions/actionType.jsx';


const initialState = {
    countries: [],
    cities: [],
    position : [31.622843095562477,-7.990010217743958],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };

            case 'FETCH_CITIES':
                return {
                    ...state,
                    cities: action.payload,
                };

        default:
            return state;
    }
};
export default reducer;