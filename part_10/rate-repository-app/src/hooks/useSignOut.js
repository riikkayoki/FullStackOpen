import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import useAuthStorage from './useAuthStorage';

const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigation = useNavigation();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigation.navigate('Repositories');
    };

    return signOut;
};

export default useSignOut;
