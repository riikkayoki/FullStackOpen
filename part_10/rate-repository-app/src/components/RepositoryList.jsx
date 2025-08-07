import { FlatList, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const Separator = styled.View`
    height: 10px;
`;

const ItemSeparator = () => <Separator />;

export const RepositoryListContainer = ({ repositories }) => {
    const navigation = useNavigation();
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
        />
    );
};

const RepositoryList = () => {
    const { repositories } = useRepositories();

    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
