import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const MessageCard = ({msg, user, onItemClicked}) => {
  const determineOtherUser = (sender, receiver) =>
    sender.id === user.id ? receiver : sender;

  const otherUser = determineOtherUser(msg.sender, msg.receiver);

  return (
    <TouchableOpacity onPress={onItemClicked} style={styles.messageCard}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: otherUser.dp,
          }}
          style={styles.otherUserImage}
        />
      </View>
      <View style={styles.nameTextWrapper}>
        <Text style={styles.otherUserName}>
          {otherUser.firstName.charAt(0).toUpperCase() +
            otherUser.firstName.slice(1)}{' '}
          {otherUser.lastName.charAt(0).toUpperCase() +
            otherUser.lastName.slice(1)}
        </Text>
        <Text style={styles.msgText}>
          {msg.sender.id === user.id && 'You: '}
          {msg.text.length > 20 ? msg.text.substr(0, 20) + '...' : msg.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

MessageCard.propTypes = {
  msg: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onItemClicked: PropTypes.func.isRequired,
};

export default MessageCard;

const styles = StyleSheet.create({
  messageCard: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  imageWrapper: {
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  otherUserImage: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
  },
  nameTextWrapper: {
    marginVertical: 8,
  },
  otherUserName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  msgText: {
    marginTop: 4,
    fontSize: 15,
  },
});
