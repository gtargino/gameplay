import React, {useEffect, useState} from 'react';

import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Alert, FlatList, ImageBackground, Text, View } from 'react-native';

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
    const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget);
    const [ loading, setLoading ] = useState(true);

    const route = useRoute();
    const { guildSelected } = route.params as Params;
    
    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            Alert.alert('Check server configuration. Widget is on?');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGuildWidget();
    }, []);

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
            
            
            <View style={styles.footer}>
                <ButtonIcon
                    title="Entrar na partida"
                />
            </View>
        </Background>
    );
}