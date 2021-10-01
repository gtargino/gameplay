import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { COLLECTION_APPOINTMENTS } from '../../configs/storage';

import { Guilds } from '../Guilds';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { GuildProps } from '../../components/Guild';
import { TextArea } from '../../components/TextArea';
import { ModalView } from '../../components/ModalView';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';

export function AppointmentCreate() {
    const [ category, setCategory ] = useState('');
    const [ openGuildsModal, setOpenGuildsModal ] = useState(false);
    const [ guild, setGuild ] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const days = fillDays(new Array(30));
    const months = [
        'JAN','FEV','MAR','ABR',
        'MAI','JUN','JUL','AGO',
        'SET','OUT','NOV','DEZ'
    ];

    function fillDays(d: number[]) {
        for (let i = 0; i < d.length; i++) {
            d[i] = i;
        }
        return d;
    }

    const navigation = useNavigation();

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }

    function handleCloseGuilds() {
        setOpenGuildsModal(false);
    }
    
    function handleGuildSelected(guildSelected: GuildProps) {
        setGuild(guildSelected);
        setOpenGuildsModal(false);
    }
    
    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    async function handleSave() {
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };
        
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate('Home');
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            
        >
            <ScrollView>
                <Background>
                    <Header
                        title="Agendar partida"
                    />
                    <Text style={[
                        styles.label,
                        { marginLeft: 24, marginTop: 36, marginBottom: 18 }
                    ]}
                    >
                        Categoria
                    </Text>
                    <CategorySelect
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />
                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image} />   
                                }
                                
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Selecione um Servidor'}
                                    </Text>
                                </View>
                                <Feather
                                    name='chevron-right'
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}> 
                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Dia e mês
                                </Text>
                                <View style={styles.column}>
                                    <ScrollView
                                        style={styles.container}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {
                                            days.map(day => (
                                                <Text
                                                    style={styles.txt}
                                                    key={day}
                                                >
                                                    { day }
                                                </Text>
                                            ))
                                        }
                                    </ScrollView>


                                    
                                    
                                    <Text style={styles.divider}>
                                        /
                                    </Text>

                                    <ScrollView
                                        style={styles.container}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {
                                            months.map(m => (
                                                <Text
                                                    style={styles.txt}
                                                    key={months.indexOf(m)}
                                                >
                                                    { m }
                                                </Text>
                                            ))
                                        }
                                    </ScrollView>
                                </View>
                            </View>        
                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Horário
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.field, {marginBottom: 12}]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>
                            <Text style={styles.caracteresLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>
                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />
                        <View style={styles.footer}>
                            <Button
                                title="Agendar"
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                </Background>
            </ScrollView>
            <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelected={handleGuildSelected}/>
            </ModalView>
        </KeyboardAvoidingView>
    );
}