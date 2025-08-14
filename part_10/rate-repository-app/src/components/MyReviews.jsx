import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import MyReviewItem from './MyReviewItem';
import useMyReviews from '../hooks/useMyReviews';

const Separator = styled.View`
    height: 10px;
`;

const ItemSeparator = () => <Separator />;

const MyReviews = () => {
    const { reviews, loading } = useMyReviews();

    if (loading) {
        return null; // You could add a loading spinner here
    }

    const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

    const renderItem = ({ item }) => <MyReviewItem review={item} />;

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

export default MyReviews;
