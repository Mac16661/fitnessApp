import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { AppStack, AuthStack } from "./stackNavigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_APP } from "../FirebaseConfig";

const AppNavigation = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(FIREBASE_APP);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        // console.log('User:', user);
        setUser(user);
      },
      (error) => {
        console.error("AuthStateChanged Error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export { AppNavigation };
