import type { Resume } from "../models/Resume";
import { getTemplateById } from "../templates/index";

// Создаем React компонент в строку для печати
export const generatePrintHTML = (
  resume: Resume,
  templateId: string,
): string => {
  const template = getTemplateById(templateId);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${resume.basicInfo.name || "Resume"} - ${new Date().toLocaleDateString()}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          /* Базовые стили */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5;
            color: #1a1a1a;
            background: white;
            padding: 20px;
          }

          /* Контейнер резюме */
          .resume-print {
            max-width: 800px;
            margin: 0 auto;
            background: white;
          }

          /* Стили для печати */
          @media print {
            body {
              padding: 0;
              margin: 0;
            }

            .resume-print {
              max-width: 100%;
              margin: 0;
              padding: 15px;
            }

            /* Избегаем разрывов */
            .page-break-inside-avoid {
              page-break-inside: avoid;
            }

            h1, h2, h3, h4 {
              page-break-after: avoid;
            }

            p, ul, table {
              page-break-inside: avoid;
            }
          }

          /* Стили для контента (скопируйте их из ваших шаблонов) */
          ${getTemplateStyles(templateId)}
        </style>
        <script>
          window.onload = () => {
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 500);
            }, 100);
          };
        </script>
      </head>
      <body>
        <div class="resume-print">
          <!-- Здесь должен быть рендер компонента шаблона -->
          <!-- В реальном приложении используйте ReactDOMServer.renderToString() -->
          <div class="resume-content">
            <h1>${resume.basicInfo.name || ""}</h1>
            <h3>${resume.basicInfo.position || ""}</h3>
            <p>${resume.basicInfo.email || ""} | ${resume.basicInfo.phone || ""} | ${resume.basicInfo.location || ""}</p>

            ${resume.summary ? `<h2>О себе</h2><p>${resume.summary}</p>` : ""}

            ${
              resume.experiences.length > 0
                ? "<h2>Опыт работы</h2>" +
                  resume.experiences
                    .map(
                      (exp) => `
                <div class="experience">
                  <h3>${exp.position} - ${exp.company}</h3>
                  <p>${exp.period} | ${exp.location}</p>
                  <p>${exp.description}</p>
                </div>
              `,
                    )
                    .join("")
                : ""
            }

            ${
              resume.educations.length > 0
                ? "<h2>Образование</h2>" +
                  resume.educations
                    .map(
                      (edu) => `
                <div class="education">
                  <h3>${edu.degree} - ${edu.school}</h3>
                  <p>${edu.period} | ${edu.location}</p>
                  <p>${edu.grade}</p>
                </div>
              `,
                    )
                    .join("")
                : ""
            }

            ${
              resume.skills.length > 0
                ? "<h2>Навыки</h2><ul>" +
                  resume.skills
                    .map((skill) => `<li>${skill.name}</li>`)
                    .join("") +
                  "</ul>"
                : ""
            }
          </div>
        </div>
      </body>
    </html>
  `;
};

const getTemplateStyles = (templateId: string): string => {
  // Базовые стили для всех шаблонов
  const baseStyles = `
    .resume-content { padding: 20px; }
    h1 { font-size: 28px; margin-bottom: 10px; }
    h2 { font-size: 20px; margin: 20px 0 10px 0; border-bottom: 2px solid #333; }
    h3 { font-size: 16px; margin: 10px 0 5px 0; }
    p { margin: 5px 0; }
    ul { margin: 10px 0 0 20px; }
    .experience, .education { margin-bottom: 15px; }
  `;

  // Можно добавить специфичные стили для разных шаблонов
  const templateStyles: Record<string, string> = {
    modern: `
      h1 { color: #2c3e50; }
      h2 { color: #34495e; border-bottom-color: #3498db; }
    `,
    classic: `
      .resume-content { font-family: 'Times New Roman', serif; }
      h1 { text-align: center; }
    `,
    minimal: `
      * { margin: 0; padding: 0; }
      .resume-content { padding: 10px; }
      h2 { border-bottom: 1px solid #ccc; }
    `,
  };

  return baseStyles + (templateStyles[templateId] || "");
};

export const exportToPDF = (resume: Resume, templateId: string): void => {
  const printHTML = generatePrintHTML(resume, templateId);
  const printWindow = window.open(
    "",
    "_blank",
    "width=800,height=600,toolbar=yes,menubar=yes",
  );

  if (printWindow) {
    printWindow.document.write(printHTML);
    printWindow.document.close();
  } else {
    alert("Пожалуйста, разрешите всплывающие окна для печати резюме");
  }
};
