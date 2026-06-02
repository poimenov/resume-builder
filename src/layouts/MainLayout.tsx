import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  makeStyles,
  makeResetStyles,
  tokens,
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Preview } from "../components/Preview";
import { useTranslation } from "react-i18next";
import { useResizeHandle } from "@fluentui-contrib/react-resize-handle";

const SIDEBAR_WIDTH_VAR = "--sidebar-width";

const useWrapperStyles = makeResetStyles({
  [SIDEBAR_WIDTH_VAR]: "350px",
  display: "grid",
  width: "100%",
  height: "100%",
  gridTemplateColumns: `clamp(350px, var(${SIDEBAR_WIDTH_VAR}), 800px) auto 1fr`,
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden", // Запрещаем прокрутку на корневом уровне
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden", // Запрещаем прокрутку на этом уровне
  },
  content: {
    flexGrow: 1,
    overflow: "hidden", // Меняем с overflowY: auto на hidden
    backgroundColor: tokens.colorNeutralBackground2,
    transition: "margin-left 0.2s ease",
    display: "flex",
    flexDirection: "column",
  },
  left: {
    padding: "0 10px",
    overflow: "auto",
    height: "100%",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: tokens.colorNeutralStroke2,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: tokens.colorNeutralStroke1,
      borderRadius: "4px",
      "&:hover": {
        background: tokens.colorBrandStroke1,
      },
    },
  },
  right: {
    padding: "20px",
    overflow: "auto",
    height: "100%",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: tokens.colorNeutralStroke2,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: tokens.colorNeutralStroke1,
      borderRadius: "4px",
      "&:hover": {
        background: tokens.colorBrandStroke1,
      },
    },
  },
  handle: {
    cursor: "col-resize",
    width: "1px",
    backgroundColor: tokens.colorNeutralStroke1,
    transition: "background-color 0.2s ease",
    outline: "none",
    ":hover": {
      backgroundColor: tokens.colorNeutralStroke1Hover,
      width: "4px",
    },
    ":focus-visible": {
      backgroundColor: tokens.colorNeutralStroke1Hover,
      width: "4px",
      outline: "none",
    },
  },
});

export const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("isCollapsed") === "true",
  );
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("isDarkMode") === "true",
  );
  const [currentTemplate, setCurrentTemplate] = useState(
    () => localStorage.getItem("currentTemplate") || "modern",
  );

  const currentTheme = isDarkMode ? webDarkTheme : webLightTheme;
  const styles = useStyles();
  const wrapperStyles = useWrapperStyles();

  const { wrapperRef, elementRef, handleRef } = useResizeHandle({
    growDirection: "end",
    variableName: SIDEBAR_WIDTH_VAR,
    relative: false,
  });

  useEffect(() => {
    document.title = `${t("appName")}`;
  }, [t]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("isCollapsed", isCollapsed.toString());
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem("currentTemplate", currentTemplate);
  }, [currentTemplate]);

  return (
    <FluentProvider theme={currentTheme}>
      <div className={styles.root}>
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          currentTemplate={currentTemplate}
          onTemplateChange={setCurrentTemplate}
        />
        <div className={styles.mainContainer}>
          <Sidebar isCollapsed={isCollapsed} onToggle={setIsCollapsed} />
          <div className={styles.content}>
            <div ref={wrapperRef} className={wrapperStyles}>
              <div ref={elementRef} className={styles.left}>
                <Outlet />
              </div>
              <div
                ref={handleRef}
                className={styles.handle}
                role="separator"
                aria-label="Изменить размер панели"
                tabIndex={0}
              />
              <div className={styles.right}>
                <Preview currentTemplate={currentTemplate} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </FluentProvider>
  );
};
