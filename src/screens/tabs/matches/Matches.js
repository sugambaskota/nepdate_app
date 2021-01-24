import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {getUsers, loadMoreUsers} from '../../../actions/users';

const Item = ({item, onItemClicked}) => (
  <TouchableOpacity style={styles.item} onPress={onItemClicked}>
    <Image source={{uri: item.dp}} style={styles.itemImage} />
    <View style={styles.itemDetail}>
      <Text style={styles.itemDetailText}>
        {item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1)}{' '}
        {item.middleName
          ? item.middleName.charAt(0).toUpperCase() +
            item.middleName.slice(1) +
            ' '
          : ''}
        {item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1)},{' '}
        {item.age}
      </Text>
    </View>
  </TouchableOpacity>
);

const Matches = ({
  navigation,
  users: {users, loading, pagination},
  getUsers,
  loadMoreUsers,
}) => {
  useEffect(() => {
    getUsers();
  }, []);

  const renderItem = ({item}) => (
    <Item
      item={item}
      onItemClicked={() =>
        navigation.navigate('UserProfile', {
          id: item.id,
          firstName: item.firstName,
        })
      }
    />
  );

  const onEndReached = () => {
    if (pagination.currentPage < pagination.totalPages) {
      return loadMoreUsers(pagination.currentPage + 1);
    }
  };

  const searchBtn = (
    <TouchableOpacity
      style={styles.searchBtn}
      onPress={() => navigation.navigate('Search')}>
      <AntDesign name="search1" color="#fff" size={22} />
    </TouchableOpacity>
  );

  const footerComponent = () => {
    if (pagination.currentPage === pagination.totalPages) {
      return (
        <Text style={styles.endReached}>Sorry, there are no more matches!</Text>
      );
    }
    return <ActivityIndicator color="cadetblue" size={20} />;
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator color="cadetblue" size={40} />
    </View>
  ) : users && users.length > 0 ? (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.itemContainer}
        numColumns={2}
        ListFooterComponent={footerComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
      {searchBtn}
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Sorry, no matches found!</Text>
      {searchBtn}
    </View>
  );
};

Matches.propTypes = {
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  loadMoreUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUsers,
  loadMoreUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtn: {
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: '#23527C',
    padding: 15,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
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
    flex: 1,
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
  endReached: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
});
