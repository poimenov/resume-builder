// import { makeStyles, tokens, Title1 } from "@fluentui/react-components";
// import { HatGraduation32Regular } from "@fluentui/react-icons";
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

// export const Educations: React.FC = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();

//   return (
//     <div>
//       <div className={classes.header}>
//         <HatGraduation32Regular />
//         <Title1>{t("educations.title")}</Title1>
//       </div>
//     </div>
//   );
// };
// src/pages/Educations.tsx
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
  },
});

const fields: FieldConfig[] = [
  { name: "school", label: "Учебное заведение", required: true },
  { name: "degree", label: "Степень / Специализация", required: true },
  { name: "area", label: "Область изучения" },
  { name: "grade", label: "Средний балл / Отличие" },
  { name: "period", label: "Период обучения", placeholder: "2016-2020" },
  { name: "location", label: "Локация" },
  { name: "website", label: "Сайт", type: "url" },
];

export const Educations: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);

  const renderItem = (edu: Education, index: number) => (
    <div>
      <Text size={200}>{edu.period}</Text>
      {edu.grade && (
        <div>
          <Text size={200}>Оценка: {edu.grade}</Text>
        </div>
      )}
      {edu.area && (
        <div className={styles.description}>
          <Text size={300}>{edu.area}</Text>
        </div>
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
          titleAdd="Добавить образование"
          titleEdit="Редактировать образование"
        />
      </div>
    </div>
  );
};
