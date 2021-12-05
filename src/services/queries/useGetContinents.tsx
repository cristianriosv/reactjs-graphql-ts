import React from "react";
import useService from "../useService";
import { IContinent } from "../interfaces";

interface IUseGetCountries {
    data: {
        continents: IContinent[]
    },
    loading: boolean,
    error: any
}

const useGetContinents = (): IUseGetCountries => {
    const bodyQuery = `
        query GetContinents {
            continents{
                name,
                code
            }
        }
    `;
    const { data, error, isLoading } = useService({ name: "ListContinents", body: bodyQuery });
    return { data, error, loading: isLoading }
}

export default useGetContinents;