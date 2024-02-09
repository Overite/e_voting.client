import { View, Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { utils_styles } from "@/constants/utils_styles";
import { Image, ImageSourcePropType, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { e_voting_green } from "@/constants/Colors";
import use_ubuntu_font from "@/hooks/fonts/ubuntu_medium_font";
import { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { router, useNavigation } from "expo-router";
import { LeftHeaderComponent, RightHeaderComponent } from "./_layout";

function SearchRegisteredVoters() {

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

    const [search_results, set_search_results] = useState([
        {
            avatar: images.metat_mask,
            name: 'Alex Wang',
            admin_number: '126746s'
        },
        {
            avatar: images.metat_mask,
            name: 'Alex Wanger',
            admin_number: '126746s'
        },
    ])
    const [typing, set_typing] = useState(false);

    return <View style={styles.container}>
        <View style={styles.search_block}>
            {!typing && <EvilIcons name="search" size={24} color="lightgray" />}
            <TextInput style={styles.search_input} placeholder="Search" />
        </View>

        <Text style={styles.search_guide}>Search with Surname or voters identification number</Text>

        <View style={styles.search_results_container}>
            {search_results.map((user, index) => (
                <TouchableOpacity onPress={() => router.push(`/${user.name}` as `${string}:${string}`)} style={styles.search_result} key={index}>
                    <View style={styles.avatar_block}>
                        <Image style={styles.avatar} source={user.avatar as ImageSourcePropType} />
                    </View>

                    <View style={styles.text_block}>
                        <Text style={styles.search_result_text}>{user.name}</Text>
                        <Text style={styles.search_result_text}>{user.admin_number}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    </View>
}

export default SearchRegisteredVoters;

const { safe_area_styles } = utils_styles;
const styles = StyleSheet.create({
    safe_area_styles,
    container: {
        width: 366,
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    search_block: {
        width: '100%',
        height: 'auto',
        borderWidth: 1,
        borderColor: e_voting_green,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0
    },
    search_input: {
        width: '100%',
        height: 40,
        paddingTop: 10,
        paddingBottom: 10
    },
    search_guide: {
        fontFamily: 'Ubuntu-Medium',
        fontSize: 14,
        color: 'lightgray',
        fontWeight: '400'
    },
    search_results_container: {
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    search_result: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    avatar_block: {
        width: 43,
        height: 43,
        borderRadius: 43,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    text_block: {
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        alignItems: 'flex-start',
    },
    search_result_text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        fontFamily: 'Ubuntu-Medium'
    }
})