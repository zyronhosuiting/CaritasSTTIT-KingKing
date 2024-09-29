import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import ChatRoom from '@/feat/pages/ChatRoom';
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ChatRoom/>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
