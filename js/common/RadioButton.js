import React from 'react';
import { View } from 'react-native';

export function RadioButton(props) {
  return (
      <View style={[{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#6BDBFB',
        alignItems: 'center',
        justifyContent: 'center',
      }, props.style]}>
        {
          props.selected ?
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#6BDBFB',
            }}/>
            : null
        }
      </View>
  );
}
