import {Alert} from 'react-native';

import api from '../api/api';
import {
  SET_PHOTO_LOADING,
  SET_DP_LOADING,
  GET_PHOTOS,
  SET_PHOTO_MAIN,
  UPLOAD_DP,
  DELETE_PHOTO,
  PHOTOS_ERROR,
  CLEAR_PHOTOS,
} from './types';

export const getCurrentUserPhotos = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearPhotos());
    const res = await api.get('/api/photos');
    dispatch({
      type: GET_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

export const getPhotosByUserId = (user_id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearPhotos());
    const res = await api.get(`/api/photos/${user_id}`);
    dispatch({
      type: GET_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

export const setPhotoAsMain = (photo_path) => async (dispatch) => {
  try {
    await api.get(`/api/photos/setmain?path=${photo_path}`);
    dispatch({
      type: SET_PHOTO_MAIN,
      payload: photo_path,
    });
    Alert.alert('Main photo updated successfully!');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

export const deletePhoto = (photo_path) => async (dispatch) => {
  try {
    await api.delete(`/api/photos/delete?path=${photo_path}`);

    dispatch({
      type: DELETE_PHOTO,
      payload: photo_path,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

export const uploadDp = (photo) => async (dispatch) => {
  try {
    dispatch(setDpLoading());

    let formData = new FormData();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    formData.append('photo', photo);

    const res = await api.post('/api/photos/upload/dp', formData, config);
    dispatch({
      type: SET_PHOTO_MAIN,
      payload: res.data.path,
    });
    dispatch({
      type: UPLOAD_DP,
      payload: res.data,
    });
    Alert.alert('Main photo updated successfully!');
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

export const uploadPhotos = (photos) => async (dispatch) => {
  try {
    dispatch(setLoading());

    let formData = new FormData();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    photos.forEach((photo) => formData.append('photos', photo));
    const res = await api.post('/api/photos/upload/multiple', formData, config);
    dispatch({
      type: GET_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
    });
    const errors = err.response.data.errors;
    if (errors && errors.length > 0) {
      Alert.alert(errors[0].msg);
    }
  }
};

const setLoading = () => {
  return {
    type: SET_PHOTO_LOADING,
  };
};

const setDpLoading = () => {
  return {
    type: SET_DP_LOADING,
  };
};

const clearPhotos = () => {
  return {
    type: CLEAR_PHOTOS,
  };
};
