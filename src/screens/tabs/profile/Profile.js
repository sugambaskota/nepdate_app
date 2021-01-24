import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {launchImageLibrary} from 'react-native-image-picker';

import Details from './tabs/Details';
import PrimaryDetails from './tabs/PrimaryDetails';
import Photos from './tabs/Photos';
import {getCurrentUserProfile} from '../../../actions/profile';
import {uploadDp} from '../../../actions/photo';
import {logout} from '../../../actions/auth';

const Profile = ({
  navigation,
  auth: {user},
  profile: {profile, notfound, loading},
  photo: {dp_loading},
  getCurrentUserProfile,
  uploadDp,
  logout,
}) => {
  const [tabActive, setTabActive] = useState('details');

  useFocusEffect(
    useCallback(() => {
      getCurrentUserProfile();
    }, []),
  );

  const determineTabContent = () => {
    switch (tabActive) {
      case 'details':
        return <Details />;
      case 'primaryDetails':
        return <PrimaryDetails />;
      case 'photos':
        return <Photos />;
      default:
        return <Details />;
    }
  };

  const choosePhotoFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (response.didCancel) {
        return;
      }
      uploadDp({
        name: response.fileName,
        type: response.type,
        uri: response.uri,
      });
    });
  };

  const isTabActive = (tabName) => (tabActive === tabName ? true : false);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator color="cadetblue" size={40} />
    </View>
  ) : profile ? (
    <ScrollView
      contentContainerStyle={styles.profileContainer}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={logout} style={styles.logoutStyle}>
        <AntDesign name="logout" size={20} />
      </TouchableOpacity>
      <View style={styles.profileIntro}>
        <TouchableOpacity onPress={choosePhotoFromGallery}>
          <View style={styles.mainImageWrapper}>
            <ImageBackground
              source={{
                uri: user.dp,
              }}
              style={styles.mainImage}>
              {dp_loading ? (
                <ActivityIndicator size={20} color="#fff" />
              ) : (
                <Fontisto
                  name="camera"
                  size={20}
                  style={styles.mainImageCamera}
                />
              )}
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.nameText}>
            {user.firstName.charAt(0).toUpperCase() +
              user.firstName.slice(1) +
              ' '}
            {user.middleName
              ? user.middleName.charAt(0).toUpperCase() +
                user.middleName.slice(1) +
                ' '
              : ''}
            {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
          </Text>
          <Text style={styles.detailsText}>Age: {user.age}</Text>
          <Text style={styles.detailsText}>
            Location:{' '}
            {profile.city.charAt(0).toUpperCase() + profile.city.slice(1)},{' '}
            {profile.country.charAt(0).toUpperCase() + profile.country.slice(1)}
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.tabsListStyle}>
          <TouchableOpacity
            style={
              isTabActive('details') ? styles.tabActiveStyle : styles.tabStyle
            }
            onPress={() => setTabActive('details')}>
            <Text
              style={
                isTabActive('details') ? styles.tabActiveText : styles.tabText
              }>
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              isTabActive('primaryDetails')
                ? styles.tabActiveStyle
                : styles.tabStyle
            }
            onPress={() => setTabActive('primaryDetails')}>
            <Text
              style={
                isTabActive('primaryDetails')
                  ? styles.tabActiveText
                  : styles.tabText
              }>
              Primary Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              isTabActive('photos') ? styles.tabActiveStyle : styles.tabStyle
            }
            onPress={() => setTabActive('photos')}>
            <Text
              style={
                isTabActive('photos') ? styles.tabActiveText : styles.tabText
              }>
              Photos
            </Text>
          </TouchableOpacity>
        </View>
        <View>{determineTabContent()}</View>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.container}>
      {notfound && (
        <>
          <Text style={styles.createProfileText}>
            You have not created your profile! Click the button below to create
            a new profile
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateProfile')}
            style={styles.createProfileBtn}>
            <Text style={styles.createProfileBtnText}>Create profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  uploadDp: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  photo: state.photo,
});

const mapDispatchToProps = {
  getCurrentUserProfile,
  uploadDp,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {},
  logoutStyle: {
    position: 'absolute',
    top: 12,
    right: 20,
  },
  //create profile view styles start
  createProfileText: {
    textAlign: 'center',
    marginHorizontal: 10,
  },
  createProfileBtn: {
    backgroundColor: 'cadetblue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 6,
  },
  createProfileBtnText: {
    color: '#fff',
  },
  logoutBtn: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
  },
  logoutBtnText: {
    color: '#fff',
  },
  //create profile view styles end
  //
  //profile intro styles start
  profileIntro: {
    alignItems: 'center',
  },
  mainImageWrapper: {
    height: 100,
    width: 100,
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',
  },
  mainImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  mainImageCamera: {
    color: '#fff',
    opacity: 0.7,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  //profile intro styles end
  //
  //tabs style start
  tabsListStyle: {
    flexDirection: 'row',
    marginVertical: 6,
    borderBottomWidth: 2,
    borderColor: 'darkgrey',
  },
  tabActiveStyle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
    marginBottom: -2,
    borderColor: 'seagreen',
    borderBottomWidth: 2,
  },
  tabStyle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
    marginBottom: -2,
  },
  tabActiveText: {
    fontSize: 16,
    color: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  //tabs style end
});
