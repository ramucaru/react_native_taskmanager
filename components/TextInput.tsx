import React, { FC } from "react";
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputProps } from "react-native";
import { Text, View } from "./Themed";



interface Input extends TextInputProps {
    onChangeData?: (value: string, id: string, event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    error?: string | undefined
}
const Input: FC<Input> = (props: Input) => {

    const onChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        if (props && props.onChangeData) {
            props.onChangeData(event.nativeEvent.text, props.id || "id", event)
        }
    }
    return (
        <View>
            <TextInput {...props} onChange={onChange} />
            {props.error ? <Text style={{ width: "80%", alignSelf: "center", fontSize: 16, color: "red", fontWeight: "bold" }}>{props.error}</Text> : null}
        </View >
    )
}

export default Input;