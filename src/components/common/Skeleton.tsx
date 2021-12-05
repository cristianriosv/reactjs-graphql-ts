import { FC } from "react";
import { Skeleton as SkeletonLib } from "antd";

interface ISkeletonProps {
    loading: boolean,
}

const Skeleton: FC<ISkeletonProps> = ({ children, loading }) => (
    <>
        {loading ?
            <SkeletonLib loading={loading} active={loading} />
            : <>{children}</>
        }
    </>
);

export default Skeleton;