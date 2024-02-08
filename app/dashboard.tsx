import { View, Text } from "@/components/Themed";
import use_layout_selector from "@/hooks/state/use_layout_selector";
import { SafeAreaView } from "react-native-safe-area-context";

function Dashboard() {
    const { right_menu_shown } = use_layout_selector();

    return (
        <SafeAreaView style={{ position: 'relative' }}>
            <View style={{
                position: 'absolute',
                top: 0, right: 0, zIndex: 10,
                width: right_menu_shown ? 'auto' : 0, height: right_menu_shown ? 'auto' : 0,
                backgroundColor: 'white',
                padding: right_menu_shown ? 10 : 0,
                borderColor: 'lightgray',
                borderWidth: 1
            }}>
                <Text>gjd jksdjkhd</Text>
                <Text>gjd jksdjkhd</Text>
            </View>

        </SafeAreaView>
    )
}

export default Dashboard;