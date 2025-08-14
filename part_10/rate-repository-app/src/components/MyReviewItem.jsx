import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const Container = styled.View`
    background-color: white;
    padding: 15px;
`;

const ReviewHeader = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
`;

const RatingContainer = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 2px solid ${theme.colors.primary};
    justify-content: center;
    align-items: center;
    margin-right: 15px;
`;

const ReviewInfo = styled.View`
    flex: 1;
`;

const ReviewContent = styled.View`
    margin-top: 10px;
    padding-left: 65px;
`;

const MyReviewItem = ({ review }) => {
    const navigation = useNavigation();

    const handleRepositoryPress = () => {
        navigation.navigate('Repository', { id: review.repository.id });
    };

    return (
        <Container>
            <ReviewHeader>
                <RatingContainer>
                    <Text color="primary" fontWeight="bold" fontSize="subheading">
                        {review.rating}
                    </Text>
                </RatingContainer>
                <ReviewInfo>
                    <Pressable onPress={handleRepositoryPress}>
                        <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 5 }}>
                            {review.repository.fullName}
                        </Text>
                    </Pressable>
                    <Text color="textSecondary">
                        {format(new Date(review.createdAt), 'dd.MM.yyyy')}
                    </Text>
                </ReviewInfo>
            </ReviewHeader>
            <ReviewContent>
                <Text>{review.text}</Text>
            </ReviewContent>
        </Container>
    );
};

export default MyReviewItem; 