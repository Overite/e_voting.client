import { View, Text } from "@/components/Themed";
import { images } from "@/constants/images";
import use_layout_selector from "@/hooks/state/use_layout_selector";
import { SafeAreaView } from "react-native-safe-area-context";
import { LeftHeaderComponent, RightHeaderComponent, RightHeaderDropDown, SideBar, TetfundFrame } from "./_layout";
import { StyleSheet } from "react-native";
import { utils_styles } from "@/constants/utils_styles";
import { e_voting_green } from "@/constants/Colors";
import use_ubuntu_font from "@/hooks/fonts/ubuntu_medium_font";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/state/use_base_hooks";
import { toggle_side_bar_shown } from "@/state/slices/layout_slice";
import { router, useNavigation } from "expo-router";


function Dashboard() {
    const navigation = useNavigation();
    const { right_menu_shown } = use_layout_selector();
    const { } = use_ubuntu_font();
    const dispatch = useAppDispatch();

    const [activities, set_activities] = useState(['activity'])
    // const [activities, set_activities] = useState([]);

    return (
        <SafeAreaView style={styles.safe_area_styles}>

            <RightHeaderDropDown />

            <SideBar />

            <View style={styles.container}>
                <View style={styles.voters_block}>
                    <View style={styles.voters}>
                        <Text style={styles.voters_heading}>Registered voters</Text>
                        <Text style={styles.voters_sub_heading}>0</Text>
                    </View>
                    <View style={styles.voters}>
                        <Text style={styles.voters_heading}>Total voters</Text>
                        <Text style={styles.voters_sub_heading}>0</Text>
                    </View>
                </View>

                <View style={styles.activity_block}>
                    <Text style={styles.heading}>My activities</Text>

                    <View style={styles.activities_container}>

                        {activities.length > 0 ?
                            (<Text style={styles.activity}>activity</Text>) :
                            (<Text style={styles.sub_heading}>No data found!</Text>)
                        }

                    </View>
                </View>
            </View>

            <TetfundFrame />
        </SafeAreaView>
    )
}

export default Dashboard;

const { safe_area_styles } = utils_styles;

const styles = StyleSheet.create({
    safe_area_styles,
    container: {
        width: 366,
        height: 506,
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    voters_block: {
        width: '100%',
        height: 82,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    voters: {
        width: '49%',
        height: '100%',
        borderRadius: 4,
        backgroundColor: e_voting_green,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: 13,
        justifyContent: 'space-between'
    },
    voters_heading: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Ubuntu-Medium'
    },
    voters_sub_heading: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Ubuntu-Medium',
        textAlign: 'right'
    },
    activity_block: {
        width: '100%',
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 20,
        borderColor: e_voting_green,
        borderWidth: 1,
        borderRadius: 4
    },
    heading: {
        fontSize: 25,
        fontWeight: '700',
        fontFamily: 'Ubuntu-Medium'
    },
    sub_heading: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Ubuntu-Medium',
        color: 'gray'
    },
    activities_container: {
        width: '100%',
        height: '90%',
        overflow: 'scroll'
    },
    activity: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '500'
    }
})