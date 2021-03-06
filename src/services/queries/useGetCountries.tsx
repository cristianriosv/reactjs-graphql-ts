import useService from "../useService";
import { ICountry } from "../interfaces";

interface IGetCountriesParams {
    search: {
        countryCode: string,
        currencyCode: string,
        continents: string[]
    }
}

export interface IUseGetCountries {
    data: {
        countries: ICountry[]
    },
    loading: boolean,
    error: any,
    refetch: Function,
    isRefetching: boolean
}

const useGetCountries = (params: IGetCountriesParams): IUseGetCountries => {
    const { search } = params;
    const query = `
        query ListCountries {
            countries (filter: {
            ${search.countryCode !== "" ? `code: {regex: "^${search.countryCode}"}` : ''},
            ${search.currencyCode !== "" ? `currency: {regex: "^${search.currencyCode}"}` : ''}
            ${search.continents.length ? `continent: {in: ${JSON.stringify(search.continents)}}` : ''}
            }) {
                name,
                code,
                continent{ name, code }
            }
        }
    `;
    const { data, error, isLoading, refetch, isRefetching } = useService({ name: "ListCountries", query });
    return { data, error, loading: isLoading, refetch, isRefetching }
}

export default useGetCountries;