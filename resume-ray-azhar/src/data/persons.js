// ─── PERSONS DATA ─────────────────────────────────────────────────────────────
// Add or update person data here. Each entry maps to a route: /resume/:id

export const persons = {
    raynold: {
        id: 'raynold',
        name: 'Raynold Anak Kabai',
        role: 'Software Engineering Intern',
        title: 'Full-Stack Developer',
        university: 'UNIMAS',
        location: 'Kota Samarahan, Sarawak, Malaysia',
        bio: 'Passionate SE undergraduate at UNIMAS with hands-on experience building web and mobile applications. I love turning ideas into elegant, functional software from crafting sleek UIs to designing efficient back-end systems.',
        photo: '/raynold.jpg',
        initials: 'RK',
        accentColor: '#6366f1',
        secondaryColor: '#06b6d4',
        email: '100853@unimas.edu.my',
        phone: '+60 18-217 9967',
        linkedin: 'https://www.linkedin.com/in/raynold-kabai-23154b251/',
        github: 'https://github.com/iamraaaey',
        linkedinLabel: 'linkedin/raynoldkabai',
        githubLabel: 'github/raynold',
        cvFile: '/raynold_cv.pdf',
        stats: [
            { value: '3+', label: 'Years Coding' },
            { value: '15+', label: 'Projects Built' },
            { value: '5+', label: 'Languages' },
            { value: '3.89', label: 'GPA' },
        ],
        highlights: [
            { label: 'Web Development', color: '#6366f1' },
            { label: 'Mobile Apps', color: '#06b6d4' },
            { label: 'Data & Backend', color: '#10b981' },
            { label: 'UI/UX Design', color: '#f59e0b' },
        ],
        experiences: [
            {
                role: 'Software Engineering Intern',
                company: 'UNIMAS (University Malaysia Sarawak)',
                period: 'Feb 2026 – Present',
                location: 'Kota Samarahan, Sarawak',
                color: '#6366f1',
                highlights: [
                    'Developing a full-stack web application using React.js and modern UI libraries',
                    'Building responsive interfaces with Material-UI and advanced CSS techniques',
                    'Integrating RESTful APIs and managing state with React hooks',
                    'Collaborating within an Agile team environment',
                ],
                tags: ['React.js', 'MUI', 'JavaScript', 'Git'],
            },
        ],
        education: [
            {
                degree: 'Bachelor of Science in Computer Science',
                institution: 'Universiti Malaysia Sarawak (UNIMAS)',
                period: '2022 – 2026',
                location: 'Kota Samarahan, Sarawak',
                color: '#06b6d4',
                highlights: [
                    'Specialisation in Software Engineering',
                    'Relevant courses: Data Structures, Algorithms, Software Design, Databases',
                    'Final Year Project: AI-powered resume builder',
                ],
                gpa: '3.89 / 4.0',
            },
            {
                degree: 'Matriculation (Science Stream)',
                institution: 'Kolej Matrikulasi',
                period: '2021 – 2022',
                location: 'Malaysia',
                color: '#10b981',
                highlights: [
                    'Physics, Chemistry, Mathematics, Computer Science',
                    'CGPA: 3.8 / 4.0',
                ],
            },
        ],
        achievements: [
            {
                title: "Dean's List Award",
                desc: 'Awarded for academic excellence during Semester 3 and Semester 5',
                color: '#f59e0b',
            },
            {
                title: 'Hackathon – Top 5 Finalist',
                desc: 'Built an AI-driven personal finance app in 24 hours, placing in the top 5',
                color: '#6366f1',
            },
            {
                title: 'Best Mobile App – UNIMAS Tech Expo',
                desc: 'Recognised for a bilingual banking app with modern UX design',
                color: '#06b6d4',
            },
        ],
        skillCategories: [
            {
                label: 'Programming Languages',
                color: '#6366f1',
                skills: [
                    { name: 'Python', level: 85 },
                    { name: 'Java', level: 80 },
                    { name: 'JavaScript', level: 80 },
                    { name: 'Kotlin', level: 70 },
                    { name: 'C/C++', level: 60 },
                    { name: 'Dart', level: 55 },
                ],
            },
            {
                label: 'Web & Mobile',
                color: '#06b6d4',
                skills: [
                    { name: 'React.js', level: 80 },
                    { name: 'HTML/CSS', level: 85 },
                    { name: 'Flutter', level: 60 },
                    { name: 'Android', level: 65 },
                    { name: 'Node.js', level: 65 },
                ],
            },
            {
                label: 'Databases & Tools',
                color: '#10b981',
                skills: [
                    { name: 'MySQL', level: 80 },
                    { name: 'Firebase', level: 75 },
                    { name: 'MongoDB', level: 60 },
                    { name: 'Git/GitHub', level: 85 },
                    { name: 'VS Code', level: 90 },
                ],
            },
            {
                label: 'Design & AI',
                color: '#f59e0b',
                skills: [
                    { name: 'Figma', level: 70 },
                    { name: 'Machine Learning', level: 60 },
                    { name: 'Data Analysis', level: 70 },
                ],
            },
        ],
        softSkills: [
            'Problem Solving', 'Team Collaboration', 'Communication',
            'Critical Thinking', 'Time Management', 'Adaptability',
            'Leadership', 'Fast Learner', 'Attention to Detail',
        ],
    },

    // ─── ADD AZHAR PERSON HERE ──────────────────────────────────────────
    azhar: {
        id: 'azhar',
        name: 'Azhar Sharif Bin Abu Seman',
        role: 'Software Engineering Intern',
        title: 'ML Engineer',
        university: 'UNIMAS',
        location: 'Kuching, Sarawak, Malaysia',
        bio: 'A motivated Computer Science student specialising in back-end development, cloud computing, and data engineering. Passionate about building scalable APIs, managing cloud infrastructure, and designing efficient data pipelines. Eager to apply my skills in real-world projects and contribute to innovative solutions.',
        photo: '/azhar.jpg',
        initials: 'AS',
        accentColor: '#ec4899',
        secondaryColor: '#8b5cf6',
        email: 'azhar@gmail.com',
        phone: '+601133150414',
        linkedin: 'https://www.linkedin.com/in/azhar-sharif-61456b2a5/',
        github: 'https://github.com/azharshf',
        linkedinLabel: 'linkedin/azharsharif',
        githubLabel: 'github/azharshf',
        cvFile: '/azhar_cv.pdf',
        stats: [
            { value: '2+', label: 'Years Coding' },
            { value: '15+', label: 'Projects Built' },
            { value: '8+', label: 'Languages' },
            { value: '3.7', label: 'GPA' },
        ],
        highlights: [
            { label: 'ML Developer', color: '#ec4899' },
            { label: 'Cloud & DevOps', color: '#8b5cf6' },
            { label: 'Data Engineering', color: '#10b981' },
            { label: 'System Design', color: '#f59e0b' },
        ],
        experiences: [
            {
                role: 'Software Engineering Intern',
                company: 'UGLOBAL SOLUTIONS SDN. BHD.',
                period: 'Feb 2026 – Present',
                location: 'Kota Samarahan, Sarawak',
                color: '#ec4899',
                highlights: [
                    'Designing and building ML models with Python and TensorFlow to solve real-world problems',
                    'Managing cloud infrastructure on AWS (EC2, S3, Lambda)',
                    'Implementing CI/CD pipelines using GitHub Actions and Docker',
                    'Working closely with design team to deliver end-to-end features',
                ],
                tags: ['Node.js', 'AWS', 'Docker', 'TensorFlow', 'GitHub Actions'],
            },
        ],
        education: [
            {
                degree: 'Bachelor of Science in Computer Science',
                institution: 'Universiti Malaysia Sarawak (UNIMAS)',
                period: '2022 – 2026',
                location: 'Kota Samarahan, Sarawak',
                color: '#8b5cf6',
                highlights: [
                    'Specialisation in Distributed Systems & Cloud Computing',
                    'Relevant courses: Operating Systems, Networks, Database Systems, Cloud Architecture',
                    'Final Year Project: Real-time collaborative whiteboard platform',
                ],
                gpa: '3.5 / 4.0',
            },
            {
                degree: 'Matriculation (Science Stream)',
                institution: 'Kolej Matrikulasi Selangor',
                period: '2021 – 2022',
                location: 'Malaysia',
                color: '#10b981',
                highlights: [
                    'Physics, Chemistry, Mathematics, Biology',
                    'CGPA: 3.9 / 4.0',
                ],
            },
        ],
        achievements: [
            {
                title: "Dean's List Award",
                desc: 'Awarded for academic excellence during Semester 2 and Semester 4',
                color: '#f59e0b',
            },
            {
                title: 'Best Ideas – ClaudeHack Sarawak',
                desc: 'Awarded for outstanding back-end architecture in a 48-hour hackathon',
                color: '#ec4899',
            },
            {
                title: 'Cloud Expert Certified',
                desc: 'AWS Certified Cloud Practitioner — December 2024',
                color: '#8b5cf6',
            },
        ],
        skillCategories: [
            {
                label: 'Programming Languages',
                color: '#ec4899',
                skills: [
                    { name: 'JavaScript', level: 88 },
                    { name: 'Python', level: 82 },
                    { name: 'C++', level: 65 },
                    { name: 'Golang', level: 85 },
                    { name: 'Swift', level: 70 },
                ],
            },
            {
                label: 'Back-End & Cloud',
                color: '#8b5cf6',
                skills: [
                    { name: 'Node.js / Express', level: 88 },
                    { name: 'AWS', level: 75 },
                    { name: 'Docker', level: 72 },
                    { name: 'PostgreSQL', level: 80 },
                    { name: 'MongoDB', level: 70 },
                ],
            },
            {
                label: 'Tools & DevOps',
                color: '#10b981',
                skills: [
                    { name: 'Git/GitHub', level: 90 },
                    { name: 'Linux/CLI', level: 80 },
                    { name: 'GitHub Actions', level: 70 },
                    { name: 'Terraform', level: 85 },
                ],
            },
            {
                label: 'Data & AI',
                color: '#f59e0b',
                skills: [
                    { name: 'Data Pipeline Design', level: 70 },
                    { name: 'Machine Learning', level: 60 },
                    { name: 'Tableau', level: 65 },
                ],
            },
        ],
        softSkills: [
            'Analytical Thinking', 'Leadership', 'Documentation',
            'Problem Solving', 'Project Management',
            'Adaptability', 'Attention to Detail',
        ],
    },
};

// Ordered list for landing page display
export const personList = [persons.raynold, persons.azhar];
