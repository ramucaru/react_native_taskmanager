import SignupForm from "@/components/SignUpForm";
import { View, Text } from "@/components/Themed";
import React from "react";
import { StyleSheet } from "react-native";

const SignUp = () => {
    return (
        <View style={style.container}>
            {/* <View>
                <Text>SignUp</Text>
            </View> */}
            <View>
                <SignupForm />
            </View>
        </View>
    )
}

export default SignUp;
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: "10%"
    }
})