// ─── PERSONS DATA ─────────────────────────────────────────────────────────────
// Add or update person data here. Each entry maps to a route: /resume/:id

export const persons = {
    raynold: {
        id: 'raynold',
        name: 'Raynold anak Kabai',
        role: 'Software Engineering Intern',
        title: 'Full-Stack Developer',
        university: 'UNIMAS',
        location: 'Kota Samarahan, Sarawak, Malaysia',
        bio: 'Passionate CS undergraduate at UNIMAS with hands-on experience building web and mobile applications. I love turning ideas into elegant, functional software — from crafting sleek UIs to designing efficient back-end systems.',
        photo: '/raynold.jpg',
        initials: 'RK',
        accentColor: '#6366f1',
        secondaryColor: '#06b6d4',
        email: 'raynold@email.com',
        phone: '+60 12-345 6789',
        linkedin: 'https://linkedin.com/in/raynoldkabai',
        github: 'https://github.com/raynold',
        linkedinLabel: 'linkedin/raynoldkabai',
        githubLabel: 'github/raynold',
        cvFile: '/raynold_cv.pdf',
        stats: [
            { value: '3+', label: 'Years Coding' },
            { value: '15+', label: 'Projects Built' },
            { value: '5+', label: 'Languages' },
            { value: '3.5', label: 'GPA' },
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
                gpa: '3.5 / 4.0',
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
    
};

// Ordered list for landing page display
export const personList = [persons.raynold, persons.azhar];
