import { Text, View } from "@/components/Themed";
import { utils_styles } from "@/constants/utils_styles";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { images } from "@/constants/images";
import { FontAwesome6 } from '@expo/vector-icons';
import { e_voting_green } from "@/constants/Colors";
import use_font from "@/hooks/fonts";

function capture_screen() {
    const { } = use_font();

    return (
        <SafeAreaView style={styles.safe_area}>
            <View style={styles.container}>
                <View style={styles.logo_block}>
                    <Image source={images.evs} />
                    <Text>Accessibility . Securit y. Accuracy</Text>
                </View>

                <View style={styles.scanner_block}>

                    <View style={styles.scanner_liner}></View>

                    <View style={{ ...styles?.['corner'], bottom: '96%', right: '98%', transform: 'rotate(224deg)' }}>
                        <FontAwesome6 name="angle-right" size={24} color="black" />
                    </View>
                    <View style={{ ...styles?.['corner'], bottom: '96%', left: '98%', transform: 'rotate(-45deg)' }}>
                        <FontAwesome6 name="angle-right" size={24} color="black" />
                    </View>
                    <View style={{ ...styles?.['corner'], top: '96%', right: '98%', transform: 'rotate(134deg)' }}>
                        <FontAwesome6 name="angle-right" size={24} color="black" />
                    </View>
                    <View style={{ ...styles?.['corner'], top: '96%', left: '98%', transform: 'rotate(45deg)' }}>
                        <FontAwesome6 name="angle-right" size={24} color="black" />
                    </View>
                </View>

                <Text style={styles.capture_btn}>Capture</Text>
            </View>
        </SafeAreaView>
    )
}

export default capture_screen;

const { disabled_cta_btn, safe_area_styles } = utils_styles;

const styles = StyleSheet.create({
    safe_area: safe_area_styles as ViewStyle,
    container: {
        width: 366,
        height: 462.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 140,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logo_block: {
        display: 'flex',
        gap: 7,
        alignItems: 'center'
    },
    scanner_block: {
        position: 'relative',
        width: '100%',
        height: 278,
        backgroundColor: 'lightgray',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scanner_liner: {
        width: '90%',
        height: 2,
        backgroundColor: e_voting_green
    },
    corner: {
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    capture_btn: {
        width: '100%',
        height: 42,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius: 4,
        backgroundColor: e_voting_green,
        color: 'white',
        fontFamily: 'lora-bold'
    },
    disabled_cta_btn
})