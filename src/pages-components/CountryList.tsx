import React, { useEffect, useState } from "react";
import { Table, Form, Input, Select, Row, Col } from 'antd';
import { Link, useSearchParams } from "react-router-dom";
import useGetCountries from "../services/queries/useGetCountries";
import useGetContinents from "../services/queries/useGetContinents";
import Skeleton from "../components/common/Skeleton";
import { ICountry } from "../services/interfaces";
import PageError500 from "../pages/PageError500";

const CountryList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const checkContinentsSearchParams = (): string[] => {
        const continentsSP = searchParams.get("continents")?.split(",");
        if (continentsSP?.length && continentsSP[0] !== "") return continentsSP;
        return [];
    }
    const [search, setSearch] = useState(
        {
            countryCode: searchParams.get("countryCode") || "",
            currencyCode: searchParams.get("currencyCode") || "",
            continents: checkContinentsSearchParams(),
            firstFilter: true
        }
    );
    const { data, loading, error, refetch, isRefetching } = useGetCountries({ search });
    const { data: dataContinents, loading: loadingContinents, error: errorContinents } = useGetContinents();

    useEffect(() => {
        refetch();
    }, [search]);

    if (error || errorContinents) return <PageError500 />;

    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Continent',
            key: 'continent',
            dataIndex: ['continent', 'name']
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code',
            width: 100
        },
        {
            title: 'Details',
            key: 'details',
            render: (record: { code: string }) => (
                <Link to={`/${record.code}`}>View details ({record.code})</Link>
            )
        }
    ];

    const handleChangeFilter = (type: string, value: string[]|string) => {
        if (!loading && !isRefetching) {
            const upperCaseValue = typeof value == "string" ? value.toUpperCase() : value;
            const newSearch = {
                ...search, [type]: upperCaseValue, firstFilter: false
            }
            const seralizeSearchParams = {
                countryCode: newSearch.countryCode,
                currencyCode: newSearch.currencyCode,
                continents: newSearch.continents.join(",")
            }
            setSearchParams(seralizeSearchParams);
            setSearch(newSearch);
        }
    }

    return (
        <>

            <Form layout="vertical">
                <Row gutter={6}>
                    <Col xs={{ span: 8 }} md={{ span: 5 }}>
                        <Form.Item label="Country code">
                            <Input allowClear size="small" placeholder="Enter code..." value={search.countryCode} onChange={(e) => handleChangeFilter("countryCode", e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 8 }} md={{ span: 5 }}>
                        <Form.Item label="Currency">
                            <Input allowClear size="small" placeholder="Enter currency..." value={search.currencyCode} onChange={(e) => handleChangeFilter("currencyCode", e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 14 }}>
                        <Form.Item label="Continent">
                            <Select allowClear mode="multiple" size="small" placeholder="Select continent..." value={search.continents} style={{ width: '100%' }} onChange={(values: string[]) => handleChangeFilter("continents", values)}>
                                {dataContinents?.continents?.map((continent) => (
                                    <Select.Option value={continent.code} label={continent.name}>
                                        {continent.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Skeleton loading={loading || loadingContinents || (isRefetching && !search.firstFilter)}>
                <Table
                    columns={columns}
                    dataSource={data?.countries}
                    pagination={false}
                />
            </Skeleton>
        </>
    )
}

export default CountryList;