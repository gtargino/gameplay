import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivisor } from '../../components/ListDivisor';
import { Load } from '../../components/Load';
import { api } from '../../services/api';

type Props = {
    handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelected }: Props) {
    const [ guilds, setGuilds ] = useState<GuildProps[]>([]);
    const [ loading, setLoading ] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');
        const ownerSevers = response.data.filter(server => server.owner);
        console.log(ownerSevers);

        setGuilds(ownerSevers);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, []);

    return(
        <View style={styles.container}>
            {
                loading ? <Load/> :
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
            }
        </View>
    )
}