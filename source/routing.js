import React from "react";
import { StyleSheet, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ArchivesPage from "./components/ArchivesPage.js";
import EntryPage from "./containers/EntryPage.js";
import NewEntryPage from "./containers/NewEntryPage.js";
import AddArchivePage from "./containers/AddArchivePage.js";
import SearchArchivesPage from "./containers/SearchArchivesPage.js";
import RemoteConnectPage from "./containers/RemoteConnectPage.js";
import RemoteExplorerPage from "./containers/RemoteExplorerPage.js";
import PopupBrowser from "./containers/PopupBrowser.js";
import LockPage from "./components/LockPage.js";
import VaultNavigator from "./components/VaultNavigator.js";
import CodesPage from "./containers/CodesPage.js";
import GroupsPage from "./containers/GroupsPage.js";
import EditPropertyPage from "./containers/EditPropertyPage.js";
import QRCodeScannerPage from "./containers/QRCodeScanner.js";
import {
    VAULT_CONTENTS_SCREEN,
    ENTRY_SCREEN,
    ADD_VAULT_SCREEN,
    REMOTE_CONNECT_SCREEN,
    REMOTE_EXPLORER_SCREEN,
    ENTRY_NEW_SCREEN,
    ENTRY_EDIT_PROPERTY_SCREEN,
    LOCK_SCREEN,
    POPUP_BROWSER_SCREEN,
    ROOT_SCREEN,
    QR_CODE_SCREEN,
    ROOT_NAVIGATOR
} from "./shared/nav.js";
import i18n from "./shared/i18n";

const CODES = require("../resources/images/password-approved.png");
const VAULT = require("../resources/images/password-lock.png");
const SEARCH = require("../resources/images/search-bar.png");

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25
    }
});

const sharedStackStyles = {
    defaultNavigationOptions: {
        headerBackTitle: i18n.t("back"),
        headerTruncatedBackTitle: i18n.t("back"),
        headerTintColor: "#454545",
        headerStyle: {
            borderBottomColor: "#24B5AB",
            borderBottomWidth: 3
        },
        headerTitleStyle: {
            flex: 1
        }
    },
    cardStyle: {
        backgroundColor: "#F8F8FD"
    }
};

export const AppNavigator = createStackNavigator(
    {
        [ROOT_SCREEN]: { screen: ArchivesPage },
        [ENTRY_SCREEN]: { screen: EntryPage },
        [ENTRY_NEW_SCREEN]: { screen: NewEntryPage },
        [ADD_VAULT_SCREEN]: { screen: AddArchivePage },
        [REMOTE_CONNECT_SCREEN]: { screen: RemoteConnectPage },
        [REMOTE_EXPLORER_SCREEN]: { screen: RemoteExplorerPage },
        [POPUP_BROWSER_SCREEN]: { screen: PopupBrowser },
        [VAULT_CONTENTS_SCREEN]: { screen: GroupsPage },
        [ENTRY_EDIT_PROPERTY_SCREEN]: { screen: EditPropertyPage }
    },
    sharedStackStyles
);

const CodesStack = createStackNavigator(
    {
        CodesPage
    },
    sharedStackStyles
);

const SearchStack = createStackNavigator(
    {
        SearchArchivesPage,
        [ENTRY_SCREEN]: { screen: EntryPage }
    },
    sharedStackStyles
);

const TabNavigator = createBottomTabNavigator(
    {
        Vaults: {
            screen: AppNavigator,
            navigationOptions: {
                tabBarLabel: i18n.t("vaults.self"),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={[styles.image, { tintColor }]} source={VAULT} />
                )
            }
        },
        Codes: {
            screen: CodesStack,
            navigationOptions: {
                tabBarLabel: i18n.t("codes.self"),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={[styles.image, { tintColor }]} source={CODES} />
                )
            }
        },
        Search: {
            screen: SearchStack,
            navigationOptions: {
                tabBarLabel: i18n.t("search.self"),
                tabBarIcon: ({ tintColor }) => (
                    <Image style={[styles.image, { tintColor }]} source={SEARCH} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#454545",
            inactiveTintColor: "#999999"
        }
    }
);

const QRCodeStack = createStackNavigator(
    {
        QRCodeScannerPage
    },
    sharedStackStyles
);

const RootStack = createStackNavigator(
    {
        [ROOT_NAVIGATOR]: { screen: TabNavigator },
        [LOCK_SCREEN]: { screen: LockPage },
        [QR_CODE_SCREEN]: {
            screen: QRCodeStack
        }
    },
    {
        mode: "modal",
        headerMode: "none"
    }
);

const App = createAppContainer(RootStack);

export default App;
