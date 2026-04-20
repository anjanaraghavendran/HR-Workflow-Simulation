import React from 'react';
import { Handle, Position } from 'reactflow';
import type { TaskNodeData } from '../../types/workflowTypes';

interface TaskNodeProps {
  data: TaskNodeData;
  selected: boolean;
}

export const TaskNode: React.FC<TaskNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-blue-100 border-2 ${
        selected ? 'border-blue-500' : 'border-blue-300'
      }`}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold text-blue-800">{data.title}</div>
          <div className="text-xs text-blue-600">Task Node</div>
          {data.assignee && (
            <div className="text-xs text-blue-500">Assigned to: {data.assignee}</div>
          )}
        </div>
      </div>
    </div>
  );
};
