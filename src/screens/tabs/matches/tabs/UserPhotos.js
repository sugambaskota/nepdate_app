import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const UserPhotos = ({
  profile: {
    profile: {photos},
  },
}) => {
  return photos && photos.length > 0 ? (
    <View style={styles.photosContainer}>
      {photos.map((photo, index) => (
        <Image
          source={{uri: photo.path}}
          style={styles.photoStyle}
          key={index.toString()}
        />
      ))}
    </View>
  ) : (
    <View style={styles.container}>
      <Text>No photos found!</Text>
    </View>
  );
};

UserPhotos.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserPhotos);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoStyle: {
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 3,
  },
});
