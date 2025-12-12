export interface sqlResponse {
  projects: Project[]
  skills: Skill[]
  experiences: Experience[]
  education: Education[]
  certificates: Certificate[]
  about: About[]
}

export interface Project {
  id: number
  started_at: string
  name: string
  short_desc: string
  long_desc: string
  tag_id: number
  url?: string
  base_color?: string
  status: string
  ascii_art: string
  end_at: any
  tags_array: string[][]
}

export interface Skill {
  category: string
  tags_array: string[]
}

export interface Experience {
  id: number
  started_at: string
  stopped_at: string
  title: string
  job_type: string
  short_desc: string
  long_desc: string
  company: string
  company_url: string
  job_modality: string
  tags: number
  tags_array: string[][]
  base_color?: string
}

export interface Education {
  id: number
  ended_at: string
  title: string
  status: string
  university: string
  university_url: string
  tags: number
  description: string;
  tags_array: string[][]
  base_color?: string
}

export interface Certificate {
  id: number
  graduation_date: string
  title: string
  company: string
  tags: number
  description: string
  certificate_url: string
  tags_array: string[][]
  ascii_art: string
  base_color?: string
}

export interface About {
  id: number
  about_me: string
  email: string
  phone: string
  LinkedIn_URL: string
  Github_URL: string
  Created_Date: string
  OneDev_URL: string
}