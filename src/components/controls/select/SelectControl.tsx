import Label from '@/components/shared/Label';
import { CommonFormProps } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Select, SelectProps } from 'antd';
import { get } from '@/utils';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface ISelectControlProps extends CommonFormProps<SelectProps> {
    onChangeCallBack?: (value: any, options?: any) => void;
}

function SelectControl(props: ISelectControlProps) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any, option: any) => {
            onChange(value);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(value, option);
            }
        };
    };

    const handleOnBlur = (onBlur: () => void) => {
        return () => {
            onBlur();
            if (onBlurCallBack instanceof Function) {
                onBlurCallBack();
            }
        };
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <ErrorMessage errors={errors} name={name} /> : null;
    }, [showError, errors, name]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item
                    {...wrapperProps}
                    style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
                    label={<Label disabled={childProps?.disabled} label={label} />}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <Select
                        allowClear
                        {...childProps}
                        className={`${childProps?.className || ''} main-select`}
                        ref={ref}
                        id={name}
                        value={value}
                        onChange={handleOnChange(onChange)}
                        onBlur={handleOnBlur(onBlur)}
                    />
                </Form.Item>
            )}
        />
    );
}

export default SelectControl;
