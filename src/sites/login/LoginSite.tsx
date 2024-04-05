'use client';
import ProInputControl from '@/components/pro-controls/input/ProInputControl';
import ProPasswordControl from '@/components/pro-controls/input/ProPasswordControl';
import { PASSWORD_MIN_LENGTH } from '@/data/auth';
import { TLoginFormValues } from '@/types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox } from '@ant-design/pro-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { createStyles } from 'antd-style';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            marginLeft: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: '24px',
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
                color: token.colorPrimaryActive,
            },
        },
        lang: {
            width: 42,
            height: 42,
            lineHeight: '42px',
            position: 'fixed',
            right: 16,
            borderRadius: token.borderRadius,
            ':hover': {
                backgroundColor: token.colorBgTextHover,
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage: "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        },
    };
});

const LoginSite = () => {
    const { styles } = useStyles();
    const t = useTranslations('Login');
    const tForm = useTranslations('Common.form.validate');

    const schema = yup.object({
        username: yup.string().required(tForm('string.required')),
        password: yup
            .string()
            .required(tForm('string.required'))
            .min(PASSWORD_MIN_LENGTH, tForm('string.min', { min: PASSWORD_MIN_LENGTH })),
    });

    const method = useForm<TLoginFormValues>({
        defaultValues: {
            username: '',
            password: undefined,
        },
        resolver: yupResolver(schema),
    });

    const { handleSubmit } = method;

    const onSubmit = (values: TLoginFormValues) => {
        console.log(values);
    };

    return (
        <div className={styles.container}>
            <div
                style={{
                    flex: '1',
                    padding: '32px 0',
                }}
            >
                <FormProvider {...method}>
                    <LoginForm
                        contentStyle={{
                            minWidth: 280,
                            maxWidth: '75vw',
                        }}
                        title={t('title')}
                        initialValues={{
                            autoLogin: true,
                        }}
                        submitter={{
                            searchConfig: {
                                submitText: t('login'),
                            },
                        }}
                        onFinish={handleSubmit(onSubmit)}
                    >
                        <ProInputControl
                            name="username"
                            childProps={{
                                size: 'large',
                                prefix: <UserOutlined />,
                                placeholder: t('username'),
                            }}
                        />
                        <ProPasswordControl
                            name="password"
                            childProps={{
                                size: 'large',
                                prefix: <LockOutlined />,
                                placeholder: t('password'),
                            }}
                        />
                        <div
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <ProFormCheckbox noStyle name="rememberMe">
                                {t('rememberMe')}
                            </ProFormCheckbox>
                            <Link
                                href=""
                                style={{
                                    float: 'right',
                                }}
                            >
                                {t('forgotPassword')}
                            </Link>
                        </div>
                    </LoginForm>
                </FormProvider>
            </div>
        </div>
    );
};

export default LoginSite;
