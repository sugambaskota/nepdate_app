import {Alert} from 'react-native';

import {
  SET_LIKE_LOADING,
  GET_LIKERS,
  GET_LIKED,
  LIKE_USER,
  UNLIKE_USER,
  LIKE_ERROR,
  CLEAR_LIKE,
} from './types';
import api from '../api/api';

export const likeUser = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await api.get(`/api/like/${userId}`);
    dispatch({
      type: LIKE_USER,
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

export const unlikeUser = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await api.get(`/api/like/not/${userId}`);
    dispatch({
      type: UNLIKE_USER,
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

export const getLikers = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearLike());
    const res = await api.get('/api/like');
    dispatch({
      type: GET_LIKERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

export const getLiked = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearLike());
    const res = await api.get('/api/like/me');
    dispatch({
      type: GET_LIKED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LIKE_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

const setLoading = () => {
  return {
    type: SET_LIKE_LOADING,
  };
};

const clearLike = () => {
  return {
    type: CLEAR_LIKE,
  };
};
