import React from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import { Guild } from '../Guild';
import { GuildProps } from '../Guild';
import { ListDivisor } from '../ListDivisor';


type Props = {
    handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelected }: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: null,
            owner: true
        }
    ];

    return(
        <View style={styles.container}>
            <FlatList
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Guild
                        data={item}
                        onPress={() => handleGuildSelected(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={ListDivisor}
                style={styles.guilds}
            />
        </View>
    )
}