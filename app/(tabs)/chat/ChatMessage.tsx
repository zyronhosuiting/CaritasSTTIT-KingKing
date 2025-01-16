import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ChatListProps } from './interface';
import MyAvatar from './Avatar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
        { width: safeAreaWidth, padding: 10 },
        isUserMessage
          ? { alignItems: 'flex-end' }
          : { alignItems: 'flex-start' },
      ]}
    >
      {/* MyAvatar should be aligned according to the message type */}
      <MyAvatar alt={item.name} src={isUserMessage ? 'favicon.png' : ''} />

      <View
        style={[
          { maxWidth: '85%', padding: 10, flexDirection: 'row', margin: 10 }, // Ensure it follows the layout
          isUserMessage ? styles.myTextbox : styles.kingkingTextbox,
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={[
              { color: isUserMessage ? 'black' : 'white' },
              { flexWrap: 'wrap' },
            ]}
          >
            {item.script}
          </Text>
          <Text
            style={[
              styles.timeStamp,
              { color: isUserMessage ? 'black' : 'white', margin: 10 },
            ]}
          >
            {item.createdAt}
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

  myTextbox: {
    backgroundColor: '#E8F1FF',
    borderTopLeftRadius: 10, // Only left-top corner
    borderBottomLeftRadius: 10, // Only left-bottom corner
    borderTopRightRadius: 0, // No right-top corner
    borderBottomRightRadius: 0,
  },
  kingkingTextbox: {
    backgroundColor: '#4C935E',
    borderTopLeftRadius: 0, // Only left-top corner
    borderBottomLeftRadius: 0, // Only left-bottom corner
    borderTopRightRadius: 10, // No right-top corner
    borderBottomRightRadius: 10,
  },
  timeStamp: {
    alignItems: 'flex-end',
    textAlign: 'right',
  },
});

export default ChatMessage;
