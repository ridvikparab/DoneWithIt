import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { navigationRef } from "./app/navigation/rootNavigation";

SplashScreen.preventAutoHideAsync(); // Keep splash screen visible

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedUser = await authStorage.getUser();
        if (storedUser) setUser(storedUser);
      } catch (err) {
        console.warn("Failed to restore user:", err);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync(); // Hide splash screen in all cases
      }
    };

    restoreUser();
  }, []);

  if (!isReady) return null; // splash screen still showing

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
