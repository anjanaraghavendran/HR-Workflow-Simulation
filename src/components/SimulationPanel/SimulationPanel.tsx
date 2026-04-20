import React from 'react';
import type { SimulationStep } from '../../types/workflowTypes';

interface SimulationPanelProps {
  simulationSteps: SimulationStep[];
  isSimulating: boolean;
  onClose: () => void;
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({ 
  simulationSteps, 
  isSimulating, 
  onClose 
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      width: '320px',
      maxHeight: '70vh',
      overflowY: 'auto',
      background: '#111',
      color: 'white',
      border: '1px solid #444',
      borderRadius: '8px',
      padding: '16px',
      zIndex: 1000
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
          Workflow Simulation
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '4px'
          }}
        >
          ×
        </button>
      </div>
      
      {/* Content */}
      {simulationSteps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p style={{ margin: 0, color: '#ccc', fontSize: '14px' }}>
            {isSimulating ? 'Running simulation...' : 'No simulation data available'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {simulationSteps.map((step, index) => (
            <div key={index} style={{ padding: '8px 0', borderBottom: index < simulationSteps.length - 1 ? '1px solid #333' : 'none' }}>
              <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                {step.step}. {step.description}
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {step.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
