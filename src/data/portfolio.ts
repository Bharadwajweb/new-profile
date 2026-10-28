export type ProjectVisual = "signal" | "shield" | "automation" | "response"

export type PortfolioProject = {
  slug: string
  index: string
  title: string
  discipline: string
  summary: string
  brief: string
  focus: string[]
  visual: ProjectVisual
}

export const profile = {
  role: "Computer Science Undergraduate (Cybersecurity)",
  location: "Chennai, Tamil Nadu",
  summary:
    "Computer Science undergraduate specializing in Cybersecurity, with hands-on experience in network security, threat analysis, vulnerability assessment, and secure system configuration.",
  objective: "Seeking an entry-level SOC Analyst, Security Analyst, or VAPT role or internship.",
}

export const socialLinks = {
  linkedin: "https://linkedin.com/in/bharadwaj-m-037b44296",
  github: "https://github.com/Bharadwajweb",
}

export const capabilities = [
  {
    index: "01",
    name: "Python",
    detail: "Security automation, analysis, and repeatable assessment workflows.",
  },
  {
    index: "02",
    name: "Kali Linux",
    detail: "Hands-on environment for network security and authorized assessments.",
  },
  {
    index: "03",
    name: "Wireshark",
    detail: "Packet analysis, network monitoring, and protocol-level investigation.",
  },
  {
    index: "04",
    name: "Nmap",
    detail: "Authorized asset discovery, service mapping, and assessment workflows.",
  },
]

export const toolkit = [
  "Burp Suite",
  "Gobuster",
  "SQLMap",
  "Metasploit",
  "theHarvester",
  "Amass",
  "Netcat",
  "Git",
]

export const experiences = [
  {
    role: "Cyber Security Intern",
    organization: "Uptoskills",
    period: "DEC 2025 — MAR 2026",
    location: "ONLINE",
    summary:
      "Applied network monitoring, threat analysis, and secure configuration practices during a three-month cybersecurity internship.",
  },
  {
    role: "Full Stack Web Development Intern",
    organization: "intrnForte",
    period: "NOV 2024",
    location: "ONLINE · 10-WEEK TRAINING",
    summary:
      "Built responsive websites and interactive web applications with API and database integrations.",
  },
]

export const education = {
  degree: "B.Tech, Computer Science and Engineering (Cybersecurity)",
  institution: "Hindustan University",
  location: "Chennai, Tamil Nadu",
  period: "2023 — 2027",
}

export const certifications = [
  "Cyber Security Internship Completion · Uptoskills · 2026",
  "Full Stack Web Development Training · intrnForte · 2024",
  "NCC “C” Certificate · Navy Wing",
]

export const relevantCoursework = [
  "Cybersecurity Fundamentals",
  "Network Security",
  "Digital Forensics",
  "Virtualization & Cloud Computing",
  "Python Programming",
  "Web Technologies",
]

export const languages = [
  "Telugu · Native",
  "English · Fluent",
  "Hindi · Fluent",
  "Tamil · Proficient",
  "German · Basic",
]

export const projects: PortfolioProject[] = [
  {
    slug: "attack-dna-x",
    index: "CASE 01 / 04",
    title: "ATTACK-DNA-X",
    discipline: "AI THREAT DETECTION",
    summary: "An AI-powered platform for malicious-activity detection and Attack DNA profile generation.",
    brief:
      "Built REST APIs and an interactive dashboard for threat patterns, attack classifications, and severity, using a modular architecture for scalable analysis.",
    focus: ["Python", "FastAPI", "React.js", "Machine Learning"],
    visual: "signal",
  },
  {
    slug: "offensive-security-automation-framework",
    index: "CASE 02 / 04",
    title: "Offensive Security Automation Framework",
    discipline: "AUTHORIZED TESTING",
    summary: "A Python framework for repeatable, scoped security assessment workflows.",
    brief:
      "Automated reconnaissance, scanning, enumeration, vulnerability assessment, risk scoring, and reporting. The framework also supports a GUI, dashboard generation, screenshot capture, multi-target assessment, and PDF, JSON, CSV, and HTML reports.",
    focus: ["Python", "Nmap", "theHarvester", "Assessment reports"],
    visual: "automation",
  },
  {
    slug: "ransomshield",
    index: "CASE 03 / 04",
    title: "RansomShield",
    discipline: "RANSOMWARE DETECTION",
    summary: "Real-time ransomware detection and containment with file monitoring and behavioral analysis.",
    brief:
      "Built a system that monitors file activity, analyzes behavior, raises alerts, and records events to support earlier ransomware detection and response.",
    focus: ["Python", "Watchdog", "Behavioral analysis", "Event logging"],
    visual: "shield",
  },
  {
    slug: "bharat-response-grid",
    index: "CASE 04 / 04",
    title: "Bharat Response Grid",
    discipline: "INCIDENT RESPONSE",
    summary: "A live incident-response grid for faster triage, shared context, and coordinated SOC action.",
    brief:
      "A unified incident-response command grid that brings alerts, affected assets, and analyst notes into a single live view. Incoming events are triaged by severity and mapped to MITRE ATT&CK techniques, so responders can see what happened, where it spread, and what to do next. Each incident carries a shared timeline, ownership, and playbook-driven containment steps, helping SOC teams move from detection to coordinated response without losing context between handoffs.",
    focus: ["Incident triage", "MITRE ATT&CK mapping", "SOC playbooks", "Shared timeline"],
    visual: "response",
  },
]

export const additionalProjects = [
  {
    slug: "loan-eligibility-prediction",
    discipline: "MACHINE LEARNING · CLASSIFICATION",
    title: "Loan Eligibility Prediction",
    description: "Built a machine-learning model to classify loan eligibility from customer financial data.",
  },
  {
    slug: "ecommerce-recommendations",
    discipline: "WEB · RECOMMENDATION SYSTEMS",
    title: "E-commerce Recommendations",
    description: "Developed an e-commerce website with machine-learning-based product recommendations.",
  },
]

export const methodology = [
  {
    index: "01",
    title: "Map the surface",
    description: "Build a grounded picture of the system, its dependencies, and its boundaries.",
  },
  {
    index: "02",
    title: "Test assumptions",
    description: "Use authorized, evidence-led analysis to understand where risk actually lives.",
  },
  {
    index: "03",
    title: "Design the response",
    description: "Turn useful findings into actions a team can repeat, explain, and improve.",
  },
]

export const contactEmail = "balabalaji5521@gmail.com"
