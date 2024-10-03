import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatListProps } from './interface';
import MyAvatar from './Avatar';

const ChatMessage: React.FC<ChatListProps> = ({ isCurrentUser, item }) => {
  const isUserMessage = isCurrentUser(item);
  return (
    <View
      style={[
        styles.chatMessages,
        isUserMessage ? styles.myTextbox : styles.kingkingTextbox,
      ]}
    >
      <Text
        style={[
          styles.text,
          isUserMessage ? styles.myText : styles.kingkingText,
        ]}
      >
        {item.script}
      </Text>
      <Text style={styles.timeStamp}>{item.createdAt}</Text>
      <MyAvatar alt={item.name} src={isUserMessage ? 'favicon.png' : ''} />
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  chatMessages: {
    padding: 10,
  },

  myTextbox: {
    alignItems: 'flex-end',
  },
  kingkingTextbox: {
    alignItems: 'flex-start',
  },
  text: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10, // This adds the rounded corners
    paddingHorizontal: 10,
    fontSize: 14,
  },

  kingkingText: {
    backgroundColor: 'rgb(180, 180, 180)',
  },

  myText: {
    backgroundColor: 'rgb(177, 238, 255)',
  },
  timeStamp: {
    fontSize: 10,
    color: 'gray',
  },
});

export default ChatMessage;
