// // // src/components/Header.tsx
// import React, { useState } from "react";
// import {
//   makeStyles,
//   tokens,
//   Toolbar,
//   ToolbarButton,
//   Menu,
//   MenuTrigger,
//   MenuPopover,
//   MenuList,
//   MenuItem,
//   Dialog,
//   DialogTrigger,
//   DialogSurface,
//   DialogTitle,
//   DialogBody,
//   DialogActions,
//   DialogContent,
//   Button,
// } from "@fluentui/react-components";
// import {
//   Settings20Regular,
//   WeatherMoonRegular,
//   WeatherSunnyRegular,
//   LocalLanguage20Regular,
//   Save20Regular,
//   FolderOpen20Regular,
//   DocumentPdf20Regular,
//   Print24Regular,
// } from "@fluentui/react-icons";
// import { useTranslation } from "react-i18next";
// import { useStore } from "@nanostores/react";
// import { $resume, setFullResume, resetResume } from "../stores/resumeStore";
// import { exportToJSON, importFromJSON } from "../services/exportService";
// import { templates } from "../templates";

// interface HeaderProps {
//   isDarkMode: boolean;
//   setIsDarkMode: (darkMode: boolean) => void;
//   currentTemplate: string;
//   onTemplateChange: (templateId: string) => void;
// }

// const useStyles = makeStyles({
//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: `0 ${tokens.spacingHorizontalXL}`,
//     backgroundColor: tokens.colorBrandBackground,
//     borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
//     color: tokens.colorNeutralForegroundOnBrand,
//     height: "48px",
//     width: "100%",
//     "@media (max-width: 768px)": {
//       flexWrap: "wrap",
//       justifyContent: "space-between",
//       padding: `0 ${tokens.spacingHorizontalM}`,
//       height: "auto",
//       rowGap: tokens.spacingVerticalS,
//     },
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: tokens.fontSizeHero900,
//     color: tokens.colorBrandForeground2Hover,
//     WebkitTextStroke: `1px ${tokens.colorBrandStroke2Contrast}`,
//     "@media (max-width: 768px)": {
//       fontSize: tokens.fontSizeBase600,
//     },
//   },
//   toolbar: {
//     gap: tokens.spacingHorizontalS,
//   },
// });

// export const Header: React.FC<HeaderProps> = ({
//   isDarkMode,
//   setIsDarkMode,
//   currentTemplate,
//   onTemplateChange,
// }) => {
//   const styles = useStyles();
//   const { t, i18n } = useTranslation();
//   const resume = useStore($resume);
//   const [importDialogOpen, setImportDialogOpen] = useState(false);
//   const [importFile, setImportFile] = useState<File | null>(null);

//   const handleLanguageChange = (_e: any, data: { checkedItems: string[] }) => {
//     const selectedLang = data.checkedItems[0];
//     if (selectedLang) {
//       i18n.changeLanguage(selectedLang);
//     }
//   };

//   const handleThemeToggle = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleExportJSON = () => {
//     exportToJSON(resume);
//   };

//   const handlePrint = () => {
//     // Сохраняем текущее резюме в localStorage перед печатью
//     const resumeData = {
//       timestamp: Date.now(),
//       resume: resume,
//     };
//     localStorage.setItem("resume_for_print", JSON.stringify(resumeData));

//     // Открываем окно печати
//     const printWindow = window.open(
//       `/print?template=${currentTemplate}`,
//       "_blank",
//       "width=800,height=600",
//     );
//     if (!printWindow) {
//       alert("Пожалуйста, разрешите всплывающие окна для печати резюме");
//     }
//   };

//   const handleImport = () => {
//     if (importFile) {
//       importFromJSON(
//         importFile,
//         (importedResume) => {
//           setFullResume(importedResume);
//           setImportDialogOpen(false);
//           setImportFile(null);
//           alert("Резюме успешно импортировано!");
//         },
//         (error) => {
//           alert(`Ошибка импорта: ${error}`);
//         },
//       );
//     }
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       if (file.type === "application/json" || file.name.endsWith(".json")) {
//         setImportFile(file);
//       } else {
//         alert("Пожалуйста, выберите JSON файл");
//         event.target.value = "";
//       }
//     }
//   };

//   const handleNewResume = () => {
//     if (confirm(t("actions.confirmNew"))) {
//       resetResume();
//     }
//   };

//   const SUPPORTED_LANGUAGES = [
//     { code: "ru", label: "Русский" },
//     { code: "en", label: "English" },
//   ] as const;

//   return (
//     <div className={styles.header}>
//       <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//         <span className={styles.title}>{t("appName")}</span>
//       </div>

//       <Toolbar aria-label="App Toolbar" className={styles.toolbar}>
//         {/* File Menu */}
//         <Menu>
//           <MenuTrigger disableButtonEnhancement>
//             <ToolbarButton appearance="primary" icon={<Save20Regular />}>
//               {t("actions.file")}
//             </ToolbarButton>
//           </MenuTrigger>
//           <MenuPopover>
//             <MenuList>
//               <MenuItem onClick={handleNewResume}>{t("actions.new")}</MenuItem>
//               <MenuItem onClick={() => setImportDialogOpen(true)}>
//                 <FolderOpen20Regular /> {t("actions.import")}
//               </MenuItem>
//               <MenuItem onClick={handleExportJSON}>
//                 {t("actions.export")}
//               </MenuItem>
//             </MenuList>
//           </MenuPopover>
//         </Menu>

//         {/* Templates Menu */}
//         <Menu>
//           <MenuTrigger disableButtonEnhancement>
//             <ToolbarButton appearance="primary">
//               {t("templates.title")}
//             </ToolbarButton>
//           </MenuTrigger>
//           <MenuPopover>
//             <MenuList>
//               {templates.map((template) => (
//                 <MenuItem
//                   key={template.id}
//                   onClick={() => onTemplateChange(template.id)}
//                 >
//                   {template.name}
//                   {currentTemplate === template.id && " ✓"}
//                 </MenuItem>
//               ))}
//             </MenuList>
//           </MenuPopover>
//         </Menu>

//         {/* Print Button */}
//         <ToolbarButton
//           appearance="primary"
//           icon={<Print24Regular />}
//           onClick={handlePrint}
//         >
//           {t("actions.print")}
//         </ToolbarButton>

//         {/* Settings Menu */}
//         <Menu>
//           <MenuTrigger disableButtonEnhancement>
//             <ToolbarButton appearance="primary" icon={<Settings20Regular />} />
//           </MenuTrigger>
//           <MenuPopover>
//             <MenuList>
//               <MenuItem
//                 onClick={handleThemeToggle}
//                 icon={
//                   isDarkMode ? <WeatherSunnyRegular /> : <WeatherMoonRegular />
//                 }
//               >
//                 {isDarkMode
//                   ? t("actions.switchToLight")
//                   : t("actions.switchToDark")}
//               </MenuItem>

//               {/* Language Submenu */}
//               <Menu>
//                 <MenuTrigger disableButtonEnhancement>
//                   <MenuItem icon={<LocalLanguage20Regular />}>
//                     {t("actions.switchToLanguage")}
//                   </MenuItem>
//                 </MenuTrigger>
//                 <MenuPopover>
//                   <MenuList>
//                     {SUPPORTED_LANGUAGES.map((lang) => (
//                       <MenuItem
//                         key={lang.code}
//                         onClick={() => i18n.changeLanguage(lang.code)}
//                       >
//                         {lang.label}
//                         {i18n.language === lang.code && " ✓"}
//                       </MenuItem>
//                     ))}
//                   </MenuList>
//                 </MenuPopover>
//               </Menu>
//             </MenuList>
//           </MenuPopover>
//         </Menu>
//       </Toolbar>

//       {/* Import Dialog */}
//       <Dialog
//         open={importDialogOpen}
//         onOpenChange={(_, data) => setImportDialogOpen(data.open)}
//       >
//         <DialogSurface>
//           <DialogBody>
//             <DialogTitle>{t("actions.import")}</DialogTitle>
//             <DialogContent>
//               <input
//                 type="file"
//                 accept=".json"
//                 onChange={handleFileSelect}
//                 style={{ width: "100%" }}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 appearance="secondary"
//                 onClick={() => setImportDialogOpen(false)}
//               >
//                 {t("actions.cancel")}
//               </Button>
//               <Button
//                 appearance="primary"
//                 onClick={handleImport}
//                 disabled={!importFile}
//               >
//                 {t("actions.import")}
//               </Button>
//             </DialogActions>
//           </DialogBody>
//         </DialogSurface>
//       </Dialog>
//     </div>
//   );
// };
// src/components/Header.tsx (версия с вложенными подменю)
import React, { useState } from "react";
import {
  makeStyles,
  tokens,
  Toolbar,
  ToolbarButton,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import {
  Settings20Regular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
  LocalLanguage20Regular,
  Save20Regular,
  FolderOpen20Regular,
  Print24Regular,
  DocumentPdf20Regular,
  Delete20Regular,
  Share20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import { $resume, setFullResume, resetResume } from "../stores/resumeStore";
import { exportToJSON, importFromJSON } from "../services/exportService";
import { templates } from "../templates";

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
  currentTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorBrandBackground,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForegroundOnBrand,
    height: "48px",
    width: "100%",
    "@media (max-width: 768px)": {
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: `0 ${tokens.spacingHorizontalM}`,
      height: "auto",
      rowGap: tokens.spacingVerticalS,
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: tokens.fontSizeHero900,
    color: tokens.colorBrandForeground2Hover,
    WebkitTextStroke: `1px ${tokens.colorBrandStroke2Contrast}`,
    "@media (max-width: 768px)": {
      fontSize: tokens.fontSizeBase600,
    },
  },
  toolbar: {
    gap: tokens.spacingHorizontalS,
  },
});

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  currentTemplate,
  onTemplateChange,
}) => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();
  const resume = useStore($resume);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleExportJSON = () => {
    exportToJSON(resume);
  };

  const handlePrint = () => {
    const resumeData = {
      timestamp: Date.now(),
      resume: resume,
    };
    localStorage.setItem("resume_for_print", JSON.stringify(resumeData));
    const printWindow = window.open(
      `/print?template=${currentTemplate}`,
      "_blank",
      "width=800,height=600",
    );
    if (!printWindow) {
      alert("Пожалуйста, разрешите всплывающие окна для печати резюме");
    }
  };

  const handleImport = () => {
    if (importFile) {
      importFromJSON(
        importFile,
        (importedResume) => {
          setFullResume(importedResume);
          setImportDialogOpen(false);
          setImportFile(null);
          alert("Резюме успешно импортировано!");
        },
        (error) => {
          alert(`Ошибка импорта: ${error}`);
        },
      );
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        setImportFile(file);
      } else {
        alert("Пожалуйста, выберите JSON файл");
        event.target.value = "";
      }
    }
  };

  const handleNewResume = () => {
    if (confirm(t("actions.confirmNew"))) {
      resetResume();
    }
  };

  const SUPPORTED_LANGUAGES = [
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" },
  ] as const;

  return (
    <div className={styles.header}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span className={styles.title}>{t("appName")}</span>
      </div>

      <Toolbar aria-label="App Toolbar" className={styles.toolbar}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <ToolbarButton appearance="primary" icon={<Settings20Regular />}>
              Меню
            </ToolbarButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {/* Подменю Файл */}
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem icon={<Save20Regular />}>Файл</MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem onClick={handleNewResume}>Новое резюме</MenuItem>
                    <MenuItem onClick={() => setImportDialogOpen(true)}>
                      Импорт из JSON
                    </MenuItem>
                    <MenuItem onClick={handleExportJSON}>
                      Экспорт в JSON
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>

              {/* Подменю Шаблоны */}
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem icon={<Share20Regular />}>Шаблоны</MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    {templates.map((template) => (
                      <MenuItem
                        key={template.id}
                        onClick={() => onTemplateChange(template.id)}
                      >
                        {template.name}
                        {currentTemplate === template.id && " ✓"}
                      </MenuItem>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>

              <MenuDivider />

              {/* Печать */}
              <MenuItem icon={<Print24Regular />} onClick={handlePrint}>
                Печать / PDF
              </MenuItem>

              <MenuDivider />

              {/* Тема */}
              <MenuItem
                onClick={handleThemeToggle}
                icon={
                  isDarkMode ? <WeatherSunnyRegular /> : <WeatherMoonRegular />
                }
              >
                {isDarkMode ? "Светлая тема" : "Темная тема"}
              </MenuItem>

              {/* Подменю Язык */}
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem icon={<LocalLanguage20Regular />}>Язык</MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <MenuItem
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                      >
                        {lang.label}
                        {i18n.language === lang.code && " ✓"}
                      </MenuItem>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>
            </MenuList>
          </MenuPopover>
        </Menu>
      </Toolbar>

      {/* Import Dialog */}
      <Dialog
        open={importDialogOpen}
        onOpenChange={(_, data) => setImportDialogOpen(data.open)}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Импорт резюме</DialogTitle>
            <DialogContent>
              <input
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                style={{ width: "100%" }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                appearance="secondary"
                onClick={() => setImportDialogOpen(false)}
              >
                Отмена
              </Button>
              <Button
                appearance="primary"
                onClick={handleImport}
                disabled={!importFile}
              >
                Импортировать
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
