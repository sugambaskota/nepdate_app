import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getMessages} from '../../../actions/message';
import MessageCard from '../../../components/MessageCard';

const Messages = ({
  navigation,
  auth,
  message: {messages, loading, pagination},
  getMessages,
}) => {
  useFocusEffect(
    useCallback(() => {
      getMessages();
    }, []),
  );

  const determineOtherUser = (msg) =>
    msg.sender.id === auth.user.id ? msg.receiver : msg.sender;

  const renderItem = ({item}) => (
    <MessageCard
      msg={item}
      user={auth.user}
      onItemClicked={() =>
        navigation.navigate('Thread', {
          otherUser: determineOtherUser(item),
        })
      }
    />
  );

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator color="cadetblue" size={40} animating={true} />
    </View>
  ) : messages && messages.length > 0 ? (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  ) : (
    <View>
      <Text style={styles.notFoundStyle}>No messages found!</Text>
    </View>
  );
};

Messages.propTypes = {
  auth: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  message: state.message,
});

const mapDispatchToProps = {
  getMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundStyle: {
    textAlign: 'center',
    marginTop: 12,
  },
});
