import { HashRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { PrintPage } from "./pages/PrintPage";
import { BasicInfo } from "./pages/BasicInfo";
import { Links } from "./pages/Links";
import { Summary } from "./pages/Summary";
import { Experiences } from "./pages/Experiences";
import { Educations } from "./pages/Educations";
import { Skills } from "./pages/Skills";
import { Languages } from "./pages/Languages";
import { Certifications } from "./pages/Certifications";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Основной маршрут с лейаутом */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BasicInfo />} />
          <Route path="links" element={<Links />} />
          <Route path="summary" element={<Summary />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="educations" element={<Educations />} />
          <Route path="skills" element={<Skills />} />
          <Route path="languages" element={<Languages />} />
          <Route path="certifications" element={<Certifications />} />
        </Route>

        {/* Отдельный маршрут для печати (без лейаута, только резюме) */}
        <Route path="/print" element={<PrintPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
