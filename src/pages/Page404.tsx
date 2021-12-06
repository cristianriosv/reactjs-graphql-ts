import { Empty, PageHeader } from "antd";
import { useNavigate } from "react-router";
import { TEXTS } from "../constants/texts";

const Page404 = () => {
    const navigate = useNavigate();
    return(
        <>
            <PageHeader title={TEXTS.common.list} onBack={() => navigate('/')} />
            <Empty description={TEXTS.common.error404} />
        </>
    )
}

export default Page404;