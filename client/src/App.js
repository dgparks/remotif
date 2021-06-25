import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import * as Realm from "realm-web";
import { FirebaseProvider } from './contexts/FirebaseContext';
import NavigationScroll from './layout/NavigationScroll';
import Routes from './routes';
import theme from './themes';

//-----------------------|| APP ||-----------------------//

const App = () => {
    const customization = useSelector((state) => state.customization);
    const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const assert = require('assert');

    async function loginApiKey(apiKey) {
        // Create an API Key credential
        const credentials = Realm.Credentials.apiKey(apiKey);
        try {
          // Authenticate the user
          const user = await app.logIn(credentials);
          // App.currentUser updates to match the logged in user
          assert(user.id === app.currentUser.id)

          return user
        } catch(err) {
          console.error("Failed to log in", err);
        }
    }
    loginApiKey(process.env.REACT_APP_REALM_API_KEY);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline />
                    <NavigationScroll>
                        <FirebaseProvider>
                            <Routes />
                        </FirebaseProvider>
                    </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
