import React, { useState, useEffect } from 'react';
import type { 
  CustomNode, 
  Automation 
} from '../../types/workflowTypes';
import { getAutomations } from '../../api/mockApi';

interface NodeEditorProps {
  selectedNode: CustomNode | null;
  onNodeUpdate: (nodeId: string, newData: any) => void;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({ selectedNode, onNodeUpdate }) => {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setAutomations(getAutomations());
  }, []);

  useEffect(() => {
    if (selectedNode) {
      setFormData(selectedNode.data);
    } else {
      setFormData({});
    }
  }, [selectedNode]);

  const handleInputChange = (field: string, value: any) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, newFormData);
    }
  };

  if (!selectedNode) {
    return (
      <div style={{ height: '100%', padding: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
          Node Configuration
        </h2>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          Select a node to configure its properties
        </p>
      </div>
    );
  }

  const renderStartNodeForm = () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
          placeholder="Enter node title"
        />
      </div>
    </div>
  );

  const renderTaskNodeForm = () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Title *</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
          placeholder="Enter task title"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', resize: 'none', minHeight: '80px' }}
          placeholder="Enter task description"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Assignee</label>
        <input
          type="text"
          value={formData.assignee || ''}
          onChange={(e) => handleInputChange('assignee', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
          placeholder="Enter assignee name"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Due Date</label>
        <input
          type="date"
          value={formData.dueDate || ''}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
        />
      </div>
    </div>
  );

  const renderApprovalNodeForm = () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
          placeholder="Enter approval title"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Approver Role</label>
        <select
          value={formData.approverRole || 'Manager'}
          onChange={(e) => handleInputChange('approverRole', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
        >
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
        </select>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Auto Approve Threshold</label>
        <input
          type="number"
          value={formData.autoApproveThreshold || ''}
          onChange={(e) => handleInputChange('autoApproveThreshold', parseInt(e.target.value) || 0)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
          placeholder="Enter threshold"
          min="0"
        />
      </div>
    </div>
  );

  const renderAutomatedNodeForm = () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
          placeholder="Enter node title"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Action</label>
        <select
          value={formData.action || ''}
          onChange={(e) => handleInputChange('action', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
        >
          <option value="">Select an action</option>
          {automations.map((automation) => (
            <option key={automation.id} value={automation.id}>
              {automation.label}
            </option>
          ))}
        </select>
      </div>
      {formData.action && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Parameters</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {automations
              .find(a => a.id === formData.action)
              ?.params.map((param) => (
                <div key={param}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px', color: '#6b7280' }}>{param}</label>
                  <input
                    type="text"
                    value={formData.parameters?.[param] || ''}
                    onChange={(e) => {
                      const newParams = { ...formData.parameters, [param]: e.target.value };
                      handleInputChange('parameters', newParams);
                    }}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                    placeholder={`Enter ${param}`}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderEndNodeForm = () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
          placeholder="Enter end node title"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>End Message</label>
        <textarea
          value={formData.endMessage || ''}
          onChange={(e) => handleInputChange('endMessage', e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', resize: 'none', minHeight: '80px' }}
          placeholder="Enter end message"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
          <input
            type="checkbox"
            checked={formData.summaryFlag || false}
            onChange={(e) => handleInputChange('summaryFlag', e.target.checked)}
            style={{ width: '16px', height: '16px' }}
          />
          Generate Summary
        </label>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (selectedNode.data.type) {
      case 'start':
        return renderStartNodeForm();
      case 'task':
        return renderTaskNodeForm();
      case 'approval':
        return renderApprovalNodeForm();
      case 'automated':
        return renderAutomatedNodeForm();
      case 'end':
        return renderEndNodeForm();
      default:
        return null;
    }
  };

  return (
    <div style={{ height: '100%', padding: '16px', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
        {selectedNode.data.type.charAt(0).toUpperCase() + selectedNode.data.type.slice(1)} Node
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {renderForm()}
      </div>
    </div>
  );
};
