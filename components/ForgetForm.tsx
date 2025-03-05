import { Link, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, TextInput, Platform, StyleSheet, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, useWindowDimensions } from 'react-native';
import Input from './TextInput';
import { validateEmail, validatePassword } from '@/constants/utills';
import { ForgetPassword } from '@/api/authAPI';

const ForgetForm = () => {
    const { width } = useWindowDimensions();
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
        email: ""
    });
    const [error, setError] = useState({
        password: "",
        consfirmPassword: "",
        email: ""
    })
    const navigation = useNavigation();
    function onPress() {
        if (validateEmail(form.email)) {
            setError({ ...error, email: validateEmail(form.email) })
        } else if (validatePassword(form.password)) {
            setError({ ...error, password: validatePassword(form.password), email: "" })
        } else if (form.password !== form.confirmPassword) {
            setError({ ...error, consfirmPassword: "Confirm Password should match with password", password: "" })
        } else {
            ForgetPassword(form.email, form.password).then(() => {
                setError({ ...error, consfirmPassword: "", password: "" });
                alert("password updated successfully")
                navigation.navigate("login");
            }).catch((error) => {
                setError({ ...error, password: error.message })
            })

        }
    }
    const onChange = (value: string, id: string): void => {
        setForm({ ...form, [id]: value });
    }

    return (
        <View>
            <View>
                <Text style={{ fontSize: 25, fontWeight: "bold", alignSelf: "center" }}>
                    Task Manager
                </Text>
            </View>
            <View style={[style.box, { width: width > 600 ? "40%" : "80%", }]}>
                <View id='title'>
                    <Text style={style.loginText}></Text>
                </View>
                <View id='form-container'>
                    <Input
                        placeholder="Email address"
                        style={style.input}
                        id='email'
                        onChangeData={onChange}
                        value={form.email}
                        error={error.email}
                    />
                    <Input
                        secureTextEntry={true}
                        placeholder="New Password"
                        style={style.input}
                        id='password'
                        nativeID='password'
                        onChangeData={onChange}
                        error={error.password}
                    />
                    <Input
                        secureTextEntry={true}
                        placeholder="Confirm New Password"
                        style={style.input}
                        id='confirmPassword'
                        nativeID='password'
                        onChangeData={onChange}
                        error={error.consfirmPassword}
                    />
                </View>
                <View style={{ width: "80%", alignSelf: "center", marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fcfcfc", paddingHorizontal: 5, borderRadius: 25, elevation: 2, borderWidth: 2 }} onPress={onPress}>
                        <Text style={{ fontSize: 18, color: "#000000", textAlign: "center", fontWeight: "bold", paddingVertical: 10, }}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "80%", alignSelf: "center", marginTop: 10, alignItems: "center" }}>
                    <Text>
                        <Link href={"/login"} style={{ color: "blue" }}>Login</Link>
                    </Text>
                </View>
            </View>

        </View>
    );
};

export default ForgetForm;


const style = StyleSheet.create({
    box: {
        marginTop: 15,
        backgroundColor: '#fff',
        shadowColor: '#000', // Color of the shadow
        shadowOffset: { width: 10, height: 10 }, // How far the shadow is offset from the box
        shadowOpacity: 0.25, // Opacity of the shadow
        shadowRadius: 15, // How blurred the shadow is,
        alignSelf: "center",
        elevation: 5,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    loginText: {
        fontSize: 20,
        fontWeight: "400",
        alignSelf: "center"
    },
    input: {
        width: Platform.OS === "web" ? "80%" : "80%",
        height: 50,
        backgroundColor: "#fff",
        borderBottomWidth: 2,
        borderRadius: 5,
        alignSelf: "center",
        padding: 5,
        marginVertical: 8,
        borderBottomColor: "gray"
    }
})