import { map } from "nanostores";
import type {
  Resume,
  Experience,
  Education,
  Language,
  Skill,
  Certification,
  BasicInfo,
} from "../models/Resume";

const initialResume: Resume = {
  basicInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    position: "",
    image: "",
  },
  links: [],
  summary: "",
  experiences: [],
  educations: [],
  skills: [],
  languages: [],
};

export const $resume = map<Resume>(initialResume);

export const updateBasicInfoField = <K extends keyof BasicInfo>(
  field: K,
  value: BasicInfo[K],
) => {
  const current = $resume.get().basicInfo;
  $resume.setKey("basicInfo", { ...current, [field]: value });
};

export const updateBasicInfo = (info: Partial<BasicInfo>) => {
  const current = $resume.get().basicInfo;
  $resume.setKey("basicInfo", { ...current, ...info });
};

export const updateSummary = (summary: string) => {
  $resume.setKey("summary", summary);
};

export const updateLinks = (links: string[]) => {
  $resume.setKey("links", links);
};

export const addExperience = (exp: Experience) => {
  const current = $resume.get().experiences;
  $resume.setKey("experiences", [...current, exp]);
};

export const updateExperience = (
  index: number,
  updatedExp: Partial<Experience>,
) => {
  const current = $resume.get().experiences;
  const next = [...current];
  if (next[index]) {
    next[index] = { ...next[index], ...updatedExp };
    $resume.setKey("experiences", next);
  }
};

export const removeExperience = (index: number) => {
  const current = $resume.get().experiences;
  $resume.setKey(
    "experiences",
    current.filter((_, i) => i !== index),
  );
};

export const addEducation = (edu: Education) => {
  const current = $resume.get().educations;
  $resume.setKey("educations", [...current, edu]);
};

export const updateEducation = (
  index: number,
  updatedEdu: Partial<Education>,
) => {
  const current = $resume.get().educations;
  const next = [...current];
  if (next[index]) {
    next[index] = { ...next[index], ...updatedEdu };
    $resume.setKey("educations", next);
  }
};

export const removeEducation = (index: number) => {
  const current = $resume.get().educations;
  $resume.setKey(
    "educations",
    current.filter((_, i) => i !== index),
  );
};

export const addSkill = (skill: Skill) => {
  const current = $resume.get().skills;
  $resume.setKey("skills", [...current, skill]);
};

export const updateSkill = (index: number, updatedSkill: Partial<Skill>) => {
  const current = $resume.get().skills;
  const next = [...current];
  if (next[index]) {
    next[index] = { ...next[index], ...updatedSkill };
    $resume.setKey("skills", next);
  }
};

export const removeSkill = (index: number) => {
  const current = $resume.get().skills;
  $resume.setKey(
    "skills",
    current.filter((_, i) => i !== index),
  );
};

export const addLanguage = (lang: Language) => {
  const current = $resume.get().languages;
  $resume.setKey("languages", [...current, lang]);
};

export const updateLanguage = (
  index: number,
  updatedLang: Partial<Language>,
) => {
  const current = $resume.get().languages;
  const next = [...current];
  if (next[index]) {
    next[index] = { ...next[index], ...updatedLang };
    $resume.setKey("languages", next);
  }
};

export const removeLanguage = (index: number) => {
  const current = $resume.get().languages;
  $resume.setKey(
    "languages",
    current.filter((_, i) => i !== index),
  );
};

export const addCertification = (cert: Certification) => {
  const current = $resume.get().certifications || [];
  $resume.setKey("certifications", [...current, { ...cert }]);
};

export const updateCertification = (
  index: number,
  updatedCert: Partial<Certification>,
) => {
  const current = $resume.get().certifications || [];
  const next = [...current];
  if (next[index]) {
    next[index] = { ...next[index], ...updatedCert };
    $resume.setKey("certifications", next);
  }
};

export const removeCertification = (index: number) => {
  const current = $resume.get().certifications || [];
  $resume.setKey(
    "certifications",
    current.filter((_, i) => i !== index),
  );
};

export const setFullResume = (newResume: Resume) => {
  $resume.set(newResume);
};

export const resetResume = () => {
  $resume.set(initialResume);
};
