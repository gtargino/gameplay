import React from 'react';

import { View, Image } from 'react-native';
import { styles } from './styles';
import DiscordSvg from '../../assets/discord.svg'

const { CDN_IMAGE } = process.env;

type Props = {
    guildId: string;
    iconId: null | string;
}

export function GuildIcon({ guildId, iconId}: Props) {
    //const uri = 'https://steamuserimages-a.akamaihd.net/ugc/952964242161767666/A0686A3BAC68404FF93C9BEDD52E52436B8E3199/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false';
    //const uri = 'https://img.ibxk.com.br/2020/10/30/30110741964176.jpg?w=352&h=208&mode=crop&scale=both';
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
    
    return(
        <View style={styles.container}>
            {
                iconId ?
                <Image
                    source={{ uri }}
                    style={ styles.image }
                    resizeMode="cover"
                />
                :
                <DiscordSvg
                    width={40}
                    height={40}
                />
            }
        </View>
    )
}