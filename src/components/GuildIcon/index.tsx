import React from 'react';
import { Image } from 'react-native';
import { styles } from './styles';

export function GuildIcon() {
    const uri = 'https://steamuserimages-a.akamaihd.net/ugc/952964242161767666/A0686A3BAC68404FF93C9BEDD52E52436B8E3199/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false';
    //const uri = 'https://img.ibxk.com.br/2020/10/30/30110741964176.jpg?w=352&h=208&mode=crop&scale=both';
    
    return(
        <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
        />
    )
}