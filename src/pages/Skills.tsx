import React from "react";
import { makeStyles, tokens, Title1, Text } from "@fluentui/react-components";
import { Sparkle20Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import {
  $resume,
  addSkill,
  updateSkill,
  removeSkill,
} from "../stores/resumeStore";
import { EditableList, FieldConfig } from "../components/EditableList";
import type { Skill } from "../models/Resume";

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
    paddingTop: tokens.spacingVerticalXL,
  },
  keywordsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalS,
  },
  keywordTag: {
    display: "inline-flex",
    alignItems: "center",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground2,
  },
  emptyKeywords: {
    marginTop: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
});

export const Skills: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: t("skills.skillsGroup"),
      required: true,
      placeholder: t("skills.skillsGroupPlaceholder"),
    },
    {
      name: "keywords",
      label: t("skills.keywords"),
      type: "keywords",
      placeholder: t("skills.keywordsPlaceholder"),
    },
  ];

  const renderItem = (skill: Skill, _index: number) => {
    if (skill.keywords && skill.keywords.length > 0) {
      return (
        <div className={styles.keywordsContainer}>
          {skill.keywords.map((keyword, kidx) => (
            <span key={kidx} className={styles.keywordTag}>
              {keyword}
            </span>
          ))}
        </div>
      );
    }
    return (
      <div className={styles.emptyKeywords}>
        <Text size={100}>{t("Skills.emptyKeywordsHint")}</Text>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Sparkle20Regular />
        <Title1>{t("skills.title")}</Title1>
      </div>

      <div className={styles.content}>
        <EditableList
          items={resume.skills}
          fields={fields}
          renderItem={renderItem}
          addItem={(item) => addSkill({ ...item } as Skill)}
          updateItem={(index, item) => updateSkill(index, item)}
          deleteItem={(index) => removeSkill(index)}
          getItemTitle={(item) => item.name}
          getItemSubtitle={(item) =>
            `${item.keywords?.length || 0} ${t("skills.ofKeywords")}`
          }
          titleAdd={t("skills.titleAdd")}
          titleEdit={t("skills.titleEdit")}
        />
      </div>
    </div>
  );
};
