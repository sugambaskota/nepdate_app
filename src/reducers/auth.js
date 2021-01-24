import {
  SET_AUTH_LOADING,
  SET_AUTH_UPDATE_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  UPDATE_USER,
  AUTH_ERROR,
  CLEAR_AUTH,
  LOGOUT,
  SET_PHOTO_MAIN,
} from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: null,
  user: null,
  loading: false,
  auth_update_loading: false,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_AUTH_UPDATE_LOADING:
      return {
        ...state,
        auth_update_loading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload.user,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        auth_update_loading: false,
        user: payload.user,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case CLEAR_AUTH:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_PHOTO_MAIN:
      return {
        ...state,
        user: {
          ...state.user,
          dp: payload,
        },
      };
    default:
      return state;
  }
}
