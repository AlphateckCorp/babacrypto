
export const MASK_STATUS = 'MASK_STATUS';

export function maskStatus(data) {
    return {
        type: MASK_STATUS,
        data
    };
}