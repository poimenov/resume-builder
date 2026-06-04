import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, tokens } from "@fluentui/react-components";
import type { Resume } from "../models/Resume";

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily:
      "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', sans-serif",
    backgroundColor: "white",
    borderRadius: tokens.borderRadiusLarge,
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
    fontWeight: "400",
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
  location: {
    fontSize: "11px",
    color: "#aaa",
    marginTop: "2px",
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
  educationPeriod: {
    fontSize: "11px",
    color: "#999",
    marginTop: "2px",
  },
  educationLocation: {
    fontSize: "11px",
    color: "#aaa",
    marginTop: "2px",
  },
  skillsList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  skillItem: {
    fontSize: "13px",
    lineHeight: 1.4,
  },
  skillName: {
    fontWeight: "600",
    color: "#333",
  },
  skillKeywords: {
    color: "#666",
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
    marginRight: tokens.spacingHorizontalS,
    textDecoration: "none",
    fontSize: "12px",
    "&:hover": {
      color: "#111",
      textDecoration: "underline",
    },
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
  certificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  certificationItem: {
    marginBottom: tokens.spacingVerticalXS,
  },
  certificationName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
  },
  certificationIssuer: {
    fontSize: "11px",
    color: "#666",
  },
  certificationDate: {
    fontSize: "10px",
    color: "#999",
  },
  certificationLink: {
    fontSize: "10px",
    color: "#666",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  companyLink: {
    fontSize: "16px",
    fontWeight: "400",
    color: "#555",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const MinimalTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const {
    basicInfo,
    links,
    summary,
    experiences,
    educations,
    certifications,
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
                {basicInfo.name || t("basicInfo.name")}
              </div>
              <div className={styles.title}>
                {basicInfo.position || t("basicInfo.position")}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.name}>
              {basicInfo.name || t("basicInfo.name")}
            </div>
            <div className={styles.title}>
              {basicInfo.position || t("basicInfo.position")}
            </div>
          </>
        )}
        <div className={styles.contactRow}>
          {basicInfo.email && <span>{basicInfo.email}</span>}
          {basicInfo.phone && <span>{basicInfo.phone}</span>}
          {basicInfo.location && <span>{basicInfo.location}</span>}
          <div>
            {links.map((link, idx) => (
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
      </div>

      {/* Summary */}
      {summary && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{t("summary.title")}</div>
          <div
            className={styles.summaryContent}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{t("experiences.title")}</div>
          {experiences.map((exp, idx) => (
            <div key={idx} className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <div>
                  <span className={styles.position}>{exp.position}</span>
                  {exp.website ? (
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.companyLink}
                    >
                      {`, ${exp.company}`}
                    </a>
                  ) : (
                    exp.company && (
                      <span
                        className={styles.company}
                      >{`, ${exp.company}`}</span>
                    )
                  )}
                </div>
                <div className={styles.period}>{exp.period}</div>
              </div>
              {exp.location && (
                <div className={styles.location}>{exp.location}</div>
              )}
              <div className={styles.description}>{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{t("educations.title")}</div>
          {educations.map((edu, idx) => (
            <div key={idx} className={styles.educationItem}>
              <div className={styles.degree}>
                {edu.degree}
                {edu.grade && `, ${edu.grade}`}
              </div>
              <div className={styles.school}>{edu.school}</div>
              {edu.period && (
                <div className={styles.educationPeriod}>{edu.period}</div>
              )}
              {edu.location && (
                <div className={styles.educationLocation}>{edu.location}</div>
              )}
              {edu.area && <div className={styles.description}>{edu.area}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills - упрощенный формат */}
      {skills.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{t("skills.title")}</div>
          <div className={styles.skillsList}>
            {skills.map((skill, idx) => (
              <div key={idx} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name}</span>
                {skill.keywords && skill.keywords.length > 0 && (
                  <span className={styles.skillKeywords}>
                    : {skill.keywords.join(", ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{t("languages.title")}</div>
          {languages.map((lang, idx) => (
            <div key={idx} className={styles.languageRow}>
              <span className={styles.languageName}>{lang.name}</span>
              <span className={styles.languageLevel}>{lang.fluency}</span>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{t("certifications.title")}</div>
          <div className={styles.certificationsList}>
            {certifications.map((cert, idx) => (
              <div key={idx} className={styles.certificationItem}>
                <div className={styles.certificationName}>{cert.name}</div>
                <div>
                  <span className={styles.certificationIssuer}>
                    {cert.issuer}
                  </span>
                  {cert.date && (
                    <span className={styles.certificationDate}>
                      {" • "}
                      {cert.date}
                    </span>
                  )}

                  {cert.label && cert.website && (
                    <span className={styles.certificationDate}>
                      {" • "}
                      <a
                        href={cert.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.certificationLink}
                      >
                        {cert.label}
                      </a>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
