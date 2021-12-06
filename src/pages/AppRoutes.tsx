import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDetail } from "../pages-components";
import { CountryList } from "../pages-components";
import Page404 from "./Page404";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CountryList />} />
                <Route path="/:countryCode" element={<CountryDetail />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;