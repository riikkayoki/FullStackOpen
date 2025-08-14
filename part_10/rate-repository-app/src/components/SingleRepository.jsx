import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Separator = styled.View`
    height: 10px;
`;

const ItemSeparator = () => <Separator />;

const RepositoryInfo = ({ repository }) => {
    return <RepositoryItem repository={repository} showGitHubButton={true} />;
};

const SingleRepository = () => {
    const route = useRoute();
    const { id } = route.params;
    const { repository, fetchMore, loading, error } = useRepository({
        id,
        first: 4,
    });

    const onEndReach = () => {
        if (loading) {
            return;
        }

        // eslint-disable-next-line no-console, no-undef
        console.log('End reached! Fetching more reviews...');
        fetchMore();
    };

    if (loading) {
        return (
            <LoadingContainer>
                <Text>Loading...</Text>
            </LoadingContainer>
        );
    }

    if (error) {
        return (
            <LoadingContainer>
                <Text>Error loading repository</Text>
            </LoadingContainer>
        );
    }

    if (!repository) {
        return (
            <LoadingContainer>
                <Text>Repository not found</Text>
            </LoadingContainer>
        );
    }

    const reviews = repository.reviews ? repository.reviews.edges.map((edge) => edge.node) : [];

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
            ItemSeparatorComponent={ItemSeparator}
            style={{ backgroundColor: '#e1e5e9' }}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.1}
        />
    );
};

export default SingleRepository;
