import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
    // eslint-disable-next-line no-console, no-undef
    console.log(Constants.expoConfig.extra.apolloUri);

    return (
        <View style={styles.container}>
            <PaperProvider>
                <ApolloProvider client={apolloClient}>
                    <AuthStorageContext.Provider value={authStorage}>
                        <Main />
                    </AuthStorageContext.Provider>
                </ApolloProvider>
            </PaperProvider>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
