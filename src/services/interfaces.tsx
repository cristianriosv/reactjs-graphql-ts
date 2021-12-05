export interface IContinent {
    name: string,
    code: string
}

export interface ILanguage {
    name: string
}

export interface ICountry {
    name: string,
    code: string,
    capital: string,
    currency: string,
    continent: IContinent,
    languages: ILanguage[]
}