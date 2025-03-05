import { Link, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, TextInput, Platform, StyleSheet, TouchableOpacity, Modal, useWindowDimensions } from 'react-native';
import Input from './TextInput';
import { validateEmail, validatePassword } from '@/constants/utills';
import { createAccount } from '@/api/authAPI';

const SignupForm = () => {
    const width = useWindowDimensions();
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    })
    const navigation = useNavigation();
    function onPress() {
        if (!form.name) {
            setError({ ...error, name: "name is required" })
        } else if (validateEmail(form.email)) {
            setError({ ...error, email: validateEmail(form.email), name: "" })
        } else if (validatePassword(form.password)) {
            setError({ ...error, password: validatePassword(form.password), name: "", email: "" })
        } else if (form.password !== form.confirmPassword) {
            setError({ ...error, confirmPassword: "Confirm password should match with password", password: "", name: "", email: "" })
        } else {
            setError({ ...error, confirmPassword: "", password: "", name: "", email: "" })
            const payload = {
                name: form.name,
                password: form.password,
                email: form.email
            }
            createAccount(payload).then((res) => {
                alert(res.message)
                navigation.navigate("index");
            }).catch((error) => {
                setError(pre => ({ ...pre, email: error.message }))
            })
        }
    }


    function onChange(value: string, id: string): void {
        setForm({ ...form, [id]: value })
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
                    <Text style={style.loginText}>Sign Up</Text>
                </View>
                <View id='form-container'>
                    <Input
                        placeholder="Name"
                        style={style.input}
                        id='name'
                        onChangeData={onChange}
                        value={form.name}
                        error={error.name}
                    />
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
                    <Input
                        secureTextEntry={true}
                        placeholder="Confirm password"
                        style={style.input}
                        id='confirmPassword'
                        onChangeData={onChange}
                        value={form.confirmPassword}
                        error={error.confirmPassword}
                    />
                </View>
                <View id='forget-password' style={{ alignItems: "flex-end" }}>

                </View>
                <View style={{ width: "80%", alignSelf: "center", marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fcfcfc", paddingHorizontal: 5, borderRadius: 25, elevation: 2, borderWidth: 2 }} onPress={onPress}>
                        <Text style={{ fontSize: 18, color: "#000000", textAlign: "center", fontWeight: "bold", paddingVertical: 10, }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: "80%", alignSelf: "center", marginTop: 10, alignItems: "center" }}>
                    <Text>
                        {"Already have an account? "}
                        <Link href={"/login"} style={{ color: "blue" }}>Login</Link>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default SignupForm;


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