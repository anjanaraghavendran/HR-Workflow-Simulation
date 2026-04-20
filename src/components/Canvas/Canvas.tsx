import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
  BackgroundVariant,
} from 'reactflow';
import type { Connection, Node } from 'reactflow';
import type { DraggableNodeType, CustomNode, CustomEdge } from '../../types/workflowTypes';
import { 
  StartNode, 
  TaskNode, 
  ApprovalNode, 
  AutomatedNode, 
  EndNode 
} from '../nodes';

import 'reactflow/dist/style.css';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

interface CanvasProps {
  nodes: CustomNode[];
  edges: CustomEdge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick: (node: CustomNode) => void;
  onDrop: (event: React.DragEvent, nodeType: DraggableNodeType, position: { x: number; y: number }) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onDrop,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    onNodeClick(node as CustomNode);
  }, [onNodeClick]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left - 75,
        y: event.clientY - reactFlowBounds.top - 40,
      };

      // This will be handled by parent component
      const nodeType: DraggableNodeType = JSON.parse(type);
      onDrop(event, nodeType, position);
    },
    [onDrop]
  );

  return (
    <div style={{ width: '100%', height: '100%' }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

// Wrapper component that provides ReactFlowProvider
export const CanvasWithProvider: React.FC<CanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <Canvas {...props} />
    </ReactFlowProvider>
  );
};
