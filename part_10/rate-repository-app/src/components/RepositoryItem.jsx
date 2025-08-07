import { Text, Image } from 'react-native';
import styled from 'styled-components/native';
import * as Linking from 'expo-linking';

const Container = styled.View`
    background-color: white;
    padding: 15px;
`;

const TopSection = styled.View`
    flex-direction: row;
    margin-bottom: 15px;
`;

const AvatarContainer = styled.View`
    flex-grow: 0;
    margin-right: 15px;
`;

const Avatar = styled(Image)`
    width: 45px;
    height: 45px;
    border-radius: 4px;
`;

const ContentContainer = styled.View`
    flex-grow: 1;
    flex-shrink: 1;
`;

const NameText = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const DescriptionText = styled(Text)`
    color: #586069;
    margin-bottom: 5px;
`;

const LanguageContainer = styled.View`
    align-self: flex-start;
    background-color: #0366d6;
    padding-horizontal: 6px;
    padding-vertical: 4px;
    border-radius: 4px;
`;

const LanguageText = styled(Text)`
    color: white;
    font-size: 12px;
    font-weight: bold;
`;

const StatsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

const StatItem = styled.View`
    align-items: center;
`;

const StatValue = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const StatLabel = styled(Text)`
    font-size: 12px;
    color: #586069;
`;

const GitHubButton = styled.Pressable`
    background-color: #0366d6;
    padding: 15px;
    border-radius: 4px;
    align-items: center;
    margin-top: 15px;
`;

const ButtonText = styled(Text)`
    color: white;
    font-size: 18px;
    font-weight: bold;
`;

const formatCount = (count) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
};

const RepositoryItem = ({ repository, showGitHubButton = false }) => {
    const handleOpenInGitHub = () => {
        Linking.openURL(repository.url);
    };

    return (
        <Container testID="repositoryItem">
            <TopSection>
                <AvatarContainer>
                    <Avatar source={{ uri: repository.ownerAvatarUrl }} />
                </AvatarContainer>
                <ContentContainer>
                    <NameText>{repository.fullName}</NameText>
                    <DescriptionText>{repository.description}</DescriptionText>
                    {repository.language && (
                        <LanguageContainer>
                            <LanguageText>{repository.language}</LanguageText>
                        </LanguageContainer>
                    )}
                </ContentContainer>
            </TopSection>
            <StatsContainer>
                <StatItem>
                    <StatValue>{formatCount(repository.stargazersCount)}</StatValue>
                    <StatLabel>Stars</StatLabel>
                </StatItem>
                <StatItem>
                    <StatValue>{formatCount(repository.forksCount)}</StatValue>
                    <StatLabel>Forks</StatLabel>
                </StatItem>
                <StatItem>
                    <StatValue>{repository.reviewCount}</StatValue>
                    <StatLabel>Reviews</StatLabel>
                </StatItem>
                <StatItem>
                    <StatValue>{repository.ratingAverage}</StatValue>
                    <StatLabel>Rating</StatLabel>
                </StatItem>
            </StatsContainer>
            {showGitHubButton && (
                <GitHubButton onPress={handleOpenInGitHub}>
                    <ButtonText>Open in GitHub</ButtonText>
                </GitHubButton>
            )}
        </Container>
    );
};

export default RepositoryItem;
