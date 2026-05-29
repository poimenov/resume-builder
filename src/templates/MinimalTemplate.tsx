// src/templates/MinimalTemplate.tsx
import React from "react";
import { makeStyles, tokens, Text, Body1 } from "@fluentui/react-components";
import type { Resume } from "../models/Resume";

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily:
      "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', sans-serif",
    backgroundColor: "white",
  },
  header: {
    marginBottom: tokens.spacingVerticalXL,
  },
  name: {
    fontSize: "42px",
    fontWeight: "300",
    letterSpacing: "-0.5px",
    color: "#111",
    marginBottom: tokens.spacingVerticalXS,
  },
  title: {
    fontSize: "18px",
    fontWeight: "400",
    color: "#666",
    marginBottom: tokens.spacingVerticalS,
  },
  contactRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    fontSize: "13px",
    color: "#888",
    marginTop: tokens.spacingVerticalXS,
    borderTop: "1px solid #eee",
    paddingTop: tokens.spacingVerticalM,
  },
  section: {
    marginBottom: tokens.spacingVerticalL,
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalXS,
    borderBottom: "1px solid #e0e0e0",
  },
  experienceItem: {
    marginBottom: tokens.spacingVerticalL,
  },
  experienceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap",
    marginBottom: tokens.spacingVerticalXS,
  },
  position: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#222",
  },
  company: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#555",
  },
  period: {
    fontSize: "12px",
    color: "#999",
  },
  description: {
    fontSize: "13px",
    lineHeight: 1.5,
    color: "#666",
    marginTop: tokens.spacingVerticalXS,
  },
  educationItem: {
    marginBottom: tokens.spacingVerticalM,
  },
  degree: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#222",
  },
  school: {
    fontSize: "13px",
    color: "#666",
  },
  skillsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
  },
  skillItem: {
    fontSize: "13px",
    color: "#444",
    "&:not(:last-child)::after": {
      content: "','",
      marginLeft: "2px",
    },
  },
  languageRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalXS,
  },
  languageName: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#444",
  },
  languageLevel: {
    fontSize: "12px",
    color: "#888",
  },
  link: {
    color: "#666",
    textDecoration: "none",
    fontSize: "12px",
    "&:hover": {
      color: "#111",
      textDecoration: "underline",
    },
  },
  summary: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#555",
  },
  headerWithPhoto: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
    marginBottom: tokens.spacingVerticalL,
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  summaryContent: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#555",
    "& p": {
      marginBottom: "12px",
    },
    "& h1, & h2, & h3, & h4": {
      marginTop: "16px",
      marginBottom: "8px",
    },
    "& ul, & ol": {
      marginLeft: "20px",
      marginBottom: "12px",
    },
    "& li": {
      marginBottom: "4px",
    },
  },
});

export const MinimalTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const styles = useStyles();
  const {
    basicInfo,
    links,
    summary,
    experiences,
    educations,
    skills,
    languages,
  } = resume;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {basicInfo.image ? (
          <div className={styles.headerWithPhoto}>
            <img
              src={basicInfo.image}
              alt={basicInfo.name}
              className={styles.avatar}
            />
            <div>
              <div className={styles.name}>
                {basicInfo.name || "Имя Фамилия"}
              </div>
              <div className={styles.title}>
                {basicInfo.position || "Должность"}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.name}>{basicInfo.name || "Имя Фамилия"}</div>
            <div className={styles.title}>
              {basicInfo.position || "Должность"}
            </div>
          </>
        )}
        <div className={styles.contactRow}>
          {basicInfo.email && <span>{basicInfo.email}</span>}
          {basicInfo.phone && <span>{basicInfo.phone}</span>}
          {basicInfo.location && <span>{basicInfo.location}</span>}
          {links.slice(0, 2).map((link, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          ))}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>О себе</div>
          <div
            className={styles.summaryContent}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Опыт</div>
          {experiences.map((exp, idx) => (
            <div key={idx} className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <div>
                  <span className={styles.position}>{exp.position}</span>
                  {exp.company && `, ${exp.company}`}
                </div>
                <div className={styles.period}>{exp.period}</div>
              </div>
              <div className={styles.description}>{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Образование</div>
          {educations.map((edu, idx) => (
            <div key={idx} className={styles.educationItem}>
              <div className={styles.degree}>
                {edu.degree}
                {edu.grade && `, ${edu.grade}`}
              </div>
              <div className={styles.school}>{edu.school}</div>
              <div className={styles.period}>{edu.period}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Навыки</div>
          <div className={styles.skillsGrid}>
            {skills.map((skill, idx) => (
              <span key={idx} className={styles.skillItem}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Языки</div>
          {languages.map((lang, idx) => (
            <div key={idx} className={styles.languageRow}>
              <span className={styles.languageName}>{lang.name}</span>
              <span className={styles.languageLevel}>{lang.fluency}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
