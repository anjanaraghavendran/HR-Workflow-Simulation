import { useState, useCallback } from 'react';
import type { 
  CustomNode, 
  CustomEdge, 
  Workflow, 
  WorkflowValidation,
  NodeType,
  DraggableNodeType,
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomatedNodeData,
  EndNodeData
} from '../types/workflowTypes';

export const useWorkflow = () => {
  const [nodes, setNodes] = useState<CustomNode[]>([]);
  const [edges, setEdges] = useState<CustomEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);

  const createNodeData = (type: NodeType): any => {
    switch (type) {
      case 'start':
        return {
          type: 'start' as const,
          title: 'Start',
          metadata: {}
        } as StartNodeData;
      
      case 'task':
        return {
          type: 'task' as const,
          title: 'New Task',
          description: '',
          assignee: '',
          dueDate: '',
          customFields: {}
        } as TaskNodeData;
      
      case 'approval':
        return {
          type: 'approval' as const,
          title: 'Approval Required',
          approverRole: 'Manager' as const,
          autoApproveThreshold: 0
        } as ApprovalNodeData;
      
      case 'automated':
        return {
          type: 'automated' as const,
          title: 'Automated Action',
          action: '',
          parameters: {}
        } as AutomatedNodeData;
      
      case 'end':
        return {
          type: 'end' as const,
          title: 'End',
          endMessage: '',
          summaryFlag: false
        } as EndNodeData;
      
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  };

  const addNode = useCallback((nodeType: DraggableNodeType, position: { x: number; y: number }) => {
    const newNode: CustomNode = {
      id: `${nodeType.type}-${Date.now()}`,
      type: nodeType.type,
      position,
      data: createNodeData(nodeType.type)
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    return newNode;
  }, []);

  const updateNode = useCallback((nodeId: string, newData: any) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );

    // Update selected node if it's the one being updated
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, data: { ...prev.data, ...newData } } : null);
    }
  }, [selectedNode]);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
    setEdges(prevEdges => prevEdges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    ));
    
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  const addEdge = useCallback((edge: CustomEdge) => {
    setEdges(prevEdges => [...prevEdges, edge]);
  }, []);

  const deleteEdge = useCallback((edgeId: string) => {
    setEdges(prevEdges => prevEdges.filter(edge => edge.id !== edgeId));
  }, []);

  const validateWorkflow = useCallback((): WorkflowValidation => {
    const errors: string[] = [];

    // Check for exactly one start node
    const startNodes = nodes.filter(node => node.data.type === 'start');
    if (startNodes.length === 0) {
      errors.push('Workflow must have exactly one Start node');
    } else if (startNodes.length > 1) {
      errors.push('Workflow can only have one Start node');
    }

    // Check for at least one end node
    const endNodes = nodes.filter(node => node.data.type === 'end');
    if (endNodes.length === 0) {
      errors.push('Workflow must have at least one End node');
    }

    // Check if all nodes are connected (basic connectivity check)
    if (nodes.length > 1) {
      const connectedNodeIds = new Set<string>();
      
      // Add all nodes that have connections
      edges.forEach(edge => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
      });

      // Check if any node (except start) is disconnected
      nodes.forEach(node => {
        if (node.data.type !== 'start' && !connectedNodeIds.has(node.id)) {
          errors.push(`Node "${node.data.title}" is not connected to the workflow`);
        }
      });
    }

    // Check for required fields in task nodes
    nodes.forEach(node => {
      if (node.data.type === 'task' && !node.data.title) {
        errors.push(`Task node at position (${Math.round(node.position.x)}, ${Math.round(node.position.y)}) must have a title`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [nodes, edges]);

  const clearWorkflow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
  }, []);

  const getWorkflow = useCallback((): Workflow => {
    return {
      nodes,
      edges
    };
  }, [nodes, edges]);

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    addNode,
    updateNode,
    deleteNode,
    addEdge,
    deleteEdge,
    validateWorkflow,
    clearWorkflow,
    getWorkflow
  };
};
