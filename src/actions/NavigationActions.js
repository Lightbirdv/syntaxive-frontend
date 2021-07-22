export const SHOW_NAVIGATION = 'SHOW_NAVIGATION'
export const HIDE_NAVIGATION = 'HIDE_NAVIGATION'

export function getShowNavigationAction() {
    return {
        type: SHOW_NAVIGATION
    }
}

export function getHideNavigationAction() {
    return {
        type: HIDE_NAVIGATION
    }
}