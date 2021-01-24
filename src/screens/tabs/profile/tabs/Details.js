import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {updateProfile} from '../../../../actions/profile';

const Details = ({profile: {profile, loading}, updateProfile}) => {
  const [formData, setFormData] = useState({
    description: '',
    lookingfor: '',
    interest: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    setFormData({
      description: !profile.description ? '' : profile.description,
      lookingfor: !profile.lookingfor ? '' : profile.lookingfor,
      interest: !profile.interest ? '' : profile.interest,
      city: !profile.city ? '' : profile.city,
      country: !profile.country ? '' : profile.country,
    });
  }, [profile]);

  const onChangeText = (value, name) => {
    switch (name) {
      case 'description':
        return setFormData({
          ...formData,
          description: value,
        });
      case 'lookingfor':
        return setFormData({
          ...formData,
          lookingfor: value,
        });
      case 'interest':
        return setFormData({
          ...formData,
          interest: value,
        });
      case 'city':
        return setFormData({
          ...formData,
          city: value,
        });
      case 'country':
        return setFormData({
          ...formData,
          country: value,
        });
      default:
        return;
    }
  };

  const onSubmit = () => {
    updateProfile(formData);
  };

  const {description, lookingfor, interest, city, country} = formData;

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>Description</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter something about yourself"
        multiline={true}
        numberOfLines={3}
        textAlignVertical="top"
        style={styles.inputStyle}
        value={description}
        onChangeText={(value) => onChangeText(value, 'description')}
      />
      <Text style={styles.labelStyle}>Looking For</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter what type of partner you are looking for"
        multiline={true}
        numberOfLines={3}
        textAlignVertical="top"
        style={styles.inputStyle}
        value={lookingfor}
        onChangeText={(value) => onChangeText(value, 'lookingfor')}
      />
      <Text style={styles.labelStyle}>Interest</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter what your interests are"
        multiline={true}
        numberOfLines={3}
        textAlignVertical="top"
        style={styles.inputStyle}
        value={interest}
        onChangeText={(value) => onChangeText(value, 'interest')}
      />
      <Text style={styles.labelStyle}>City</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter the name of your city"
        style={styles.inputStyle}
        value={city}
        onChangeText={(value) => onChangeText(value, 'city')}
      />
      <Text style={styles.labelStyle}>Country</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter the name of your country"
        style={styles.inputStyle}
        value={country}
        onChangeText={(value) => onChangeText(value, 'country')}
      />
      <TouchableOpacity
        style={
          !description || !lookingfor || !interest || !city || !country
            ? styles.butttonDisabledStyle
            : styles.buttonStyle
        }
        disabled={!description || !lookingfor || !interest || !city || !country}
        onPress={onSubmit}>
        <Text style={styles.buttonTextStyle}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

Details.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelStyle: {
    fontSize: 18,
    marginVertical: 4,
  },
  inputStyle: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginVertical: 2,
  },
  buttonStyle: {
    marginVertical: 8,
    backgroundColor: '#28a745',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  butttonDisabledStyle: {
    marginVertical: 8,
    backgroundColor: '#28a745',
    opacity: 0.7,
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
