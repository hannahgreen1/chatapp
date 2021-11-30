import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { auth, db } from '../../firebase/config'

export default function ProfileScreen(props) {

    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState([])

    const messageRef = db.collection('messages')
    const userID = props.extraData.id
    const userName = props.extraData.fullName
    const userEmail = props.extraData.email

    useEffect(() => {
        messageRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newMessages = []
                    querySnapshot.forEach(doc => {
                        const message = doc.data()
                        message.id = doc.id
                        newMessages.push(message)
                    });
                    setMessages(newMessages)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (messageText && messageText.length > 0) {
            // const timestamp = db.FieldValue.serverTimestamp();
            const data = {
                text: messageText,
                authorID: userID,
                // createdAt: timestamp,
            };
            messageRef
                .add(data)
                .then(_doc => {
                    setMessageText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderMessage = ({item, index}) => {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
        <Text>{userID}</Text>
        <Text>{userName}</Text>
        <Text>{userEmail}</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Send new message'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setMessageText(text)}
                    value={messageText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
            { messages && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}