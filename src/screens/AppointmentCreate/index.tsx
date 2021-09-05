import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { Guilds } from '../Guilds';
import { theme } from '../../global/styles/theme';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { ModalView } from '../../components/ModalView';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { Background } from '../../components/Background';
import { GuildProps } from '../../components/Guild';
import { CategorySelect } from '../../components/CategorySelect';


export function AppointmentCreate() {
    const [ category, setCategory ] = useState('');
    const [ openGuildsModal, setOpenGuildsModal ] = useState(false);
    const [ guild, setGuild ] = useState<GuildProps>({} as GuildProps);

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

    return(
        <KeyboardAvoidingView>
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
                                    guild.icon ? <GuildIcon /> : <View style={styles.image} />   
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
                                    <SmallInput maxLength={2}/>
                                        <Text style={styles.divider}>
                                            /
                                        </Text>
                                    <SmallInput maxLength={2}/>
                                </View>
                            </View>        
                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Horário
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput maxLength={2}/>
                                        <Text style={styles.divider}>
                                            :
                                        </Text>
                                    <SmallInput maxLength={2}/>
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
                        />
                        <View style={styles.footer}>
                            <Button title="Agendar"/>
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