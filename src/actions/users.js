import {Alert} from 'react-native';

import api from '../api/api';
import {
  SET_USERS_LOADING,
  GET_USERS,
  SEARCH_USERS,
  LOAD_MORE_USERS,
  USERS_ERROR,
  CLEAR_USERS,
  CLEAR_SEARCH_USERS,
  SEARCH_NOT_FOUND,
} from './types';

export const getUsers = (page = 1, size = 6) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearUsers());
    const queryParams = `?page=${page}&size=${size}`;

    const res = await api.get(`/api/users${queryParams}`);
    dispatch({
      type: GET_USERS,
      payload: res,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
    dispatch({
      type: USERS_ERROR,
    });
  }
};

export const loadMoreUsers = (page) => async (dispatch) => {
  try {
    const queryParams = `?page=${page}`;
    const res = await api.get(`/api/users${queryParams}`);
    dispatch({
      type: LOAD_MORE_USERS,
      payload: res,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
    dispatch({
      type: USERS_ERROR,
    });
  }
};

export const searchUsers = (query, page = 1, size = 3) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearSearchUsers());
    const queryParams = `?q=${query}&page=${page}&size=${size}`;
    const res = await api.get(`/api/users/search${queryParams}`);
    if (!res.data || res.data.length == 0) {
      return dispatch({
        type: SEARCH_NOT_FOUND,
        payload: query,
      });
    }
    dispatch({
      type: SEARCH_USERS,
      payload: res,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
    dispatch({
      type: USERS_ERROR,
    });
  }
};

const setLoading = () => {
  return {
    type: SET_USERS_LOADING,
  };
};

const clearUsers = () => {
  return {
    type: CLEAR_USERS,
  };
};

export const clearSearchUsers = () => {
  return {
    type: CLEAR_SEARCH_USERS,
  };
};
