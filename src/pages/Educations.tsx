import React from "react";
import { makeStyles, tokens, Title1, Text } from "@fluentui/react-components";
import { HatGraduation20Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import {
  $resume,
  addEducation,
  updateEducation,
  removeEducation,
} from "../stores/resumeStore";
import { EditableList, FieldConfig } from "../components/EditableList";
import type { Education } from "../models/Resume";

const useStyles = makeStyles({
  container: {
    height: "100%",
    overflow: "auto",
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
  link: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

export const Educations: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);

  const fields: FieldConfig[] = [
    { name: "school", label: t("educations.school"), required: true },
    { name: "degree", label: t("educations.degree"), required: true },
    { name: "area", label: t("educations.area") },
    { name: "grade", label: t("educations.grade") },
    { name: "period", label: t("educations.period"), placeholder: "2016-2020" },
    { name: "location", label: t("educations.location") },
    { name: "website", label: t("educations.website"), type: "url" },
  ];

  const renderItem = (edu: Education, _index: number) => (
    <div>
      {edu.area && (
        <div>
          <Text size={300}>{edu.area}</Text>
        </div>
      )}
      {edu.website && (
        <a
          href={edu.website}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {edu.website}
        </a>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HatGraduation20Regular />
        <Title1>{t("educations.title")}</Title1>
      </div>

      <div className={styles.content}>
        <EditableList
          items={resume.educations}
          fields={fields}
          renderItem={renderItem}
          addItem={(item) => addEducation(item as Education)}
          updateItem={(index, item) => updateEducation(index, item)}
          deleteItem={(index) => removeEducation(index)}
          getItemTitle={(item) => `${item.degree} @ ${item.school}`}
          getItemSubtitle={(item) => item.period}
          titleAdd={t("educations.titleAdd")}
          titleEdit={t("educations.titleEdit")}
        />
      </div>
    </div>
  );
};
