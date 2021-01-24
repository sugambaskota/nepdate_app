import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {createProfile} from '../../../actions/profile';

const CreateProfile = ({navigation, profile: {loading}, createProfile}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="cadetblue" size={40} />
      </View>
    );
  }

  const [formData, setFormData] = useState({
    description: {
      value: '',
      touched: false,
      valid: false,
      errMsg: 'Please enter your description',
    },
    lookingfor: {
      value: '',
      touched: false,
      valid: false,
      errMsg: 'Please mention what type of person you are looking for',
    },
    interest: {
      value: '',
      touched: false,
      valid: false,
      errMsg: 'Please enter what your interest are',
    },
    city: {
      value: '',
      touched: false,
      valid: false,
      errMsg: 'Please enter the name of your city',
    },
    country: {
      value: '',
      touched: false,
      valid: false,
      errMsg: 'Please enter the name of your country',
    },
  });

  const {description, lookingfor, interest, city, country} = formData;

  const onSubmit = () => {
    const formData = {
      description: description.value,
      lookingfor: lookingfor.value,
      interest: interest.value,
      city: city.value,
      country: country.value,
    };
    createProfile(formData, navigation);
  };

  const onBlur = (name) => {
    switch (name) {
      case 'description':
        return setFormData({
          ...formData,
          description: {
            ...description,
            touched: true,
          },
        });
      case 'lookingfor':
        return setFormData({
          ...formData,
          lookingfor: {
            ...lookingfor,
            touched: true,
          },
        });
      case 'interest':
        return setFormData({
          ...formData,
          interest: {
            ...interest,
            touched: true,
          },
        });
      case 'city':
        return setFormData({
          ...formData,
          city: {
            ...city,
            touched: true,
          },
        });
      case 'country':
        return setFormData({
          ...formData,
          country: {
            ...country,
            touched: true,
          },
        });
      default:
        return;
    }
  };

  const onChange = (value, name) => {
    switch (name) {
      case 'description':
        return setFormData({
          ...formData,
          description: {
            ...description,
            value,
            valid: value.length > 5 ? true : false,
          },
        });
      case 'lookingfor':
        return setFormData({
          ...formData,
          lookingfor: {
            ...lookingfor,
            value,
            valid: value.length > 5 ? true : false,
          },
        });
      case 'interest':
        return setFormData({
          ...formData,
          interest: {
            ...interest,
            value,
            valid: value.length > 5 ? true : false,
          },
        });
      case 'city':
        return setFormData({
          ...formData,
          city: {
            ...city,
            value,
            valid: value.length > 1 ? true : false,
          },
        });
      case 'country':
        return setFormData({
          ...formData,
          country: {
            ...country,
            value,
            valid: value.length > 1 ? true : false,
          },
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Text style={styles.labelStyle}>Description</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter something about yourself"
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          style={styles.inputStyle}
          value={description.value}
          onBlur={() => onBlur('description')}
          onChangeText={(value) => onChange(value, 'description')}
        />
        {description.touched && !description.valid && (
          <Text style={styles.errorTextStyle}>{description.errMsg}</Text>
        )}
        <Text style={styles.labelStyle}>Looking For</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter what type of partner you are looking for"
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          style={styles.inputStyle}
          value={lookingfor.value}
          onBlur={() => onBlur('lookingfor')}
          onChangeText={(value) => onChange(value, 'lookingfor')}
        />
        {lookingfor.touched && !lookingfor.valid && (
          <Text style={styles.errorTextStyle}>{lookingfor.errMsg}</Text>
        )}
        <Text style={styles.labelStyle}>Interest</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter what your interests are"
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          style={styles.inputStyle}
          value={interest.value}
          onBlur={() => onBlur('interest')}
          onChangeText={(value) => onChange(value, 'interest')}
        />
        {interest.touched && !interest.valid && (
          <Text style={styles.errorTextStyle}>{interest.errMsg}</Text>
        )}
        <Text style={styles.labelStyle}>City</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter the name of your city"
          style={styles.inputStyle}
          value={city.value}
          onBlur={() => onBlur('city')}
          onChangeText={(value) => onChange(value, 'city')}
        />
        {city.touched && !city.valid && (
          <Text style={styles.errorTextStyle}>{city.errMsg}</Text>
        )}
        <Text style={styles.labelStyle}>Country</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter the name of your country"
          style={styles.inputStyle}
          value={country.value}
          onBlur={() => onBlur('country')}
          onChangeText={(value) => onChange(value, 'country')}
        />
        {country.touched && !country.valid && (
          <Text style={styles.errorTextStyle}>{country.errMsg}</Text>
        )}
        <TouchableOpacity
          style={
            !description.valid ||
            !lookingfor.valid ||
            !interest.valid ||
            !city.valid ||
            !country.valid
              ? styles.butttonDisabledStyle
              : styles.buttonStyle
          }
          disabled={
            !description.valid ||
            !lookingfor.valid ||
            !interest.valid ||
            !city.valid ||
            !country.valid
          }
          onPress={onSubmit}>
          <Text style={styles.buttonTextStyle}>Create Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  createProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 10,
  },
  labelStyle: {
    fontSize: 18,
    marginVertical: 2,
  },
  inputStyle: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginVertical: 2,
  },
  buttonStyle: {
    marginVertical: 12,
    backgroundColor: '#28a745',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  butttonDisabledStyle: {
    marginVertical: 12,
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
  errorTextStyle: {
    color: '#dc3545',
  },
});
