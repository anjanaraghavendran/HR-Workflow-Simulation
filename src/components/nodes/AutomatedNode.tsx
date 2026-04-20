import React from 'react';
import { Handle, Position } from 'reactflow';
import type { AutomatedNodeData } from '../../types/workflowTypes';

interface AutomatedNodeProps {
  data: AutomatedNodeData;
  selected: boolean;
}

export const AutomatedNode: React.FC<AutomatedNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-purple-100 border-2 ${
        selected ? 'border-purple-500' : 'border-purple-300'
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold text-purple-800">{data.title}</div>
          <div className="text-xs text-purple-600">Automated Node</div>
          <div className="text-xs text-purple-500">Action: {data.action}</div>
        </div>
      </div>
    </div>
  );
};
