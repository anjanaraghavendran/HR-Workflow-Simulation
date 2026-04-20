import React from 'react';
import type { DraggableNodeType } from '../../types/workflowTypes';

interface SidebarProps {
  onDragStart: (event: React.DragEvent, nodeType: DraggableNodeType) => void;
}

const nodeTypes: DraggableNodeType[] = [
  { type: 'start', label: 'Start', icon: '🚀' },
  { type: 'task', label: 'Task', icon: '📋' },
  { type: 'approval', label: 'Approval', icon: '✅' },
  { type: 'automated', label: 'Automated', icon: '🤖' },
  { type: 'end', label: 'End', icon: '🏁' },
];

export const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
        Workflow Nodes
      </h2>
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            style={{
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'move',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            draggable
            onDragStart={(event) => onDragStart(event, nodeType)}
          >
            <span style={{ fontSize: '18px' }}>{nodeType.icon}</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{nodeType.label}</span>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
          Instructions
        </h3>
        <ul style={{ fontSize: '12px', color: '#6b7280', margin: 0, paddingLeft: '16px', listStyle: 'disc' }}>
          <li style={{ marginBottom: '4px' }}>Drag nodes to canvas</li>
          <li style={{ marginBottom: '4px' }}>Click nodes to configure</li>
          <li style={{ marginBottom: '4px' }}>Connect nodes with edges</li>
          <li>Run workflow to test</li>
        </ul>
      </div>
    </div>
  );
};
