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
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import {
  Checkmark20Regular,
  Settings20Regular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
  LocalLanguage20Regular,
  Save20Regular,
  Print24Regular,
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
  stack: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
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
    const baseUrl = window.location.origin + window.location.pathname;
    const printUrl = `${baseUrl}#/print?template=${currentTemplate}`;

    const printWindow = window.open(printUrl, "_blank", "width=800,height=600");
    if (!printWindow) {
      alert(t("importDialog.printWindowAlert"));
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
        },
        (error) => {
          console.error(`Import error: ${error}`);
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
        alert(t("importDialog.jsonFileAlert"));
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
              {t("menu.title")}
            </ToolbarButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {/* Подменю Файл */}
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem icon={<Save20Regular />}>
                    {t("menu.file.title")}
                  </MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem onClick={handleNewResume}>
                      {t("menu.file.new")}
                    </MenuItem>
                    <MenuItem onClick={() => setImportDialogOpen(true)}>
                      {t("menu.file.import")}
                    </MenuItem>
                    <MenuItem onClick={handleExportJSON}>
                      {t("menu.file.export")}
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>

              {/* Подменю Шаблоны */}
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem icon={<Share20Regular />}>
                    {t("menu.templates.title")}
                  </MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    {templates.map((template) => (
                      <MenuItem
                        key={template.id}
                        onClick={() => onTemplateChange(template.id)}
                      >
                        <div className={styles.stack}>
                          {currentTemplate === template.id && (
                            <Checkmark20Regular />
                          )}
                          {currentTemplate !== template.id && (
                            <span style={{ width: "20px" }}>&nbsp;</span>
                          )}
                          {t(`menu.templates.${template.id}`)}
                        </div>
                      </MenuItem>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>

              <MenuDivider />

              {/* Печать */}
              <MenuItem icon={<Print24Regular />} onClick={handlePrint}>
                {t("menu.print")}
              </MenuItem>

              <MenuDivider />

              {/* Тема */}
              <MenuItem
                onClick={handleThemeToggle}
                icon={
                  isDarkMode ? <WeatherSunnyRegular /> : <WeatherMoonRegular />
                }
              >
                {isDarkMode ? t("menu.lightMode") : t("menu.darkMode")}
              </MenuItem>

              {/* Подменю Язык */}
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem icon={<LocalLanguage20Regular />}>
                    {t("menu.language")}
                  </MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <MenuItem
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                      >
                        <div className={styles.stack}>
                          {i18n.language === lang.code && (
                            <Checkmark20Regular />
                          )}
                          {i18n.language !== lang.code && (
                            <span style={{ width: "20px" }}>&nbsp;</span>
                          )}
                          {lang.label}
                        </div>
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
            <DialogTitle>{t("importDialog.title")}</DialogTitle>
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
                {t("importDialog.cancelButton")}
              </Button>
              <Button
                appearance="primary"
                onClick={handleImport}
                disabled={!importFile}
              >
                {t("importDialog.importButton")}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};
