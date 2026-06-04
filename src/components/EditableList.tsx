import React, { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Input,
  Textarea,
  makeStyles,
  tokens,
  ToolbarButton,
} from "@fluentui/react-components";
import {
  Add20Regular,
  Edit20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  item: {
    padding: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateX(4px)",
      boxShadow: tokens.shadow4,
    },
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
  },
  itemTitle: {
    fontWeight: 600,
    fontSize: tokens.fontSizeBase400,
  },
  itemSubtitle: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  actions: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
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
  hint: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  area: {
    "& textarea": {
      lineHeight: "20px",
      minHeight: "90px",
    },
    "& textarea::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "& textarea::-webkit-scrollbar-track": {
      background: tokens.colorNeutralStroke2,
      borderRadius: "4px",
    },
    "& textarea::-webkit-scrollbar-thumb": {
      background: tokens.colorNeutralStroke1,
      borderRadius: "4px",
      "&:hover": {
        background: tokens.colorBrandStroke1,
      },
    },
  },
});

export interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "textarea" | "email" | "url" | "keywords";
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

interface EditableListProps<T> {
  items: T[];
  fields: FieldConfig[];
  renderItem: (item: T, index: number) => React.ReactNode;
  addItem: (item: T) => void;
  updateItem: (index: number, item: Partial<T>) => void;
  deleteItem: (index: number) => void;
  getItemTitle: (item: T) => string;
  getItemSubtitle?: (item: T) => string;
  titleAdd: string;
  titleEdit: string;
}

export function EditableList<T extends Record<string, any>>({
  items,
  fields,
  renderItem,
  addItem,
  updateItem,
  deleteItem,
  getItemTitle,
  getItemSubtitle,
  titleAdd,
  titleEdit,
}: EditableListProps<T>) {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<T>>({});
  const { t } = useTranslation();

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({});
    setIsOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(items[index]);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editingIndex === null) {
      addItem(formData as T);
    } else {
      updateItem(editingIndex, formData);
    }
    setIsOpen(false);
    setFormData({});
    setEditingIndex(null);
  };

  const handleFieldChange = (field: string, value: string) => {
    if (fields.find((f) => f.name === field && f.type === "keywords")) {
      const keywords = value
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);
      setFormData((prev) => ({ ...prev, [field]: keywords }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const getFieldValue = (field: FieldConfig) => {
    const value = formData[field.name];
    if (field.type === "keywords" && Array.isArray(value)) {
      return value.join(", ");
    }
    return value || "";
  };

  return (
    <div className={styles.container}>
      <Button
        appearance="primary"
        icon={<Add20Regular />}
        onClick={handleOpenAdd}
      >
        {titleAdd}
      </Button>

      {items.map((item, index) => (
        <Card key={index} className={styles.item}>
          <div className={styles.itemHeader}>
            <div>
              <div className={styles.itemTitle}>{getItemTitle(item)}</div>
              {getItemSubtitle && (
                <div className={styles.itemSubtitle}>
                  {getItemSubtitle(item)}
                </div>
              )}
            </div>
            <div className={styles.actions}>
              <ToolbarButton
                icon={<Edit20Regular />}
                onClick={() => handleOpenEdit(index)}
                aria-label={t("actions.edit")}
              />
              <ToolbarButton
                icon={<Delete20Regular />}
                onClick={() => deleteItem(index)}
                aria-label={t("actions.delete")}
              />
            </div>
          </div>
          {renderItem(item, index)}
        </Card>
      ))}

      <Dialog open={isOpen} onOpenChange={(_, data) => setIsOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              {editingIndex === null ? titleAdd : titleEdit}
            </DialogTitle>
            <DialogContent>
              <div className={styles.form}>
                {fields.map((field) => (
                  <div key={field.name} className={styles.field}>
                    <label className={styles.label}>
                      {field.label}
                      {field.required && (
                        <span
                          style={{
                            color: tokens.colorPaletteRedForeground1,
                            marginLeft: "4px",
                          }}
                        >
                          *
                        </span>
                      )}
                    </label>
                    {field.type === "textarea" ? (
                      <Textarea
                        className={styles.area}
                        value={getFieldValue(field)}
                        onChange={(e) =>
                          handleFieldChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        rows={4}
                      />
                    ) : field.type === "keywords" ? (
                      <>
                        <Textarea
                          className={styles.area}
                          value={getFieldValue(field)}
                          onChange={(e) =>
                            handleFieldChange(field.name, e.target.value)
                          }
                          placeholder={
                            field.placeholder || t("Skills.keywordsPlaceholder")
                          }
                          rows={3}
                        />
                        {field.hint && (
                          <div className={styles.hint}>{field.hint}</div>
                        )}
                      </>
                    ) : (
                      <Input
                        type={field.type || "text"}
                        value={getFieldValue(field)}
                        onChange={(e) =>
                          handleFieldChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsOpen(false)}>
                {t("actions.cancel")}
              </Button>
              <Button appearance="primary" onClick={handleSave}>
                {t("actions.save")}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
