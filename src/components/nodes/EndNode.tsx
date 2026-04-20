import React from 'react';
import { Handle, Position } from 'reactflow';
import type { EndNodeData } from '../../types/workflowTypes';

interface EndNodeProps {
  data: EndNodeData;
  selected: boolean;
}

export const EndNode: React.FC<EndNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-red-100 border-2 ${
        selected ? 'border-red-500' : 'border-red-300'
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold text-red-800">{data.title}</div>
          <div className="text-xs text-red-600">End Node</div>
          {data.endMessage && (
            <div className="text-xs text-red-500">{data.endMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};
