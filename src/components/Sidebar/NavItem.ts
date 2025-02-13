export type NavItem = {
    linkTo: string,
    name: string,
    iconName: string,
    children: NavItem[],
    premium: boolean
}