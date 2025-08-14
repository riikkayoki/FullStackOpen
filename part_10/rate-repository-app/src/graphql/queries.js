import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    id
                    ownerName
                    name
                    createdAt
                    fullName
                    ratingAverage
                    reviewCount
                    stargazersCount
                    watchersCount
                    forksCount
                    openIssuesCount
                    url
                    ownerAvatarUrl
                    description
                    language
                }
            }
        }
    }
`;

export const AUTHENTICATE = gql`
    mutation authenticate($credentials: AuthenticateInput!) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

export const GET_REPOSITORY = gql`
    query getRepository($id: ID!) {
        repository(id: $id) {
            id
            ownerName
            name
            createdAt
            fullName
            ratingAverage
            reviewCount
            stargazersCount
            watchersCount
            forksCount
            openIssuesCount
            url
            ownerAvatarUrl
            description
            language
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation createReview($review: CreateReviewInput!) {
        createReview(review: $review) {
            repositoryId
        }
    }
`;

export const ME = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repository {
                            id
                            fullName
                        }
                    }
                }
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($user: CreateUserInput!) {
        createUser(user: $user) {
            id
            username
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`;
