export type UserRole = 'organization' | 'agent' | 'investor';

export type AgentType = 'sales' | 'marketing' | 'support' | 'general';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  agentType?: AgentType;
  organizationId?: string;
  permissions: string[];
  avatar?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}