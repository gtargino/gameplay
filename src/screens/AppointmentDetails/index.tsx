import React, {useEffect, useState} from 'react';

import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Alert, FlatList, ImageBackground, Text, View, Share, Platform } from 'react-native';
import * as Linking from 'expo-linking';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import BannerImg from '../../assets/banner.png'

import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ListDivisor } from '../../components/ListDivisor';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';

type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const navigation = useNavigation();
    const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget);
    const [ loading, setLoading ] = useState(true);

    const route = useRoute();
    const { guildSelected } = route.params as Params;
    
    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
            setLoading(false);
        } catch (error) {
            Alert.alert('Check server configuration. Widget is on?');
            navigation.navigate('Home');
        }
    }

    function handleShareInvitation() {
        console.log(Platform.OS);
        console.log(widget);

        const message = Platform.OS === 'ios'
        ? `Junte-se a ${ guildSelected.guild.name }`
        : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        });
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return(
        <Background>
            <Header
                title="Detalhes"
                action={
                    guildSelected.guild.owner &&
                    widget.instant_invite &&
                    <BorderlessButton onPress={handleShareInvitation}>
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
                        { guildSelected.guild.name }
                    </Text>
                    <Text style={styles.subtitle}>
                        { guildSelected.description }
                    </Text>
                </View>                   
            </ImageBackground>

            {
                loading ? <Load /> :
                <>
                    <ListHeader
                        title="Jogadores"
                        subtitle={`Total ${widget.members.length}`}
                    />
                    <FlatList
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Member data={item} />
                        )}
                        ItemSeparatorComponent={()=> <ListDivisor isCentered />}
                        style={styles.members}
                    />
                </>
            }
            
            {
                guildSelected.guild.owner &&
                widget.instant_invite &&
                <View style={styles.footer}>
                    <ButtonIcon
                        title="Entrar na partida"
                        onPress={handleOpenGuild}
                    />
                </View>
            }
            
        </Background>
    );
}