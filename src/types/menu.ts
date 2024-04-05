export interface INewMenu {
    id: string;
    parent_id?: string;
    type: string;
    title?: string;
    caption?: string;
    icon?: any;
    children?: INewMenu[];
    url?: string;
    external?: boolean;
    disabled?: boolean;
    is_visible: boolean;
    hidden: boolean;
    priority: number;
    target?: string;
}
