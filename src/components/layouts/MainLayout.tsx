import { HOME_PATH } from '@/data';
import { usePathNameLocale } from '@/hooks/use-pathname-locale';
import { LogoutOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { ConfigProvider, Dropdown } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { config } from './_defaultProps';

export const MainLayout = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const pathname = usePathNameLocale();

    if (typeof document === 'undefined') {
        return <div />;
    }

    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                >
                    <ProLayout
                        {...config}
                        fixSiderbar={true}
                        layout="mix"
                        splitMenus={false}
                        navTheme="light"
                        prefixCls="my-prefix"
                        location={{ pathname }}
                        token={{ header: { colorBgMenuItemSelected: 'rgba(0,0,0,0.04)' } }}
                        siderMenuType="group"
                        menu={{ collapsedShowGroupTitle: true }}
                        title="Antd Admin"
                        headerTitleRender={(logo, title, __) => {
                            return (
                                <Link href={HOME_PATH}>
                                    {logo}
                                    {title}
                                </Link>
                            );
                        }}
                        logo={undefined}
                        avatarProps={{
                            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                            size: 'small',
                            title: 'User',
                            render: (_, dom) => {
                                return (
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'logout',
                                                    icon: <LogoutOutlined />,
                                                    label: 'Sign out',
                                                },
                                            ],
                                        }}
                                    >
                                        {dom}
                                    </Dropdown>
                                );
                            },
                        }}
                        menuFooterRender={(props) => {
                            if (props?.collapsed) return undefined;
                            return (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        paddingBlockStart: 12,
                                    }}
                                >
                                    <div>by Antd Admin</div>
                                </div>
                            );
                        }}
                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    item.path && router.push(item.path);
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        bgLayoutImgList={[
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                left: 85,
                                bottom: 100,
                                height: '303px',
                            },
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                bottom: -68,
                                right: -45,
                                height: '303px',
                            },
                            {
                                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                                bottom: 0,
                                left: 0,
                                width: '331px',
                            },
                        ]}
                    >
                        <PageContainer
                            token={{
                                paddingInlinePageContainerContent: 16,
                                paddingBlockPageContainerContent: 16,
                            }}
                        >
                            <ProCard
                                style={{
                                    height: '200vh',
                                    minHeight: 800,
                                }}
                            >
                                {children}
                            </ProCard>
                        </PageContainer>
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};

export default MainLayout;
