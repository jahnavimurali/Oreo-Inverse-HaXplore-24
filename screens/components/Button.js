import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Button = (props) => {

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: '#DC4F00'},
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, ... { color: '#fff' } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: '#DC4F00',
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button