export interface Task {
  id: number;
  title: string;
  tag: string;
  time: string;
  status: string;
}

export interface Metrics {
  title: string;
  value: string;
  progress?: number;
  icon: string;
}

export interface AgentHealth {
  icon: string;
  tag: string;
  description: string;
  lastCheck: string;
  progressFailed: number;
  progressSuccess?: number;
  minutesSaved: number;
  color: string;
  progress?: number;
}
