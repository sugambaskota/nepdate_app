import React from 'react';
import {View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Splash from '../screens/Splash';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Matches from '../screens/tabs/matches/Matches';
import Search from '../screens/tabs/matches/Search';
import UserProfile from '../screens/tabs/matches/UserProfile';
import Messages from '../screens/tabs/messages/Messages';
import Thread from '../screens/tabs/messages/Thread';
import Profile from '../screens/tabs/profile/Profile';
import CreateProfile from '../screens/tabs/profile/CreateProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MatchesStack = createStackNavigator();
const MatchesStackScreen = () => (
  <MatchesStack.Navigator>
    <MatchesStack.Screen
      name="Matches"
      component={Matches}
      options={{headerShown: false}}
    />
    <MatchesStack.Screen
      name="Search"
      component={Search}
      options={{headerShown: false}}
    />
    <MatchesStack.Screen
      name="UserProfile"
      component={UserProfile}
      options={({route}) => ({
        headerTitle: () => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: -14,
              }}>
              {route.params.firstName.charAt(0).toUpperCase() +
                route.params.firstName.slice(1) +
                "'s Profile"}
            </Text>
          </View>
        ),
      })}
    />
  </MatchesStack.Navigator>
);

const MessagesStack = createStackNavigator();
const MessagesStackScreen = () => (
  <MessagesStack.Navigator>
    <MessagesStack.Screen
      name="Messages"
      component={Messages}
      options={{headerShown: false}}
    />
    <MessagesStack.Screen
      name="Thread"
      component={Thread}
      options={({route}) => ({
        headerTitle: () => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: route.params.otherUser.dp,
              }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 40 / 2,
                marginLeft: -16,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 12,
              }}>
              {route.params.otherUser.firstName.charAt(0).toUpperCase() +
                route.params.otherUser.firstName.slice(1)}
            </Text>
          </View>
        ),
      })}
    />
  </MessagesStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{headerShown: false}}
    />
    <ProfileStack.Screen
      name="CreateProfile"
      component={CreateProfile}
      options={{headerTitle: 'Create Profile'}}
    />
  </ProfileStack.Navigator>
);

const MainFlow = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Matches') {
            iconName = 'users';
            return <Feather name={iconName} size={size} color={color} />;
          } else if (route.name === 'Messages') {
            iconName = 'envelope';
            return <EvilIcons name={iconName} size={size} color={color} />;
          } else {
            iconName = 'user';
            return <AntDesign name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'seagreen',
        inactiveTintColor: 'grey',
        style: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
      }}
      lazy={false}>
      <Tab.Screen name="Matches" component={MatchesStackScreen} />
      <Tab.Screen name="Messages" component={MessagesStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

const Routes = ({auth: {isAuthenticated, loading}}) => {
  if (loading) {
    return <Splash />;
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="MainFlow"
          component={MainFlow}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
