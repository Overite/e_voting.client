import { ImageStyle, ViewStyle } from "react-native";
import { e_voting_green } from "./Colors";

const utils_styles = {
        btn: {
        width: '100%',
        height: 42,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius: 4,
        backgroundColor: e_voting_green,
        color: 'white',
        fontFamily: 'lora-bold'
    } as ViewStyle,
        disabled_cta_btn: {
        opacity: 0.6
        },
        safe_area_styles: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        position: 'relative'
    } as ViewStyle,
         tetfund_frame_style: {
        position: 'absolute',
        bottom: 10,
        right: 10
    } as ImageStyle

}
    
export {utils_styles}