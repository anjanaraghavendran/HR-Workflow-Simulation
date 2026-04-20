import { Node as ReactFlowNode, Edge as ReactFlowEdge } from 'reactflow';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface BaseNodeData {
  title: string;
  metadata?: Record<string, any>;
}

export interface StartNodeData extends BaseNodeData {
  type: 'start';
}

export interface TaskNodeData extends BaseNodeData {
  type: 'task';
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, any>;
}

export interface ApprovalNodeData extends BaseNodeData {
  type: 'approval';
  approverRole: 'Manager' | 'HRBP' | 'Director';
  autoApproveThreshold?: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  type: 'automated';
  action: string;
  parameters?: Record<string, any>;
}

export interface EndNodeData extends BaseNodeData {
  type: 'end';
  endMessage?: string;
  summaryFlag?: boolean;
}

export type NodeData = StartNodeData | TaskNodeData | ApprovalNodeData | AutomatedNodeData | EndNodeData;

export interface CustomNode extends ReactFlowNode<NodeData> {
  type: NodeType;
}

export interface CustomEdge extends ReactFlowEdge {
  id: string;
  source: string;
  target: string;
}

export interface Automation {
  id: string;
  label: string;
  params: string[];
}

export interface WorkflowValidation {
  isValid: boolean;
  errors: string[];
}

export interface Workflow {
  nodes: CustomNode[];
  edges: CustomEdge[];
}

export interface SimulationStep {
  step: number;
  type: string;
  description: string;
  timestamp?: string;
}

export interface DraggableNodeType {
  type: NodeType;
  label: string;
  icon: string;
}
