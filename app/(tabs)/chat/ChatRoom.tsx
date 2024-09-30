import React, { useState, useRef, useEffect,useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, ListRenderItem, TouchableOpacity } from 'react-native';
import randomText from './randomText.json';
import { aMessage } from './interface';
const ChatRoom = () => {

  const [messages, setMessages] = useState<aMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = 'John';
  const flatListRef = useRef<FlatList<aMessage>>(null);
  const isCurrentUser = (message: aMessage) => message.name === currentUser;
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  useEffect(() => {
    // Initialize with messages from the JSON file
    const initialMessages: aMessage[] = randomText;
    setMessages(initialMessages); 
  }, []);

  const handleContentSizeChange = () => {
    // Scroll to the end of the list only after the first render
    if (flatListRef.current && isAtBottom) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };
  useEffect(() => {
    setIsAtBottom(true); // Reset the atBottom state to false when scrolling
  },[messages]);
  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
        contentOffset.y >= contentSize.height - layoutMeasurement.height - 20; // small buffer

    setIsAtBottom(isScrolledToBottom);
};

  const memoizedMessages = useMemo(() => messages, [messages]);

  const buttonHandler = () => {
    if (newMessage.trim() === '') return;

    const newMsg: aMessage = {
      id: messages.length+1,
      name: currentUser,
      script: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };  

  const renderItem: ListRenderItem<aMessage> = ({ item }) => (
    <View>
      {isCurrentUser(item) ? (
        <View style={[styles.chatMessages, styles.myTextbox]}>
          <Text style={[styles.text, styles.myText]}>{item.script}</Text>
        </View>
      ) : (
        <View style={[styles.chatMessages, styles.kingkingTextbox]}>
          <Text style={[styles.text, styles.kingkingText]}>{item.script}</Text>
        </View>
      )}
    </View>
  );
  return (
    <View style={{ display: 'flex',alignItems:"center" }}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={memoizedMessages}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onContentSizeChange={handleContentSizeChange}
          onScroll={handleScroll}
          scrollEventThrottle={16} 
        />
        <View style={{ display: 'flex', alignItems: "flex-end" }}>
          <TextInput
            style={styles.inputBox}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.inputBox} onPress={buttonHandler}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    width: '50%',
    height: 425,
  },
  chatMessages:
  {
    padding: 10,
  },

  myTextbox: {
    alignItems: 'flex-end',

  },
  kingkingTextbox: {
    alignItems: 'flex-start',

  },
  text: {

    maxWidth: "30%",
    padding: 10,
    borderRadius: 10,
    borderColor: '#000000',

  },

  kingkingText: {
    backgroundColor: 'rgb(180, 180, 180)',
  },

  myText: {
    backgroundColor: 'rgb(177, 238, 255)',
  },
  inputBox: {
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
});

export default ChatRoom;