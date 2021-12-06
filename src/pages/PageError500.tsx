import { Empty, PageHeader } from "antd";
import { TEXTS } from "../constants/texts";

const PageError500= () => {
    const letsTryAgain = () => {
        window.location.reload();
    }
    return(
        <>
            <PageHeader title={TEXTS.common.tryAgain} onBack={letsTryAgain} />
            <Empty description={TEXTS.common.error500} />
        </>
    )
}

export default PageError500;