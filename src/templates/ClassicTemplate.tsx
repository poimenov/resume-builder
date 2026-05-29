// src/templates/ClassicTemplate.tsx
import React from "react";
import {
  makeStyles,
  tokens,
  Card,
  Text,
  Title1,
  Title2,
  Body1,
} from "@fluentui/react-components";
import type { Resume } from "../models/Resume";

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    backgroundColor: "#faf9f8",
  },
  header: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalL,
    borderBottom: "2px solid #2c3e50",
  },
  name: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: tokens.spacingVerticalXS,
    letterSpacing: "1px",
  },
  title: {
    fontSize: "18px",
    color: "#7f8c8d",
    marginBottom: tokens.spacingVerticalS,
    fontStyle: "italic",
  },
  contactInfo: {
    fontSize: "12px",
    color: "#555",
    display: "flex",
    justifyContent: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
    marginTop: tokens.spacingVerticalXS,
  },
  section: {
    marginBottom: tokens.spacingVerticalL,
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2c3e50",
    borderBottom: "1px solid #bdc3c7",
    paddingBottom: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalM,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  experienceItem: {
    marginBottom: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalS,
    backgroundColor: "white",
    borderLeft: "3px solid #3498db",
    paddingLeft: tokens.spacingHorizontalM,
  },
  companyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap",
    marginBottom: tokens.spacingVerticalXS,
  },
  position: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  company: {
    fontSize: "14px",
    fontWeight: "semibold",
    color: "#7f8c8d",
  },
  period: {
    fontSize: "12px",
    color: "#95a5a6",
    fontStyle: "italic",
  },
  description: {
    fontSize: "13px",
    lineHeight: 1.5,
    color: "#444",
    marginTop: tokens.spacingVerticalXS,
  },
  educationItem: {
    marginBottom: tokens.spacingVerticalM,
  },
  degree: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  school: {
    fontSize: "13px",
    fontWeight: "semibold",
    color: "#7f8c8d",
  },
  skillsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
    listStyle: "none",
    padding: 0,
  },
  skillItem: {
    backgroundColor: "#ecf0f1",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: "2px",
    fontSize: "12px",
    color: "#2c3e50",
  },
  languageItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalXS} 0`,
  },
  languageName: {
    fontSize: "13px",
    fontWeight: "semibold",
    color: "#2c3e50",
  },
  languageLevel: {
    fontSize: "12px",
    color: "#7f8c8d",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
    fontSize: "12px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  headerWithPhoto: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid #2c3e50`,
  },
  summaryContent: {
    fontSize: "13px",
    lineHeight: 1.6,
    color: "#444",
    "& p": {
      marginBottom: "8px",
    },
    "& h1, & h2, & h3, & h4": {
      marginTop: "12px",
      marginBottom: "6px",
    },
    "& ul, & ol": {
      marginLeft: "20px",
      marginBottom: "8px",
    },
    "& li": {
      marginBottom: "4px",
    },
  },
});

export const ClassicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
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
              <div className={styles.name}>{basicInfo.name || "Ваше Имя"}</div>
              <div className={styles.title}>
                {basicInfo.position || "Должность"}
              </div>
              <div className={styles.contactInfo}>
                <span>{basicInfo.email}</span> • <span>{basicInfo.phone}</span>{" "}
                • <span>{basicInfo.location}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.name}>{basicInfo.name || "Ваше Имя"}</div>
            <div className={styles.title}>
              {basicInfo.position || "Должность"}
            </div>
            <div className={styles.contactInfo}>
              <span>{basicInfo.email}</span> • <span>{basicInfo.phone}</span> •{" "}
              <span>{basicInfo.location}</span>
            </div>
          </>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Профессиональный профиль</div>
          <div
            className={styles.summaryContent}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Опыт работы</div>
          {experiences.map((exp, idx) => (
            <div key={idx} className={styles.experienceItem}>
              <div className={styles.companyHeader}>
                <div>
                  <div className={styles.position}>{exp.position}</div>
                  <div className={styles.company}>{exp.company}</div>
                </div>
                <div className={styles.period}>{exp.period}</div>
              </div>
              {exp.location && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "#95a5a6",
                    marginBottom: "4px",
                  }}
                >
                  {exp.location}
                </div>
              )}
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
              <div className={styles.companyHeader}>
                <div>
                  <div className={styles.degree}>
                    {edu.degree} {edu.grade && `(${edu.grade})`}
                  </div>
                  <div className={styles.school}>{edu.school}</div>
                </div>
                <div className={styles.period}>{edu.period}</div>
              </div>
              {edu.area && (
                <div
                  style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}
                >
                  {edu.area}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Навыки</div>
          <ul className={styles.skillsList}>
            {skills.map((skill, idx) => (
              <li key={idx} className={styles.skillItem}>
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Языки</div>
          {languages.map((lang, idx) => (
            <div key={idx} className={styles.languageItem}>
              <span className={styles.languageName}>{lang.name}</span>
              <span className={styles.languageLevel}>{lang.fluency}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
