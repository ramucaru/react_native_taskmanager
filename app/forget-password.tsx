import ForgetForm from "@/components/ForgetForm";
import { View } from "@/components/Themed";
import React from "react";

const ForgetPassword = () => {
    return (
        <View style={{ flex: 1, paddingTop: "10%" }}>
            <ForgetForm />
        </View>
    )
}

export default ForgetPassword;