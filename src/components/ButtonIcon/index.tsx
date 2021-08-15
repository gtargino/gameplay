import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View, Text, Image } from 'react-native';

import { styles } from './styles';
import discordImg from '../../assets/discord.png';

type props = TouchableOpacityProps & {
    title: string;
}

export function ButtonIcon({ title, ...rest } : props) {
    return(
        <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.iconWrapper}>
                <Image source={discordImg} style={styles.icon} />
                
            </View>
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}