import { Link, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, TextInput, Platform, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Input from './TextInput';
import { validateEmail, validatePassword } from '@/constants/utills';
import { login } from '@/api/authAPI';
const LoginForm = () => {
    const { width } = useWindowDimensions();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({
        email: "",
        password: "",
    })
    const navigation = useNavigation();
    function onPress() {
        if (validateEmail(form.email)) {
            setError({ ...error, email: validateEmail(form.email) })
        } else if (validatePassword(form.password)) {
            setError({ ...error, password: validatePassword(form.password), email: "" })
        } else {
            login(form.email, form.password).then((ress) => {
                setError({ ...error, password: "", email: "", })
                navigation.navigate("(tabs)")
            }).catch((err) => {
                setError({ ...error, email: err.message, password: "" })
            })
        }
    }
    const onChange = (value: string, id: string): void => {
        setForm({ ...form, [id]: value });
    }
    return (
        <View style={style.container}>
            <View>
                <Text style={style.taskManagerText}>
                    Task Manager
                </Text>
            </View>
            <View style={[style.box, { width: width > 600 ? "40%" : "80%", }]}>
                <View id='title'>
                    <Text style={style.loginText}>Log In</Text>
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
                        placeholder="Password"
                        style={style.input}
                        id='password'
                        onChangeData={onChange}
                        value={form.password}
                        error={error.password}
                    />
                </View>

                <View style={{ width: "80%", alignSelf: "center", marginBottom: 10 }}>
                    <Link href={"/forget-password"} style={{ color: "blue" }}>Forget Password?.</Link>
                </View>
                <View style={{ width: "80%", alignSelf: "center" }}>
                    <TouchableOpacity style={{ backgroundColor: "#fcfcfc", paddingHorizontal: 5, borderRadius: 25, elevation: 2, borderWidth: 2 }} onPress={onPress}>
                        <Text style={{ fontSize: 18, color: "#000000", textAlign: "center", fontWeight: "bold", paddingVertical: 10 }}>Log In</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: "80%", alignSelf: "center", marginTop: 10, alignItems: "center" }}>
                    <Text>
                        {"Not a Member ? "}
                        <Link href={"/signup"} style={{ color: "blue" }}>SignUp</Link>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default LoginForm;



const style = StyleSheet.create({
    container: {
        // marginVertical: 10
    },
    taskManagerText: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center"
    },
    box: {
        backgroundColor: '#fff',
        shadowColor: '#000', // Color of the shadow
        shadowOffset: { width: 10, height: 10 }, // How far the shadow is offset from the box
        shadowOpacity: 0.25, // Opacity of the shadow
        shadowRadius: 15, // How blurred the shadow is,
        alignSelf: "center",
        elevation: 5,
        paddingHorizontal: 20,
        paddingVertical: 40,
        marginTop: 15
    },
    loginText: {
        fontSize: 20,
        fontWeight: "bold",
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