import React from "react";
import { View } from "@/components/Themed"
import LoginForm from "@/components/LoginForm";
import { StyleSheet } from "react-native";

const Login = () => {
    return (
        <View id="login" style={style.container}>
            <LoginForm />
        </View>
    )
}

export default Login;


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: "10%"
    }
})