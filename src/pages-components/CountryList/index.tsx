import { useEffect, useState } from "react";
import { Table, Form, Input, Select, Row, Col } from 'antd';
import { Link, useSearchParams } from "react-router-dom";
import useGetCountries from "../../services/queries/useGetCountries";
import useGetContinents from "../../services/queries/useGetContinents";
import Skeleton from "../../components/common/Skeleton";
import PageError500 from "../../pages/PageError500";
import SearchNavForm from "./SearchNavForm";

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

    const tableColumns = [
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

    if (error || errorContinents) return <PageError500 />;

    return (
        <>
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
                />
            </Skeleton>
        </>
    )
}

export default CountryList;