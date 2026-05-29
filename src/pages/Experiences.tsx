// import { makeStyles, tokens, Title1 } from "@fluentui/react-components";
// import { Briefcase32Regular } from "@fluentui/react-icons";
// import { useTranslation } from "react-i18next";

// const useStyles = makeStyles({
//   header: {
//     height: "50px",
//     padding: tokens.spacingHorizontalL,
//     display: "flex",
//     alignItems: "center",
//     gap: tokens.spacingHorizontalS,
//   },
// });

// export const Experiences: React.FC = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();

//   return (
//     <div>
//       <div className={classes.header}>
//         <Briefcase32Regular />
//         <Title1>{t("experiences.title")}</Title1>
//       </div>
//     </div>
//   );
// };
// src/pages/Experiences.tsx
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
    marginTop: tokens.spacingVerticalS,
    whiteSpace: "pre-wrap",
  },
});

const fields: FieldConfig[] = [
  { name: "company", label: "Компания", required: true },
  { name: "position", label: "Должность", required: true },
  {
    name: "period",
    label: "Период работы",
    placeholder: "2020-настоящее время",
  },
  { name: "location", label: "Локация", placeholder: "Москва, Россия" },
  { name: "website", label: "Сайт компании", type: "url" },
  {
    name: "description",
    label: "Описание обязанностей и достижений",
    type: "textarea",
  },
];

export const Experiences: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);

  const renderItem = (exp: Experience, index: number) => (
    <div>
      <Text size={200}>{exp.period}</Text>
      <div className={styles.description}>
        <Text size={300}>{exp.description}</Text>
      </div>
      {exp.website && (
        <a href={exp.website} target="_blank" rel="noopener noreferrer">
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
          titleAdd="Добавить опыт работы"
          titleEdit="Редактировать опыт"
        />
      </div>
    </div>
  );
};
