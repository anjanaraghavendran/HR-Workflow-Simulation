import React, { useState, useCallback } from 'react';
import { useWorkflow } from './hooks/useWorkflow';
import { Sidebar } from './components/Sidebar/Sidebar';
import { CanvasWithProvider } from './components/Canvas/Canvas';
import { NodeEditor } from './components/NodeEditor/NodeEditor';
import { SimulationPanel } from './components/SimulationPanel/SimulationPanel';
import { simulateWorkflow } from './api/mockApi';
import type { DraggableNodeType, SimulationStep } from './types/workflowTypes';
import './App.css';

function App() {
  const {
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
  } = useWorkflow();

  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleDragStart = useCallback((event: React.DragEvent, nodeType: DraggableNodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDrop = useCallback((event: React.DragEvent, nodeType: DraggableNodeType, position: { x: number; y: number }) => {
    event.preventDefault();
    addNode(nodeType, position);
  }, [addNode]);

  const handleNodesChange = useCallback((changes: any) => {
    // Handle node changes (position, deletion, etc.)
    changes.forEach((change: any) => {
      if (change.type === 'remove') {
        deleteNode(change.id);
      }
    });
  }, [deleteNode]);

  const handleEdgesChange = useCallback((changes: any) => {
    // Handle edge changes (deletion, etc.)
    changes.forEach((change: any) => {
      if (change.type === 'remove') {
        deleteEdge(change.id);
      }
    });
  }, [deleteEdge]);

  const handleConnect = useCallback((connection: any) => {
    const newEdge = {
      id: `edge-${Date.now()}`,
      source: connection.source,
      target: connection.target,
      type: 'smoothstep'
    };
    addEdge(newEdge);
  }, [addEdge]);

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  const handleNodeUpdate = useCallback((nodeId: string, newData: any) => {
    updateNode(nodeId, newData);
  }, [updateNode]);

  const handleRunWorkflow = useCallback(() => {
    const validation = validateWorkflow();
    setValidationErrors(validation.errors);

    if (validation.isValid) {
      setIsSimulating(true);
      setShowSimulation(true);
      setSimulationSteps([]);

      const workflow = getWorkflow();
      
      // Simulate workflow execution
      setTimeout(() => {
        const steps = simulateWorkflow(workflow);
        setSimulationSteps(steps);
        setIsSimulating(false);
      }, 1000);
    }
  }, [validateWorkflow, getWorkflow]);

  const handleCloseSimulation = useCallback(() => {
    setShowSimulation(false);
    setSimulationSteps([]);
    setValidationErrors([]);
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>HR Workflow Designer</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleRunWorkflow}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Run Workflow
          </button>
          <button
            onClick={clearWorkflow}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#ef4444', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Clear All
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar - width: 220px */}
        <div style={{ width: '220px', borderRight: '1px solid #e5e7eb', padding: '16px', height: '100%', overflow: 'auto' }}>
          <Sidebar onDragStart={handleDragStart} />
        </div>

        {/* Center Canvas - flex: 1 */}
        <div style={{ flex: 1, position: 'relative', height: '100%' }}>
          <CanvasWithProvider
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={handleConnect}
            onNodeClick={handleNodeClick}
            onDrop={handleDrop}
          />
        </div>

        {/* Right Panel - width: 300px */}
        <div style={{ width: '300px', borderLeft: '1px solid #e5e7eb', padding: '16px', height: '100%', overflow: 'auto' }}>
          <NodeEditor
            selectedNode={selectedNode}
            onNodeUpdate={handleNodeUpdate}
          />
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="fixed top-20 right-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md z-40">
          <h3 className="text-red-800 font-semibold mb-2">Validation Errors</h3>
          <ul className="text-red-700 text-sm space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Simulation Panel */}
      {showSimulation && (
        <SimulationPanel
          simulationSteps={simulationSteps}
          isSimulating={isSimulating}
          onClose={handleCloseSimulation}
        />
      )}
    </div>
  );
}

export default App;
