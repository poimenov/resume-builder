import React from "react";
import { makeStyles, tokens, Title1, Text } from "@fluentui/react-components";
import { Briefcase20Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import {
  $resume,
  addExperience,
  updateExperience,
  removeExperience,
} from "../stores/resumeStore";
import { EditableList, FieldConfig } from "../components/EditableList";
import type { Experience } from "../models/Resume";

const useStyles = makeStyles({
  container: {
    height: "100%",
    overflow: "auto",
  },
  header: {
    height: "50px",
    padding: tokens.spacingHorizontalL,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    position: "sticky",
    top: 0,
    backgroundColor: tokens.colorNeutralBackground2,
    zIndex: 10,
  },
  content: {
    padding: tokens.spacingHorizontalL,
    maxWidth: "800px",
    margin: "0 auto",
  },
  description: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  link: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

export const Experiences: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);

  const fields: FieldConfig[] = [
    {
      name: "company",
      label: t("experiences.company"),
      placeholder: t("experiences.companyPlaceholder"),
      required: true,
    },
    {
      name: "position",
      label: t("experiences.position"),
      placeholder: t("experiences.positionPlaceholder"),
      required: true,
    },
    {
      name: "period",
      label: t("experiences.period"),
      placeholder: t("experiences.periodPlaceholder"),
    },
    {
      name: "location",
      label: t("experiences.location"),
      placeholder: t("experiences.locationPlaceholder"),
    },
    {
      name: "website",
      label: t("experiences.website"),
      type: "url",
      placeholder: t("experiences.websitePlaceholder"),
    },
    {
      name: "description",
      label: t("experiences.description"),
      placeholder: t("experiences.descriptionPlaceholder"),
      type: "textarea",
    },
  ];

  const renderItem = (exp: Experience, index: number) => (
    <div>
      <div className={styles.description} title={exp.description}>
        <Text size={300}>{exp.description}</Text>
      </div>
      {exp.website && (
        <a
          href={exp.website}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {exp.website}
        </a>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Briefcase20Regular />
        <Title1>{t("experiences.title")}</Title1>
      </div>

      <div className={styles.content}>
        <EditableList
          items={resume.experiences}
          fields={fields}
          renderItem={renderItem}
          addItem={(item) => addExperience(item as Experience)}
          updateItem={(index, item) => updateExperience(index, item)}
          deleteItem={(index) => removeExperience(index)}
          getItemTitle={(item) => `${item.position} @ ${item.company}`}
          getItemSubtitle={(item) => item.period}
          titleAdd={t("experiences.titleAdd")}
          titleEdit={t("experiences.titleEdit")}
        />
      </div>
    </div>
  );
};
