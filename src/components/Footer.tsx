import { makeStyles, tokens, Text } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  footer: {
    textAlign: "center",
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    marginTop: "auto",
  },
});

export const Footer = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <Text size={200}>© 2026 {t("appName")}</Text>
    </div>
  );
};
