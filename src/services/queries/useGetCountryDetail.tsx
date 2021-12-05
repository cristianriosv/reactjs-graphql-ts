import React from "react";
import useService from "../useService";
import { ICountry } from "../interfaces";

interface IUseGetCountryDetail {
    data: {
        country?: ICountry
    },
    loading: boolean,
    error: any
}

const useGetCountryDetail = (countryCode: string): IUseGetCountryDetail => {
    const bodyQuery = `
        query GetCountryDetail {
            country(code:\"${countryCode}\"){
                name,
                code,
                capital,
                currency,
                languages{ name },
                continent{ name }
            }
        }
    `;
    const { data, error, isLoading } = useService({ name: `Country${countryCode}`, body: bodyQuery });
    return { data, error, loading: isLoading }
}

export default useGetCountryDetail;