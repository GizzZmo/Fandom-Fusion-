/**
 * Type Definitions
 * 
 * This module contains TypeScript interfaces and types used throughout
 * the Fandom-Fusion application.
 * 
 * @module types
 */

import React from 'react';

/**
 * Represents a project development phase in the dashboard
 * 
 * Used to display information about different stages of the project
 * lifecycle, from data collection to testing and iteration.
 * 
 * @interface Phase
 * 
 * @property {number} id - Unique identifier for the phase (1-4)
 * @property {string} title - Short title of the phase (e.g., "Fase 1: Datainnsamling")
 * @property {React.ReactNode} content - Rich content description including details and examples
 * 
 * @example
 * ```typescript
 * const phase: Phase = {
 *   id: 1,
 *   title: "Fase 1: Datainnsamling",
 *   content: <div>Phase description...</div>
 * };
 * ```
 */
export interface Phase {
    id: number;
    title: string;
    content: React.ReactNode;
}
