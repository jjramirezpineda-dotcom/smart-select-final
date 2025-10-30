import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
    hint: string;
  };
  content?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  company: string;
  avatar: string;
};

export type TeamMember = {
  name: string;
  role: string;
  avatar: {
    src: string;
    width: number;
    height: number;
    hint: string;
  }
}

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  author: string;
  date: Date;
  image: {
    src: string;
    width: number;
    height: number;
    hint: string;
  },
  content?: string;
}

export type Recommendation = {
  name: string;
  justification: string;
  pros: string[];
  cons: string[];
  isTopPick: boolean;
};
