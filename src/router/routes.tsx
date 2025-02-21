
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

///lazy components
const HomePage = lazy(() => import('../pages/Home/HomePage'));

const AppRouter = () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<>404</>} />
    </Routes>;
};

export default AppRouter;
