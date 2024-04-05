import { Modal, ModalFuncProps } from 'antd';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export const useConfirmModal = () => {
    const tC = useTranslations('Common');

    const customConfirmModal = useMemo(
        () => ({
            error: (props?: ModalFuncProps) => {
                Modal.error({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            info: (props?: ModalFuncProps) => {
                Modal.info({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            success: (props?: ModalFuncProps) => {
                Modal.success({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props, content: tC('notify_success') });
            },
            confirmClose: (props?: ModalFuncProps) => {
                Modal.confirm({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props, content: tC('modal.confirm') });
            },
            confirmSave: (props?: ModalFuncProps) => {
                Modal.confirm({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props, content: tC('form.confirm.save') });
            },
            confirm: (props?: ModalFuncProps) => {
                Modal.confirm({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
            waring: (props?: ModalFuncProps) => {
                Modal.warning({ centered: true, title: tC('title'), okButtonProps: { type: 'default' }, ...props });
            },
        }),

        [tC],
    );

    return customConfirmModal;
};
