import { ErrorMessage } from '@hookform/error-message';
import { Checkbox, Form, RadioProps, Typography } from 'antd';
import React, { ReactNode } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/types';
import Label from '@/components/shared/Label';

export interface CheckBoxControlProps extends CommonFormProps<RadioProps> {
    labelCheckBox?: ReactNode;
}

function CheckBoxControl(props: CheckBoxControlProps) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, labelCheckBox, onChangeCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
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
                    <Checkbox {...childProps} ref={ref} id={name} checked={value} onChange={handleOnChange(onChange)}>
                        <Label disabled={childProps?.disabled} label={labelCheckBox} />
                    </Checkbox>
                </Form.Item>
            )}
        />
    );
}

export default CheckBoxControl;
