import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryDetail from "../pages-components/CountryDetail";
import CountryList from "../pages-components/CountryList";
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