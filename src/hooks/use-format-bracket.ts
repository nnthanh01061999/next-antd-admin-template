'use client';
import { snakeCase } from '@/utils';
import { useTranslations } from 'next-intl';

export function useFormatBracket(messagePath: string) {
    const t = useTranslations(messagePath);

    const matchSquareBracket = (data: string) => {
        const leftBracketIndex2 = data.indexOf('[');
        const rightBracketIndex2 = data.lastIndexOf(']');
        const matchNested = data.substring(leftBracketIndex2, rightBracketIndex2 + 1);
        return matchNested;
    };

    const regex1 = /\*\*\[.*?\]\*\*/g;

    const formatErrorMessage = (inputString: string) => {
        try {
            const matchRegex = inputString.match(regex1);

            let newString: string = inputString;

            if (matchRegex) {
                const match = matchSquareBracket(matchRegex[0]);

                if (match) {
                    const oldValue = match;

                    let path: string = oldValue;

                    const subString = oldValue.slice(1, oldValue.length - 1);

                    const matchNested = matchSquareBracket(subString);

                    if (matchNested) {
                        path = oldValue.replace(matchNested, '');
                    }

                    const newPath = path
                        .split('.')
                        ?.map((item) => snakeCase(item))
                        .join('.');

                    const newValue = t(`${newPath}.title`);

                    newString = inputString.replace(`**${oldValue}**`, newValue);
                }
            }

            return newString;
        } catch (err) {
            console.log(err);
        }
    };

    return { formatErrorMessage };
}
