import { useRouting } from '@/stores/routing-store';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

type TTableOperationProps = {
    onUpdate?: () => void;
    onDelete?: () => void;
    prefix?: ReactNode;
    suffix?: ReactNode;
};
function TableOperation(props: TTableOperationProps) {
    const { prefix, suffix, onUpdate, onDelete } = props;
    const tC = useTranslations('Common.filter.action');
    const routing = useRouting();
    return (
        <div className="table-operation">
            {prefix}
            {!!onUpdate ? (
                <Button disabled={routing} className="button" title={tC('update')} onClick={onUpdate}>
                    <EditOutlined />
                </Button>
            ) : null}
            {!!onDelete ? (
                <Button disabled={routing} className="button" title={tC('delete')} onClick={onDelete}>
                    <DeleteOutlined />
                </Button>
            ) : null}
            {suffix}
        </div>
    );
}

export default TableOperation;
