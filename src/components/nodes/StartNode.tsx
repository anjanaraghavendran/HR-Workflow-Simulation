import React from 'react';
import { Handle, Position } from 'reactflow';
import type { StartNodeData } from '../../types/workflowTypes';

interface StartNodeProps {
  data: StartNodeData;
  selected: boolean;
}

export const StartNode: React.FC<StartNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-green-100 border-2 ${
        selected ? 'border-green-500' : 'border-green-300'
      }`}
    >
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold text-green-800">{data.title}</div>
          <div className="text-xs text-green-600">Start Node</div>
        </div>
      </div>
    </div>
  );
};
