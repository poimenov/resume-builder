import React from "react";
import { makeStyles, tokens, Card, Text } from "@fluentui/react-components";
import { useStore } from "@nanostores/react";
import { $resume } from "../stores/resumeStore";
import { getTemplateById, TemplatePreview } from "../templates";
import { useTranslation } from "react-i18next";

interface PreviewProps {
  currentTemplate: string;
}

const useStyles = makeStyles({
  container: {
    height: "100%",
    width: "100%",
  },
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    padding: tokens.spacingHorizontalXL,
  },
});

export const Preview: React.FC<PreviewProps> = ({ currentTemplate }) => {
  const styles = useStyles();
  const resume = useStore($resume);
  const template = getTemplateById(currentTemplate);
  const { t } = useTranslation();

  const hasData = resume.basicInfo.name || resume.experiences.length > 0;

  if (!hasData) {
    return (
      <div className={styles.container}>
        <Card className={styles.emptyState}>
          <Text size={400}>{t("preview")}</Text>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TemplatePreview template={template} resume={resume} />
    </div>
  );
};
