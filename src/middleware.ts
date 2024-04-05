import { APP_PREFIX, AUTH, HOME_PATH, LOCALE_VI, LOGIN_PATH, PUBLIC_PATHS, STATE, locales } from '@/data';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const state = request.cookies.get(`${APP_PREFIX}-${STATE}`);
    const value = state?.value ? JSON.parse(state?.value) : undefined;
    const logged = !!value?.[AUTH]?.logged;

    const url = request.nextUrl.pathname?.slice(1);
    const containLocale = locales.find((item) => url.startsWith(item));
    const urlWithoutLocale = containLocale ? url.replace(containLocale, '') : url;

    const pathFormat = urlWithoutLocale.startsWith('/') ? urlWithoutLocale : `/${urlWithoutLocale}`;
    const isProtectPath = !!Object.keys(PUBLIC_PATHS).find((path) => pathFormat !== path);

    const newUrl = request.nextUrl.clone();

    const params = request.nextUrl.searchParams;
    const token = params.get('token');

    // if (!token && !logged && isProtectPath) {
    //     newUrl.pathname = LOGIN_PATH;
    //     return NextResponse.redirect(newUrl);
    // }

    // if (!token && logged && !isProtectPath) {
    //     newUrl.pathname = HOME_PATH;
    //     return NextResponse.redirect(newUrl);
    // }

    const handleI18nRouting = createMiddleware({
        locales: locales,
        defaultLocale: LOCALE_VI,
        localeDetection: false,
    });

    return handleI18nRouting(request);
}

export const config = {
    // Skip all paths that should not be internationalized. This example skips
    // certain folders and all pathnames with a dot (e.g. favicon.ico)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
