import React from 'react';
import { AvatarInfo } from './interface';
import { View, Text, StyleSheet, Image } from 'react-native';

const MyAvatar: React.FC<AvatarInfo> = ({ alt, src }) => {
  const shortAlt = alt.substring(0, 2);
  return (
    <View>
      {src ? (
        <Image
          style={styles.avatar}
          source={require('../../../src/assets/images/favicon.png')}
          alt={alt}
        />
      ) : (
        <Text style={[styles.avatar, styles.text]}>{shortAlt}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20 / 2,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
export default MyAvatar;
