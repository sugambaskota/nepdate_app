import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

import {
  getMessageThread,
  sendMessage,
  receivePrivateMessage,
} from '../../../actions/message';
import ThreadCard from '../../../components/ThreadCard';
import socket from '../../../utils/socket';

const Thread = ({
  route,
  auth: {user},
  message: {loading, thread},
  getMessageThread,
  sendMessage,
  receivePrivateMessage,
}) => {
  const [msgText, setMsgText] = useState('');
  // const chatFlatListRef = useRef(null);
  const chatScrollViewRef = useRef(null);
  const focused = useIsFocused();

  useEffect(() => {
    if (focused) {
      getMessageThread(route.params.otherUser.id);
    }
  }, [focused]);

  useEffect(() => {
    socket.on('privateMessage', (message) => {
      receivePrivateMessage(message);
    });
  }, []);

  const renderItem = (item) => (
    <ThreadCard key={item.id} msg={item} user={user} />
  );

  const msgForm = (
    <View style={styles.msgForm}>
      <TextInput
        style={styles.msgText}
        placeholder="Enter a message..."
        value={msgText}
        onChangeText={(value) => setMsgText(value)}
      />
      <TouchableOpacity
        style={
          !msgText || msgText.length < 1
            ? styles.sendBtnWrapperDisabled
            : styles.sendBtnWrapper
        }
        disabled={!msgText || msgText.length < 1}
        onPress={() => {
          setMsgText('');
          sendMessage(route.params.otherUser.id, msgText);
        }}>
        <Ionicons
          name="md-send"
          size={24}
          style={
            !msgText || msgText.length < 1
              ? styles.sendBtnDisabled
              : styles.sendBtn
          }
        />
      </TouchableOpacity>
    </View>
  );

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator color="cadetblue" animating={true} size={40} />
    </View>
  ) : thread && thread.length > 0 ? (
    <>
      {/* <FlatList
        data={thread}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ref={chatFlatListRef}
        onContentSizeChange={() => chatFlatListRef.current.scrollToEnd()}
        onLayout={() => chatFlatListRef.current.scrollToEnd()}
      /> */}
      <ScrollView
        ref={chatScrollViewRef}
        onContentSizeChange={() => chatScrollViewRef.current.scrollToEnd()}>
        {thread.map((item) => renderItem(item))}
      </ScrollView>
      {msgForm}
    </>
  ) : (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundStyle}>No messages found!</Text>
      {msgForm}
    </View>
  );
};

Thread.propTypes = {
  auth: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  getMessageThread: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  receivePrivateMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  message: state.message,
});

const mapDispatchToProps = {
  getMessageThread,
  sendMessage,
  receivePrivateMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Thread);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  notFoundStyle: {
    textAlign: 'center',
    marginTop: 12,
  },
  msgForm: {
    borderTopWidth: 0.4,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
  },
  msgText: {
    height: 40,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginLeft: 8,
    paddingLeft: 12,
  },
  sendBtnWrapperDisabled: {
    marginHorizontal: 18,
    opacity: 0.5,
  },
  sendBtnWrapper: {
    marginHorizontal: 18,
  },
  sendBtnDisabled: {
    color: '#000',
    opacity: 0.5,
  },
  sendBtn: {
    color: 'seagreen',
  },
});
