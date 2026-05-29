// src/templates/ModernTemplate.tsx (обновленная версия с обработкой HTML)
import React from "react";
import { makeStyles, tokens, Card, Body1 } from "@fluentui/react-components";
import type { Resume } from "../models/Resume";

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
  },
  headerContent: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `3px solid ${tokens.colorBrandStroke1}`,
  },
  headerText: {
    textAlign: "left",
  },
  name: {
    fontSize: "36px",
    fontWeight: "600",
    background: `linear-gradient(135deg, ${tokens.colorBrandForeground1}, ${tokens.colorBrandForeground2})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    marginBottom: tokens.spacingVerticalXS,
  },
  title: {
    fontSize: "18px",
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalS,
  },
  contactInfo: {
    display: "flex",
    justifyContent: "center",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
  },
  section: {
    marginBottom: tokens.spacingVerticalXL,
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "500",
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalM,
    borderLeft: `4px solid ${tokens.colorBrandStroke1}`,
    paddingLeft: tokens.spacingHorizontalM,
  },
  summaryContent: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: tokens.colorNeutralForeground2,
    "& p": {
      marginBottom: tokens.spacingVerticalM,
    },
    "& h1, & h2, & h3, & h4": {
      marginTop: tokens.spacingVerticalL,
      marginBottom: tokens.spacingVerticalS,
    },
    "& ul, & ol": {
      marginLeft: tokens.spacingHorizontalL,
      marginBottom: tokens.spacingVerticalM,
    },
    "& li": {
      marginBottom: tokens.spacingVerticalXS,
    },
    "& a": {
      color: tokens.colorBrandForeground1,
      textDecoration: "underline",
    },
  },
  experienceItem: {
    marginBottom: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateX(4px)",
      boxShadow: tokens.shadow4,
    },
  },
  position: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  company: {
    fontSize: "16px",
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  period: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalXS,
  },
  description: {
    fontSize: "14px",
    lineHeight: 1.5,
    color: tokens.colorNeutralForeground2,
  },
  skillsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
  },
  skillTag: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusLarge,
    fontSize: "13px",
    fontWeight: "500",
  },
  languageItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalXS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});

export const ModernTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const styles = useStyles();
  const { basicInfo, summary, experiences, educations, skills, languages } =
    resume;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {basicInfo.image && (
            <img
              src={basicInfo.image}
              alt={basicInfo.name}
              className={styles.avatar}
            />
          )}
          <div className={styles.headerText}>
            <div className={styles.name}>{basicInfo.name || "Имя Фамилия"}</div>
            <div className={styles.title}>
              {basicInfo.position || "Профессиональная роль"}
            </div>
            <div className={styles.contactInfo}>
              {basicInfo.email && <span>📧 {basicInfo.email}</span>}
              {basicInfo.phone && <span>📱 {basicInfo.phone}</span>}
              {basicInfo.location && <span>📍 {basicInfo.location}</span>}
            </div>
          </div>
        </div>
      </div>

      {summary && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>О себе</div>
          <div
            className={styles.summaryContent}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      )}

      {experiences.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Опыт работы</div>
          {experiences.map((exp, idx) => (
            <Card key={idx} className={styles.experienceItem}>
              <div className={styles.position}>{exp.position}</div>
              <div className={styles.company}>{exp.company}</div>
              <div className={styles.period}>{exp.period}</div>
              <div className={styles.description}>{exp.description}</div>
            </Card>
          ))}
        </div>
      )}

      {educations.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Образование</div>
          {educations.map((edu, idx) => (
            <Card key={idx} className={styles.experienceItem}>
              <div className={styles.position}>{edu.degree}</div>
              <div className={styles.company}>{edu.school}</div>
              <div className={styles.period}>{edu.period}</div>
              {edu.grade && (
                <div className={styles.description}>Оценка: {edu.grade}</div>
              )}
            </Card>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Навыки</div>
          <div className={styles.skillsList}>
            {skills.map((skill, idx) => (
              <span key={idx} className={styles.skillTag}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Языки</div>
          {languages.map((lang, idx) => (
            <div key={idx} className={styles.languageItem}>
              <span className={styles.position}>{lang.name}</span>
              <span className={styles.period}>{lang.fluency}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
