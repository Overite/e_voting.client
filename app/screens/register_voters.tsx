import { View, Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { utils_styles } from "@/constants/utils_styles";
import { StyleSheet } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { e_voting_green } from "@/constants/Colors";
import use_ubuntu_font from "@/hooks/fonts/ubuntu_medium_font";
import use_lora_font from "@/hooks/fonts/lora_font";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { LeftHeaderComponent, RightHeaderComponent } from "./_layout";

enum Mode {
    manual = 'manual',
    automatic = 'automatic'
}

type ModeType = Mode.automatic | Mode.manual;

function RegisterVoters() {
    const { } = use_ubuntu_font();
    const { } = use_lora_font();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <LeftHeaderComponent title='Register voters' btn='back_btn' />,
            headerRight: () => <RightHeaderComponent />,
            headerTitle: '',
            headerStyle: {
                backgroundColor: e_voting_green,
            }
        })
    }, [navigation])

    const [mode, set_mode] = useState<ModeType>(Mode.manual);

    return <View style={styles.container}>
        <Text style={styles.heading}>Mode of registration:</Text>

        <View style={styles.registration_options}>
            <View style={styles.option_block}>
                {mode === Mode.manual ? (<Fontisto onPress={() => set_mode(Mode.manual)} name="radio-btn-active" size={24} color={e_voting_green} />) : (<Fontisto onPress={() => set_mode(Mode.manual)} name="radio-btn-passive" size={24} color={e_voting_green} />)}
                <Text onPress={() => set_mode(Mode.manual)} style={styles.option_text}>Manual</Text>
            </View>

            <View style={styles.option_block}>
                {mode === Mode.automatic ? (<Fontisto onPress={() => set_mode(Mode.automatic)} name="radio-btn-active" size={24} color={e_voting_green} />) : (<Fontisto onPress={() => set_mode(Mode.automatic)} name="radio-btn-passive" size={24} color={e_voting_green} />)}
                <Text onPress={() => set_mode(Mode.automatic)} style={styles.option_text}>Automatic</Text>
            </View>
        </View>

        <Text style={styles.continue_btn}>Continue</Text>
    </View>
}

export default RegisterVoters;

const { safe_area_styles, btn } = utils_styles;
const styles = StyleSheet.create({
    safe_area_styles,
    container: {
        width: 366,
        height: '20%',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
    },
    heading: {
        fontSize: 23,
        fontWeight: '500',
        fontFamily: 'Ubuntu-Medium'
    },
    registration_options: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 20
    },
    option_block: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    option_text: {
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
    },
    continue_btn: btn
})
