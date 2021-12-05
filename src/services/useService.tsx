import { useQuery } from "react-query";
import { request as requestGql, gql } from "graphql-request";
import { apiUrl } from "../constants/api";

interface IUseServiceParams {
    name: string,
    query: string
}

const request = async (query: string) => await requestGql(apiUrl, gql`${query}`);

const useService = (params: IUseServiceParams) => {
    const { name, query } = params;
    return useQuery(name, () => request(query));
};

export default useService;