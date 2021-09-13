import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';
const { Navigator, Screen } = createStackNavigator();

import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

export function AppRoutes() {
    return(
        <Navigator
            screenOptions= {{
                headerShown: false,
                cardStyle: {
                    backgroundColor: theme.colors.secondary90
                }
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