import {Alert} from 'react-native';

import api from '../api/api';
import {
  SET_PROFILE_LOADING,
  GET_PROFILE,
  NO_PROFILE_FOUND,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from './types';

export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearProfile());
    const res = await api.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.response.status === 404) {
      return dispatch({
        type: NO_PROFILE_FOUND,
      });
    }
    const errors = err.response.data.errors;

    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const getProfileByUserId = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearProfile());
    const res = await api.get(`/api/profile/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    if (err.response.status === 404) {
      return dispatch({
        type: NO_PROFILE_FOUND,
      });
    }
    const errors = err.response.data.errors;

    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const createProfile = (formData, navigation) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);

    await api.post('/api/profile', body, config);

    dispatch(getCurrentUserProfile());

    navigation.navigate('Profile');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);

    await api.post('/api/profile', body, config);

    dispatch(getCurrentUserProfile());

    Alert.alert('Details updated successfully!');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

const setLoading = () => {
  return {
    type: SET_PROFILE_LOADING,
  };
};

const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
  };
};
