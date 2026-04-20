# HR Workflow Designer (React + React Flow)

## Overview

This project is a functional prototype of an HR Workflow Designer that enables administrators to visually create, configure, and simulate internal workflows such as onboarding, leave approvals, and document verification.

The application demonstrates frontend architecture, dynamic form handling, and workflow simulation using a graph-based UI.

---

## Features

### 1. Workflow Canvas

* Drag-and-drop interface using React Flow
* Node types supported:

  * Start
  * Task
  * Approval
  * Automated
  * End
* Connect nodes using edges to define workflow sequence
* Delete nodes and edges
* Background grid for better visualization

---

### 2. Node Configuration Panel

Each node can be configured through a dynamic form:

* **Start Node**

  * Title
  * Metadata (optional key-value pairs)

* **Task Node**

  * Title (required)
  * Description
  * Assignee
  * Due Date
  * Custom Fields

* **Approval Node**

  * Title
  * Approver Role (Manager / HRBP / Director)
  * Auto-approve Threshold

* **Automated Node**

  * Title
  * Action selection (from mock API)
  * Dynamic parameters based on selected action

* **End Node**

  * End Message
  * Summary Flag

---

### 3. Mock API Layer

A lightweight mock API simulates backend behavior:

* **GET /automations**

  * Returns available automated actions and their parameters

* **POST /simulate**

  * Accepts workflow JSON
  * Returns step-by-step execution output

---

### 4. Workflow Simulation

* "Run Workflow" triggers simulation
* Serializes nodes and edges into structured JSON
* Displays execution steps in a clean panel
* Example output:

  ```
  1. Start
  2. Task: Upload Documents
  3. Approval: Manager
  4. End
  ```

---

### 5. Validation

* Ensures exactly one Start node
* Requires at least one End node
* Basic connection validation

---

## Architecture

The project follows a modular and scalable frontend structure:

```
src/
  components/
    Sidebar/
    Canvas/
    NodeEditor/
    SimulationPanel/
  nodes/
    StartNode.tsx
    TaskNode.tsx
    ApprovalNode.tsx
    AutomatedNode.tsx
    EndNode.tsx
  hooks/
    useWorkflow.ts
  api/
    mockApi.ts
  utils/
    serializer.ts
  types/
    workflowTypes.ts
```

### Key Design Decisions

* **Separation of concerns** between UI, logic, and API
* **Reusable components** for scalability
* **Custom hooks** for workflow state management
* **Type-safe interfaces** using TypeScript
* **Dynamic forms** for extensibility of node types

---

## Tech Stack

* React (Vite + TypeScript)
* React Flow
* Tailwind CSS / CSS Modules
* Mock API (local functions)

---

## How to Run

```bash
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## Assumptions

* Application is fully client-side (no backend persistence)
* Workflow simulation is mocked and not executed in real-time
* Validation is kept minimal for prototype scope

---

## Limitations

* No authentication or user roles
* No workflow persistence (save/load)
* No advanced graph validation (e.g., cycle detection)
* Simplified simulation logic

---

## Future Improvements

* Workflow persistence (save/load JSON)
* Advanced validation (cycle detection, error highlighting)
* Undo/Redo functionality
* Auto-layout of nodes
* Improved UI/UX and accessibility
* Integration with real backend APIs

---

## Conclusion

This prototype demonstrates the ability to build a scalable, modular workflow system with dynamic configuration and simulation capabilities using modern frontend technologies. It focuses on architectural clarity, extensibility, and functional completeness.
