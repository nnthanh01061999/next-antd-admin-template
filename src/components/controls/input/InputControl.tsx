import Label from '@/components/shared/Label';
import { CommonFormProps } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Input, InputProps } from 'antd';
import { get } from '@/utils';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function InputControl(props: CommonFormProps<InputProps>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

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

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && isHaveError ? <ErrorMessage errors={errors} name={name} /> : undefined;
    }, [showError, errors, name, isHaveError]);

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
                    <Input
                        allowClear
                        {...childProps}
                        className={`${childProps?.className || ''} main-input ${childProps?.disabled ? 'main-input__disabled' : ''}`}
                        id={name}
                        ref={ref}
                        value={value}
                        onChange={handleOnChange(onChange)}
                        onBlur={handleOnBlur(onBlur)}
                    />
                </Form.Item>
            )}
        />
    );
}

export default InputControl;
