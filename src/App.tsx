// import { Routes, Route } from "react-router-dom";
// import { MainLayout } from "./layouts/MainLayout";
// import { BasicInfo } from "./pages/BasicInfo";
// import { Certifications } from "./pages/Certifications";
// import { Educations } from "./pages/Educations";
// import { Summary } from "./pages/Summary";
// import { Skills } from "./pages/Skills";
// import { Experiences } from "./pages/Experiences";
// import { Links } from "./pages/Links";
// import { Languages } from "./pages/Languages";
// import { PrintPage } from "./pages/PrintPage";

// function App(): React.ReactElement {
//   return (
//     <Routes>
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<BasicInfo />} />
//         <Route path="links" element={<Links />} />
//         <Route path="summary" element={<Summary />} />
//         <Route path="experiences" element={<Experiences />} />
//         <Route path="educations" element={<Educations />} />
//         <Route path="certifications" element={<Certifications />} />
//         <Route path="skills" element={<Skills />} />
//         <Route path="languages" element={<Languages />} />
//       </Route>
//       <Route path="/print" element={<PrintPage />} />
//     </Routes>
//   );
// }

// export default App;
// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
