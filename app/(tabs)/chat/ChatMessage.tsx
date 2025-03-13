import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { ChatListProps } from './interface';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const usergtextbubble = require('../../../src/assets/images/textbubble/usertextbubble.png');
const kingkingtextbubble = require('../../../src/assets/images/textbubble/kingkingtextbubble.png');

const ChatMessage: React.FC<ChatListProps> = ({ isCurrentUser, item }) => {
  const insets = useSafeAreaInsets();

  // Get device width
  const { width } = Dimensions.get('window');

  // Calculate the safe area width
  const safeAreaWidth = width - insets.left - insets.right;
  const isUserMessage = isCurrentUser(item);
  return (
    <View
      style={[
        { width: 'auto', padding: 10 },
        isUserMessage
          ? { alignItems: 'flex-end' }
          : { alignItems: 'flex-start' },
      ]}
    >
      <View
        style={
          { maxWidth: '85%', padding: 10, flexDirection: 'row', margin: 10 } // Ensure it follows the layout
        }
      >
        <Image
          source={isUserMessage ? usergtextbubble : kingkingtextbubble}
          resizeMode="stretch"
          style={[
            { position: 'absolute', width: '100%', height: '150%' }, // Changed to '100%' for better fit
          ]}
          onError={error =>
            console.log('Error loading image', error.nativeEvent.error)
          }
        />
        <View style={{ flex: 1 }}>
          <Text style={{ flexWrap: 'wrap', color: 'white', padding: 10 }}>
            {item.script}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  chatMessages: {
    alignItems: 'center',
    fontSize: 14,
  },
});

export default ChatMessage;
