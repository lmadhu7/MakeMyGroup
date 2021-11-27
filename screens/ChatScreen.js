import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      backgroundColor="#0d0d0d"
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
