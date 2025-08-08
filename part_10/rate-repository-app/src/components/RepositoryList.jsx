import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import RepositorySortSelector from './RepositorySortSelector';
import RepositorySearchBar from './RepositorySearchBar';
import useRepositories from '../hooks/useRepositories';

const Separator = styled.View`
    height: 10px;
`;

const ItemSeparator = () => <Separator />;

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        const { 
            selectedSort, 
            onSortChange, 
            searchKeyword, 
            onSearchKeywordChange 
        } = this.props;

        return (
            <View>
                <RepositorySearchBar 
                    searchKeyword={searchKeyword}
                    onSearchKeywordChange={onSearchKeywordChange}
                />
                <RepositorySortSelector 
                    selectedSort={selectedSort}
                    onSortChange={onSortChange}
                />
            </View>
        );
    };

    render() {
        const { repositories } = this.props;
        const navigation = this.props.navigation;
        const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

        const renderItem = ({ item }) => (
            <Pressable onPress={() => navigation.navigate('Repository', { id: item.id })}>
                <RepositoryItem repository={item} />
            </Pressable>
        );

        return (
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}

const RepositoryList = () => {
    const [selectedSort, setSelectedSort] = useState('LATEST');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
    const navigation = useNavigation();

    // Convert sort selection to GraphQL variables
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

    const variables = {
        ...getSortVariables(selectedSort),
        searchKeyword: debouncedSearchKeyword || undefined,
    };

    const { repositories } = useRepositories(variables);

    return (
        <RepositoryListContainer 
            repositories={repositories} 
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
            navigation={navigation}
        />
    );
};

export default RepositoryList;
