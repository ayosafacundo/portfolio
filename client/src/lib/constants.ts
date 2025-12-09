import { Monitor, Gamepad2, MessageCircle, Phone, Headphones, Star, Terminal, AppWindow, User, Code, Mail, Download } from "lucide-react";

export const TIMELINE_ERAS = [
  {
    id: "terminal",
    label: "First Terminal",
    icon: Terminal,
    color: "#33ff00", // Green phosphor
    bg: "#000000",
    font: "font-mono"
  },
  {
    id: "gui",
    label: "First GUI",
    icon: AppWindow,
    color: "#000080", // Win95 Blue
    bg: "#c0c0c0", // Win95 Gray
    font: "font-sans"
  },
  {
    id: "pong",
    label: "Pong",
    customIcon: "pong",
    color: "#ffffff",
    bg: "#000000",
    font: "font-mono"
  },
  {
    id: "arcade",
    label: "Arcade Era",
    icon: Gamepad2,
    color: "#ff00ff", // Neon Pink
    bg: "#1a1a1a",
    font: "font-display"
  },
  {
    id: "microsoft",
    label: "Early Microsoft",
    customIcon: "windows",
    color: "#00a4ef",
    bg: "#ffffff",
    font: "font-sans"
  },
  {
    id: "messenger",
    label: "Messenger",
    icon: MessageCircle,
    color: "#0084ff", // Messenger Blue
    bg: "#e6f2ff",
    font: "font-sans"
  },
  {
    id: "skype",
    label: "Skype",
    icon: Phone,
    color: "#00aff0", // Skype Blue
    bg: "#ffffff",
    font: "font-sans"
  },
  {
    id: "teamspeak",
    label: "Teamspeak",
    icon: Headphones,
    color: "#263238", // TS Dark
    bg: "#ffffff",
    font: "font-sans"
  }
];

export const PORTFOLIO_DATA = {
  about: {
    title: "About Me",
    desc: "I am a polyglot engineer with a passion for resilient systems. My journey began with a command line and has evolved into architecting cloud-native solutions that serve millions. I believe in clean code, automation, and the user experience.",
    stats: [
      { label: "Years Exp", value: "8+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Coffees", value: "∞" }
    ]
  },
  skills: [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind", "Three.js"] },
    { category: "Backend", items: ["Go", "Rust", "Node.js", "Python"] },
    { category: "DevOps", items: ["Kubernetes", "Terraform", "AWS", "CI/CD"] },
    { category: "Tools", items: ["Docker", "Git", "Linux", "Prometheus"] }
  ],
  projects: [
    { 
      title: "Cloud Orchestrator", 
      desc: "Automated deployment pipeline", 
      longDesc: "A distributed system for managing container lifecycles across multi-region clusters. Features real-time state reconciliation, self-healing capabilities, and a custom CRD operator.",
      tech: ["Go", "Docker", "K8s"], 
      color: "hsl(190, 100%, 50%)",
      ascii: `
      .  .
  . .   ..
  .   . ...  .
 . . ... ... .
 .. ... ... ...
... ... ... ...
 .  .   .   .
      `
    }, 
    { 
      title: "Neural Net Vis", 
      desc: "Interactive AI visualization", 
      longDesc: "3D visualization tool for understanding neural network activation patterns. Uses WebGL for rendering millions of connections in real-time.",
      tech: ["React", "Three.js", "Python"], 
      color: "hsl(280, 100%, 60%)",
      ascii: `
   / \\
  / _ \\
 /_/ \\_\\
/ /   \\ \\
\\/_____\\/
      `
    }, 
    { 
      title: "Secure Vault", 
      desc: "Zero-knowledge encryption storage", 
      longDesc: "End-to-end encrypted file storage system using WASM for client-side encryption. Zero knowledge architecture ensures data privacy even in case of server compromise.",
      tech: ["Rust", "WASM"], 
      color: "hsl(320, 100%, 60%)",
      ascii: `
  .---.
 /     \\
|  (O)  |
 \\     /
  '---'
   |=|
   |=|
      `
    }, 
  ],
  certificates: [
    { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2024" },
    { title: "CKA - Certified Kubernetes Admin", issuer: "CNCF", date: "2023" },
  ],
  experience: [
    { role: "Senior DevOps Engineer", company: "TechCorp", period: "2022-Present", desc: "Scaling infrastructure for 1M+ users." },
    { role: "SysAdmin", company: "LegacySystems", period: "2019-2022", desc: "Managed on-premise server clusters." },
  ],
  education: [
    { degree: "B.S. Computer Science", school: "University of Tech", year: "2019" }
  ]
};
