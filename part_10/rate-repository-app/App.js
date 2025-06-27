import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

export default function App() {
    // eslint-disable-next-line no-console, no-undef
    console.log(Constants.expoConfig.extra.apolloUri);

    return (
        <View style={styles.container}>
            <NativeRouter>
                <ApolloProvider client={apolloClient}>
                    <Main />
                </ApolloProvider>
            </NativeRouter>
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
