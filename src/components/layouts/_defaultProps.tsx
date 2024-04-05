import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';

export const config = {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                name: 'welcome',
                icon: <SmileFilled />,
            },
            {
                path: '/admin',
                name: 'Manage page',
                icon: <CrownFilled />,
                routes: [
                    {
                        path: '/admin/sub-page1',
                        name: 'First -level page',
                        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                    },
                    {
                        path: '/admin/sub-page2',
                        name: 'secondary page',
                        icon: <CrownFilled />,
                    },
                    {
                        path: '/admin/sub-page3',
                        name: 'Third page',
                        icon: <CrownFilled />,
                    },
                ],
            },
            {
                name: 'List',
                icon: <TabletFilled />,
                path: '/list',
                routes: [
                    {
                        path: '/list/sub-page',
                        name: 'List page',
                        icon: <CrownFilled />,
                        routes: [
                            {
                                path: 'sub-sub-page1',
                                name: 'One -level list page',
                                icon: <CrownFilled />,
                            },
                            {
                                path: 'sub-sub-page2',
                                name: 'One -two -level list page',
                                icon: <CrownFilled />,
                            },
                            {
                                path: 'sub-sub-page3',
                                name: 'One -three -level list page',
                                icon: <CrownFilled />,
                            },
                        ],
                    },
                    {
                        path: '/list/sub-page2',
                        name: 'Two -level list page',
                        icon: <CrownFilled />,
                    },
                    {
                        path: '/list/sub-page3',
                        name: 'Three -level list page',
                        icon: <CrownFilled />,
                    },
                ],
            },
        ],
    },
    location: {
        pathname: '/',
    },
};
