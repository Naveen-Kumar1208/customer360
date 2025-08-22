# Component Refactoring Guidelines

## Overview
This document outlines the approach for breaking down large components (>300 lines) into smaller, more manageable pieces while maintaining all functionality.

## Completed Refactoring

### 1. Visitors Page (1893 → 169 lines)
- **Created Components:**
  - `OverviewTab.tsx` - Main dashboard view
  - `UserJourneysTab.tsx` - User journey analytics
  - `ConversionTab.tsx` - Conversion funnel analysis
  - `PagesTab.tsx` - Page performance metrics
  - `EventsTab.tsx` - Event tracking and errors
  - `RetentionTab.tsx` - User retention analysis
- **Data File:** `visitorsData.ts` - All sample data extracted

### 2. Products TOFU Page (1717 → 241 lines)
- **Created Components:**
  - `OverviewTab.tsx` - Key metrics and charts
  - `CampaignsTab.tsx` - Campaign performance
  - `AudienceTab.tsx` - Audience insights
  - `ContentTab.tsx` - Content performance
- **Data File:** `tofuData.ts` - All metrics and sample data
- **Note:** Social Media and SEO tabs kept as small inline components

## Refactoring Pattern

### 1. Data Extraction
- Create a data file in `/src/lib/data/[pageName]Data.ts`
- Extract all sample data, mock data, and constants
- Export typed data structures

### 2. Component Structure
```
/src/components/[feature]/[subfeature]/
  ├── OverviewTab.tsx     (Main dashboard/summary view)
  ├── [Feature]Tab.tsx    (Feature-specific tabs)
  └── [Shared]Component.tsx (Shared components if needed)
```

### 3. Main Page Structure (<300 lines)
```tsx
- Imports and type declarations
- State management (minimal)
- Loading state
- Tab navigation
- Tab content rendering
- Small inline components for simple tabs
```

### 4. Component Guidelines
- Each tab component should be <250 lines
- Extract complex logic into utility functions
- Use React.memo for performance-critical components
- Keep chart initialization in useEffect hooks
- Pass data as props from parent page

## Remaining Components to Refactor

1. **mql-to-sql/page.tsx** (1341 lines)
   - Extract lead scoring logic
   - Create tabs for different stages
   - Separate chart components

2. **products/bofu/page.tsx** (1247 lines)
   - Extract conversion metrics
   - Create opportunity tracking components
   - Separate deal pipeline visualization

3. **automation/page.tsx** (1241 lines)
   - Extract workflow components
   - Create automation rule builders
   - Separate trigger/action components

4. **segment/page.tsx** (1234 lines)
   - Extract segment builders
   - Create audience filtering components
   - Separate segment analytics

5. **products/mofu/page.tsx** (1137 lines)
   - Extract consideration metrics
   - Create engagement tracking components
   - Separate nurturing campaign views

6. **engagement/page.tsx** (1127 lines)
   - Extract campaign components
   - Create engagement metrics views
   - Separate channel performance

7. **products/page.tsx** (345 lines)
   - Minor refactoring needed
   - Extract funnel visualization
   - Keep navigation simple

## Best Practices

1. **Performance**
   - Use React.memo for list items and frequently re-rendered components
   - Lazy load heavy chart libraries
   - Memoize expensive calculations

2. **Code Organization**
   - One component per file
   - Clear prop interfaces
   - Consistent naming conventions

3. **Maintainability**
   - Keep related components together
   - Use descriptive file names
   - Add JSDoc comments for complex logic

4. **Testing Considerations**
   - Components should be testable in isolation
   - Mock data should be realistic
   - Keep side effects in useEffect hooks