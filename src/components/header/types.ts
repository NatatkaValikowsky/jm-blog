export interface HeaderProps {
    currUser: {
        username: string,
        image: string | null
    } | null,
    onLogout: () => void
}