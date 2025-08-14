import React from 'react';
import { Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';
import useMyReviews from '../hooks/useMyReviews';

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

const ActionsContainer = styled.View`
    flex-direction: row;
    margin-top: 15px;
`;

const ButtonSpacer = styled.View`
    width: 15px;
`;

const ActionButton = styled.Pressable`
    flex: 1;
    padding: 15px;
    border-radius: 5px;
    align-items: center;
`;

const ViewButton = styled(ActionButton)`
    background-color: ${theme.colors.primary};
`;

const DeleteButton = styled(ActionButton)`
    background-color: #d73a49;
`;

const MyReviewItem = ({ review }) => {
    const navigation = useNavigation();
    const [deleteReview] = useDeleteReview();
    const { refetch } = useMyReviews();

    const handleRepositoryPress = () => {
        navigation.navigate('Repository', { id: review.repository.id });
    };

    const handleDeletePress = () => {
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'CANCEL',
                    style: 'cancel',
                },
                {
                    text: 'DELETE',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteReview(review.id);
                            refetch();
                        } catch {
                            Alert.alert('Error', 'Failed to delete review. Please try again.');
                        }
                    },
                },
            ]
        );
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
            <ActionsContainer>
                <ViewButton onPress={handleRepositoryPress}>
                    <Text color="white" fontWeight="bold">
                        View repository
                    </Text>
                </ViewButton>
                <ButtonSpacer />
                <DeleteButton onPress={handleDeletePress}>
                    <Text color="white" fontWeight="bold">
                        Delete review
                    </Text>
                </DeleteButton>
            </ActionsContainer>
        </Container>
    );
};

export default MyReviewItem; 