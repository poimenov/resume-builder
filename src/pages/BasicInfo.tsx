import { makeStyles, tokens, Title1, Input } from "@fluentui/react-components";
import { Person32Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import { $resume, updateBasicInfoField } from "../stores/resumeStore";
import { PhotoUpload } from "../components/PhotoUpload";

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
  form: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    maxWidth: "600px",
    margin: "0 auto",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  label: {
    fontWeight: 500,
    fontSize: tokens.fontSizeBase200,
  },
});

export const BasicInfo: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);
  const basicInfo = resume.basicInfo;

  const handleFieldChange = (field: keyof typeof basicInfo, value: string) => {
    updateBasicInfoField(field, value);
  };

  const handlePhotoChange = (base64: string) => {
    updateBasicInfoField("image", base64);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Person32Regular />
        <Title1>{t("basicInfo.title")}</Title1>
      </div>

      <div className={styles.form}>
        <PhotoUpload
          currentPhoto={basicInfo.image}
          onPhotoChange={handlePhotoChange}
        />

        <div className={styles.field}>
          <label className={styles.label}>{t("basicInfo.name")}</label>
          <Input
            value={basicInfo.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            placeholder={t("basicInfo.namePlaceholder")}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{t("basicInfo.position")}</label>
          <Input
            value={basicInfo.position}
            onChange={(e) => handleFieldChange("position", e.target.value)}
            placeholder={t("basicInfo.positionPlaceholder")}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{t("basicInfo.email")}</label>
          <Input
            type="email"
            value={basicInfo.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            placeholder={t("basicInfo.emailPlaceholder")}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{t("basicInfo.phone")}</label>
          <Input
            value={basicInfo.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            placeholder={t("basicInfo.phonePlaceholder")}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{t("basicInfo.location")}</label>
          <Input
            value={basicInfo.location}
            onChange={(e) => handleFieldChange("location", e.target.value)}
            placeholder={t("basicInfo.locationPlaceholder")}
          />
        </div>
      </div>
    </div>
  );
};
