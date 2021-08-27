import React from 'react';
import { View, Text} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme'

type Props = RectButtonProps & {
    title: string;
    icon: React.FC<SvgProps>;
    hasCheckBox?: boolean,
    checked?: boolean;
}

export function Category({
    title,
    icon: Icon,
    hasCheckBox = false,
    checked = false,
    ...rest
}: Props) {
    const { secondary40, secondary50, secondary60, secondary70 } = theme.colors;

    return (
        <RectButton {...rest}>
            <LinearGradient
                style={styles.container}
                colors={[secondary40, secondary60]}
            >
                <LinearGradient
                    style={[styles.content, {opacity: checked ? 1 : 0.45 }]}
                    colors={[checked ? secondary70 : secondary40, secondary40 ]}
                >
                    {
                        hasCheckBox &&
                        <View
                            style={checked ? styles.checked : styles.check}
                        />
                    }
                    <Icon
                        width={48}
                        height={48}
                    />
                    <Text style={styles.title}>
                        { title }
                    </Text>
                </LinearGradient>
            </LinearGradient>
        </RectButton>
    )
}