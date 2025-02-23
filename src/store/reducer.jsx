import {
    FETCH_CITIES, ADD_RENT, SIGNUP_USER, LOGIN_USER,
    DELETE_ANN, RESERVE_ANN, ACCEPT_RES, REJECT_RES, UPDATE_ANN,
    ACCEPT_ANN, REJECT_ANN, LOGOUT
} from '../actions/actionType.jsx';


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

        case SIGNUP_USER:
            return {
                ...state, allUsers: [...state.allUsers, {
                    id: state.allUsers.length + 1,
                    type: 'user',
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    city: action.payload.city,
                    email: action.payload.email,
                    password: action.payload.password,
                    idAnn: []
                }]
            }

        case LOGIN_USER:
            const user = state.allUsers.find(user => user.id === action.payload);
            return {
                ...state,
                loggedInUser:
                {
                    id: action.payload,
                    ...user
                    /*type: user.type,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    city: user.city,
                    email: user.email,
                    password: user.password,
                    idAnn: [] */
                }
            }

        case FETCH_CITIES:
            return {
                ...state,
                cities: action.payload,
            };

        case ADD_RENT:
            return {
                ...state,
                pendingAnnonces: [...state.pendingAnnonces, action.payload]
            }

        case DELETE_ANN:
            return {
                ...state,
                annonces:
                    state.annonces.filter(ann => ann.id !== action.payload)
            }

        case RESERVE_ANN:
            return {
                ...state,
                pendingRes: [...state.pendingRes,
                {
                    id: state.pendingRes.length + 1,
                    ...action.payload
                }]
            }

        case ACCEPT_RES:
            state.pendingRes.filter(res => res.id !== action.payload.idRes)
            return {
                ...state,
                acceptedRes: [
                    ...state.acceptedRes,
                    { ...action.payload }
                ]

            }

        case REJECT_RES:
            return {
                ...state,
                pendingRes: state.pendingRes.filter((res) => res.id !== action.payload.idRes
                )
            };

        case UPDATE_ANN:
            const annonceToUpdate = state.annonces.find(ann => ann.id == action.payload.idAnn)
            if (!annonceToUpdate) {
                return state;
            }
            const updatedAnnonce = {
                ...annonceToUpdate,
                title: action.payload.title,
                description: action.payload.description,
                price: action.payload.price,
                city: action.payload.city,
                photos: action.payload.photos,
                selectedPosition: action.payload.selectedPosition,
            };
            const updatedAnnonces = state.annonces.map((ann) =>
                ann.id === action.payload.idAnn ? updatedAnnonce : ann
            );
            return { ...state, annonces: updatedAnnonces };

        case ACCEPT_ANN:
            const annonce = state.pendingAnnonces.find(ann => ann.id == action.payload);
            state.pendingAnnonces.filter(ann => ann.id == action.payload)
            return {
                ...state,
                pendingAnnonces: state.pendingAnnonces.filter(
                    (ann) => ann.id !== action.payload
                ),
                annonces: [...state.annonces, acceptedAnnonce],
            };

        case REJECT_ANN:
            return { ...state,
                pendingAnnonces: state.pendingAnnonces.filter(
                  (ann) => ann.id !== action.payload )
              };

        case LOGOUT:
            return {
                ...state,
                loggedInUser: {}
            }

        default:
            return state;
    }
};
export default reducer;