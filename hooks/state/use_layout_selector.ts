import { RootState } from "@/state/store";
import { useAppSelector, useAppDispatch } from "./use_base_hooks";

function use_layout_selector() {
    
    const { right_menu_shown, side_bar_shown } = useAppSelector((state: RootState) => state.layout);

    return {
        right_menu_shown, side_bar_shown
    }
}

export default use_layout_selector;