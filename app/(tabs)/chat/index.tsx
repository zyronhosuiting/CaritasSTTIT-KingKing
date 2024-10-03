import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import ChatRoom from './ChatRoom';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <ChatRoom />
      </SafeAreaProvider>
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
