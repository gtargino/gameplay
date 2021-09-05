import React from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import { Guild } from '../../components/Guild';
import { GuildProps } from '../../components/Guild';
import { ListDivisor } from '../../components/ListDivisor';

type Props = {
    handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelected }: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '2',
            name: 'Valorosos',
            icon: 'image.png',
            owner: true
        },
        {
            id: '3',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '4',
            name: 'Valorosos',
            icon: 'image.png',
            owner: true
        },
        {
            id: '5',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '6',
            name: 'Valorosos',
            icon: 'image.png',
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
                contentContainerStyle={{ paddingBottom: 80, paddingTop: 50 }}
                ItemSeparatorComponent={()=> <ListDivisor isCentered/>}
                ListHeaderComponent={()=> <ListDivisor isCentered/>}
                style={styles.guilds}
            />
        </View>
    )
}