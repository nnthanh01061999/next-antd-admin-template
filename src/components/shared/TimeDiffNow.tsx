import { useCreationDuration } from '@/hooks/use-create-duration';
import { Typography } from 'antd';
const { Text } = Typography;

export interface ITimeDiffNowProps {
    value: number | string | Date;
}

function TimeDiffNow(props: ITimeDiffNowProps) {
    const { value } = props;

    const valueString = useCreationDuration(value);

    return <Text>{valueString}</Text>;
}

export default TimeDiffNow;
