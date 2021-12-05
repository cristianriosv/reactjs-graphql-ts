import React, { FC } from "react";
import { Skeleton as SkeletonLib } from "antd";

interface ISkeletonParams {
    loading: boolean
}

const Skeleton: FC<ISkeletonParams> = ({ children, loading }) => (
    <>
        {loading ?
            <SkeletonLib loading={loading} active={loading} />
            : <>{children}</>
        }
    </>
);

export default Skeleton;