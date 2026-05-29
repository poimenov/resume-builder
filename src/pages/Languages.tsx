// import { makeStyles, tokens, Title1 } from "@fluentui/react-components";
// import { Earth32Regular } from "@fluentui/react-icons";
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

// export const Languages: React.FC = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();

//   return (
//     <div>
//       <div className={classes.header}>
//         <Earth32Regular />
//         <Title1>{t("languages.title")}</Title1>
//       </div>
//     </div>
//   );
// };
// src/pages/Languages.tsx
import React, { useState } from "react";
import {
  makeStyles,
  tokens,
  Title1,
  Input,
  Button,
  Card,
  Select,
  ToolbarButton,
} from "@fluentui/react-components";
import {
  Earth20Regular,
  Add20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import {
  $resume,
  addLanguage,
  updateLanguage,
  removeLanguage,
} from "../stores/resumeStore";
import type { Language } from "../models/Resume";

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
    maxWidth: "600px",
    margin: "0 auto",
  },
  languageItem: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "center",
    marginBottom: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
  },
  languageName: {
    flex: 2,
  },
  languageLevel: {
    flex: 1,
  },
  addSection: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL,
  },
});

const fluencyLevels = [
  { value: "native", label: "Родной" },
  { value: "fluent", label: "Свободно" },
  { value: "advanced", label: "Продвинутый" },
  { value: "intermediate", label: "Средний" },
  { value: "beginner", label: "Начальный" },
];

export const Languages: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);
  const [newLanguage, setNewLanguage] = useState("");
  const [newFluency, setNewFluency] = useState("intermediate");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      addLanguage({
        id: Date.now().toString(),
        name: newLanguage.trim(),
        fluency: newFluency,
        level: fluencyLevels.findIndex((l) => l.value === newFluency) + 1,
      });
      setNewLanguage("");
      setNewFluency("intermediate");
    }
  };

  const handleDeleteLanguage = (index: number) => {
    removeLanguage(index);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddLanguage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Earth20Regular />
        <Title1>{t("languages.title")}</Title1>
      </div>

      <div className={styles.content}>
        {resume.languages.map((lang, index) => (
          <Card key={lang.id || index} className={styles.languageItem}>
            <div className={styles.languageName}>
              <div style={{ fontWeight: 500 }}>{lang.name}</div>
            </div>
            <div className={styles.languageLevel}>
              <div>{lang.fluency}</div>
            </div>
            <ToolbarButton
              icon={<Delete20Regular />}
              onClick={() => handleDeleteLanguage(index)}
              aria-label="Удалить"
            />
          </Card>
        ))}

        <div className={styles.addSection}>
          <Input
            className={styles.languageName}
            placeholder="Язык (например: Английский)"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Select
            className={styles.languageLevel}
            value={newFluency}
            onChange={(e) => setNewFluency(e.target.value)}
          >
            {fluencyLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </Select>
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={handleAddLanguage}
          >
            Добавить
          </Button>
        </div>

        {resume.languages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: tokens.colorNeutralForeground3,
              marginTop: tokens.spacingVerticalXL,
            }}
          >
            Добавьте языки, которыми вы владеете
          </div>
        )}
      </div>
    </div>
  );
};
