import { useQuery } from "react-query";
import { request as requestGql, gql } from "graphql-request";
import { API_URL } from "../constants/common";

interface IUseServiceParams {
    name: string,
    query: string
}

const request = async (query: string) => await requestGql(API_URL, gql`${query}`);

const useService = (params: IUseServiceParams) => {
    const { name, query } = params;
    return useQuery(name, () => request(query));
};

export default useService;