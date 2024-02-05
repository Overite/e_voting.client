import { StyleSheet, Image, Button, ViewStyle } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { e_voting_green } from '@/constants/Colors';
import { Link } from 'expo-router';
import { images } from '@/constants/images';
import * as Font from 'expo-font';
import lora_font from "../assets/fonts/Lora-Bold.ttf";
import { useEffect, useState } from 'react';
import { safe_area_styles } from '@/constants/safe-area_styles';

export default function Welcome() {

    // Google Fonts
    const [font_loaded, setFont_loaded] = useState(false);

    useEffect(() => {
        // Load the custom font
        const loadFont = async () => {
            await Font.loadAsync({
                'lora-bold': lora_font,
            });
            setFont_loaded(true);
        };

        if (!font_loaded) {
            loadFont();
        }
    }, [])

    return (
        <SafeAreaView style={styles.safe_area}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.logo_block}>
                        <Image source={images.evs} />

                        <Text>Accessibility . Securit y. Accuracy</Text>
                    </View>

                    <Link href={'/signin'} style={{ ...styles.cta_btn, fontFamily: 'lora-bold' }} push>Get started</Link>
                </View>

                <Image style={styles.tetfund_frame_style} source={images.tetfund_frame} />
            </View>
        </SafeAreaView>
    );
}

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
    tetfund_frame_style: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
});
