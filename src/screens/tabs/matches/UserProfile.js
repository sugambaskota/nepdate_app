import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

import UserDetails from './tabs/UserDetails';
import UserPhotos from './tabs/UserPhotos';
import {getProfileByUserId} from '../../../actions/profile';
import {likeUser, unlikeUser} from '../../../actions/like';

const UserProfile = ({
  navigation,
  route,
  profile: {profile, loading, notfound},
  like,
  getProfileByUserId,
  likeUser,
  unlikeUser,
}) => {
  const [tabActive, setTabActive] = useState('details');
  const focused = useIsFocused();

  useEffect(() => {
    if (focused) {
      getProfileByUserId(route.params.id);
    }
  }, [focused]);

  const determineTabContent = () => {
    switch (tabActive) {
      case 'details':
        return <UserDetails />;
      case 'photos':
        return <UserPhotos />;
      default:
        return <UserDetails />;
    }
  };

  const isTabActive = (tabName) => (tabActive === tabName ? true : false);

  const likeUnlikeUser = (user_id) => {
    if (profile.liked) {
      return unlikeUser(user_id);
    }
    likeUser(user_id);
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator color="cadetblue" size={40} />
    </View>
  ) : profile ? (
    <ScrollView
      contentContainerStyle={styles.profileContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.profileIntro}>
        <View style={styles.profileIntroTop}>
          <Image
            source={{
              uri: profile.user.dp,
            }}
            style={styles.mainImage}
          />
          <View>
            <Entypo
              name={profile.liked ? 'check' : 'cross'}
              size={20}
              style={{
                alignSelf: 'center',
                color: profile.liked ? 'green' : 'tomato',
              }}
            />
            <Text>{profile.liked ? 'Liked' : 'Not Liked'}</Text>
          </View>
          {like.loading ? (
            <ActivityIndicator color="cadetblue" size={20} />
          ) : (
            <TouchableOpacity
              onPress={() => likeUnlikeUser(profile.user.id)}
              style={[
                styles.likeBtn,
                {backgroundColor: profile.liked ? '#23527C' : 'seagreen'},
              ]}>
              <Text style={styles.likeBtnText}>
                {profile.liked ? 'Unlike User' : 'Like User'}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Messages', {
                screen: 'Thread',
                params: {
                  otherUser: profile.user,
                },
              });
            }}
            style={styles.msgBtn}>
            <AntDesign name="message1" size={20} style={styles.msgBtnIcon} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.nameText}>
            {profile.user.firstName.charAt(0).toUpperCase() +
              profile.user.firstName.slice(1) +
              ' '}
            {profile.user.middleName
              ? profile.user.middleName.charAt(0).toUpperCase() +
                profile.user.middleName.slice(1) +
                ' '
              : ''}
            {profile.user.lastName.charAt(0).toUpperCase() +
              profile.user.lastName.slice(1)}
          </Text>
          <Text style={styles.detailsText}>Age: {profile.user.age}</Text>
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
      {notfound && <Text>No Profile found!</Text>}
    </View>
  );
};

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  like: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
  likeUser: PropTypes.func.isRequired,
  unlikeUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  like: state.like,
});

const mapDispatchToProps = {
  getProfileByUserId,
  likeUser,
  unlikeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {},
  //profile intro styles start
  profileIntroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 40,
  },
  profileIntro: {
    marginLeft: 20,
  },
  mainImage: {
    height: 100,
    width: 100,
    borderRadius: 15,
    marginVertical: 10,
  },
  likeBtn: {
    padding: 5,
    borderRadius: 5,
  },
  likeBtnText: {
    color: '#fff',
  },
  msgBtn: {
    backgroundColor: 'seagreen',
    padding: 5,
    borderRadius: 5,
  },
  msgBtnIcon: {
    color: '#fff',
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
