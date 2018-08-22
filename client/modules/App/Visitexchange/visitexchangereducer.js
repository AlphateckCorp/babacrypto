import {
    MASK_STATUS
} from './visitexchangeaction';

const initialState = { maskstate: false };

const MaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case MASK_STATUS:
            return {
                maskstate: action.data,
            };

        default:
            return state;
    }
};

export const getMask = state => {
    return state.MaskStatus.maskstate;
}

export default MaskReducer;