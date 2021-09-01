import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';



export function AppointmentCreate() {
    const [ category, setCategory ] = useState('');
    
    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    return(
        <Background>
            <Header
                title="Agenda partida"
            />
            <Text style={styles.label}>
                Categoria
            </Text>
            <CategorySelect
                hasCheckBox
                setCategory={handleCategorySelect}
                categorySelected={category}
            />
            <View style={styles.form}>
                <RectButton>
                    <View style={styles.select}>
                        <View style={styles.image} />
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
            </View>
        </Background>
    );
}