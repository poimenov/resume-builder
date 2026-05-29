import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  makeStyles,
  tokens,
  NavDrawer,
  NavDrawerHeader,
  NavDrawerBody,
  NavItem,
  Tooltip,
  Hamburger,
} from "@fluentui/react-components";
import {
  Person20Regular,
  Link20Regular,
  DocumentText20Regular,
  Briefcase20Regular,
  HatGraduation20Regular,
  Sparkle20Regular,
  Certificate20Regular,
  Earth20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

const useStyles = makeStyles({
  navItem: {
    textWrap: "nowrap",
    "& svg": {
      color: tokens.colorNeutralForeground2,
      transition: "color 0.2s ease",
      pointerEvents: "none",
    },
    "&:hover svg": {
      color: tokens.colorBrandForeground1,
    },
    "&[aria-current='page'] svg": {
      color: tokens.colorBrandForeground1,
    },
  },
});

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const styles = useStyles();
  const location = useLocation();
  const [selected, setSelected] = React.useState(location.pathname);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onNavItemChange = (data: string) => {
    setSelected(data);
    navigate(data);
  };

  const toggleSidebar = () => {
    onToggle(!isCollapsed);
  };

  const drawerWidth = isCollapsed ? "54px" : "200px";
  const positioning = isCollapsed ? "after" : "above";

  React.useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <NavDrawer
      selectedValue={selected}
      onNavItemSelect={(_, data) => onNavItemChange(data.value)}
      open={true}
      position="start"
      type="inline"
      style={{
        width: drawerWidth,
        minWidth: drawerWidth,
        transition: "width 0.2s ease",
        flexShrink: 0,
      }}
    >
      <NavDrawerHeader>
        <Tooltip
          content={isCollapsed ? t("actions.expand") : t("actions.collapse")}
          relationship="label"
          positioning={positioning}
        >
          <Hamburger
            onClick={toggleSidebar}
            size="medium"
            aria-label={
              isCollapsed ? t("actions.expand") : t("actions.collapse")
            }
          />
        </Tooltip>
      </NavDrawerHeader>
      <NavDrawerBody
        style={{
          overflowX: "hidden",
        }}
      >
        <Tooltip
          content={t("basicInfo.title")}
          relationship="label"
          positioning={positioning}
        >
          <NavItem
            className={styles.navItem}
            icon={<Person20Regular />}
            value="/"
          >
            {t("basicInfo.title")}
          </NavItem>
        </Tooltip>
        <Tooltip
          content={t("links.title")}
          relationship="label"
          positioning={positioning}
        >
          <NavItem
            className={styles.navItem}
            icon={<Link20Regular />}
            value="/links"
          >
            {t("links.title")}
          </NavItem>
        </Tooltip>
        <Tooltip
          content={t("summary.title")}
          relationship="label"
          positioning={positioning}
        >
          <NavItem
            className={styles.navItem}
            icon={<DocumentText20Regular />}
            value="/summary"
          >
            {t("summary.title")}
          </NavItem>
        </Tooltip>
        <Tooltip
          content={t("experiences.title")}
          relationship="label"
          positioning={positioning}
        >
          <NavItem
            className={styles.navItem}
            icon={<Briefcase20Regular />}
            value="/experiences"
          >
            {t("experiences.title")}
          </NavItem>
        </Tooltip>
        <Tooltip
          content={t("educations.title")}
          relationship="label"
          positioning={positioning}
        >
          <NavItem
            className={styles.navItem}
            icon={<HatGraduation20Regular />}
            value="/educations"
          >
            {t("educations.title")}
          </NavItem>
        </Tooltip>
        <Tooltip
          content={t("certifications.title")}
          relationship="label"
          positioning={positioning}
        >
          <NavItem
            className={styles.navItem}
            icon={<Certificate20Regular />}
            value="/certifications"
          >
            {t("certifications.title")}
          </NavItem>
        </Tooltip>
        <Tooltip
          content={t("skills.title")}
          relationship="label"
          positioning={positioning}
        >
          <NavItem
            className={styles.navItem}
            icon={<Sparkle20Regular />}
            value="/skills"
          >
            {t("skills.title")}
          </NavItem>
        </Tooltip>
        <Tooltip
          content={t("languages.title")}
          relationship="label"
          positioning={positioning}
        >
          <NavItem
            className={styles.navItem}
            icon={<Earth20Regular />}
            value="/languages"
          >
            {t("languages.title")}
          </NavItem>
        </Tooltip>
      </NavDrawerBody>
    </NavDrawer>
  );
};
