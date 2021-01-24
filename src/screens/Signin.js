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

import {login} from '../actions/auth';

const Signin = ({navigation, auth: {loading}, login}) => {
  const [formData, setFormData] = useState({
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
      errText: 'Please enter your valid password',
    },
  });

  const {email, password} = formData;

  const onBlur = (name) => {
    switch (name) {
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
      default:
        return;
    }
  };

  const togglePasswordShown = () =>
    setFormData({
      ...formData,
      password: {
        ...password,
        shown: !password.shown,
      },
    });

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

  const onChangeText = (value, name) => {
    switch (name) {
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
            valid: isPasswordValid(value),
            value,
          },
        });
      default:
        return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Text style={styles.titleStyleHighlight}>NepDate</Text> Signin
          </Text>
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
              placeholder="Enter your password"
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
          <TouchableOpacity
            style={
              !email.valid || !password.valid
                ? styles.butttonDisabledStyle
                : styles.buttonStyle
            }
            disabled={!email.valid || !password.valid}
            onPress={() => login(email.value, password.value)}>
            <Text style={styles.buttonTextStyle}>Signin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.loginLinkButtonStyle}>
            <Text style={styles.loginLinkStyle}>
              Don't have an account? Go to Signup
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

Signin.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

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
  },
  titleStyleHighlight: {
    color: '#17a2b8',
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
