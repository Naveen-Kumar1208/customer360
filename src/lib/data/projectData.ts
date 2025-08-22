import type { Project, ProjectMember, ProjectTask, ProjectMilestone } from "@/types/project";

export const sampleMembers: ProjectMember[] = [
  {
    id: 'member_001',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'project_manager',
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'member_002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'team_lead',
    joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'member_003',
    name: 'Amit Patel',
    email: 'amit@example.com',
    role: 'developer',
    joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'member_004',
    name: 'Sunita Singh',
    email: 'sunita@example.com',
    role: 'analyst',
    joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  }
];

export const sampleProjects: Project[] = [
  {
    id: 'proj_001',
    name: 'Business Loan Portal Enhancement',
    description: 'Upgrade the business loan application portal with new features and improved UX',
    status: 'in_progress',
    priority: 'high',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    progress: 65,
    budget: 850000,
    spent: 520000,
    assignedMembers: [sampleMembers[0], sampleMembers[1], sampleMembers[2]],
    tasks: [],
    milestones: [],
    client: {
      name: 'Finance Director',
      company: 'Internal',
      email: 'finance@company.com',
      phone: '+91 98765 43210'
    },
    tags: ['Web Development', 'UX/UI', 'Financial Services'],
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdBy: 'member_001'
  },
  {
    id: 'proj_002',
    name: 'Customer Analytics Dashboard',
    description: 'Build comprehensive analytics dashboard for customer behavior tracking',
    status: 'planning',
    priority: 'medium',
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    progress: 15,
    budget: 650000,
    spent: 95000,
    assignedMembers: [sampleMembers[1], sampleMembers[3]],
    tasks: [],
    milestones: [],
    client: {
      name: 'Marketing Head',
      company: 'Internal',
      email: 'marketing@company.com',
      phone: '+91 87654 32109'
    },
    tags: ['Analytics', 'Dashboard', 'Data Visualization'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdBy: 'member_002'
  },
  {
    id: 'proj_003',
    name: 'Mobile App Development',
    description: 'Develop native mobile application for loan applications and customer service',
    status: 'completed',
    priority: 'high',
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    progress: 100,
    budget: 1200000,
    spent: 1150000,
    assignedMembers: [sampleMembers[0], sampleMembers[2], sampleMembers[3]],
    tasks: [],
    milestones: [],
    client: {
      name: 'Product Manager',
      company: 'Internal',
      email: 'product@company.com',
      phone: '+91 76543 21098'
    },
    tags: ['Mobile Development', 'React Native', 'API Integration'],
    createdAt: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    createdBy: 'member_001'
  },
  {
    id: 'proj_004',
    name: 'AI Chatbot Integration',
    description: 'Implement AI-powered chatbot for customer support and lead qualification',
    status: 'on_hold',
    priority: 'medium',
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    progress: 25,
    budget: 450000,
    spent: 125000,
    assignedMembers: [sampleMembers[2], sampleMembers[3]],
    tasks: [],
    milestones: [],
    client: {
      name: 'Customer Success Manager',
      company: 'Internal',
      email: 'support@company.com',
      phone: '+91 65432 10987'
    },
    tags: ['AI/ML', 'Chatbot', 'Customer Support'],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdBy: 'member_002'
  }
];

export const sampleTasks: ProjectTask[] = [
  {
    id: 'task_001',
    title: 'Design new loan application form',
    description: 'Create wireframes and mockups for the enhanced business loan application form',
    status: 'completed',
    priority: 'high',
    assignee: sampleMembers[1],
    reporter: sampleMembers[0],
    estimatedHours: 16,
    actualHours: 18,
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    dependencies: [],
    labels: ['Design', 'UX', 'Forms'],
    comments: [],
    attachments: [],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'task_002',
    title: 'Implement form validation logic',
    description: 'Add client-side and server-side validation for all form fields',
    status: 'in_progress',
    priority: 'high',
    assignee: sampleMembers[2],
    reporter: sampleMembers[0],
    estimatedHours: 12,
    actualHours: 8,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    dependencies: ['task_001'],
    labels: ['Development', 'Validation', 'Forms'],
    comments: [],
    attachments: [],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'task_003',
    title: 'Setup database schema for new fields',
    description: 'Create migration scripts and update database schema to support new form fields',
    status: 'todo',
    priority: 'medium',
    assignee: sampleMembers[2],
    reporter: sampleMembers[1],
    estimatedHours: 8,
    actualHours: 0,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    dependencies: ['task_001'],
    labels: ['Database', 'Migration', 'Backend'],
    comments: [],
    attachments: [],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'task_004',
    title: 'Integrate with document verification API',
    description: 'Connect with third-party service for automated document verification',
    status: 'blocked',
    priority: 'high',
    assignee: sampleMembers[2],
    reporter: sampleMembers[0],
    estimatedHours: 20,
    actualHours: 2,
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    dependencies: ['task_003'],
    labels: ['Integration', 'API', 'Documents'],
    comments: [],
    attachments: [],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'task_005',
    title: 'Write test cases for new functionality',
    description: 'Create comprehensive test suite for the enhanced loan application process',
    status: 'todo',
    priority: 'medium',
    assignee: sampleMembers[3],
    reporter: sampleMembers[1],
    estimatedHours: 24,
    actualHours: 0,
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    dependencies: ['task_002', 'task_004'],
    labels: ['Testing', 'QA', 'Automation'],
    comments: [],
    attachments: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

export const sampleMilestones: ProjectMilestone[] = [
  {
    id: 'milestone_001',
    title: 'Design Phase Complete',
    description: 'All wireframes and mockups approved by stakeholders',
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'completed',
    progress: 100,
    tasks: ['task_001'],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'milestone_002',
    title: 'Backend Development Complete',
    description: 'All API endpoints and database changes implemented',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    status: 'in_progress',
    progress: 60,
    tasks: ['task_002', 'task_003', 'task_004'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'milestone_003',
    title: 'Testing & QA Complete',
    description: 'All test cases executed and bugs resolved',
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    progress: 0,
    tasks: ['task_005'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'milestone_004',
    title: 'Production Deployment',
    description: 'Enhanced portal deployed to production environment',
    dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    status: 'upcoming',
    progress: 0,
    tasks: [],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

// Update projects with tasks and milestones
sampleProjects[0].tasks = sampleTasks;
sampleProjects[0].milestones = sampleMilestones;