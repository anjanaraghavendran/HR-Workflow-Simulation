import React from 'react';
import { Handle, Position } from 'reactflow';
import type { ApprovalNodeData } from '../../types/workflowTypes';

interface ApprovalNodeProps {
  data: ApprovalNodeData;
  selected: boolean;
}

export const ApprovalNode: React.FC<ApprovalNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-yellow-100 border-2 ${
        selected ? 'border-yellow-500' : 'border-yellow-300'
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold text-yellow-800">{data.title}</div>
          <div className="text-xs text-yellow-600">Approval Node</div>
          <div className="text-xs text-yellow-500">Required from: {data.approverRole}</div>
        </div>
      </div>
    </div>
  );
};
