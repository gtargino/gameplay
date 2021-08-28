import React from 'react';

import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { FlatList, ImageBackground, Text, View } from 'react-native';

import { styles } from './styles';
import BannerImg from '../../assets/banner.png'
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';
import { theme } from '../../global/styles/theme';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ListDivisor } from '../../components/ListDivisor';

export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Gustavo',
            avatar_url: 'https://github.com/gtargino.png',
            status: 'online'
        },
        {
            id: '2',
            username: 'Gustavo',
            avatar_url: 'https://github.com/gtargino.png',
            status: 'offline'
        }
    ]

    return(
        <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={18}
                            color={theme.colors.heading}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        Lendários
                    </Text>
                    <Text style={styles.subtitle}>
                        É hoje que vamos chegar ao challenger sem perder nenhuma partida da md10
                    </Text>
                </View>                   
            </ImageBackground>
            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />
            <FlatList
                data={members}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Member data={item} />
                )}
                ItemSeparatorComponent={()=> <ListDivisor />}
                style={styles.members}
            />
            
            <View style={styles.footer}>
                <ButtonIcon
                    title="Entrar na partida"
                />
            </View>
            
        </Background>
    );
}