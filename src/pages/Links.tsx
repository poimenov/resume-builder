// import { makeStyles, tokens, Title1 } from "@fluentui/react-components";
// import { Link32Regular } from "@fluentui/react-icons";
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

// export const Links: React.FC = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();

//   return (
//     <div>
//       <div className={classes.header}>
//         <Link32Regular />
//         <Title1>{t("links.title")}</Title1>
//       </div>
//     </div>
//   );
// };
// src/pages/Links.tsx
import React, { useState } from "react";
import {
  makeStyles,
  tokens,
  Title1,
  Input,
  Button,
  Card,
  ToolbarButton,
} from "@fluentui/react-components";
import {
  Link20Regular,
  Add20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import { $resume, updateLinks } from "../stores/resumeStore";

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
  linkItem: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    marginBottom: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
  },
  linkInput: {
    flex: 1,
  },
  addButton: {
    marginTop: tokens.spacingVerticalM,
  },
  hint: {
    marginTop: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

export const Links: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);
  const [newLink, setNewLink] = useState("");

  const handleAddLink = () => {
    if (newLink && !resume.links.includes(newLink)) {
      updateLinks([...resume.links, newLink]);
      setNewLink("");
    }
  };

  const handleDeleteLink = (index: number) => {
    const newLinks = resume.links.filter((_, i) => i !== index);
    updateLinks(newLinks);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddLink();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link20Regular />
        <Title1>{t("links.title")}</Title1>
      </div>

      <div className={styles.content}>
        {resume.links.map((link, index) => (
          <Card key={index} className={styles.linkItem}>
            <div className={styles.linkInput}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </div>
            <ToolbarButton
              icon={<Delete20Regular />}
              onClick={() => handleDeleteLink(index)}
              aria-label="Удалить"
            />
          </Card>
        ))}

        <div className={styles.linkItem}>
          <Input
            className={styles.linkInput}
            placeholder="https://github.com/username"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={handleAddLink}
          >
            Добавить
          </Button>
        </div>

        <div className={styles.hint}>
          Добавьте ссылки на ваши профили: GitHub, LinkedIn, портфолио и т.д.
        </div>
      </div>
    </div>
  );
};
