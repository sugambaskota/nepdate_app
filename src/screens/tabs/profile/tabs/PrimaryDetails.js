import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

import {updateUser} from '../../../../actions/auth';

const PrimaryDetails = ({auth: {user, auth_update_loading}, updateUser}) => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    gender: '',
    dob: '',
  });

  useEffect(() => {
    setFormData({
      fname: !user.firstName ? '' : user.firstName,
      mname: !user.middleName ? '' : user.middleName,
      lname: !user.lastName ? '' : user.lastName,
      gender: !user.gender ? '' : user.gender,
      dob: !user.dob ? '' : user.dob,
    });
  }, [user]);

  const onChangeText = (value, name) => {
    switch (name) {
      case 'fname':
        return setFormData({
          ...formData,
          fname: value,
        });
      case 'mname':
        return setFormData({
          ...formData,
          mname: value,
        });
      case 'lname':
        return setFormData({
          ...formData,
          lname: value,
        });
      default:
        return;
    }
  };

  const onDateTimePickerChange = (event, selectedDate) => {
    if (selectedDate === undefined) {
      return setShowDateTimePicker(false);
    }

    setFormData({
      ...formData,
      dob: selectedDate.toISOString(),
    });
    setShowDateTimePicker(false);
  };

  const onSubmit = () => {
    updateUser(formData);
  };

  const {fname, mname, lname, gender, dob} = formData;

  return auth_update_loading ? (
    <View style={styles.container}>
      <ActivityIndicator size={20} animating={true} color="cadetblue" />
    </View>
  ) : (
    <View style={styles.detailsContainer}>
      <Text style={styles.labelStyle}>First name</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter your first name"
        style={styles.inputStyle}
        value={fname}
        onChangeText={(value) => onChangeText(value, 'fname')}
      />
      <Text style={styles.labelStyle}>Middle name</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter your middle name"
        style={styles.inputStyle}
        value={mname}
        onChangeText={(value) => onChangeText(value, 'mname')}
      />
      <Text style={styles.labelStyle}>Last name</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter your last name"
        style={styles.inputStyle}
        value={lname}
        onChangeText={(value) => onChangeText(value, 'lname')}
      />
      <Text style={styles.labelStyle}>Gender</Text>
      <TouchableOpacity style={styles.inputStyle}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setFormData({
              ...formData,
              gender: itemValue,
            });
          }}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </TouchableOpacity>
      <Text style={styles.labelStyle}>Date of birth</Text>
      {showDateTimePicker && (
        <DateTimePicker
          value={new Date(dob)}
          mode={'date'}
          display="default"
          onChange={onDateTimePickerChange}
        />
      )}
      <TouchableOpacity
        style={styles.dateInputStyle}
        onPress={() => setShowDateTimePicker(true)}>
        {dob ? (
          <Text>{moment(dob).format('Do MMMM, YYYY')}</Text>
        ) : (
          <Text style={styles.datePlaceholderStyle}>
            Choose your date of birth
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          !fname || !lname || !gender || !dob
            ? styles.butttonDisabledStyle
            : styles.buttonStyle
        }
        disabled={!fname || !lname || !gender || !dob}
        onPress={onSubmit}>
        <Text style={styles.buttonTextStyle}>Update Details</Text>
      </TouchableOpacity>
    </View>
  );
};

PrimaryDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryDetails);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  detailsContainer: {
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
  dateInputStyle: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginVertical: 4,
    paddingVertical: 14,
    paddingLeft: 4,
  },
  datePlaceholderStyle: {
    opacity: 0.4,
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
