import { Text, View } from "@/components/Themed";
import { e_voting_green } from "@/constants/Colors";
import { images } from "@/constants/images";
import { utils_styles } from "@/constants/utils_styles";
import { StyleSheet, ViewStyle, Image, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import use_lora_font from "@/hooks/fonts/lora_font";
import { TetfundFrame } from "./_layout";

function signin() {
    const { } = use_lora_font();

    const [password_shown, set_password_shown] = useState(false);
    const [form_data, set_form_data] = useState({
        remember_me: false,
        admin_number: '',
        password: ''
    })
    const { admin_number, password, remember_me } = form_data;

    // const onChange = (name: string, value: string) => {
    //     set_form_data((prev as any) => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };


    return (
        <SafeAreaView style={styles.safe_area_styles}>
            <View style={styles.container}>
                <View style={styles.logo_block}>
                    <Image source={images.evs} />
                    <Text>Accessibility . Securit y. Accuracy</Text>
                </View>

                <View style={styles.form_styles}>
                    <Text style={styles.form_heading}>Login</Text>

                    <TextInput style={{ ...styles.input_style, borderBottomColor: 'lightgray' }} value={admin_number} placeholder="Admin number" onChange={() => { }} />

                    <View style={styles.input_icon_holder}>
                        <TextInput style={{ ...styles.input_style, flex: 0.92 }} value={password} secureTextEntry={password_shown} placeholder="Password" onChange={() => { }} />
                        {!password_shown ? (<AntDesign style={styles.input_icon} name="eyeo" size={24} color="lightgray" />) : (<Ionicons name="eye-off-outline" size={24} color="lightgray" />)}
                    </View>

                    <View style={styles.remeber_me_block}>
                        {remember_me ? (<AntDesign name="checksquare" size={24} color={e_voting_green} />) : (<Feather name="square" size={24} color={e_voting_green} />)}
                        <Text style={styles.remeber_me_text}>Remeber me</Text>
                    </View>

                    <Button title="Login" color={e_voting_green} />
                </View>

            </View>
            <TetfundFrame />
        </SafeAreaView>
    )
}

export default signin;

const { disabled_cta_btn, safe_area_styles, btn } = utils_styles;

const styles = StyleSheet.create({
    safe_area_styles,
    container: {
        width: 366,
        height: 460,
        marginTop: 140,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'space-between'
    },
    logo_block: {
        display: 'flex',
        gap: 7,
        alignItems: 'center'
    },
    form_styles: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    form_heading: {
        color: e_voting_green,
        fontSize: 25,
        fontWeight: 'bold'
    },
    input_style: {
        padding: 1,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    input_icon_holder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    input_icon: {
        right: 0,
        marginTop: 'auto',
        marginBottom: 'auto',
        zIndex: 3,
        flex: 0.08
    },
    remeber_me_block: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 3
    },
    remeber_me_text: {
        color: 'lightgray',
        fontSize: 20,
    },
    capture_btn: btn,
    disabled_cta_btn,
    tetfund_frame_style: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
})