import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {searchUsers, clearSearchUsers} from '../../../actions/users';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(clearSearchUsers());
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchBoxWrapper}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search..."
            value={searchText}
            autoCapitalize="none"
            autoFocus={true}
            onChangeText={(value) => setSearchText(value)}
          />
          <TouchableOpacity
            style={[
              styles.searchBtn,
              {
                backgroundColor: !searchText ? 'grey' : '#23527C',
              },
            ]}
            disabled={!searchText}
            onPress={() => {
              setSearchText('');
              dispatch(searchUsers(searchText));
            }}>
            <AntDesign name="search1" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchBody}>
        {users.loading ? (
          <ActivityIndicator size={20} color="cadetblue" />
        ) : users.searchResult?.length > 0 ? (
          users.searchResult.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.item}
              onPress={() =>
                navigation.push('UserProfile', {
                  id: user.id,
                  firstName: user.firstName,
                })
              }>
              <Image source={{uri: user.dp}} style={styles.itemImage} />
              <View style={styles.itemDetail}>
                <Text style={styles.itemDetailText}>
                  {user.firstName.charAt(0).toUpperCase() +
                    user.firstName.slice(1)}{' '}
                  {user.middleName
                    ? user.middleName.charAt(0).toUpperCase() +
                      user.middleName.slice(1) +
                      ' '
                    : ''}
                  {user.lastName.charAt(0).toUpperCase() +
                    user.lastName.slice(1)}
                  , {user.age}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : users.searchNotFound ? (
          <Text>No results found for "{users.searchText}"</Text>
        ) : (
          <Text>Search...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Top bar styles start
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23527C',
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  searchBoxWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  searchBox: {
    flex: 1,
    paddingLeft: 15,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
  },
  searchBtn: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: 36 / 2,
  },
  //Top bar styles end
  //
  //SearchBody styles start
  searchBody: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  itemImage: {
    height: Dimensions.get('window').width * 0.35,
    width: Dimensions.get('window').width * 0.45,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  itemDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    width: Dimensions.get('window').width * 0.45,
    backgroundColor: 'lightgrey',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  itemDetailText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //SearchBody styles end
});
