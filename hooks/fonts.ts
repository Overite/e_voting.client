import { useEffect, useState } from "react";
import * as Font from 'expo-font';
import { lora_font } from '@/constants/fonts';

function use_font() {
    
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

    return {font_loaded}
}

export default use_font;