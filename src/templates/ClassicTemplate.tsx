import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@fluentui/react-components";
import type { Resume } from "../models/Resume";

const useStyles = makeStyles({
  container: {
    width: "100%",
    maxWidth: "21cm",
    margin: "0 auto",
    fontFamily: "'Helvetica', 'Arial', sans-serif",
    color: "#333",
    position: "relative",
  },
  printContainer: {
    maxWidth: "21cm",
    margin: "20px auto",
    width: "100%",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    background: "white",
    "@media print": {
      margin: 0,
      boxShadow: "none",
      borderRadius: 0,
    },
  },
  // Боковая панель
  sidebarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "275px",
    background: "#e9e9e9",
    height: "100%",
  },
  sidebar: {
    position: "absolute",
    zIndex: 1,
    padding: "20px 0 0 20px",
    width: "275px",
    height: "auto",
  },
  avatarBg: {
    position: "relative",
    left: "-120px",
    padding: "100px 30px 60px 30px",
    margin: "-150px 0 0 0",
    width: "475px",
    minHeight: "250px",
    borderRadius: "50%",
    border: "10px solid #2d3260",
    background: "#505476",
  },
  name: {
    position: "relative",
    zIndex: 999,
    textAlign: "center",
    textTransform: "uppercase",
    width: "100%",
    fontSize: "21px",
    letterSpacing: "0.05em",
    color: "#fff",
    margin: 0,
    padding: "35px 70px 15px 70px",
    fontWeight: 600,
    wordBreak: "break-word",
  },
  firstName: {
    display: "block",
  },
  avatar: {
    position: "relative",
    zIndex: 99,
    display: "inline-block",
    padding: 0,
    margin: "-65px 0 0 63px",
    height: "115px",
    width: "115px",
    borderRadius: "50%",
    backgroundSize: "cover !important",
    backgroundColor: "#fff",
    border: "4px solid #fff",
  },
  sidebarData: {
    display: "block",
    marginTop: "20px",
  },
  sidebarTitle: {
    fontStyle: "normal",
    position: "relative",
    width: "calc(100% + 20px)",
    padding: "5px 0 5px 20px",
    margin: "15px 0 5px -20px",
    fontSize: "16px",
    letterSpacing: "0.1em",
    fontWeight: 600,
  },
  sidebarLabel: {
    fontWeight: 600,
  },
  sidebarList: {
    display: "block",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  sidebarItem: {
    display: "block",
    position: "relative",
    fontSize: "12px",
    margin: 0,
    padding: "0 5px 8px 0",
  },
  contactItem: {
    position: "relative",
    paddingLeft: "23px",
    marginBottom: "10px",
    fontSize: "11px",
    lineHeight: 1.4,
    "& svg": {
      position: "absolute",
      top: "2px",
      left: 0,
      width: "15px",
      height: "15px",
      fill: "#505476",
    },
    "& a, & span": {
      color: "#333",
      textDecoration: "none",
      wordBreak: "break-all",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
  skillsKeywords: {
    padding: "2px 0 6px 10px",
    fontSize: "11px",
    opacity: 0.85,
    lineHeight: 1.4,
  },
  languageDots: {
    display: "inline-block",
    float: "right",
    marginRight: "20px",
  },
  langDot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#cbccd6",
    marginLeft: "3px",
    "&.active": {
      background: "#505476",
    },
  },
  // Основное содержимое
  sections: {
    left: "275px",
    paddingTop: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    position: "relative",
    width: "calc(100% - 275px)",
    background: "#fff",
    zIndex: 10,
    minHeight: "500px",
  },
  section: {
    position: "relative",
    width: "100%",
    padding: 0,
  },
  sectionSummary: {
    marginTop: 0,
    marginBottom: "10px",
  },
  sectionSummaryTitle: {
    borderBottom: "1px solid #d2d2d2",
    marginBottom: "10px",
    "& h2": {
      fontSize: "16px",
      fontWeight: 600,
      letterSpacing: "0.1em",
      margin: 0,
      padding: 0,
    },
  },
  sectionTitle: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    zIndex: 99,
    margin: 0,
    fontWeight: 600,
    background: "#fff",
    padding: "10px 0 0 3px",
    borderTop: "1px solid #d2d2d2",
    pageBreakInside: "avoid",
    "& h2": {
      fontSize: "16px",
      fontWeight: 600,
      letterSpacing: "0.1em",
      margin: 0,
      padding: 0,
    },
  },
  sectionHeadingGroup: {
    display: "block",
    margin: 0,
    padding: "0 0 6px 0",
    pageBreakInside: "avoid",
  },
  sectionDate: {
    position: "absolute",
    right: 0,
    top: "12px",
    width: "142px",
    textAlign: "right",
    fontSize: "12px",
    padding: 0,
    margin: 0,
  },
  sectionHeading: {
    display: "block",
    padding: "5px 0 0 0",
    margin: 0,
    "& h3": {
      fontSize: "13px",
      fontWeight: 600,
      margin: 0,
      padding: 0,
      maxWidth: "375px",
    },
  },
  sectionSubHeading: {
    display: "block",
    padding: 0,
    margin: 0,
    fontSize: "12px",
    color: "#505476",
    "& a": {
      color: "#505476",
      textDecoration: "none",
    },
  },
  sectionContent: {
    display: "block",
    padding: "5px 0 0 0",
    margin: 0,
    "& p": {
      color: "#4c4c4c",
      lineHeight: "18px",
      fontWeight: 400,
      margin: 0,
      padding: 0,
    },
    "& ul, & ol": {
      pageBreakInside: "auto",
      whiteSpace: "normal",
      fontWeight: 400,
      listStylePosition: "outside",
      color: "#4c4c4c",
      margin: 0,
      padding: "0 0 0 16px",
    },
    "& li": {
      lineHeight: "18px",
      marginBottom: "4px",
    },
  },
  sectionContentSingle: {
    paddingTop: "5px",
    paddingLeft: "4px",
    paddingBottom: "5px",
    "& ul": {
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& li": {
        marginBottom: "8px",
      },
    },
    "& a, & span": {
      color: "#333",
      textDecoration: "none",
      wordBreak: "break-all",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
  sectionList: {
    display: "block",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  sectionItem: {
    display: "block",
    position: "relative",
    listStyle: "none",
    padding: "0 0 0 4px",
    margin: 0,
    marginBottom: "5px",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  summaryHtml: {
    "& p": {
      marginBottom: "8px",
    },
    "& ul, & ol": {
      margin: "6px 0",
      paddingLeft: "20px",
    },
    "& li": {
      marginBottom: "4px",
    },
    "& a, & span": {
      color: "#333",
      textDecoration: "none",
      wordBreak: "break-all",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
});

export const ClassicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
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

  // Функция для отображения уровня языка точками (1-5)
  const renderLanguageLevel = (level?: number) => {
    if (!level) return null;
    return (
      <span className={styles.languageDots}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`${styles.langDot} ${i <= level ? "active" : ""}`}
          />
        ))}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.printContainer}>
        <div style={{ position: "relative", minHeight: "500px" }}>
          {/* Фон боковой панели */}
          <div className={styles.sidebarBg}></div>

          {/* Боковая панель */}
          <aside className={styles.sidebar}>
            <div className={styles.avatarBg}>
              <h1 className={styles.name}>{basicInfo.name}</h1>
            </div>

            {basicInfo.image && (
              <div
                className={styles.avatar}
                style={{
                  background: `url('${basicInfo.image}') no-repeat center`,
                  backgroundSize: "cover",
                }}
              />
            )}

            {/* Personal Section */}
            <div className={styles.sidebarData}>
              <h2 className={styles.sidebarTitle}>{basicInfo.position}</h2>

              {basicInfo.location && (
                <div className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <span>{basicInfo.location}</span>
                </div>
              )}

              {basicInfo.phone && (
                <div className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span dir="ltr">{basicInfo.phone}</span>
                </div>
              )}

              {basicInfo.email && (
                <div className={styles.contactItem}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <a href={`mailto:${basicInfo.email}`}>{basicInfo.email}</a>
                </div>
              )}

              {links.map((link, idx) => {
                const linkText = link.includes("github")
                  ? "GitHub"
                  : link.includes("linkedin")
                    ? "LinkedIn"
                    : link.replace(/^https?:\/\//, "").split("/")[0];
                return (
                  <div key={idx} className={styles.contactItem}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                    </svg>
                    <a href={link} target="_blank" rel="noopener">
                      {linkText}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className={styles.sidebarData}>
                <h2 className={styles.sidebarTitle}>{t("skills.title")}</h2>
                <ul className={styles.sidebarList}>
                  {skills.map((skill, idx) => (
                    <li key={idx}>
                      <span className={styles.sidebarLabel}>{skill.name}</span>
                      {skill.keywords && skill.keywords.length > 0 && (
                        <div className={styles.skillsKeywords}>
                          {skill.keywords.join(", ")}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages Section */}
            {languages.length > 0 && (
              <div className={styles.sidebarData}>
                <h2 className={styles.sidebarTitle}>{t("languages.title")}</h2>
                <ul className={styles.sidebarList}>
                  {languages.map((lang, idx) => (
                    <li key={idx} className={styles.sidebarItem}>
                      <span className={styles.sidebarLabel}>
                        {lang.name}
                        {lang.fluency && !lang.level && ` (${lang.fluency})`}
                      </span>
                      {renderLanguageLevel(lang.level)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Основное содержимое */}
          <div className={styles.sections}>
            {/* Summary Section */}
            <div className={`${styles.section} ${styles.sectionSummary}`}>
              <div className={styles.sectionSummaryTitle}>
                <h2>{t("summary.title")}</h2>
              </div>
              {summary && (
                <div className={styles.sectionContent}>
                  <div
                    className={styles.summaryHtml}
                    dangerouslySetInnerHTML={{ __html: summary }}
                  />
                </div>
              )}
            </div>

            {/* Work Experience Section */}
            {experiences.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>{t("experiences.title")}</h2>
                </div>
                <ol className={styles.sectionList}>
                  {experiences.map((exp, idx) => (
                    <li key={idx} className={styles.sectionItem}>
                      <div className={styles.sectionHeadingGroup}>
                        <div className={styles.sectionDate}>{exp.period}</div>
                        <div className={styles.sectionHeading}>
                          <h3>{exp.position}</h3>
                        </div>
                        <div className={styles.sectionSubHeading}>
                          {exp.website ? (
                            <a
                              href={exp.website}
                              target="_blank"
                              rel="noopener"
                            >
                              {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )}
                        </div>
                      </div>
                      {exp.description && (
                        <div className={styles.sectionContent}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: exp.description,
                            }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Education Section */}
            {educations.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>{t("educations.title")}</h2>
                </div>
                <ol className={styles.sectionList}>
                  {educations.map((edu, idx) => (
                    <li key={idx} className={styles.sectionItem}>
                      <div className={styles.sectionHeadingGroup}>
                        <div className={styles.sectionDate}>{edu.period}</div>
                        <div className={styles.sectionHeading}>
                          <h3>{edu.degree}</h3>
                        </div>
                        <div className={styles.sectionSubHeading}>
                          {edu.website ? (
                            <a
                              href={edu.website}
                              target="_blank"
                              rel="noopener"
                            >
                              {edu.school}
                            </a>
                          ) : (
                            edu.school
                          )}
                          {edu.location && `, ${edu.location}`}
                        </div>
                      </div>
                      {edu.area && (
                        <div className={styles.sectionContent}>
                          <p>{edu.area}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <h2>{t("certifications.title")}</h2>
                </div>
                <div className={styles.sectionContentSingle}>
                  <ul>
                    {certifications.map((cert, idx) => (
                      <li key={idx}>
                        <strong>{cert.name}</strong>
                        {cert.issuer && ` - ${cert.issuer}`}
                        {cert.date && ` (${cert.date})`}
                        {cert.label && cert.website && (
                          <>
                            {" - "}
                            <a
                              href={cert.website}
                              target="_blank"
                              rel="noopener"
                            >
                              {cert.label}
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
