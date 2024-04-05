import { CommonFormProps } from '@/types';
import { ProFieldProps, ProFormText } from '@ant-design/pro-components';
import { PasswordProps } from 'antd/lib/input';
import { Controller, useFormContext } from 'react-hook-form';

function ProPasswordControl(props: CommonFormProps<ProFieldProps & PasswordProps & { width?: string }>) {
    const { name, childProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

    const { control } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value || null);
            if (onChangeCallBack && onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
            }
        };
    };

    const handleOnBlur = (onBlur: () => void) => {
        return () => {
            onBlur();
            if (onBlurCallBack && onBlurCallBack instanceof Function) {
                onBlurCallBack();
            }
        };
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur } }) => (
                <ProFormText.Password
                    fieldProps={{
                        ...childProps,
                        value,
                        onChange: handleOnChange(onChange),
                        onBlur: handleOnBlur(onBlur),
                    }}
                />
            )}
        />
    );
}

export default ProPasswordControl;
