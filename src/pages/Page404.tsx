import React from "react";
import { Empty, PageHeader } from "antd";
import { useNavigate } from "react-router";

const Page404 = () => {
    const navigate = useNavigate();
    return(
        <>
            <PageHeader title="List" onBack={() => navigate('/')} />
            <Empty description="Seems that the country you are looking for doesn't exist. Maybe you feel like becoming a founder?" />
        </>
    )
}

export default Page404;