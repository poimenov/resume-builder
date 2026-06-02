import React, { useRef } from "react";
import { Button, makeStyles, tokens, Text } from "@fluentui/react-components";
import { Image20Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  preview: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  previewContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalM,
  },
  buttonContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    justifyContent: "center",
  },
  placeholder: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px dashed ${tokens.colorNeutralStroke1}`,
  },
});

interface PhotoUploadProps {
  currentPhoto?: string;
  onPhotoChange: (base64: string) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  currentPhoto,
  onPhotoChange,
}) => {
  const styles = useStyles();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith("image/")) {
      alert(t("photoUpload.selectPhotoAlert"));
      return;
    }

    // Проверяем размер (максимум 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert(t("photoUpload.sizePhotoAlert"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      onPhotoChange(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onPhotoChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.previewContainer}>
        {currentPhoto ? (
          <img src={currentPhoto} alt="Profile" className={styles.preview} />
        ) : (
          <div className={styles.placeholder}>
            <Image20Regular fontSize={40} />
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button appearance="primary" onClick={handleClick}>
          {t("photoUpload.upload")}
        </Button>
        {currentPhoto && (
          <Button appearance="secondary" onClick={handleRemovePhoto}>
            {t("photoUpload.remove")}
          </Button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <Text size={200} align="center">
        {t("photoUpload.uploadHint")}
      </Text>
    </div>
  );
};
