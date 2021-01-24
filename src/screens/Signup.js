import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

import {register} from '../actions/auth';
import Spacer from '../components/Spacer';

const Signup = ({navigation, register}) => {
  const [formData, setFormData] = useState({
    fname: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter valid first name',
    },
    mname: {
      value: '',
    },
    lname: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter valid last name',
    },
    gender: {
      value: 'male',
    },
    dob: {
      show: false,
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter your date of birth',
    },
    email: {
      value: '',
      touched: false,
      valid: false,
      errText: 'Please enter a valid email',
    },
    password: {
      value: '',
      touched: false,
      valid: false,
      shown: false,
      errText: 'Please choose a password with 5 characters or more',
    },
    password2: {
      value: '',
      touched: false,
      valid: false,
      shown: false,
      errText: 'Passwords do not match',
    },
  });

  const {
    fname,
    mname,
    lname,
    gender,
    dob,
    email,
    password,
    password2,
  } = formData;

  const togglePasswordShown = () =>
    setFormData({
      ...formData,
      password: {
        ...password,
        shown: !password.shown,
      },
    });

  const togglePassword2Shown = () =>
    setFormData({
      ...formData,
      password2: {
        ...password2,
        shown: !password2.shown,
      },
    });

  const isFnameValid = (value) => {
    if (value.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  const isLnameValid = (value) => {
    if (value.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  const isEmailValid = (value) => {
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regEmail.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  const isPasswordValid = (value) => {
    if (value.length > 5) {
      return true;
    } else {
      return false;
    }
  };

  const isPassword2Valid = (value) => {
    if (password.value === value) {
      return true;
    } else {
      return false;
    }
  };

  const onBlur = (name) => {
    switch (name) {
      case 'fname':
        return setFormData({
          ...formData,
          fname: {
            ...fname,
            touched: true,
          },
        });
      case 'lname':
        return setFormData({
          ...formData,
          lname: {
            ...lname,
            touched: true,
          },
        });
      case 'email':
        return setFormData({
          ...formData,
          email: {
            ...email,
            touched: true,
          },
        });
      case 'password':
        return setFormData({
          ...formData,
          password: {
            ...password,
            touched: true,
          },
        });
      case 'password2':
        return setFormData({
          ...formData,
          password2: {
            ...password2,
            touched: true,
          },
        });
      default:
        return;
    }
  };

  const onDateTimePickerChange = (event, selectedDate) => {
    if (selectedDate === undefined) {
      return setFormData({
        ...formData,
        dob: {
          ...dob,
          show: false,
          touched: true,
        },
      });
    }
    setFormData({
      ...formData,
      dob: {
        ...dob,
        value: selectedDate.toISOString(),
        show: false,
        touched: true,
        valid: true,
      },
    });
  };

  const onChangeText = (value, name) => {
    switch (name) {
      case 'fname':
        return setFormData({
          ...formData,
          fname: {
            ...fname,
            value,
            valid: isFnameValid(value),
          },
        });
      case 'mname':
        return setFormData({
          ...formData,
          mname: {
            ...mname,
            value,
          },
        });
      case 'lname':
        return setFormData({
          ...formData,
          lname: {
            ...lname,
            value,
            valid: isLnameValid(value),
          },
        });
      case 'email':
        return setFormData({
          ...formData,
          email: {
            ...email,
            value,
            valid: isEmailValid(value),
          },
        });
      case 'password':
        return setFormData({
          ...formData,
          password: {
            ...password,
            value,
            valid: isPasswordValid(value),
          },
        });
      case 'password2':
        return setFormData({
          ...formData,
          password2: {
            ...password2,
            value,
            valid: isPassword2Valid(value),
          },
        });
      default:
        return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="dark-content"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <Text style={styles.titleStyle}>
            <Text style={styles.titleStyleHighlight}>NepDate</Text> Signup
          </Text>
          <View style={styles.nameWrapper}>
            <View style={styles.fnameWrapper}>
              <Text style={styles.labelStyle}>First name</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="First name"
                style={styles.inputStyle}
                value={fname.value}
                onBlur={() => onBlur('fname')}
                onChangeText={(value) => onChangeText(value, 'fname')}
              />
              {fname.touched && !fname.valid && (
                <Text style={styles.errorTextStyle}>{fname.errText}</Text>
              )}
            </View>
            <Spacer horizontal={4} />
            <View style={styles.lnameWrapper}>
              <Text style={styles.labelStyle}>Last name</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Last name"
                style={styles.inputStyle}
                value={lname.value}
                onBlur={() => onBlur('lname')}
                onChangeText={(value) => onChangeText(value, 'lname')}
              />
              {lname.touched && !lname.valid && (
                <Text style={styles.errorTextStyle}>{lname.errText}</Text>
              )}
            </View>
          </View>
          <Text style={styles.labelStyle}>Gender</Text>
          <TouchableOpacity style={styles.inputStyle}>
            <Picker
              selectedValue={gender.value}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({
                  ...formData,
                  gender: {
                    ...gender,
                    value: itemValue,
                  },
                });
              }}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </TouchableOpacity>
          <Text style={styles.labelStyle}>Date of birth</Text>
          {dob.show && (
            <DateTimePicker
              value={new Date()}
              mode={'date'}
              display="default"
              onChange={onDateTimePickerChange}
            />
          )}
          <TouchableOpacity
            style={styles.dateInputStyle}
            onPress={() =>
              setFormData({
                ...formData,
                dob: {
                  ...dob,
                  show: true,
                },
              })
            }>
            {dob.value ? (
              <Text>{moment(dob.value).format('Do MMMM, YYYY')}</Text>
            ) : (
              <Text style={styles.datePlaceholderStyle}>
                Choose your date of birth
              </Text>
            )}
          </TouchableOpacity>
          {dob.touched && !dob.valid && (
            <Text style={styles.errorTextStyle}>{dob.errText}</Text>
          )}
          <Text style={styles.labelStyle}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="E.g. someone@gmail.com"
            style={styles.inputStyle}
            value={email.value}
            onBlur={() => onBlur('email')}
            onChangeText={(value) => onChangeText(value, 'email')}
          />
          {email.touched && !email.valid && (
            <Text style={styles.errorTextStyle}>{email.errText}</Text>
          )}
          <Text style={styles.labelStyle}>Password</Text>
          <View style={styles.passwordWrapperStyle}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!password.shown}
              placeholder="Enter a password"
              style={styles.passwordInputStyle}
              value={password.value}
              onBlur={() => onBlur('password')}
              onChangeText={(value) => onChangeText(value, 'password')}
            />
            <TouchableOpacity onPress={togglePasswordShown}>
              {password.shown ? (
                <Entypo
                  name="eye-with-line"
                  size={25}
                  style={styles.passwordShowIconStyle}
                />
              ) : (
                <Entypo
                  name="eye"
                  size={25}
                  style={styles.passwordShowIconStyle}
                />
              )}
            </TouchableOpacity>
          </View>
          {password.touched && !password.valid && (
            <Text style={styles.errorTextStyle}>{password.errText}</Text>
          )}
          <Text style={styles.labelStyle}>Confirm password</Text>
          <View style={styles.passwordWrapperStyle}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!password2.shown}
              placeholder="Enter password again"
              style={styles.passwordInputStyle}
              value={password2.value}
              onBlur={() => {
                onBlur('password2');
              }}
              onChangeText={(value) => onChangeText(value, 'password2')}
            />
            <TouchableOpacity onPress={togglePassword2Shown}>
              {password2.shown ? (
                <Entypo
                  name="eye-with-line"
                  size={25}
                  style={styles.passwordShowIconStyle}
                />
              ) : (
                <Entypo
                  name="eye"
                  size={25}
                  style={styles.passwordShowIconStyle}
                />
              )}
            </TouchableOpacity>
          </View>
          {password2.touched && !password2.valid && (
            <Text style={styles.errorTextStyle}>{password2.errText}</Text>
          )}
          <TouchableOpacity
            style={
              !fname.valid ||
              !lname.valid ||
              !dob.valid ||
              !email.valid ||
              !password.valid ||
              !password2.valid
                ? styles.butttonDisabledStyle
                : styles.buttonStyle
            }
            disabled={
              !fname.valid ||
              !lname.valid ||
              !dob.valid ||
              !email.valid ||
              !password.valid ||
              !password2.valid
            }
            onPress={() =>
              register({
                firstname: fname.value,
                middlename: mname.value,
                lastname: lname.value,
                gender: gender.value,
                dob: dob.value,
                email: email.value,
                password: password.value,
              })
            }>
            <Text style={styles.buttonTextStyle}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signin')}
            style={styles.loginLinkButtonStyle}>
            <Text style={styles.loginLinkStyle}>
              Already have an account? Go to Signin
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

Signup.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'flex-start',
  },
  titleStyle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: StatusBar.currentHeight * 1.4,
    marginBottom: 4,
  },
  titleStyleHighlight: {
    color: '#17a2b8',
  },
  nameWrapper: {
    flexDirection: 'row',
  },
  fnameWrapper: {
    flex: 1,
  },
  lnameWrapper: {
    flex: 1,
  },
  labelStyle: {
    fontSize: 18,
    marginVertical: 4,
  },
  inputStyle: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginVertical: 4,
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
  passwordInputStyle: {
    flex: 1,
  },
  passwordShowIconStyle: {
    paddingHorizontal: 10,
    opacity: 0.7,
  },
  passwordWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginVertical: 4,
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
  errorTextStyle: {
    color: '#dc3545',
  },
  loginLinkButtonStyle: {
    width: 100,
    alignSelf: 'center',
  },
  loginLinkStyle: {
    color: 'blue',
    textAlign: 'center',
  },
});
