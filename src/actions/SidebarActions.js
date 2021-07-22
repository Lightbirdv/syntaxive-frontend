export const SHOW_SIDEBAR = 'SHOW_SIDEBAR'
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR'

export function getShowSidebarAction() {
    return {
        type: SHOW_SIDEBAR
    }
}

export function getHideSidebarAction() {
    return {
        type: HIDE_SIDEBAR
    }
}