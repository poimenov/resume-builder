import type { Resume } from "../models/Resume";

// Экспорт резюме в JSON файл
export const exportToJSON = (resume: Resume): void => {
  try {
    // Создаем копию резюме для экспорта (убираем возможные циклические ссылки)
    const exportData = JSON.parse(JSON.stringify(resume));

    // Добавляем метаданные
    const exportPackage = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      app: "ResumeBuilder PWA",
      resume: exportData,
    };

    // Конвертируем в JSON строку с форматированием
    const jsonString = JSON.stringify(exportPackage, null, 2);

    // Создаем blob и ссылку для скачивания
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Формируем имя файла
    const fileName = `resume_${resume.basicInfo.name || "untitled"}_${Date.now()}.json`;

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Очищаем
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Ошибка экспорта JSON:", error);
    alert("Не удалось экспортировать резюме. Проверьте консоль для деталей.");
  }
};

// Импорт резюме из JSON файла
export const importFromJSON = (
  file: File,
  onSuccess: (resume: Resume) => void,
  onError?: (error: string) => void,
): void => {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const content = event.target?.result as string;
      const importedData = JSON.parse(content);

      // Поддерживаем два формата: с оберткой и без
      let resumeData: Resume;

      if (importedData.resume && importedData.version) {
        // Новый формат с оберткой
        resumeData = importedData.resume;
      } else {
        // Старый формат (прямое резюме)
        resumeData = importedData;
      }

      // Валидация структуры резюме
      if (!isValidResume(resumeData)) {
        throw new Error("Неверная структура файла резюме");
      }

      // Нормализуем данные (заполняем отсутствующие поля)
      const normalizedResume = normalizeResume(resumeData);

      onSuccess(normalizedResume);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ошибка парсинга JSON файла";
      console.error("Ошибка импорта:", error);
      if (onError) {
        onError(errorMessage);
      } else {
        alert(`Ошибка импорта: ${errorMessage}`);
      }
    }
  };

  reader.onerror = () => {
    const errorMessage = "Не удалось прочитать файл";
    if (onError) {
      onError(errorMessage);
    } else {
      alert(errorMessage);
    }
  };

  reader.readAsText(file);
};

// Валидация структуры резюме
const isValidResume = (data: any): data is Resume => {
  return (
    data &&
    typeof data === "object" &&
    data.basicInfo &&
    typeof data.basicInfo === "object" &&
    Array.isArray(data.experiences) &&
    Array.isArray(data.educations) &&
    Array.isArray(data.skills) &&
    Array.isArray(data.languages)
  );
};

// Нормализация данных (заполняем отсутствующие поля значениями по умолчанию)
const normalizeResume = (importedResume: Partial<Resume>): Resume => {
  return {
    basicInfo: {
      name: importedResume.basicInfo?.name || "",
      email: importedResume.basicInfo?.email || "",
      phone: importedResume.basicInfo?.phone || "",
      location: importedResume.basicInfo?.location || "",
      position: importedResume.basicInfo?.position || "",
      image: importedResume.basicInfo?.image || undefined,
    },
    links: importedResume.links || [],
    summary: importedResume.summary || "",
    experiences: importedResume.experiences || [],
    educations: importedResume.educations || [],
    skills: importedResume.skills || [],
    languages: importedResume.languages || [],
  };
};

// Экспорт в JSON через системный диалог (используя file-saver)
export const exportToJSONWithSaveAs = async (resume: Resume): Promise<void> => {
  try {
    // Проверяем поддержку showSaveFilePicker
    if ("showSaveFilePicker" in window) {
      const exportPackage = {
        version: "1.0.0",
        exportedAt: new Date().toISOString(),
        app: "ResumeBuilder PWA",
        resume: JSON.parse(JSON.stringify(resume)),
      };

      const jsonString = JSON.stringify(exportPackage, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });

      // @ts-ignore - File System Access API
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `resume_${resume.basicInfo.name || "untitled"}.json`,
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    } else {
      // Fallback для браузеров без поддержки File System Access API
      exportToJSON(resume);
    }
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Ошибка экспорта:", error);
      alert("Не удалось экспортировать резюме");
    }
  }
};
