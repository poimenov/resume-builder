import React, { useState } from "react";
import {
  makeStyles,
  tokens,
  Title1,
  Input,
  Button,
  Card,
  CardPreview,
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
  card: {
    marginBottom: tokens.spacingVerticalM,
  },
  linkItem: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    padding: tokens.spacingHorizontalM,
  },
  linkInput: {
    flex: 1,
    overflow: "hidden",
  },
  addButton: {
    marginTop: tokens.spacingVerticalM,
  },
  hint: {
    marginTop: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  link: {
    textDecoration: "none",
    color: tokens.colorNeutralForeground1,
    ":hover": {
      color: tokens.colorBrandForegroundLinkHover,
      textDecoration: "underline",
    },
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
          <Card key={index} className={styles.card}>
            <CardPreview className={styles.linkItem}>
              <div className={styles.linkInput}>
                <a
                  href={link}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link}
                </a>
              </div>
              <ToolbarButton
                icon={<Delete20Regular />}
                onClick={() => handleDeleteLink(index)}
                aria-label={t("actions.delete")}
                title={t("actions.delete")}
              />
            </CardPreview>
          </Card>
        ))}

        <div className={styles.linkItem}>
          <Input
            className={styles.linkInput}
            placeholder={t("links.placeholder")}
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={handleAddLink}
          >
            {t("actions.add")}
          </Button>
        </div>

        <div className={styles.hint}>{t("links.hint")}</div>
      </div>
    </div>
  );
};
