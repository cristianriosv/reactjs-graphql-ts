import { useEffect, useState } from "react";
import { Divider, Table, Typography } from 'antd';
import { Link, useSearchParams } from "react-router-dom";
import { useGetCountries } from "../../services";
import { useGetContinents } from "../../services";
import { Skeleton } from "../../components";
import { PageError500 } from "../../pages";
import SearchNavForm from "./SearchNavForm";
import { TEXTS } from "../../constants/texts";

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
    }, [search, refetch]);

    const tableColumns = [
        {
            title: TEXTS.countryList.tableColName,
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: TEXTS.countryList.tableColContinent,
            key: 'continent',
            dataIndex: ['continent', 'name']
        },
        {
            title: TEXTS.countryList.tableColCode,
            key: 'code',
            dataIndex: 'code',
            width: 100
        },
        {
            title: TEXTS.countryList.tableColDetails,
            key: 'details',
            render: (record: { code: string }) => (
                <Link to={`/${record.code}`}>{TEXTS.countryList.tableButtonViewDetails} ({record.code})</Link>
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

    if (error || errorContinents) return <PageError500 />;

    return (
        <>
            <Typography.Title level={3}>
                {TEXTS.countryList.welcome}
            </Typography.Title>
            <Typography.Paragraph>
                {TEXTS.countryList.description}
            </Typography.Paragraph>
            <Divider/>
            <SearchNavForm
                search={search}
                dataContinents={dataContinents}
                handleChangeFilter={handleChangeFilter}
            />
            <Skeleton loading={loading || loadingContinents || (isRefetching && !search.firstFilter)}>
                <Table
                    columns={tableColumns}
                    dataSource={data?.countries}
                    pagination={false}
                    rowKey="code"
                />
            </Skeleton>
        </>
    )
}

export default CountryList;