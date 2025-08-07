import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const Separator = styled.View`
    height: 10px;
`;

const ItemSeparator = () => <Separator />;

export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem repository={item} />}
            keyExtractor={(item) => item.id}
        />
    );
};

const RepositoryList = () => {
    const { repositories } = useRepositories();

    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
