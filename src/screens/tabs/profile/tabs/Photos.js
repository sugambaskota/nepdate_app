import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  getCurrentUserPhotos,
  setPhotoAsMain,
  uploadPhotos,
  deletePhoto,
} from '../../../../actions/photo';

const Photos = ({
  auth: {user},
  photo: {photos, loading},
  getCurrentUserPhotos,
  setPhotoAsMain,
  uploadPhotos,
  deletePhoto,
}) => {
  const [targetPhoto, setTargetPhoto] = useState('');

  useEffect(() => {
    getCurrentUserPhotos();
  }, [getCurrentUserPhotos]);

  const choosePhotoFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (response.didCancel) {
        return;
      }
      uploadPhotos([
        {
          name: response.fileName,
          type: response.type,
          uri: response.uri,
        },
      ]);
    });
  };

  const uploadPhotosCard = (
    <TouchableOpacity
      style={styles.uploadPhotosCard}
      onPress={choosePhotoFromGallery}>
      <MaterialIcons
        name="cloud-upload"
        size={40}
        style={styles.uploadPhotosIcon}
      />
    </TouchableOpacity>
  );

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size={20} animating={true} color="cadetblue" />
    </View>
  ) : photos && photos.length > 0 ? (
    <View style={styles.photosContainer}>
      {photos.map((photo, index) => (
        <Image
          source={{
            uri: photo.path,
          }}
          style={styles.photoStyle}
          key={index.toString()}
        />
      ))}
      {uploadPhotosCard}
    </View>
  ) : (
    <View style={styles.container}>
      <Text>No photos found!</Text>
      {uploadPhotosCard}
    </View>
  );
};

Photos.propTypes = {
  auth: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
  getCurrentUserPhotos: PropTypes.func.isRequired,
  setPhotoAsMain: PropTypes.func.isRequired,
  uploadPhotos: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  photo: state.photo,
});

const mapDispatchToProps = {
  getCurrentUserPhotos,
  setPhotoAsMain,
  uploadPhotos,
  deletePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  uploadPhotosCard: {
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPhotosIcon: {
    opacity: 0.8,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    padding: 10,
  },
  //photos container style start
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoStyle: {
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 3,
  },
});
