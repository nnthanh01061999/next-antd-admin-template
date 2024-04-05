import { Key, ReactNode } from 'react';

export type Assign<T, R> = Omit<T, keyof R> & R;

export type TAction = 'create' | 'update' | 'view' | 'none' | 'search';

export interface IOption<T> {
    value: T;
    label: string | ReactNode;
    [key: string | number]: any;
}

export interface IDataSource<T> {
    items: T[];
    total: number;
    loading?: boolean;
}

export type IPageState<T> = {
    action: TAction;
    id: number | string;
    data?: IDataSource<T>;
    selectedKeys?: Key[];
    selectedRows?: T[];
    loading?: boolean;
    error?: string;
};

export type TTree<T> = T & {
    children: TTree<T>[];
};

export type TSeachParamsPagination = {
    index?: string;
    limit?: string;
    refresh?: string;
    total?: string;
};

export type ConvertToNullableString<T> = {
    [K in keyof T]: string | null;
};

export type TSelectedRows = {
    selectedRowKeys: Key[];
};
