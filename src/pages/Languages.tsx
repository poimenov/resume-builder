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
  CardPreview,
} from "@fluentui/react-components";
import {
  Earth20Regular,
  Add20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import { $resume, addLanguage, removeLanguage } from "../stores/resumeStore";

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
    maxWidth: "600px",
    margin: "0 auto",
  },
  card: {
    marginBottom: tokens.spacingVerticalM,
  },
  languageItem: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    padding: tokens.spacingHorizontalM,
  },
  languageName: {
    flex: 1,
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

const levels = [
  { value: "native" },
  { value: "fluent" },
  { value: "advanced" },
  { value: "intermediate" },
  { value: "beginner" },
];

export const Languages: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);
  const [newLanguage, setNewLanguage] = useState("");
  const [newFluency, setNewFluency] = useState("intermediate");
  const fluencyLevels = levels.map((l) => ({
    value: l.value,
    label: t(`languages.fluencyLevel.${l.value}`),
  }));

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
          <Card key={lang.id || index} className={styles.card}>
            <CardPreview className={styles.languageItem}>
              <div className={styles.languageName}>
                <div style={{ fontWeight: 500 }}>{lang.name}</div>
              </div>
              <div className={styles.languageLevel}>
                <div>{t(`languages.fluencyLevel.${lang.fluency}`)}</div>
              </div>
              <ToolbarButton
                icon={<Delete20Regular />}
                onClick={() => handleDeleteLanguage(index)}
                aria-label={t("actions.delete")}
              />
            </CardPreview>
          </Card>
        ))}

        <div className={styles.addSection}>
          <Input
            className={styles.languageName}
            style={{ width: "100px" }}
            placeholder={t("languages.name")}
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Select
            className={styles.languageLevel}
            style={{ width: "100px" }}
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
            {t("actions.add")}
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
            {t("languages.hint")}
          </div>
        )}
      </div>
    </div>
  );
};
