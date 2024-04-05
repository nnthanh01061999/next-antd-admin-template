'use client';

import { DATE_FORMAT_LONG } from '@/data';
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';

export const useConvertDate = () => {
    const locale_ = useLocale();

    const convertDateValue = (value: string, locale: string | undefined = locale_) => {
        return dayjs(value, { format: DATE_FORMAT_LONG, utc: false, locale });
    };
    return { convertDateValue };
};
