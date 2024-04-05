'use client';
const MainLayout = dynamic(() => import('@/components/layouts/MainLayout'), {
    ssr: false,
});

import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
    return <MainLayout>{children}</MainLayout>;
}

export default Layout;
