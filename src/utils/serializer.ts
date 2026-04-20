import type { Workflow, CustomNode, CustomEdge } from '../types/workflowTypes';

export const serializeWorkflow = (workflow: Workflow): string => {
  return JSON.stringify(workflow, null, 2);
};

export const deserializeWorkflow = (jsonString: string): Workflow => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Invalid workflow JSON format');
  }
};

export const exportWorkflow = (workflow: Workflow): void => {
  const jsonString = serializeWorkflow(workflow);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `workflow-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importWorkflow = (): Promise<Workflow> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonString = e.target?.result as string;
          const workflow = deserializeWorkflow(jsonString);
          resolve(workflow);
        } catch (error) {
          reject(new Error('Failed to parse workflow file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  });
};

export const validateWorkflowStructure = (workflow: Workflow): string[] => {
  const errors: string[] = [];
  
  if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
    errors.push('Workflow must have a nodes array');
  }
  
  if (!workflow.edges || !Array.isArray(workflow.edges)) {
    errors.push('Workflow must have an edges array');
  }
  
  // Validate each node
  workflow.nodes?.forEach((node, index) => {
    if (!node.id) {
      errors.push(`Node at index ${index} must have an id`);
    }
    
    if (!node.type) {
      errors.push(`Node ${node.id || index} must have a type`);
    }
    
    if (!node.data || !node.data.title) {
      errors.push(`Node ${node.id || index} must have a title`);
    }
  });
  
  // Validate each edge
  workflow.edges?.forEach((edge, index) => {
    if (!edge.id) {
      errors.push(`Edge at index ${index} must have an id`);
    }
    
    if (!edge.source) {
      errors.push(`Edge ${edge.id || index} must have a source`);
    }
    
    if (!edge.target) {
      errors.push(`Edge ${edge.id || index} must have a target`);
    }
  });
  
  return errors;
};
