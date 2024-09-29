import React, {useState,useEffect,useRef} from 'react';
import { ScrollView,View,Text,StyleSheet, Animated } from 'react-native';
import randomText from './randomText.json';

const ChatRoom= () => {
    const [messages, setMessages] = useState(randomText);
    const [newMessage, setNewMessage] = useState('');
    const currentUser= 'John';
    const isCurrentUser = (message) => message.name === currentUser;
    const scrollRef = useRef<ScrollView>(null);
    const buttonHandler = () => {
      setMessages([...messages, {name: currentUser, script: newMessage}]);
      setNewMessage('');
    }
  return (
    <View style={{display:'flex'}}>
      <View style={styles.container}>
          <ScrollView ref={scrollRef} onContentSizeChange={() => scrollRef.current.scrollToEnd({animated:false})}>
            {messages.map((message, index) => (
              <View key={index} >
                {isCurrentUser(message) ? (
                  <View style={[styles.chatMessages, styles.myTextbox]}>
                    <Text style={[styles.text, styles.myText]}>{message.script}</Text>
                  </View>
                ) : (
                  <View style={[styles.chatMessages, styles.kingkingTextbox]}>
                    <Text style={[styles.text, styles.kingkingText]}>{message.script}</Text>
                  </View>
                )}
              </View>
            ))}
        </ScrollView>
        <View style={{display:'flex',alignItems:"flex-end"}}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={styles.inputBox }
          />
          <button style={styles.inputBox} onClick={buttonHandler} type='submit'>
            Send
          </button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: 425,
  },
  chatMessages:
{

  width: '100%',
  padding: 10,
},

myTextbox:{
    alignItems: 'flex-end',
    
},
kingkingTextbox:{
    alignItems: 'flex-start',
    
},
text:{

    maxWidth: "30%",
    padding: 10,
    borderRadius: 10,
    borderColor: '#000000',

},

kingkingText:{
    backgroundColor: 'rgb(180, 180, 180)',
},

myText:{
  backgroundColor: 'rgb(177, 238, 255)',
},
inputBox:{
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