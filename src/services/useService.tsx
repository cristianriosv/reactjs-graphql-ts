import React from "react";
import { useQuery } from "react-query";
import { request as requestGql, gql } from "graphql-request";

interface IUseServiceParams {
    name: string,
    body: string
}

const endpoint:string = "https://countries.trevorblades.com/";

const request = async (body: string) => await requestGql(endpoint, gql`${body}`);

const useService = (params: IUseServiceParams) => {
    const { name, body } = params;
    return useQuery(name, () => request(body));
};

export default useService;