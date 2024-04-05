import { DEFAULT_INDEX, DEFAULT_LIMIT } from '@/data';
import { useDebounceValue } from '@/hooks/use-debounce-value';
import { usePagination } from '@/hooks/use-pagination';
import { IOption } from '@/types';
import { get, networkHandler } from '@/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Empty, Select, SelectProps, Spin } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { Fragment, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type IAsyncSelectParams = {
    page: number;
    size: number;
    search?: string;
    [key: string]: any;
};

export type IAsyncSelectState = {
    focus: boolean;
    options: IOption<string | number>[];
    search?: string;
};

export type TAsyncComboboxSearchProps = {
    searchThreshold?: number;
    searchKey?: string;
    searchLocal?: boolean;
    searchDebounce?: number;
};

export type IAsyncSelectConfigProps = {
    name: string;
    url: string;
    valueField: string | string[];
    labelField: string | string[];
    responseKey: string;
    totalKey?: string;
    pageKey?: string;
    sizeKey?: string;
    size?: number;
    additionalOptions?: IOption<any>[];
    lastOptions?: IOption<any>[];
    otherFilters?: Record<string, any>;
    search?: TAsyncComboboxSearchProps;
    isCallbackInEveryFetch?: boolean;
    callback?: (options: any) => void;
    renderLabel?: (label: string) => string;
};

export interface IAsyncSelectProps extends SelectProps {
    config: IAsyncSelectConfigProps;
    axiosConfig?: AxiosRequestConfig<any>;
}

const AsyncSelect = forwardRef<React.ElementRef<typeof Select>, IAsyncSelectProps>((props, ref) => {
    const { config, axiosConfig, mode, value, showSearch, onChange, ...selectProps } = props;
    const {
        name,
        url,
        responseKey,
        totalKey = 'data.total',
        valueField,
        labelField,
        pageKey = 'page',
        sizeKey = 'size',
        size = DEFAULT_LIMIT,
        search,
        additionalOptions = [],
        otherFilters,
        isCallbackInEveryFetch = false,
        callback,
        renderLabel,
    } = config;

    const { searchThreshold = 0, searchKey, searchLocal, searchDebounce } = search ?? {};
    const firstCall = useRef<any>(null);
    const [state, setState] = useState<IAsyncSelectState>(() => ({
        focus: false,
        options: [],
        search: undefined,
    }));

    const debounceSearch = useDebounceValue(state.search, searchDebounce ?? 500);

    const { backToFirstPage, onChangeNextPage, getNextPage } = usePagination({
        page: '1',
        size: size + '',
    });

    const handleFetch = (data: { page: number; size: number; search: string }) => {
        const { page, size } = data;

        return networkHandler
            .get(url, {
                params: {
                    [pageKey]: page ?? null,
                    [sizeKey]: size,
                    ...otherFilters,
                    ...(searchKey ? { [searchKey]: debounceSearch ?? undefined } : undefined),
                },
                ...axiosConfig,
            })
            .then((rp) => {
                return rp.data;
            });
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: [`async-select-${name}`, debounceSearch],
        queryFn: ({ pageParam }) => handleFetch(pageParam),
        retry: false,
        initialPageParam: {
            page: DEFAULT_INDEX,
            size: DEFAULT_LIMIT,
            search: debounceSearch ?? '',
        },
        getNextPageParam: (lastPage) => {
            const nextPage = getNextPage(get(lastPage, totalKey));
            return nextPage
                ? {
                      page: nextPage,
                      size: size,
                      search: debounceSearch ?? '',
                  }
                : undefined;
        },
        enabled: !!state.focus && (state.search ? state.search?.length >= searchThreshold : true),
        staleTime: 0,
    });

    const onFocus = () => {
        setState((prev) => ({ ...prev, focus: true }));
    };

    const onSearch = (value: string) => {
        setState((prev) => ({ ...prev, search: value }));
        backToFirstPage();
    };

    const onLoadMore = () => {
        setState((prev) => ({ ...prev, refresh: false }));
        fetchNextPage();
        onChangeNextPage();
    };

    const onScroll = (e: any) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;
        if (!(isLoading ?? isFetchingNextPage) && scrollTop + offsetHeight >= scrollHeight && hasNextPage) {
            onLoadMore();
        }
    };

    const getValueFromKey = (data: any, key: string | string[]) => {
        if (typeof key === 'string') {
            return data?.[key];
        } else if (Array.isArray(key)) {
            return key
                .map((item) => get(data, item, undefined))
                ?.filter((item) => !!item)
                ?.join(' - ');
        }
    };

    const additionalOptionsFormat = useMemo(() => {
        return additionalOptions
            ? additionalOptions?.map((item) => {
                  let label = item?.label;
                  label = label && typeof label === 'string' && renderLabel instanceof Function ? renderLabel(label) : label;
                  const value = getValueFromKey(item, valueField);
                  return {
                      value: String(value),
                      label,
                  };
              })
            : [];
    }, [additionalOptions, renderLabel, valueField]);

    const allOptionsFormat = useMemo(() => {
        return data?.pages
            ? data?.pages?.reduce((prev, page) => {
                  const pageData = responseKey ? get(page, responseKey, undefined) : page;
                  const options = pageData?.map((item: any) => {
                      let label = '';
                      const value = getValueFromKey(item, valueField);

                      if (typeof labelField === 'string') {
                          label = item?.[labelField];
                          label = renderLabel instanceof Function ? renderLabel(label) : label;
                      } else {
                          label = getValueFromKey(item, labelField);
                      }

                      return {
                          value: String(value),
                          label,
                      };
                  });
                  return [...prev, ...options];
              }, [])
            : [];
    }, [data?.pages, labelField, renderLabel, responseKey, valueField]);

    const allOptions = useMemo(() => {
        return [...additionalOptionsFormat, ...allOptionsFormat];
    }, [additionalOptionsFormat, allOptionsFormat]);

    const handleChange = (value: any, option: any) => {
        if (onChange instanceof Function) {
            if (mode === 'multiple') {
                onChange(value[0] ? value : undefined, state.options);
            } else {
                onChange(value ? { ...option.data, ...value } : undefined, state.options);
            }
        }
    };

    const _handleCallback = useCallback(() => {
        if (callback instanceof Function) {
            const options = allOptions;

            if (!isCallbackInEveryFetch) {
                if (!firstCall.current) {
                    firstCall.current = true;
                    callback(options);
                }
            } else {
                callback(options);
            }
        }
    }, [allOptions, callback, isCallbackInEveryFetch]);

    useEffect(() => {
        _handleCallback();
    }, [_handleCallback]);

    return (
        <Select
            ref={ref}
            style={{ width: '100%' }}
            labelInValue={true}
            optionLabelProp="label"
            optionFilterProp="label"
            notFoundContent={!isError && (isLoading || isFetchingNextPage) ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {...selectProps}
            showSearch={showSearch}
            filterOption={!!searchLocal}
            loading={isLoading || isFetchingNextPage}
            searchValue={state.search}
            onPopupScroll={onScroll}
            onSearch={!!(searchLocal || !showSearch) ? undefined : onSearch}
            onFocus={onFocus}
            onChange={handleChange}
        >
            {additionalOptions?.map((item) => {
                let label = item?.label;
                label = label && typeof label === 'string' && renderLabel instanceof Function ? renderLabel(label) : label;
                return (
                    <Select.Option data={{ ...item }} key={item?.value} value={item?.value} label={label}>
                        {label}
                    </Select.Option>
                );
            })}
            {data?.pages?.map((page, index) => {
                const pageData = responseKey ? get(page, responseKey, undefined) : page;
                return (
                    <Fragment key={index}>
                        {pageData?.map((item: any) => {
                            let label = '';
                            const value = getValueFromKey(item, valueField);

                            if (typeof labelField === 'string') {
                                label = item?.[labelField];
                                label = renderLabel instanceof Function ? renderLabel(label) : label;
                            } else {
                                label = getValueFromKey(item, labelField);
                            }

                            return (
                                <Select.Option data={{ ...item }} key={value} value={value} label={label}>
                                    {label}
                                </Select.Option>
                            );
                        })}
                    </Fragment>
                );
            })}
        </Select>
    );
});

AsyncSelect.defaultProps = {
    labelInValue: true,
};

AsyncSelect.displayName = 'AsyncSelect';

export default AsyncSelect;
