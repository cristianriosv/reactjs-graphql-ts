import { FC } from "react";
import { render } from "@testing-library/react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "../providers/AppProvider";
import * as getHooks from "../services";
import { IUseGetCountryDetail } from "../services/queries/useGetCountryDetail";
import CountryDetail from "./CountryDetail";

const mockCountry: IUseGetCountryDetail = {
    data: {
        country: {name:"Argentina", code:"AR", capital:"Buenos Aires", currency: "AR", continent: {name:"South America", code:"SA"}, languages: [{name:"Spanish"}]},
    },
    loading: false,
    error:false
}

jest.mock('../services/queries/useGetCountryDetail');

describe("Page country detail...", () => {
    const AppContainer:FC = ({ children }) => (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<>{children}</>} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
              matches: false,
              media: query,
              onchange: null,
              addListener: jest.fn(), // Deprecated
              removeListener: jest.fn(), // Deprecated
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              dispatchEvent: jest.fn(),
            })),
          });
      });
    it("should not show details when loading", () => {
        jest.spyOn(getHooks, "useGetCountryDetail").mockImplementation(() => ({
            ...mockCountry,
            loading: true
        }));
        const component = render(<AppContainer><CountryDetail/></AppContainer>);
        expect(component.container).not.toHaveTextContent("Code");
        expect(component.container).not.toHaveTextContent("Name");
        expect(component.container).not.toHaveTextContent("Continent");
    });
    it("should show details when finish load", () => {
        jest.spyOn(getHooks, "useGetCountryDetail").mockImplementation(() => ({
            ...mockCountry
        }));
        const component = render(<AppContainer><CountryDetail/></AppContainer>);
        expect(component.container).toHaveTextContent("Code");
        expect(component.container).toHaveTextContent("Name");
        expect(component.container).toHaveTextContent("Continent");
        expect(component.container).toHaveTextContent("Argentina");
    });
    it("should show error info when error", () => {
        jest.spyOn(getHooks, "useGetCountryDetail").mockImplementation(() => ({
            ...mockCountry,
            error:true
        }));
        const component = render(<AppContainer><CountryDetail/></AppContainer>);
        expect(component.container).toHaveTextContent("Ups! Something went wrong.");
    });
    it("should show 404 page info when the country not exist", () => {
        jest.spyOn(getHooks, "useGetCountryDetail").mockImplementation(() => ({
            ...mockCountry,
            data: {
                country: undefined
            }
        }));
        const component = render(<AppContainer><CountryDetail/></AppContainer>);
        expect(component.container).toHaveTextContent("Seems that the country you are looking for doesn't exist.");
    });
});