// src/pages/PrintPage.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTemplateById } from "../templates";
import type { Resume } from "../models/Resume";

export const PrintPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [resume, setResume] = useState<Resume | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const templateId = searchParams.get("template") || "modern";

  useEffect(() => {
    console.log("PrintPage: Starting to load resume...");

    // Загружаем данные из localStorage
    const loadResume = () => {
      try {
        const savedResumeStr = localStorage.getItem("resume_for_print");
        console.log("Raw data from localStorage:", savedResumeStr);

        if (savedResumeStr) {
          const savedData = JSON.parse(savedResumeStr);
          console.log("Parsed data:", savedData);

          let resumeData = null;
          if (savedData.resume) {
            resumeData = savedData.resume;
          } else if (savedData.basicInfo) {
            resumeData = savedData;
          }

          if (resumeData && resumeData.basicInfo) {
            console.log("Resume loaded:", resumeData.basicInfo.name);
            setResume(resumeData);
          } else {
            setError("Не удалось загрузить данные резюме");
          }
        } else {
          setError("Нет сохраненных данных резюме");
        }
      } catch (error) {
        console.error("Error loading resume:", error);
        setError("Ошибка загрузки данных");
      }
    };

    loadResume();
  }, []);

  useEffect(() => {
    if (resume) {
      console.log("Resume loaded, preparing for print...");
      // Даем время для рендера
      const renderTimer = setTimeout(() => {
        setIsReady(true);
        // Даем время на отрисовку, затем вызываем печать
        const printTimer = setTimeout(() => {
          window.print();
          // Закрываем окно через 3 секунды после печати
          const closeTimer = setTimeout(() => window.close(), 3000);
          return () => clearTimeout(closeTimer);
        }, 500);
        return () => clearTimeout(printTimer);
      }, 500);
      return () => clearTimeout(renderTimer);
    }
  }, [resume]);

  // Добавляем стили для печати
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        body {
          margin: 0;
          padding: 0;
          background: white;
        }

        .no-print {
          display: none !important;
        }

        .print-container {
          max-width: 100% !important;
          margin: 0 !important;
          padding: 15px !important;
        }

        .page-break-inside-avoid {
          page-break-inside: avoid;
        }
      }

      body {
        background: #f0f0f0;
        padding: 20px;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .print-container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .loading-container, .error-container {
        max-width: 600px;
        margin: 100px auto;
        padding: 40px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        text-align: center;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button
          onClick={() => window.close()}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            background: "#0078d4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Закрыть
        </button>
      </div>
    );
  }

  if (!isReady || !resume) {
    return (
      <div className="loading-container">
        <h2>Загрузка данных резюме...</h2>
        <p>Пожалуйста, подождите</p>
        <div
          style={{
            width: "40px",
            height: "40px",
            margin: "20px auto",
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #0078d4",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const template = getTemplateById(templateId);
  const TemplateComponent = template.component;

  console.log("PrintPage rendering with resume:", resume.basicInfo.name);

  return (
    <div className="print-container">
      <TemplateComponent resume={resume} />
      <div
        className="no-print"
        style={{
          textAlign: "center",
          padding: "20px",
          background: "#f0f0f0",
          fontSize: "14px",
          color: "#666",
          borderTop: "1px solid #ddd",
          marginTop: "20px",
        }}
      >
        <p>📄 Нажмите Ctrl+P (Cmd+P на Mac) для печати или сохранения в PDF</p>
        <p>
          🖨️ Для лучшего результата выберите "Сохранить как PDF" в настройках
          печати
        </p>
        <button
          onClick={() => window.print()}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#0078d4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Печать
        </button>
      </div>
    </div>
  );
};
