import React from "react";
import type { Resume } from "../models/Resume";
import { getTemplateById } from "../templates/index";

interface PrintResumeProps {
  resume: Resume;
  templateId: string;
}

export const PrintResume: React.FC<PrintResumeProps> = ({
  resume,
  templateId,
}) => {
  const template = getTemplateById(templateId);
  const TemplateComponent = template.component;

  return (
    <div className="print-container">
      <TemplateComponent resume={resume} />
    </div>
  );
};
