import React, { useEffect, useState } from "react";
import { View } from "@/components/Themed"
import LoginForm from "@/components/LoginForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { Image, Dimensions } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useStateContext } from "@/context";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height
const Index = () => {

    const [token, setToken] = useState<string | null>("");
    const navigation = useNavigation();
    const context = useStateContext();
    const getToken = async () => {
        const tokenRead: string | null = await AsyncStorage.getItem("token");
        setToken(tokenRead)
        if (tokenRead) {
            context.setValue({ token: tokenRead });
            navigation.navigate("(tabs)");
        } else {
            navigation.navigate("login")
        }
    }

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
        getToken();
    }, [])
    return (
        <View id="index" style={{ width: width, height: height, backgroundColor: "white", alignItems: "center" }} />
    )
}

export default Index;