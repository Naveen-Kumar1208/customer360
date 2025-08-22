# Customer 360 Frontend - Project Information

## Project Overview

**Customer 360** is a comprehensive customer analytics platform built with Next.js that provides real-time insights into website performance, visitor behavior, and customer journey analytics. The platform serves as a Customer Data Platform (CDP) frontend offering detailed dashboards and visualization tools for marketing teams and data analysts.

## Technical Stack

### Core Technologies
- **Framework**: Next.js 15.2.0 (React 18.3.1)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.1 with custom components
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **Package Manager**: Bun (with npm fallback)

### Data Visualization & Charts
- **Primary**: Recharts 2.15.1 (React-based charts)
- **Secondary**: Chart.js 4.4.8 with React-ChartJS-2 5.3.0
- **Icons**: Lucide React 0.475.0

### Development Tools
- **Linter**: Biome 1.9.4 (modern ESLint/Prettier replacement)
- **Build Tool**: Next.js with Turbopack support
- **Type Checking**: TypeScript with strict mode enabled

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with auth provider
│   ├── page.tsx                 # Dashboard homepage
│   ├── authContext.tsx          # Authentication context
│   ├── authGuard.tsx            # Route protection component
│   └── [feature-pages]/         # Feature-specific pages
├── components/
│   ├── dashboard/              # Analytics dashboard components
│   ├── layouts/                # Layout components (Sidebar, Navbar)
│   ├── products/               # Product funnel components
│   ├── visitors/               # Visitor analytics components
│   └── ui/                     # Reusable UI components
└── lib/
    ├── data/                   # Mock data and sample datasets
    └── utils.ts                # Utility functions
```

## Key Features & Pages

### 1. Dashboard (Main Analytics Hub)
- **Location**: `/` (homepage)
- **Purpose**: Central analytics dashboard with key metrics
- **Components**:
  - Traffic overview and sources
  - User analytics (new vs returning)
  - Geolocation data
  - Key performance indicators
  - Channel distribution and activity
  - Consent banner performance
  - Real-time activity logs

### 2. Visitors Analytics
- **Location**: `/visitors`
- **Features**:
  - Real-time user tracking
  - Conversion funnel analysis
  - Page performance metrics
  - User journey mapping
  - Event tracking and error monitoring
  - Retention analysis

### 3. Funnel Analysis
- **Location**: `/products` with sub-sections:
  - **TOFU** (Top of Funnel): `/products/tofu` - Lead generation and awareness
  - **MOFU** (Middle of Funnel): `/products/mofu` - Lead nurturing
  - **BOFU** (Bottom of Funnel): `/products/bofu` - Conversion optimization

### 4. Campaign Management
- **Location**: `/engagement`
- **Purpose**: Campaign performance tracking and analysis

### 5. Automation
- **Location**: `/automation`
- **Purpose**: Marketing automation workflows and triggers

### 6. Additional Features
- **MQL to SQL**: `/mql-to-sql` - Lead qualification tracking
- **Segmentation**: `/segment` - Customer segmentation tools
- **Integrations**: `/integrations` - Third-party integration management

## Data Architecture

### Sample Datasets
The platform includes comprehensive mock data for demonstration:

1. **Dashboard Data** (`dashboardData.ts`)
   - Sales and revenue metrics
   - Performance trends
   - Product analytics
   - Visitor statistics

2. **Tag Management Data** (`tagDashboardData.ts`)
   - Tag firing statistics
   - Container version management
   - Geographic user distribution
   - Traffic source analysis
   - Channel activity patterns
   - Consent performance metrics

3. **TOFU Analytics** (`tofuData.ts`)
   - Content performance metrics
   - Traffic source analysis
   - Campaign effectiveness
   - Audience demographics
   - Social media engagement
   - Blog performance tracking

4. **Visitor Tracking** (`visitorsData.ts`)
   - Real-time user sessions
   - Conversion funnel data
   - Page performance metrics
   - User journey paths
   - Event tracking
   - Error monitoring

## Dashboard Components

### Visualization Types
- **Area Charts**: Traffic trends, user growth
- **Bar Charts**: Geographic distribution, performance metrics
- **Pie/Donut Charts**: Traffic sources, channel distribution
- **Line Charts**: Trend analysis, time-series data
- **Heatmaps**: Channel activity by time periods
- **Tables**: Activity logs, performance data

### Key Dashboard Features
- **Responsive Design**: Mobile-first approach with grid layouts
- **Real-time Updates**: Live data refresh capabilities
- **Interactive Charts**: Hover tooltips, clickable legends
- **Time Range Selection**: Daily/weekly/monthly views
- **Performance Optimization**: Lazy loading, memoization
- **Accessibility**: WCAG compliant with proper contrast ratios

## Authentication System

### Current Implementation
- **Type**: Mock authentication system
- **Credentials**: `admin@example.com` / `password123`
- **Storage**: Local storage with JWT-like tokens
- **Protection**: Route guards for authenticated pages
- **Context**: React Context API for auth state management

### Security Features
- Client-side session management
- Route protection with AuthGuard component
- Automatic token validation
- Sign-out functionality with cleanup

## Development Configuration

### Build & Development
```bash
# Development server (with Turbopack)
npm run dev

# Production build
npm run build

# Static export
npm run export

# Linting and formatting
npm run lint
npm run format
```

### Code Quality
- **TypeScript**: Strict mode enabled with comprehensive typing
- **Biome**: Modern linting and formatting
- **Path Aliases**: `@/*` for clean imports
- **Component Architecture**: Modular, reusable components

## Deployment

### Current Setup
- **Platform**: Netlify (configured via `netlify.toml`)
- **Build Command**: `npm run build`
- **Output Directory**: Next.js default (`.next/`)
- **Environment**: Production-ready with optimization

### Performance Features
- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Efficient bundle management

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach

## Key Metrics Tracked

### Business Metrics
- Conversion rates and funnel analysis
- Customer acquisition costs
- Revenue and sales performance
- User engagement and retention

### Technical Metrics
- Page load times and performance
- Error rates and system health
- Tag firing success rates
- API response times

### User Experience Metrics
- Bounce rates and session duration
- User journey completion rates
- Feature adoption and usage
- Support ticket volumes

## BFSI (Banking, Financial Services & Insurance) Use Cases

### 🔐 1. Personalized Customer Engagement Across Channels
- **Use Case**: Delivering 1:1 personalized content and product recommendations across digital touchpoints (website, mobile app, email, WhatsApp, push, etc.)
- **Benefit**: Improves user engagement and conversion for loans, credit cards, mutual funds, etc.

### 📈 2. Hyper-Personalized Lead Nurturing & Retargeting
- **Use Case**: Real-time behavioral segmentation to run retargeting campaigns for drop-offs (e.g., incomplete loan applications or insurance quote pages)
- **Benefit**: Higher lead conversion rates and reduced acquisition cost

### 🧠 3. Customer Journey Orchestration
- **Use Case**: Maps and automates customer journeys based on life stage, risk profile, transaction history, etc.
- **Benefit**: Enables lifecycle marketing—like onboarding nudges, investment reminders, and premium renewal triggers

### 💳 4. Product Cross-Sell/Upsell
- **Use Case**: Uses unified customer profiles to identify intent and trigger contextual cross-sell (e.g., suggesting a credit card to a savings account holder or a top-up loan to a home loan customer)
- **Benefit**: Increases share of wallet

### 📊 5. Real-Time Personalization on Owned Channels
- **Use Case**: Dynamic personalization of landing pages, dashboards, and product pages for returning users (e.g., showing mutual fund options based on user risk appetite)
- **Benefit**: Enhances CX and boosts product uptake

### 📥 6. Drop-Off Recovery
- **Use Case**: Identifies drop-off patterns in journeys like onboarding, loan applications, policy purchase, and retargets users via email, SMS, or app push
- **Benefit**: Reduces journey abandonment and improves funnel conversion

### 🔍 7. Single Customer View (SCV)
- **Use Case**: Stitching together online and offline customer data into one unified profile
- **Benefit**: Enables banks/insurers to deliver consistent, personalized experiences and comply with KYC or data governance norms

### 🔄 8. Campaign Optimization with AI
- **Use Case**: AI decides the best message, channel, and time for customer outreach
- **Benefit**: Maximizes ROI from marketing spends and improves engagement metrics

### 📅 9. Policy Renewal and EMI Reminder Journeys
- **Use Case**: Automating nudges and smart reminders for renewals, payments, or documentation requirements
- **Benefit**: Reduces churn and missed payments

### 🏦 10. Wealth Management & Financial Planning Advisory
- **Use Case**: Segmenting HNI customers and triggering advisory-led, personalized content/offers
- **Benefit**: Improves retention and engagement of affluent customers

## Future Considerations

### Potential Enhancements
- Real-time WebSocket connections for live data
- Advanced filtering and segmentation
- Custom dashboard builder
- Data export capabilities
- Integration with popular analytics platforms
- Advanced user permission system

### Scalability
- Component library extraction
- Micro-frontend architecture consideration
- Advanced caching strategies
- CDN optimization for global deployment

## Development Notes

### Code Standards
- Functional components with hooks
- TypeScript interfaces for all data structures
- Consistent naming conventions
- Modular component architecture
- Performance-first approach with memoization

### Testing Strategy
- Component testing framework ready
- Mock data infrastructure in place
- Development environment optimized for testing

This Customer 360 platform represents a modern, scalable approach to customer analytics with emphasis on user experience, performance, and maintainability.