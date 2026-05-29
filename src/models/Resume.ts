// // src/models/Resume.ts
export interface BasicInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  image?: string;
}

export interface Experience {
  company: string;
  location: string;
  position: string;
  period: string;
  description: string;
  website?: string;
}

export interface Education {
  school: string;
  degree: string;
  grade: string;
  area: string;
  period: string;
  location: string;
  website?: string;
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date: string;
  label?: string;
  website?: string;
}

export interface Skill {
  id?: string;
  name: string;
  keywords?: string[];
}

export interface Language {
  id?: string;
  name: string;
  fluency: string;
  level?: number;
}

export interface Resume {
  basicInfo: BasicInfo;
  links: string[];
  summary: string;
  experiences: Experience[];
  educations: Education[];
  certifications?: Certification[];
  skills: Skill[];
  languages: Language[];
}
