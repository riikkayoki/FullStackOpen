import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
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

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;
