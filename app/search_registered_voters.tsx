import { View, Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { utils_styles } from "@/constants/utils_styles";
import { StyleSheet } from "react-native";
import { RightHeaderDropDown, SideBar } from "./_layout";

function SearchRegisteredVoters() {

    return <SafeAreaView style={safe_area_styles}>
        <RightHeaderDropDown />

        <SideBar />
    </SafeAreaView>

}

export default SearchRegisteredVoters;

const { safe_area_styles } = utils_styles;
const styles = StyleSheet.create({
    safe_area_styles
})