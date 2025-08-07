import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';

const Container = styled.View`
    flex: 1;
    background-color: #e1e5e9;
`;

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const SingleRepository = () => {
    const route = useRoute();
    const { id } = route.params;
    const { repository, loading, error } = useRepository(id);

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

    return (
        <Container>
            <RepositoryItem repository={repository} showGitHubButton={true} />
        </Container>
    );
};

export default SingleRepository; 