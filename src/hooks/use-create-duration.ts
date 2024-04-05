'use client';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

export function useCreationDuration(createdTime: Date | number | string): string {
    const t = useTranslations('Common.time');

    const now = dayjs();
    const created = dayjs(createdTime);
    const duration = now.diff(created, 'second');

    if (duration < 60) {
        return t('seconds-ago', { value: duration });
    } else if (duration < 3600) {
        return t('minutes-ago', { value: Math.floor(duration / 60) });
    } else if (duration < 86400) {
        return t('hours-ago', { value: Math.floor(duration / 3600) });
    } else if (duration < 2592000) {
        return t('days-ago', { value: Math.floor(duration / 86400) });
    } else if (duration < 31104000) {
        return t('months-ago', { value: Math.floor(duration / 2592000) });
    } else {
        return t('years-ago', { value: Math.floor(duration / 31104000) });
    }
}
