import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';

export function SignIn() {
    const [text, setText] = useState('whatever');
    return(
        <View style={styles.container}>
            <Text>Hello World!! How are you????</Text>

            <TextInput 
                style={styles.input}
                onChangeText={setText}
            />
            <Text>Typing: {text}</Text>

        </View>
    )
}