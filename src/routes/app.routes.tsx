import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from '../global/styles/theme';
const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

export function AppRoutes() {
    return(
        <Navigator
            screenOptions= {{
                headerShown: false,
                
            }}
        >
            <Screen
                name='Home'
                component={Home}
            />
            <Screen
                name='AppointmentDetails'
                component={AppointmentDetails}
            />
            <Screen
                name='AppointmentCreate'
                component={AppointmentCreate}
            />
        </Navigator>
    )
}
