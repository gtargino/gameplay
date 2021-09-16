import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import CalendarSvg from '../../assets/calendar.svg';
import PlayerSvg from '../../assets/player.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { categories } from '../../utils/categories';
import { GuildProps } from '../Guild';
import { GuildIcon } from '../GuildIcon';

export type AppointmentProps = {
    id: string,
    guild: GuildProps,
    category: string,
    date: string,
    description: string
}

export type Props = RectButtonProps & {
    data: AppointmentProps
}

export function Appointment({data, ...rest}: Props) {
    const [ category ] = categories.filter(item => item.id === data.category);
    const { owner } = data.guild;
    const { primary, on, secondary30, secondary40 } = theme.colors;

    return(
        <RectButton {...rest}>
            <View style={styles.container}>
                
                <LinearGradient
                    style={styles.guildIconContainer}
                    colors = {[secondary30, secondary40]}
                >
                    <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />    
                </LinearGradient>
                
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            { data.guild.name }
                        </Text>
                        <Text style={styles.category}>
                            { category ? category.title : ' ' }
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <CalendarSvg />
                            <Text style={styles.date}>
                                { data.date }
                            </Text>
                        </View>
                        <View style={styles.playersInfo}>
                            <PlayerSvg fill={ owner ? on : primary } />
                            <Text style={[
                                styles.player,
                                { color: owner ? on : primary }
                            ]}>
                                { owner ? 'Anfitrião' : 'Visitante' }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </RectButton>
    )
}