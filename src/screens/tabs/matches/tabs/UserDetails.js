import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const UserDetails = ({
  profile: {
    profile: {description, lookingfor, interest},
  },
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.singleWrapper}>
        <Text style={styles.labelStyle}>Description</Text>
        <Text style={styles.textStyle}>{description}</Text>
      </View>
      <View style={styles.singleWrapper}>
        <Text style={styles.labelStyle}>Looking For</Text>
        <Text style={styles.textStyle}>{lookingfor}</Text>
      </View>
      <View style={styles.singleWrapper}>
        <Text style={styles.labelStyle}>Interest</Text>
        <Text style={styles.textStyle}>{interest}</Text>
      </View>
    </View>
  );
};

UserDetails.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  singleWrapper: {
    marginBottom: 10,
    marginHorizontal: 4,
  },
  labelStyle: {
    fontSize: 18,
    marginVertical: 4,
  },
  textStyle: {},
});
