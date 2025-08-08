import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import RepositoryItem from './RepositoryItem';
import RepositorySortSelector from './RepositorySortSelector';
import useRepositories from '../hooks/useRepositories';

const Separator = styled.View`
    height: 10px;
`;

const ItemSeparator = () => <Separator />;

export const RepositoryListContainer = ({ repositories, selectedSort, onSortChange }) => {
    const navigation = useNavigation();
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('Repository', { id: item.id })}>
            <RepositoryItem repository={item} />
        </Pressable>
    );

    const ListHeader = () => (
        <RepositorySortSelector selectedSort={selectedSort} onSortChange={onSortChange} />
    );

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
        />
    );
};

const RepositoryList = () => {
    const [selectedSort, setSelectedSort] = useState('LATEST');

    const getSortVariables = (sortValue) => {
        switch (sortValue) {
            case 'HIGHEST_RATED':
                return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
            case 'LOWEST_RATED':
                return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
            case 'LATEST':
            default:
                return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
        }
    };

    const { repositories } = useRepositories(getSortVariables(selectedSort));

    return (
        <RepositoryListContainer
            repositories={repositories}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
        />
    );
};

export default RepositoryList;
