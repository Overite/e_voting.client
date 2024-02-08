import { View, Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { utils_styles } from "@/constants/utils_styles";
import { StyleSheet } from "react-native";
import { RightHeaderDropDown, SideBar, TetfundFrame } from "./_layout";
import { Fontisto } from '@expo/vector-icons';
import { e_voting_green } from "@/constants/Colors";
import use_ubuntu_font from "@/hooks/fonts/ubuntu_medium_font";

function RegisterVoters() {
    const { } = use_ubuntu_font();


    return <SafeAreaView style={safe_area_styles}>
        <RightHeaderDropDown />

        <SideBar />

        <View style={styles.container}>
            <Text style={styles.heading}>Mode of registration:</Text>

            <View style={styles.registration_options}>
                <View style={styles.option_block}>
                    <Fontisto name="radio-btn-active" size={24} color={e_voting_green} />
                    <Text style={styles.option_text}>Manual</Text>
                </View>

                <View style={styles.option_block}>
                    <Fontisto name="radio-btn-active" size={24} color={e_voting_green} />
                    <Text style={styles.option_text}>Automatic</Text>
                </View>
            </View>

            <Text style={styles.continue_btn}>Continue</Text>
        </View>

        <TetfundFrame />
    </SafeAreaView>
}

export default RegisterVoters;

const { safe_area_styles, btn } = utils_styles;
const styles = StyleSheet.create({
    safe_area_styles,
    container: {
        width: 366,
        height: 'auto',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 30
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
    continue_btn: { ...btn, marginTop: 12, backgroundColor: 'red' }
})
