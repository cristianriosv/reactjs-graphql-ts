import { FC } from "react";
import { render } from "@testing-library/react";
import CountryList from ".";
import * as getHooks from "../../services";
import { IUseGetCountries } from "../../services/queries/useGetCountries";
import { IUseGetContinents } from "../../services/queries/useGetContinents";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "../../providers/AppProvider";

const mockCountries: IUseGetCountries = {
    data: {
        countries: [
            {name:"Argentina", code:"AR", capital:"Buenos Aires", currency: "AR", continent: {name:"South America", code:"SA"}, languages: [{name:"Spanish"}]},
            {name:"Argentina", code:"AR2", capital:"Buenos Aires", currency: "AR", continent: {name:"South America", code:"SA"}, languages: [{name:"Spanish"}]},
            {name:"Argentina", code:"AR3", capital:"Buenos Aires", currency: "AR", continent: {name:"South America", code:"SA"}, languages: [{name:"Spanish"}]}
        ]
    },
    loading: false,
    error: false,
    refetch: () => {},
    isRefetching: false
};
const mockContinents: IUseGetContinents = {
    data: {
        continents: [
            {name: "South America", code:"SA"},
            {name: "Europe", code:"EU"}
        ]
    },
    loading: false,
    error: false
}
jest.mock('../../services/queries/useGetCountries');
jest.mock('../../services/queries/useGetContinents');

describe("Page country list...", () => {
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
    it("should not show any country list when loading countries", () => {
        jest.spyOn(getHooks, "useGetCountries").mockImplementation(() => ({
            ...mockCountries,
            loading: true
        }));
        jest.spyOn(getHooks, 'useGetContinents').mockImplementation(() => ({
            ...mockContinents
        }));
        const component = render(<AppContainer><CountryList/></AppContainer>);
        expect(component.container).not.toHaveTextContent("Argentina");
    });
    it("should not show any country list when loading continents", () => {
        jest.spyOn(getHooks, "useGetCountries").mockImplementation(() => ({
            ...mockCountries
        }));
        jest.spyOn(getHooks, 'useGetContinents').mockImplementation(() => ({
            ...mockContinents,
            loading: true
        }));
        const component = render(<AppContainer><CountryList/></AppContainer>);
        expect(component.container).not.toHaveTextContent("Argentina");
    });
    it("should show countries in list when both finish loading and show Link View Details", () => {
        jest.spyOn(getHooks, "useGetCountries").mockImplementation(() => ({
            ...mockCountries
        }));
        jest.spyOn(getHooks, "useGetContinents").mockImplementation(() => ({
            ...mockContinents
        }));
        const component = render(<AppContainer><CountryList/></AppContainer>);
        expect(component.container).toHaveTextContent("Argentina");
        expect(component.container).toHaveTextContent("View details");
    });
    it("should show error info when error in countries", () => {
        jest.spyOn(getHooks, "useGetCountries").mockImplementation(() => ({
            ...mockCountries,
            error: true
        }));
        jest.spyOn(getHooks, "useGetContinents").mockImplementation(() => ({
            ...mockContinents
        }));
        const component = render(<AppContainer><CountryList/></AppContainer>);
        expect(component.container).toHaveTextContent("Ups! Something went wrong.");
    });
    it("should show error info when error in continents", () => {
        jest.spyOn(getHooks, "useGetCountries").mockImplementation(() => ({
            ...mockCountries
        }));
        jest.spyOn(getHooks, "useGetContinents").mockImplementation(() => ({
            ...mockContinents,
            error: true
        }));
        const component = render(<AppContainer><CountryList/></AppContainer>);
        expect(component.container).toHaveTextContent("Ups! Something went wrong.");
    });
});