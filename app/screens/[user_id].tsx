import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet } from "react-native";
import { utils_styles } from "@/constants/utils_styles";
import { useLocalSearchParams, useNavigation } from "expo-router"
import { RightHeaderDropDown, LeftHeaderComponent, RightHeaderComponent, TetfundFrame } from "./_layout";
import { images } from "@/constants/images";
import { AntDesign } from '@expo/vector-icons';
import use_ubuntu_font from "@/hooks/fonts/ubuntu_medium_font";
import { useEffect } from "react";
import { e_voting_green } from "@/constants/Colors";

function UserDetails() {
    const { user_id } = useLocalSearchParams();
    const { } = use_ubuntu_font();
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

    const user_details = {
        avatar: images.metat_mask,
        full_name: user_id,
        voters_identification_number: '8979756656455780980976654563',
        date_of_birth: '02-11-1975',
        date_of_registration: '12-03-2023',
        occupation: 'Trading',
        gender: 'female',
        address: '10, mukaila street, sango, ota, ogum state.'
    }


    return <SafeAreaView style={styles.safe_area_styles}>
        <RightHeaderDropDown />

        <View style={styles.container}>
            <View style={styles.user_details_block}>
                <View style={styles.avatar_block}>
                    <Image source={user_details.avatar} style={styles.avatar} />
                </View>

                <View style={styles.text_block}>
                    <Text style={styles.parameter}>Full Name</Text>
                    <Text style={styles.value}>{user_details.full_name}</Text>
                    <Text style={styles.parameter}>Voters Identification Number:</Text>
                    <Text style={styles.value}>{user_details.voters_identification_number}</Text>
                    <Text style={styles.parameter}>Date of Birth</Text>
                    <Text style={styles.value}>{user_details.date_of_birth}</Text>
                    <Text style={styles.parameter}>Date of Registration</Text>
                    <Text style={styles.value}>{user_details.date_of_registration}</Text>
                    <Text style={styles.parameter}>Occupation</Text>
                    <Text style={styles.value}>{user_details.occupation}</Text>
                    <Text style={styles.parameter}>Gender</Text>
                    <Text style={styles.value}>{user_details.gender}</Text>
                    <Text style={styles.parameter}>Address</Text>
                    <Text style={styles.value}>{user_details.address}</Text>

                    <AntDesign style={{ marginLeft: -6 }} name="qrcode" size={130} color="black" />
                </View>
            </View>

            <Text style={styles.btn}>Next</Text>
        </View>

        <TetfundFrame />
    </SafeAreaView>
}

export default UserDetails;

const { safe_area_styles, btn } = utils_styles;
const styles = StyleSheet.create({
    safe_area_styles,
    container: {
        width: 366,
        height: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    user_details_block: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 15
    },
    avatar_block: {
        width: 40,
        height: 40,
        borderRadius: 40,
        overflow: 'hidden'
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    text_block: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    parameter: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Ubuntu-Medium'
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Ubuntu-Medium'
    },
    btn
})