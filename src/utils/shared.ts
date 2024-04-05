import { TAction } from '@/types';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const getPathNameWithoutLocale = (url: string = '', locale?: string) => {
    return typeof url === 'string' && url?.startsWith(`/${locale}`) ? '/' + url.split('/')?.slice(2).join('/') : url;
};

export const getBeURL = (path: string) => {
    return process.env.NEXT_PUBLIC_API_URL + path;
};

export const getPaginationFromSearchParams = (query: ReadonlyURLSearchParams) => {
    const index = query.get('index');
    const limit = query.get('limit');
    const total = query.get('total');
    const refresh = query.get('refresh');
    return {
        index: index || undefined,
        limit: limit || undefined,
        total: total || undefined,
        refresh: refresh || undefined,
    };
};

export const getIdAndAction = (id: string | string[] | undefined) => {
    const _id = id ? id.toString() : 'create';
    const action: TAction = _id === 'create' ? 'create' : 'update';
    return {
        detail_id: _id,
        action,
    };
};
