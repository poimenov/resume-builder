// import { makeStyles, tokens, Title1 } from "@fluentui/react-components";
// import { DocumentText32Regular } from "@fluentui/react-icons";
// import { useTranslation } from "react-i18next";

// const useStyles = makeStyles({
//   header: {
//     height: "50px",
//     padding: tokens.spacingHorizontalL,
//     display: "flex",
//     alignItems: "center",
//     gap: tokens.spacingHorizontalS,
//   },
// });

// export const Summary: React.FC = () => {
//   const classes = useStyles();
//   const { t } = useTranslation();

//   return (
//     <div>
//       <div className={classes.header}>
//         <DocumentText32Regular />
//         <Title1>{t("summary.title")}</Title1>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { makeStyles, tokens, Title1 } from "@fluentui/react-components";
import { DocumentText20Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { useStore } from "@nanostores/react";
import { $resume, updateSummary } from "../stores/resumeStore";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Minus,
  Quote,
} from "lucide-react";

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
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  content: {
    padding: tokens.spacingHorizontalL,
    maxWidth: "900px",
    margin: "0 auto",
    paddingTop: tokens.spacingVerticalXL,
  },
  editorCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    overflow: "hidden",
    boxShadow: tokens.shadow4,
    transition: "box-shadow 0.2s ease",
    "&:focus-within": {
      boxShadow: tokens.shadow8,
      //borderColor: tokens.colorBrandStroke1,
    },
  },
  toolbar: {
    display: "flex",
    gap: "4px",
    padding: "8px 12px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    flexWrap: "wrap",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  toolbarGroup: {
    display: "flex",
    gap: "2px",
    padding: "0 4px",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:last-child": {
      borderRight: "none",
    },
  },
  toolbarButton: {
    padding: "6px 10px",
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1,
    },
    "&.is-active": {
      backgroundColor: tokens.colorBrandBackground2,
      color: tokens.colorBrandForeground1,
    },
    "& svg": {
      width: "16px",
      height: "16px",
    },
  },
  divider: {
    width: "1px",
    height: "24px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: "0 4px",
  },
  editor: {
    "& .ProseMirror": {
      padding: "20px 24px",
      minHeight: "400px",
      outline: "none",
      fontSize: "14px",
      lineHeight: 1.7,
      color: tokens.colorNeutralForeground1,

      "& p": {
        margin: "0 0 16px 0",
      },

      "& h1": {
        fontSize: "28px",
        fontWeight: 600,
        margin: "24px 0 16px 0",
        color: tokens.colorBrandForeground1,
      },

      "& h2": {
        fontSize: "22px",
        fontWeight: 600,
        margin: "20px 0 12px 0",
        color: tokens.colorNeutralForeground1,
      },

      "& h3": {
        fontSize: "18px",
        fontWeight: 600,
        margin: "16px 0 8px 0",
      },

      "& ul, & ol": {
        margin: "0 0 16px 24px",
      },

      "& li": {
        margin: "4px 0",
      },

      "& blockquote": {
        borderLeft: `3px solid ${tokens.colorBrandStroke1}`,
        margin: "16px 0",
        paddingLeft: "16px",
        color: tokens.colorNeutralForeground2,
        fontStyle: "italic",
      },

      "& a": {
        color: tokens.colorBrandForeground1,
        textDecoration: "underline",
        cursor: "pointer",
      },

      "& strong": {
        fontWeight: 600,
      },

      "& em": {
        fontStyle: "italic",
      },

      "& u": {
        textDecoration: "underline",
      },

      "& s": {
        textDecoration: "line-through",
      },

      "& hr": {
        margin: "24px 0",
        border: "none",
        borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
      },

      "&.ProseMirror-focused": {
        outline: "none",
      },

      "& .ProseMirror-selectednode": {
        backgroundColor: tokens.colorBrandBackground2,
      },

      "& p.is-editor-empty:first-child::before": {
        content: "attr(data-placeholder)",
        float: "left",
        color: tokens.colorNeutralForeground3,
        pointerEvents: "none",
        height: 0,
      },
    },
  },
  hint: {
    marginTop: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
    padding: tokens.spacingVerticalM,
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground2,
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  wordCount: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
});

const MenuBar = ({ editor }: { editor: any }) => {
  const styles = useStyles();

  if (!editor) {
    return null;
  }

  const buttons = [
    {
      group: 1,
      items: [
        {
          icon: <Bold />,
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: editor.isActive("bold"),
          title: "Жирный",
        },
        {
          icon: <Italic />,
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: editor.isActive("italic"),
          title: "Курсив",
        },
        {
          icon: <UnderlineIcon />,
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: editor.isActive("underline"),
          title: "Подчеркнутый",
        },
        {
          icon: <Strikethrough />,
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: editor.isActive("strike"),
          title: "Зачеркнутый",
        },
      ],
    },
    {
      group: 2,
      items: [
        {
          icon: <Heading1 />,
          action: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: editor.isActive("heading", { level: 1 }),
          title: "Заголовок 1",
        },
        {
          icon: <Heading2 />,
          action: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: editor.isActive("heading", { level: 2 }),
          title: "Заголовок 2",
        },
        {
          icon: <Minus />,
          action: () => editor.chain().focus().setHorizontalRule().run(),
          isActive: false,
          title: "Разделитель",
        },
      ],
    },
    {
      group: 3,
      items: [
        {
          icon: <List />,
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: editor.isActive("bulletList"),
          title: "Маркированный список",
        },
        {
          icon: <ListOrdered />,
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: editor.isActive("orderedList"),
          title: "Нумерованный список",
        },
        {
          icon: <Quote />,
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: editor.isActive("blockquote"),
          title: "Цитата",
        },
      ],
    },
    {
      group: 4,
      items: [
        {
          icon: <Undo />,
          action: () => editor.chain().focus().undo().run(),
          isActive: false,
          title: "Отменить",
        },
        {
          icon: <Redo />,
          action: () => editor.chain().focus().redo().run(),
          isActive: false,
          title: "Повторить",
        },
      ],
    },
  ];

  return (
    <div className={styles.toolbar}>
      {buttons.map((group, idx) => (
        <div key={idx} className={styles.toolbarGroup}>
          {group.items.map((button, btnIdx) => (
            <button
              key={btnIdx}
              onClick={button.action}
              className={`${styles.toolbarButton} ${button.isActive ? "is-active" : ""}`}
              title={button.title}
            >
              {button.icon}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Summary: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const resume = useStore($resume);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        horizontalRule: {},
      }),
      Underline,
      Placeholder.configure({
        placeholder:
          "📝 Расскажите о себе, своем опыте, ключевых навыках и достижениях...",
      }),
    ],
    content: resume.summary,
    onUpdate: ({ editor }) => {
      updateSummary(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "ProseMirror",
        "data-placeholder":
          "📝 Расскажите о себе, своем опыте, ключевых навыках и достижениях...",
      },
    },
  });

  // Подсчет слов
  const getWordCount = () => {
    if (!editor) return 0;
    const text = editor.getText();
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const getCharCount = () => {
    if (!editor) return 0;
    return editor.getText().length;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <DocumentText20Regular />
        <Title1>{t("summary.title")}</Title1>
      </div>

      <div className={styles.content}>
        <div className={styles.editorCard}>
          <MenuBar editor={editor} />
          <div className={styles.editor}>
            <EditorContent editor={editor} />
          </div>
          <div className={styles.statusBar}>
            <div className={styles.wordCount}>
              <span>📊 {getWordCount()} слов</span>
              <span>✏️ {getCharCount()} символов</span>
            </div>
            <div>
              <span>💡 Ctrl + B - жирный, Ctrl + I - курсив</span>
            </div>
          </div>
        </div>
        <div className={styles.hint}>
          🎨 Используйте панель инструментов для форматирования текста.
          Создавайте структурированные описания с заголовками и списками.
        </div>
      </div>
    </div>
  );
};
