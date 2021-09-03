import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Guilds } from '../../components/Guilds';
import { TextArea } from '../../components/TextArea';
import { ModalView } from '../../components/ModalView';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { Background } from '../../components/Background';
import { GuildProps } from '../../components/Appointment';
import { CategorySelect } from '../../components/CategorySelect';


export function AppointmentCreate() {
    const [ category, setCategory ] = useState('');
    const [ openGuildsModal, setOpenGuildsModal ] = useState(false);
    const [ guild, setGuild ] = useState<GuildProps>({} as GuildProps);

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }
    
    function handleGuildSelected(guildSelected: GuildProps) {
        setGuild(guildSelected);
    }
    
    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    return(
        <KeyboardAvoidingView>
            <ScrollView>
                <Background>
                    <Header
                        title="Agenda partida"
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
                                    // <View style={styles.image} />
                                    <GuildIcon />
                                }
                                
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        Selecione um Servidor
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
                                <Text style={styles.label}>
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
                                <Text style={styles.label}>
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
            <ModalView visible={openGuildsModal}>
                <Guilds />
            </ModalView>
        </KeyboardAvoidingView>
    );
}