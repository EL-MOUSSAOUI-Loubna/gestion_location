import { acceptRes, updateAnn } from '../actions/actions.jsx';
import { FETCH_CITIES, ADD_RENT, SIGNUP_USER, LOGIN_USER,
    DELETE_ANN, RESERVE_ANN, ACCEPT_RES, REJECT_RES, UPDATE_ANN,
    ACCEPT_ANN, REJECT_ANN } from '../actions/actionType.jsx';


const initialState = {
    cities: [],
    annonces: [],  // {id, title, description, city, position, photos, price, userId}
    allUsers: [{ id: 1, type: 'admin', firstName: 'loubna', lastName: 'elmoussaoui', city: 'marrakech', email: 'admin@admin.com', password: 123, idAnn: [], selectedPosition: [] }],      // {type: '',id: null, nom: '', prenom: '', email: '', ville: '', password: ''}
    loggedInUser: {}, // {id, type, nom, prenom, email, ville, password},
    pendingRes: [],   // { id, idAnn, idUser, firstName, lastName, city }
    acceptedRes: [],
    pendingAnnonces: [],    //{id, title, description, city, position, photos, price, userId}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        /*case FETCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };*/

        case SIGNUP_USER:
            return {
                ...state, users: [...state.users, {
                    id: state.users.length + 1,
                    type: 'user',
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    city: action.payload.city,
                    email: action.payload.email,
                    password: action.payload.password,
                    idAnn:[],
                    //selectedPosition: []
                }]
            }

        case LOGIN_USER:
            const user = allUsers.find(user => user.id === action.payload);
            return {
                ...state, 
                loggedInUser:  [
                    {id: action.playload,
                    ...user
                    /*type: user.type,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    city: user.city,
                    email: user.email,
                    password: user.password,
                    idAnn: [],
                    selectedPosition: []*/
                }]
            }

        case FETCH_CITIES:
            return {
                ...state,
                cities: action.payload,
            };

        case ADD_RENT:
            return {
                ...state,
                annonces: [...state.annonces, action.payload]
            }

        case DELETE_ANN:
            return state.annonces.filter(ann=>ann.id == action.payload);

        case RESERVE_ANN:
            return {
                ...state, 
                pendingRes: [ ...state.pendingRes,
                   { id: state.pendingRes.length+1, 
                    ...action.payload
                }]
            }

        case ACCEPT_RES:
            state.pendingRes.filter(res=> res.id == action.payload.idRes)
            return {...state,
                acceptedRes: [
                    ...state.acceptedRes,
                    {...action.payload}
                ]
                
            }

        case REJECT_RES:
            return state.pendingRes.filter(res=>res.id == action.payload.idRes);
        
        case UPDATE_ANN:
            return

        case ACCEPT_ANN:
            state.pendingAnnonces.filter(ann=> ann.id == action.payload)
            return {...state,
                acceptedRes: [
                    ...state.acceptedRes,
                    {...action.payload}
                ]
                
            }

        default:
            return state;
    }
};
export default reducer;