import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import socket from '../utils/socket';
import api from '../api/api';
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
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await api.get('/api/auth');
    const token = await AsyncStorage.getItem('token');
    res.data.token = token;
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    socket.emit('online', res.data.user.id);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    if (err.response.status === 419) {
      Alert.alert('Session expired! Please login again.');
    }
  }
};

// Register User
export const register = ({
  firstname,
  middlename,
  lastname,
  gender,
  dob,
  email,
  password,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    firstname,
    middlename,
    lastname,
    gender,
    dob,
    email,
    password,
  });

  try {
    dispatch(setLoading());
    const res = await api.post('/api/users', body, config);
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({email, password});

  try {
    dispatch(setLoading());
    const res = await api.post('/api/auth', body, config);
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

// Update user details
export const updateUser = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      firstname: formData.fname,
      middlename: formData.mname,
      lastname: formData.lname,
      gender: formData.gender,
      dob: formData.dob,
    });

    dispatch(setAuthUpdateLoading());
    const res = await api.put('/api/auth', body, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });

    Alert.alert('Details updated successfully');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

// Logout
export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
  });
  socket.disconnect();
};

// Set loading
const setLoading = () => {
  return {
    type: SET_AUTH_LOADING,
  };
};

// Set auth update loading
const setAuthUpdateLoading = () => {
  return {
    type: SET_AUTH_UPDATE_LOADING,
  };
};

// Clear auth
const clearAuth = () => {
  return {
    type: CLEAR_AUTH,
  };
};
