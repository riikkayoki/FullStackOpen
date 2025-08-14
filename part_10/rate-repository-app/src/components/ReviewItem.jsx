import styled from 'styled-components/native';
import { format } from 'date-fns';
import Text from './Text';

const Container = styled.View`
    background-color: white;
    padding: 15px;
`;

const ReviewContainer = styled.View`
    flex-direction: row;
`;

const RatingContainer = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 2px solid #0366d6;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
`;

const RatingText = styled(Text)`
    color: #0366d6;
    font-weight: bold;
    font-size: 18px;
`;

const ContentContainer = styled.View`
    flex: 1;
`;

const UserText = styled(Text)`
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
`;

const DateText = styled(Text)`
    color: #586069;
    font-size: 14px;
    margin-bottom: 10px;
`;

const ReviewText = styled(Text)`
    font-size: 14px;
    line-height: 20px;
`;

const ReviewItem = ({ review }) => {
    const createdDate = new Date(review.createdAt);
    const formattedDate = format(createdDate, 'dd.MM.yyyy');

    return (
        <Container>
            <ReviewContainer>
                <RatingContainer>
                    <RatingText>{review.rating}</RatingText>
                </RatingContainer>
                <ContentContainer>
                    <UserText>{review.user.username}</UserText>
                    <DateText>{formattedDate}</DateText>
                    <ReviewText>{review.text}</ReviewText>
                </ContentContainer>
            </ReviewContainer>
        </Container>
    );
};

export default ReviewItem;
