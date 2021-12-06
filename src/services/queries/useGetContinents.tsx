import useService from "../useService";
import { IContinent } from "../interfaces";

export interface IUseGetContinents {
    data: {
        continents: IContinent[]
    },
    loading: boolean,
    error: any
}

const useGetContinents = (): IUseGetContinents => {
    const query = `
        query GetContinents {
            continents{
                name,
                code
            }
        }
    `;
    const { data, error, isLoading } = useService({ name: "ListContinents", query });
    return { data, error, loading: isLoading }
}

export default useGetContinents;