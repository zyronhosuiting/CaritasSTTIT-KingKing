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
    borderColor: 'transparent',
    borderRadius: 10, // This adds the rounded corners
    paddingHorizontal: 10,
    fontSize: 14,
  },

  kingkingText: {
    backgroundColor: 'orange',
  },

  myText: {
    backgroundColor: '#ffffed',
  },
  timeStamp: {
    fontSize: 10,
    color: 'black',
  },
});

export default ChatMessage;
