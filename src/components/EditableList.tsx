// src/components/EditableList.tsx
import React, { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogTrigger,
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

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  item: {
    padding: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
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
    gap: tokens.spacingVerticalM,
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

export interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "textarea" | "email" | "url";
  placeholder?: string; // Добавляем поле placeholder
  required?: boolean;
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
  titleAdd?: string;
  titleEdit?: string;
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
  titleAdd = "Добавить",
  titleEdit = "Редактировать",
}: EditableListProps<T>) {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<T>>({});

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
    setFormData((prev) => ({ ...prev, [field]: value }));
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
                aria-label="Редактировать"
              />
              <ToolbarButton
                icon={<Delete20Regular />}
                onClick={() => deleteItem(index)}
                aria-label="Удалить"
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
                    <label className={styles.label}>{field.label}</label>
                    {field.type === "textarea" ? (
                      <Textarea
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          handleFieldChange(field.name, e.target.value)
                        }
                        rows={4}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <Input
                        type={field.type || "text"}
                        value={formData[field.name] || ""}
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
                Отмена
              </Button>
              <Button appearance="primary" onClick={handleSave}>
                Сохранить
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
