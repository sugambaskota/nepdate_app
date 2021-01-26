import Toast from 'react-native-simple-toast';

import {
  SET_MESSAGE_LOADING,
  GET_MESSAGES,
  GET_MESSAGE_THREAD,
  SEND_MESSAGE,
  RECEIVE_PRIVATE_MESSAGE,
  MESSAGES_ERROR,
  CLEAR_MESSAGES,
} from './types';
import api from '../api/api';

export const getMessages = (page = 1, size = 5) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearMessages());
    const queryParams = `?page=${page}&size=${size}`;
    const res = await api.get(`/api/message/threads${queryParams}`);
    dispatch({
      type: GET_MESSAGES,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: MESSAGES_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors && errors.length > 0) {
      Toast.show(errors[0].msg);
    }
  }
};

export const getMessageThread = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await api.get(`/api/message/thread/${userId}`);
    dispatch({
      type: GET_MESSAGE_THREAD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MESSAGES_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors && errors.length > 0) {
      Toast.show(errors[0].msg);
    }
  }
};

export const sendMessage = (receiverId, text) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    text,
  });
  try {
    const res = await api.post(`/api/message/${receiverId}`, body, config);

    dispatch({
      type: SEND_MESSAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MESSAGES_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors && errors.length > 0) {
      Toast.show(errors[0].msg);
    }
  }
};

export const receivePrivateMessage = (message) => (dispatch) => {
  dispatch({
    type: RECEIVE_PRIVATE_MESSAGE,
    payload: message,
  });
};

const setLoading = () => {
  return {
    type: SET_MESSAGE_LOADING,
  };
};

const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
