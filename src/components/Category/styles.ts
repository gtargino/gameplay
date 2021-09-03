import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: 104,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 8
    },
    content: {
        width: 100,
        height: 116,
        borderRadius: 8,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    check: {
        width: 14,
        height: 14,
        position: 'absolute',
        borderWidth: 2,
        borderRadius: 3,
        borderColor: theme.colors.secondary40,
        backgroundColor: theme.colors.secondary100,
        top: 7,
        right: 7,
    },
    checked: {
        width: 14,
        height: 14,
        position: 'absolute',
        backgroundColor: theme.colors.primary,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: theme.colors.secondary40,
        top: 7,
        right: 7
    },
    title: {
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        fontSize: 15,
        marginTop: 16
    }
})