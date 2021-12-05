import React from "react";
import { Empty, PageHeader } from "antd";
import { useNavigate } from "react-router";

const PageError500= () => {
    const letsTryAgain = () => {
        window.location.reload();
    }
    return(
        <>
            <PageHeader title="Try again" onBack={letsTryAgain} />
            <Empty description="Ups! Something went wrong. This is very shameful... But maybe is the backend, not me! Don't point at me :/. Let's try again later." />
        </>
    )
}

export default PageError500;