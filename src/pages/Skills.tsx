// import { makeStyles, tokens, Title1 } from "@fluentui/react-components";
// import { Sparkle32Regular } from "@fluentui/react-icons";
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

// export const Skills: React.FC = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();

//   return (
//     <div>
//       <div className={classes.header}>
//         <Sparkle32Regular />
//         <Title1>{t("skills.title")}</Title1>
//       </div>
//     </div>
//   );
// };
// src/pages/Skills.tsx (кастомная версия)
import React, { useState } from "react";
import {
  makeStyles,
  tokens,
  Title1,
  Input,
  Button,
  Text,
} from "@fluentui/react-components";
import {
  Sparkle20Regular,
  Add20Regular,
  Dismiss20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import { $resume, addSkill, removeSkill } from "../stores/resumeStore";

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
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  content: {
    padding: tokens.spacingHorizontalL,
    maxWidth: "800px",
    margin: "0 auto",
    paddingTop: tokens.spacingVerticalXL,
  },
  addSection: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalXL,
  },
  skillsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
  },
  customTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    borderRadius: tokens.borderRadiusLarge,
    fontSize: tokens.fontSizeBase200,
    fontWeight: 500,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackground2,
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow2,
    },
  },
  deleteIcon: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)",
      transform: "scale(1.1)",
    },
  },
  emptyState: {
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXL,
    padding: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  hint: {
    marginTop: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
  },
});

export const Skills: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill({ id: Date.now().toString(), name: newSkill.trim() });
      setNewSkill("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  const handleDeleteSkill = (index: number) => {
    removeSkill(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Sparkle20Regular />
        <Title1>{t("skills.title")}</Title1>
      </div>

      <div className={styles.content}>
        <div className={styles.addSection}>
          <Input
            placeholder="Название навыка (например: React, TypeScript, Python)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ flex: 1 }}
            size="large"
          />
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
          >
            Добавить
          </Button>
        </div>

        <div className={styles.skillsGrid}>
          {resume.skills.map((skill, index) => (
            <div key={skill.id || index} className={styles.customTag}>
              <Text size={200}>{skill.name}</Text>
              <Dismiss20Regular
                className={styles.deleteIcon}
                onClick={() => handleDeleteSkill(index)}
                style={{ fontSize: "12px", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>

        {resume.skills.length === 0 && (
          <div className={styles.emptyState}>
            <Sparkle20Regular
              style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}
            />
            <div>У вас пока нет добавленных навыков</div>
            <div className={styles.hint}>
              Начните вводить навыки в поле выше и нажмите "Добавить"
            </div>
          </div>
        )}

        {resume.skills.length > 0 && (
          <div className={styles.hint}>
            💡 Нажмите на крестик у навыка, чтобы удалить его
          </div>
        )}
      </div>
    </div>
  );
};
