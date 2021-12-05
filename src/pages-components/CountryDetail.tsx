import React from "react";
import { Tag, Descriptions, Button, PageHeader } from "antd";
import { useNavigate, useNavigationType, useParams } from "react-router";
import useGetCountryDetail from "../services/queries/useGetCountryDetail";
import Skeleton from "../components/common/Skeleton";
import Page404 from "../pages/Page404";
import PageError500 from "../pages/PageError500";

const CountryDetail = () => {
    const { countryCode } = useParams ();
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const { data, loading, error } = useGetCountryDetail(countryCode || "");

    if (error) return <PageError500 />;
    if (data && data.country == null) return <Page404/>;

    const handleBack = () => {
        if (navigationType === "PUSH") navigate(-1);
        else navigate('/');
    }

    return (
        <Skeleton loading={loading}>
            <PageHeader
                title={data?.country?.name}
                subTitle="Details of the country"
                onBack={handleBack}
            />
            <Descriptions
                layout="vertical"
                bordered
            >
                <Descriptions.Item label="Code" key="code"><div>{data?.country?.code}</div></Descriptions.Item>
                <Descriptions.Item label="Name" key="name">{data?.country?.name}</Descriptions.Item>
                <Descriptions.Item label="Continent" key="continent">{data?.country?.continent.name}</Descriptions.Item>
                <Descriptions.Item label="Capital" key="capital">{data?.country?.capital}</Descriptions.Item>
                <Descriptions.Item label="Currency" key="currency">
                    {data?.country?.currency?.split(',').map((curr) => (
                        <Tag key={curr}>{curr}</Tag>
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label="Languages" key="languages">
                    {data?.country?.languages?.map((lang) => (
                        <Tag key={lang.name}>{lang.name}</Tag>
                    ))}
                </Descriptions.Item>
            </Descriptions>
        </Skeleton>
    )
}

export default CountryDetail;