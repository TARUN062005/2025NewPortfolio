export interface TimelineEvent {
  id: string
  title: string
  date: string
  description: string
  location?: string
  company?: string
  achievements?: string[]
  technologies?: string[]
  link?: string
  isCollege?: boolean
}

export const timeline: TimelineEvent[] = [
  {
    id: "1",
    title: "Full-Stack Developer Intern at TheSmartBridge",
    date: "May 2025 - June 2025",
    description:
      "Completed a full stack web development internship with hands-on experience in building end-to-end web applications.",
    location: "Remote",
    company: "TheSmartBridge",
    achievements: [
      "Developed a complaint management system with React.js frontend and Node.js, Express, MongoDB backend",
      "Implemented JWT-based authentication and role-based dashboards for Admins, Agents, and Users",
      "Built RESTful APIs with real-time chat functionality using Socket.io",
      "Strengthened skills in frontend integration using Axios, Material UI, and responsive UI design",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Socket.io", "Material UI"],
  },
  {
    id: "2",
    title: "Salesforce Developer Intern at TheSmartBridge",
    date: "May 2025 - July 2025",
    description:
      "Completed a virtual internship on Salesforce through SmartBridge, leveraging Trailhead modules and hands-on projects.",
    location: "Remote",
    company: "TheSmartBridge",
    achievements: [
      "Built a CRM system using custom objects, record-triggered flows, validation rules, and automation tools",
      "Gained practical experience in Salesforce development using Flow Builder, Object Manager, and declarative tools",
      "Created Lightning pages and user-friendly layouts for improved usability",
      "Implemented integrations for smooth order processing and real-time data access",
    ],
    technologies: ["Salesforce Platform", "Lightning Experience", "Flow Builder", "Apex", "Custom Objects"],
  },
  {
    id: "3",
    title: "B.Tech in Computer Science and Engineering",
    date: "September 2024 - Present",
    description:
      "Pursuing Bachelor of Technology in Computer Science and Engineering with focus on modern technologies and software development.",
    location: "Lakireddy Bali Reddy College of Engineering",
    company: "LBRCE",
    achievements: [
      "Current CGPA: 9.00% (up to current semester)",
      "Active participation in tech workshops and coding competitions",
      "Developing projects with AI/ML integration and cloud technologies",
      "Learning advanced concepts in software engineering and system design",
    ],
    technologies: ["Java", "Python", "Data Structures", "Algorithms", "AI/ML", "Cloud Computing"],
    link: "https://www.google.com/search?q=Lakireddy+Bali+Reddy+College+of+Engineering+official+website",
    isCollege: true,
  },
  {
    id: "4",
    title: "Industrial Trainee at MSME-CITD",
    date: "June 2022 - November 2022",
    description:
      "Completed industrial training at MSME-CITD Hyderabad, gaining hands-on experience in manufacturing and low-level systems.",
    location: "Vijayawada, Andhra Pradesh",
    company: "MSME-CITD",
    achievements: [
      "Gained understanding of industry-standard product manufacturing processes",
      "Learned low-level systems and system operations",
      "Explored meta-programming and compilers concepts",
      "Hands-on experience in circuit design with Proteus simulation software",
    ],
    technologies: ["Circuit Design", "Proteus", "System Operations", "Manufacturing Processes"],
  },
  {
    id: "5",
    title: "Diploma in Computer Engineering",
    date: "November 2021 - June 2023",
    description:
      "Completed Diploma in Computer Engineering with excellent academic performance, building strong foundation in computer fundamentals.",
    location: "AANM & VVRSR Polytechnic",
    company: "AANM & VVRSR Polytechnic",
    achievements: [
      "Graduated with 93.67% marks",
      "Developed strong foundation in computer hardware and software",
      "Participated in technical exhibitions and projects",
      "Won appreciation for academic excellence and project work",
    ],
    technologies: ["Computer Fundamentals", "Digital Electronics", "Programming Basics", "Networking"],
    link: "https://www.google.com/search?q=AANM+VVRSR+Polytechnic+official+website",
    isCollege: true,
  },
  {
    id: "6",
    title: "Certifications & Specializations",
    date: "2023 - 2025",
    description:
      "Completed multiple professional certifications to enhance technical skills and stay updated with industry trends.",
    achievements: [
      "Salesforce Developer Certification (July 2025) - Certified Salesforce developer and Agent Blazer Champion",
      "Full-Stack Developer Certification (July 2025) - Certificate from TheSmartBridge",
      "Microsoft Azure Fundamentals (AZ-900) (June 2025) - Cloud fundamentals certification",
      "Certificate of Industrial Training (November 2023) - Central Institute of Tool and Design",
    ],
    technologies: ["Salesforce", "Full-Stack Development", "Azure Cloud", "Industrial Training"],
  },
]