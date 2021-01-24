import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

const ThreadCard = (props) => {
  return (
    <View style={styles(props).threadCardStyle}>
      <Image
        source={{
          uri: props.msg.sender.dp,
        }}
        style={styles(props).senderImageStyle}
      />
      <View style={styles(props).msgTextBoxStyle}>
        <Text style={styles(props).msgTextStyle}>{props.msg.text}</Text>
        <Text style={styles(props).dateStyle}>
          {moment(props.msg.date).fromNow()}
        </Text>
      </View>
    </View>
  );
};

ThreadCard.propTypes = {
  msg: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default ThreadCard;

const styles = (props) =>
  StyleSheet.create({
    threadCardStyle: {
      paddingHorizontal: 14,
      marginTop: 10,
      flexDirection:
        props.msg.sender.id === props.user.id ? 'row-reverse' : 'row',
    },
    senderImageStyle: {
      height: 30,
      width: 30,
      borderRadius: 30 / 2,
      alignSelf: 'flex-end',
    },
    msgTextBoxStyle: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: '#fff',
      borderRadius: 5,
      marginLeft: props.msg.sender.id === props.user.id ? '50%' : 10,
      marginRight: props.msg.sender.id === props.user.id ? 10 : '50%',
    },
    msgTextStyle: {},
    dateStyle: {
      fontSize: 10,
      opacity: 0.6,
    },
  });
