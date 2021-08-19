import React from 'react';
import { ScrollView } from 'react-native';

import { styles } from './styles';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

type Props = {
    categorySelected: string;
}

export function CategorySelect({ categorySelected }: Props) {
    return(
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingLeft: 20,
                paddingRight: 40,
                flexDirection:'row',
                alignItems:'center'
            }}
        >
            {
                categories.map(category => (
                    <Category
                        key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected}
                    />
                ))
            }
        </ScrollView>
    )
}