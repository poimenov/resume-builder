import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@fluentui/react-components";
import type { Resume } from "../models/Resume";

const useStyles = makeStyles({
  container: {
    fontFamily: "'Roboto Condensed', 'Helvetica Condensed', sans-serif",
    color: "#1f2937",
    fontSize: "14px",
    lineHeight: 1.3,
    maxWidth: "210mm",
    margin: "0 auto",
    width: "100%",
  },
  resumePreview: {
    "--sidebar-width": "35%",
    "--primary-color": "#475569",
    "--bg-color": "#ffffff",
    "--text-color": "#1f2937",
    background: "var(--bg-color)",
    color: "var(--text-color)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    overflow: "hidden",
    width: "100%",
  },
  pageHeader: {
    background: "var(--primary-color)",
    color: "white",
  },
  headerMain: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
  },
  profilePicture: {
    width: "var(--sidebar-width)",
    height: "120px",
    textAlign: "center",
    "& img": {
      width: "120px",
      height: "120px",
      borderRadius: "12px",
      border: "1px solid white",
      background: "#f3f4f6",
      objectFit: "cover",
    },
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: "32px",
    fontWeight: 600,
    marginBottom: "4px",
  },
  profileHeadline: {
    fontSize: "18px",
    opacity: 0.9,
    fontWeight: 400,
  },
  contactBar: {
    background: "white",
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
  },
  contactItems: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px 24px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    "& svg": {
      width: "18px",
      height: "18px",
      fill: "var(--primary-color)",
      flexShrink: 0,
    },
    "& a, & span": {
      color: "#4b5563",
      textDecoration: "none",
    },
    "& a:hover": {
      color: "var(--primary-color)",
      textDecoration: "underline",
    },
  },
  mainLayout: {
    display: "flex",
    padding: "12px",
    gap: "12px",
  },
  sidebar: {
    width: "var(--sidebar-width)",
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  pageSection: {
    marginBottom: "2px",
    "& h6": {
      color: "var(--primary-color)",
      fontSize: "18px",
      fontWeight: 600,
      marginTop: "0px",
      marginBottom: "2px",
      paddingBottom: "2px",
      borderBottom: "2px solid var(--primary-color)",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
  },
  sectionContent: {
    "& p": {
      marginBottom: "6px",
    },
    "& ul, & ol": {
      margin: "6px 0",
      paddingLeft: "24px",
    },
    "& li": {
      marginBottom: "6px",
    },
    "& strong": {
      color: "#1f2937",
    },
    "& a, & span": {
      color: "#4b5563",
      textDecoration: "none",
    },
    "& a:hover": {
      color: "var(--primary-color)",
      textDecoration: "underline",
    },
  },
  sectionItem: {
    paddingBottom: "4px",
  },
  sectionItemHeader: {
    marginBottom: "2px",
  },
  sectionItemTitle: {
    fontWeight: 600,
    fontSize: "16px",
    color: "#1f2937",
    textDecoration: "none",
  },
  sectionItemMetadata: {
    fontSize: "14px",
    color: "#6b7280",
  },
  sectionItemKeywords: {
    fontSize: "14px",
    color: "#4b5563",
    marginTop: "2px",
  },
  sectionItemDescription: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#4b5563",
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "2px",
  },
  textEnd: {
    textAlign: "right",
  },
  shrink0: {
    flexShrink: 0,
  },
  inlineBlock: {
    display: "inline-block",
  },
  breakAll: {
    wordBreak: "break-all",
  },
  opacity80: {
    opacity: 0.8,
  },
  languagesItem: {
    marginTop: "4px",
  },
  languageLevel: {
    display: "flex",
    gap: "6px",
    marginTop: "2px",
    marginBottom: "2px",
  },
  levelDot: {
    width: "12px",
    height: "12px",
    border: "1px solid var(--primary-color)",
    borderRadius: "50%",
    "&.active": {
      background: "var(--primary-color)",
    },
  },
  summaryContent: {
    "& p": {
      marginBottom: "6px",
    },
    "& ul, & ol": {
      margin: "6px 0",
      paddingLeft: "24px",
    },
    "& li": {
      marginBottom: "6px",
    },
  },
});

// Вспомогательная функция для отображения уровня языка (1-5)
const renderLanguageLevel = (level?: number, fluency?: string) => {
  // Если есть level от 1 до 5
  if (level && level >= 1 && level <= 5) {
    return (
      <div className={useStyles().languageLevel}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`${useStyles().levelDot} ${i <= level ? "active" : ""}`}
          />
        ))}
      </div>
    );
  }
  // Если есть fluency текст
  if (fluency) {
    return <span className={useStyles().sectionItemMetadata}>{fluency}</span>;
  }
  return null;
};

export const ModernTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const styles = useStyles();
  const { t } = useTranslation();
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

  // Группировка навыков по категориям (если keywords используются как категории)
  // Или просто отображение списка навыков
  const hasGroupedSkills = skills.some(
    (skill) => skill.keywords && skill.keywords.length > 0,
  );
  const hasSimpleSkills = skills.some(
    (skill) => !skill.keywords || skill.keywords.length === 0,
  );

  return (
    <div className={styles.container}>
      <div className={styles.resumePreview}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerMain}>
            <div className={styles.profilePicture}>
              {basicInfo.image && (
                <img src={basicInfo.image} alt={basicInfo.name} />
              )}
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>
                {basicInfo.name || "Имя Фамилия"}
              </h2>
              <p className={styles.profileHeadline}>
                {basicInfo.position || "Профессиональная роль"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className={styles.contactBar}>
          <div className={styles.contactItems}>
            {basicInfo.email && (
              <div className={styles.contactItem}>
                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
                </svg>
                <a href={`mailto:${basicInfo.email}`} target="_blank">
                  {basicInfo.email}
                </a>
              </div>
            )}
            {basicInfo.phone && (
              <div className={styles.contactItem}>
                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80a40.2,40.2,0,0,1,34.87-40,.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" />
                </svg>
                <span>{basicInfo.phone}</span>
              </div>
            )}
            {basicInfo.location && (
              <div className={styles.contactItem}>
                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
                </svg>
                <span>{basicInfo.location}</span>
              </div>
            )}
            {links.map((link, idx) => (
              <div key={idx} className={styles.contactItem}>
                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z" />
                </svg>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener"
                  className={styles.inlineBlock + " " + styles.breakAll}
                >
                  {
                    link
                      .replace(/^https?:\/\//, "")
                      .replace(/\/$/, "")
                      .split("/")[0]
                  }
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Main Layout - Two Columns */}
        <div className={styles.mainLayout}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Skills Section */}
            {skills.length > 0 && (
              <section className={styles.pageSection}>
                <h6>{t("skills.title")}</h6>
                <div className={styles.sectionContent}>
                  {hasGroupedSkills ? (
                    // Группированные навыки (с keywords)
                    skills
                      .filter((s) => s.keywords && s.keywords.length > 0)
                      .map((skill, idx) => (
                        <div key={idx} className={styles.sectionItem}>
                          <div className={styles.sectionItemHeader}>
                            <strong className={styles.sectionItemTitle}>
                              {skill.name}
                            </strong>
                          </div>
                          <div
                            className={
                              styles.sectionItemKeywords +
                              " " +
                              styles.opacity80
                            }
                          >
                            {skill.keywords?.join(", ")}
                          </div>
                        </div>
                      ))
                  ) : hasSimpleSkills ? (
                    // Простые навыки (без keywords)
                    <div className={styles.sectionItem}>
                      <div
                        className={
                          styles.sectionItemKeywords + " " + styles.opacity80
                        }
                      >
                        {skills.map((s) => s.name).join(", ")}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <section className={styles.pageSection}>
                <h6>{t("certifications.title")}</h6>
                <div className={styles.sectionContent}>
                  {certifications.map((cert, idx) => (
                    <div key={idx} className={styles.sectionItem}>
                      <div className={styles.sectionItemHeader}>
                        <div className={styles.flexBetween}>
                          <strong className={styles.sectionItemTitle}>
                            {cert.name}
                          </strong>
                          {cert.date && (
                            <span
                              className={
                                styles.sectionItemMetadata +
                                " " +
                                styles.shrink0 +
                                " " +
                                styles.textEnd
                              }
                            >
                              {cert.date}
                            </span>
                          )}
                        </div>
                        <div className={styles.flexBetween}>
                          {cert.issuer && (
                            <span className={styles.sectionItemMetadata}>
                              {cert.issuer}
                            </span>
                          )}
                          {cert.label && (
                            <a
                              href={cert.website}
                              target="_blank"
                              rel="noopener"
                              className={
                                styles.inlineBlock + " " + styles.breakAll
                              }
                            >
                              {cert.label}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages Section */}
            {languages.length > 0 && (
              <section className={styles.pageSection}>
                <h6>{t("languages.title")}</h6>
                <div className={styles.sectionContent}>
                  {languages.map((lang, idx) => (
                    <div key={idx} className={styles.languagesItem}>
                      <div className={styles.sectionItemHeader}>
                        <strong className={styles.sectionItemTitle}>
                          {lang.name}
                        </strong>
                        {lang.fluency && !lang.level && (
                          <span
                            className={
                              styles.sectionItemMetadata +
                              " " +
                              styles.opacity80
                            }
                          >
                            {lang.fluency}
                          </span>
                        )}
                      </div>
                      {renderLanguageLevel(lang.level, lang.fluency)}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Main Content */}
          <div className={styles.content}>
            {/* Summary Section */}
            {summary && (
              <section className={styles.pageSection}>
                <h6>{t("summary.title")}</h6>
                <div className={styles.sectionContent}>
                  <div
                    className={styles.summaryContent}
                    dangerouslySetInnerHTML={{ __html: summary }}
                  />
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <section className={styles.pageSection}>
                <h6>{t("experiences.title")}</h6>
                <div className={styles.sectionContent}>
                  {experiences.map((exp, idx) => (
                    <div key={idx} className={styles.sectionItem}>
                      <div className={styles.sectionItemHeader}>
                        <div className={styles.flexBetween}>
                          {exp.website ? (
                            <a
                              href={exp.website}
                              target="_blank"
                              rel="noopener"
                              className={styles.sectionItemTitle}
                            >
                              <strong>{exp.company}</strong>
                            </a>
                          ) : (
                            <strong className={styles.sectionItemTitle}>
                              {exp.company}
                            </strong>
                          )}
                          {exp.location && (
                            <span
                              className={
                                styles.sectionItemMetadata +
                                " " +
                                styles.shrink0 +
                                " " +
                                styles.textEnd
                              }
                            >
                              {exp.location}
                            </span>
                          )}
                        </div>
                        <div className={styles.flexBetween}>
                          <span className={styles.sectionItemMetadata}>
                            {exp.position}
                          </span>
                          {exp.period && (
                            <span
                              className={
                                styles.sectionItemMetadata +
                                " " +
                                styles.shrink0 +
                                " " +
                                styles.textEnd
                              }
                            >
                              {exp.period}
                            </span>
                          )}
                        </div>
                      </div>
                      {exp.description && (
                        <div className={styles.sectionItemDescription}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: exp.description,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {educations.length > 0 && (
              <section className={styles.pageSection}>
                <h6>{t("educations.title")}</h6>
                <div className={styles.sectionContent}>
                  {educations.map((edu, idx) => (
                    <div key={idx} className={styles.sectionItem}>
                      <div className={styles.sectionItemHeader}>
                        <div className={styles.flexBetween}>
                          {edu.website ? (
                            <a
                              href={edu.website}
                              target="_blank"
                              rel="noopener"
                              className={styles.sectionItemTitle}
                            >
                              <strong>{edu.school}</strong>
                            </a>
                          ) : (
                            <strong className={styles.sectionItemTitle}>
                              {edu.school}
                            </strong>
                          )}
                          <span
                            className={
                              styles.sectionItemMetadata +
                              " " +
                              styles.shrink0 +
                              " " +
                              styles.textEnd
                            }
                          >
                            {edu.degree} • {edu.grade}
                          </span>
                        </div>
                        <div className={styles.flexBetween}>
                          <span className={styles.sectionItemMetadata}>
                            {edu.area}
                          </span>
                          {(edu.period || edu.location) && (
                            <span
                              className={
                                styles.sectionItemMetadata +
                                " " +
                                styles.shrink0 +
                                " " +
                                styles.textEnd
                              }
                            >
                              {edu.location && `${edu.location} • `}
                              {edu.period}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
