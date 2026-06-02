import React from "react";
import { makeStyles, tokens, Title1, Text } from "@fluentui/react-components";
import { Certificate20Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import {
  $resume,
  addCertification,
  updateCertification,
  removeCertification,
} from "../stores/resumeStore";
import { EditableList, FieldConfig } from "../components/EditableList";
import type { Certification } from "../models/Resume";

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

export const Certifications: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);
  const certifications = resume.certifications || [];

  const fields: FieldConfig[] = [
    { name: "name", label: t("certifications.name"), required: true },
    { name: "issuer", label: t("certifications.issuer"), required: true },
    {
      name: "date",
      label: t("certifications.date"),
      placeholder: t("certifications.datePlaceholder"),
    },
    { name: "label", label: t("certifications.label") },
    { name: "website", label: t("certifications.website"), type: "url" },
  ];

  const renderItem = (cert: Certification, _index: number) => (
    <div>
      {cert.date && (
        <div>
          <Text size={200}>{cert.date}</Text>
        </div>
      )}
      {cert.label && (
        <div>
          {!cert.website && <Text size={200}>{cert.label}</Text>}
          {cert.website && (
            <a
              href={cert.website}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cert.label}
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Certificate20Regular />
        <Title1>{t("certifications.title")}</Title1>
      </div>

      <div className={styles.content}>
        <EditableList
          items={certifications}
          fields={fields}
          renderItem={renderItem}
          addItem={(item) => addCertification(item as Certification)}
          updateItem={(index, item) => updateCertification(index, item)}
          deleteItem={(index) => removeCertification(index)}
          getItemTitle={(item) => item.name}
          getItemSubtitle={(item) => item.issuer}
          titleAdd={t("certifications.titleAdd")}
          titleEdit={t("certifications.titleEdit")}
        />
      </div>
    </div>
  );
};
