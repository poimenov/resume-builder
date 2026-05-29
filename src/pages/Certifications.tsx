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
});

const fields: FieldConfig[] = [
  { name: "name", label: "Название сертификата", required: true },
  { name: "issuer", label: "Организация-эмитент", required: true },
  { name: "date", label: "Дата получения", placeholder: "Март 2024" },
  { name: "label", label: "Метка / ID" },
  { name: "website", label: "Ссылка на сертификат", type: "url" },
];

export const Certifications: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);
  const certifications = resume.certifications || [];

  const renderItem = (cert: Certification, index: number) => (
    <div>
      <Text size={200}>{cert.issuer}</Text>
      {cert.date && (
        <div>
          <Text size={200}>Дата: {cert.date}</Text>
        </div>
      )}
      {cert.label && (
        <div>
          <Text size={200}>ID: {cert.label}</Text>
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
          titleAdd="Добавить сертификат"
          titleEdit="Редактировать сертификат"
        />
      </div>
    </div>
  );
};
