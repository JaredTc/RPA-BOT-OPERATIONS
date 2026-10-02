import { Component } from '@angular/core';
import { AgentHealth, Metrics, Task } from '../../core/models/home.model';
import { CommonModule, NgForOf } from '@angular/common';
import { Button } from 'primeng/button';
import { BarChartsComponent } from './components/bar-charts/bar-charts.component';
import { LineChartsComponent } from './components/line-charts/line-charts.component';

@Component({
  imports: [
    NgForOf,
    CommonModule,
    BarChartsComponent,
    LineChartsComponent,
    Button
  ],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class Home {
  progressBar = Math.random() * 100;

  month = new Date().toLocaleString('default', { month: 'short' });
  year = new Date().getFullYear();

  first = Math.floor(Math.random() * 100) + 1;
  second = Math.floor(Math.random() * (100 - this.first)) + this.first + 1; // Siempre mayor que first
  progress = (50 + Math.random() * 50).toFixed(1);
  alerts = Math.floor(Math.random() * 100) + 1;

  metrics: Metrics[] = [
    {
      title: 'Total minutes saved',
      value: this.first + ' min',
      icon: 'graph',
    },
    {
      title: 'Execution quality ratio',
      value: this.progress + '%',
      progress: parseFloat(this.progress),
      icon: 'SuccessRate',
    },
    {
      title: 'Total transactions',
      value: this.alerts.toString(),
      icon: 'chart',
    },
  ];

  agentHealth: AgentHealth[] = [
    {
      icon: 'chatbot',
      tag: 'ChatBot',
      description: 'Generate purchase orders',
      lastCheck: '04/08/25, 11:30am',
      progress: 80,
      progressFailed: 20,
      minutesSaved: Math.floor(Math.random() * 100) + 1,
      color: '#595959',
    },
    {
      icon: 'Pedro',
      tag: 'Agent Saas',
      description: 'Process import / export declarations',
      lastCheck: '04/08/25, 11:30am',
      progress: 60,
      progressFailed: 40,
      minutesSaved: Math.floor(Math.random() * 100) + 1,
      color: '#35AC3A',
    },
    {
      icon: 'Elsa',
      tag: 'Elsa',
      description: 'Vendor onboarding assistant',
      lastCheck: '04/08/25, 11:30am',
      progress: 95,
      progressFailed: 5,
      minutesSaved: Math.floor(Math.random() * 100) + 1,
      color: '#E74949',
    },
    {
      icon: 'Daniel',
      tag: 'Daniel',
      description: 'Process purchase invoices',
      lastCheck: '04/08/25, 11:30am',
      progress: 90,
      progressFailed: 10,
      minutesSaved: Math.floor(Math.random() * 100) + 1,
      color: '#35AC3A',
    },

    {
      icon: 'Pedro',
      tag: 'Pedro',
      description:
        "I'm your payment processing expert, ensuring that your payment operations are accurate, fast, and stress-free. Let's simplify payments together!",
      lastCheck: '04/08/25, 11:30am',
      progress: 60,
      progressFailed: 40,
      minutesSaved: Math.floor(Math.random() * 100) + 1,
      color: '#35AC3A',
    },
  ];

  visibleAgentsCount = 3;

  get visibleAgents() {
    return this.agentHealth.slice(0, this.visibleAgentsCount);
  }

  showMore() {
    if (this.visibleAgentsCount >= this.agentHealth.length) {
      // Si ya se muestran todos, reiniciar
      this.visibleAgentsCount = 3;
    } else {
      // Mostrar más
      this.visibleAgentsCount += 3;
    }
  }

  tasks: Task[] = [
    {
      id: 1,
      title: 'REQ-2024-001',
      tag: 'Olivia',
      time: '2 minutes ago',
      status: 'completed',
    },
    {
      id: 2,
      title: 'REQ-2024-002',
      tag: 'RaaS',
      time: '1 minute ago',
      status: 'in progress',
    },
    {
      id: 3,
      title: 'REQ-2024-003',
      tag: 'Daniel',
      time: '6 minutes ago',
      status: 'in progress',
    },
    {
      id: 4,
      title: 'REQ-2024-004',
      tag: 'David',
      time: ' 20 minutes ago',
      status: 'completed',
    },
    {
      id: 5,
      title: 'REQ-2024-005',
      tag: 'RaaS',
      time: '11 minutes ago',
      status: 'completed',
    },
    {
      id: 6,
      title: 'REQ-2024-006',
      tag: 'IPB',
      time: '1 minute ago',
      status: 'in progress',
    },
    {
      id: 7,
      title: 'REQ-2024-006',
      tag: 'Daniel',
      time: '1 minute ago',
      status: 'in progress',
    },
    {
      id: 8,
      title: 'REQ-2024-006',
      tag: 'David',
      time: '1 minute ago',
      status: 'in progress',
    },
  ];
}
