import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button, Divider } from 'react-native-paper';
import styled from 'styled-components/native';

const Container = styled.View`
    padding: 15px;
    background-color: white;
`;

const RepositorySortSelector = ({ selectedSort, onSortChange }) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const sortOptions = [
        { label: 'Latest repositories', value: 'LATEST' },
        { label: 'Highest rated repositories', value: 'HIGHEST_RATED' },
        { label: 'Lowest rated repositories', value: 'LOWEST_RATED' },
    ];

    const handleSortSelect = (sortValue) => {
        onSortChange(sortValue);
        closeMenu();
    };

    const getCurrentSortLabel = () => {
        const option = sortOptions.find((opt) => opt.value === selectedSort);
        return option ? option.label : 'Latest repositories';
    };

    return (
        <Container>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                contentStyle={{
                    marginTop: 50,
                }}
                anchor={
                    <Button
                        mode="outlined"
                        onPress={openMenu}
                        icon="chevron-down"
                        contentStyle={{ flexDirection: 'row-reverse' }}
                    >
                        {getCurrentSortLabel()}
                    </Button>
                }
            >
                {sortOptions.map((option, index) => (
                    <View key={option.value}>
                        <Menu.Item
                            onPress={() => handleSortSelect(option.value)}
                            title={option.label}
                        />
                        {index < sortOptions.length - 1 && <Divider />}
                    </View>
                ))}
            </Menu>
        </Container>
    );
};

export default RepositorySortSelector;
