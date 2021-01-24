import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

const Spacer = ({horizontal, vertical}) => {
  return (
    <View
      style={{
        marginHorizontal: horizontal,
        marginVertical: vertical,
      }}></View>
  );
};

Spacer.propTypes = {
  horizontal: PropTypes.number,
  vertical: PropTypes.number,
};

Spacer.defaultProps = {
  horizontal: 0,
  vertical: 0,
};

export default Spacer;
