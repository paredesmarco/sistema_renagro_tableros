export interface MenuItem {
    id: number;
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
    roles: string[]; // roles que pueden ver este ítem
}
