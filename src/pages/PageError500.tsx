import { Empty, PageHeader } from "antd";
import { useNavigate } from "react-router";

const PageError500= () => {
    const letsTryAgain = () => {
        window.location.reload();
    }
    return(
        <>
            <PageHeader title="Try again" onBack={letsTryAgain} />
            <Empty description="Ups! Something went wrong. This is very shameful... But maybe it is the backend, not me! Don't blame on me :/. Let's try again." />
        </>
    )
}

export default PageError500;