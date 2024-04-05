import Label from '@/components/shared/Label';
import AsyncSelect, { IAsyncSelectProps } from '@/components/shared/AsyncSelect';
import { CommonFormProps } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { Form } from 'antd';
import { get } from '@/utils';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface IAsyncSelectControlProps extends CommonFormProps<IAsyncSelectProps> {
    onChangeCallBack?: (value: any, options?: any) => void;
    childProps: IAsyncSelectProps;
}

function AsyncSelectControl(props: IAsyncSelectControlProps) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any, option: any) => {
            onChange(value || null);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(value, option);
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
            render={({ field: { ref, value, onChange } }) => (
                <Form.Item
                    {...wrapperProps}
                    style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
                    label={<Label disabled={childProps?.disabled} label={label} />}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <AsyncSelect
                        allowClear
                        {...childProps}
                        className={`${childProps?.className || ''} main-select`}
                        config={{ ...childProps.config, name: name }}
                        ref={ref}
                        id={name}
                        value={value}
                        onChange={handleOnChange(onChange)}
                    />
                </Form.Item>
            )}
        />
    );
}

export default AsyncSelectControl;
