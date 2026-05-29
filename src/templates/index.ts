import React from "react";
import type { Resume } from "../models/Resume";
import { ModernTemplate } from "./ModernTemplate";
import { ClassicTemplate } from "./ClassicTemplate";
import { MinimalTemplate } from "./MinimalTemplate";

export interface Template {
  id: string;
  name: string;
  component: React.ComponentType<{ resume: Resume }>;
}

export const templates: Template[] = [
  { id: "modern", name: "Современный", component: ModernTemplate },
  { id: "classic", name: "Классический", component: ClassicTemplate },
  { id: "minimal", name: "Минималистичный", component: MinimalTemplate },
];

export const getTemplateById = (id: string): Template => {
  return templates.find((t) => t.id === id) || templates[0];
};

export const TemplatePreview: React.FC<{
  template: Template;
  resume: Resume;
}> = ({ template, resume }) => {
  return React.createElement(template.component, { resume });
};
