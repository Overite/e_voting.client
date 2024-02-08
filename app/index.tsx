import { StyleSheet, Image, Button, ViewStyle, ImageStyle } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { e_voting_green } from '@/constants/Colors';
import { Link } from 'expo-router';
import { images } from '@/constants/images';
import { utils_styles } from '@/constants/utils_styles';
import use_lora_font from '@/hooks/fonts/lora_font';

export default function Welcome() {

    const { } = use_lora_font();

    return (
        <SafeAreaView style={styles.safe_area}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.logo_block}>
                        <Image source={images.evs} />

                        <Text>Accessibility . Securit y. Accuracy</Text>
                    </View>

                    <Link href={'/'} style={{ ...styles.cta_btn, fontFamily: 'lora-bold' }} push>Get started</Link>
                </View>

                <Image style={styles.tetfund_frame_style} source={images.tetfund_frame} />
            </View>
        </SafeAreaView>
    );
}

const { safe_area_styles, tetfund_frame_style } = utils_styles;

const styles = StyleSheet.create({
    safe_area: safe_area_styles as ViewStyle,
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    main: {
        width: 366,
        height: 218,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    logo_block: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7
    },
    cta_btn: {
        color: 'white',
        backgroundColor: e_voting_green,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius: 5,
    },
    tetfund_frame_style: tetfund_frame_style as ImageStyle
});
