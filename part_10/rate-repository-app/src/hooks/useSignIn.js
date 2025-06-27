import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { AUTHENTICATE } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigation = useNavigation();
    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({
            variables: {
                credentials: { username, password },
            },
        });

        if (data?.authenticate?.accessToken) {
            await authStorage.setAccessToken(data.authenticate.accessToken);
            apolloClient.resetStore();
            navigation.navigate('Repositories');
        }

        return { data };
    };

    return [signIn, result];
};

export default useSignIn;
