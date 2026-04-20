import type { Automation, Workflow, SimulationStep } from '../types/workflowTypes';

export const getAutomations = (): Automation[] => {
  return [
    { 
      id: "send_email", 
      label: "Send Email", 
      params: ["to", "subject", "body"] 
    },
    { 
      id: "generate_doc", 
      label: "Generate Document", 
      params: ["template", "recipient", "format"] 
    },
    { 
      id: "create_ticket", 
      label: "Create Support Ticket", 
      params: ["title", "description", "priority"] 
    },
    { 
      id: "schedule_meeting", 
      label: "Schedule Meeting", 
      params: ["attendees", "duration", "topic"] 
    },
    { 
      id: "update_database", 
      label: "Update Database", 
      params: ["table", "recordId", "fields"] 
    }
  ];
};

export const simulateWorkflow = (workflow: Workflow): SimulationStep[] => {
  const steps: SimulationStep[] = [];
  let stepNumber = 1;

  // Find start node
  const startNode = workflow.nodes.find(node => node.data.type === 'start');
  if (startNode) {
    steps.push({
      step: stepNumber++,
      type: 'start',
      description: `Start: ${startNode.data.title}`,
      timestamp: new Date().toISOString()
    });
  }

  // Build execution path by following edges
  const executionPath = buildExecutionPath(workflow);
  
  for (const nodeId of executionPath) {
    const node = workflow.nodes.find(n => n.id === nodeId);
    if (!node) continue;

    switch (node.data.type) {
      case 'task':
        steps.push({
          step: stepNumber++,
          type: 'task',
          description: `Task: ${node.data.title}${node.data.assignee ? ` (Assigned to: ${node.data.assignee})` : ''}`,
          timestamp: new Date().toISOString()
        });
        break;
      
      case 'approval':
        steps.push({
          step: stepNumber++,
          type: 'approval',
          description: `Approval: ${node.data.title} (Required from: ${node.data.approverRole})`,
          timestamp: new Date().toISOString()
        });
        break;
      
      case 'automated':
        if ('action' in node.data) {
          const automation = getAutomations().find(a => a.id === node.data.action);
          steps.push({
            step: stepNumber++,
            type: 'automated',
            description: `Automated: ${automation?.label || node.data.action}`,
            timestamp: new Date().toISOString()
          });
        }
        break;
      
      case 'end':
        steps.push({
          step: stepNumber++,
          type: 'end',
          description: `End: ${node.data.title}${node.data.endMessage ? ` - ${node.data.endMessage}` : ''}`,
          timestamp: new Date().toISOString()
        });
        break;
    }
  }

  return steps;
};

// Helper function to build execution path from workflow
const buildExecutionPath = (workflow: Workflow): string[] => {
  const path: string[] = [];
  const visited = new Set<string>();
  
  // Find start node
  const startNode = workflow.nodes.find(node => node.data.type === 'start');
  if (!startNode) return path;
  
  // Follow edges to build path
  let currentNodeId = startNode.id;
  
  while (currentNodeId && !visited.has(currentNodeId)) {
    visited.add(currentNodeId);
    path.push(currentNodeId);
    
    // Find next node via outgoing edge
    const nextEdge = workflow.edges.find(edge => edge.source === currentNodeId);
    if (nextEdge) {
      currentNodeId = nextEdge.target;
    } else {
      break;
    }
  }
  
  return path;
};
