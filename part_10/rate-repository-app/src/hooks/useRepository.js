import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
    const { data, loading, error, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

        // eslint-disable-next-line no-console, no-undef
        console.log('FetchMore called:', {
            loading,
            hasNextPage: data?.repository?.reviews?.pageInfo?.hasNextPage,
            canFetchMore,
            currentReviewCount: data?.repository?.reviews?.edges?.length || 0
        });

        if (!canFetchMore) {
            // eslint-disable-next-line no-console, no-undef
            console.log('Cannot fetch more reviews');
            return;
        }

        // eslint-disable-next-line no-console, no-undef
        console.log('Fetching more reviews with cursor:', data.repository.reviews.pageInfo.endCursor);

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return {
        repository: data?.repository,
        fetchMore: handleFetchMore,
        loading,
        error,
        ...result,
    };
};

export default useRepository;
