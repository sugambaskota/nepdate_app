import {
  SET_USERS_LOADING,
  GET_USERS,
  LOAD_MORE_USERS,
  SEARCH_USERS,
  USERS_ERROR,
  CLEAR_USERS,
  CLEAR_SEARCH_USERS,
  SEARCH_NOT_FOUND,
} from '../actions/types';

const initialState = {
  users: null,
  pagination: null,
  searchResult: null,
  searchPagination: null,
  loading: false,
  searchNotFound: false,
  searchText: '',
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case SET_USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        pagination: null,
        searchResult: null,
        searchPagination: null,
      };
    case CLEAR_SEARCH_USERS:
      return {
        ...state,
        searchResult: null,
        searchPagination: null,
        searchNotFound: false,
        searchText: '',
      };
    case SEARCH_NOT_FOUND:
      return {
        ...state,
        loading: false,
        searchNotFound: true,
        searchText: payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload.data,
        pagination: JSON.parse(payload.headers.pagination),
        loading: false,
      };
    case LOAD_MORE_USERS:
      return {
        ...state,
        users: [...state.users, ...payload.data],
        pagination: JSON.parse(payload.headers.pagination),
      };
    case SEARCH_USERS:
      return {
        ...state,
        searchResult: payload.data,
        searchPagination: JSON.parse(payload.headers.pagination),
        loading: false,
      };
    case USERS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
