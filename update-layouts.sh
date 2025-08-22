#!/bin/bash

# Script to update layout imports to use StaticExportLayout

files=(
    "src/app/customers/page.tsx"
    "src/app/personalization/page.tsx"
    "src/app/journey-builder/page.tsx"
    "src/app/journey-builder/create/segment/page.tsx"
    "src/app/journey-builder/create/page.tsx"
    "src/app/visitors/page.tsx"
    "src/app/products/bofu/page.tsx"
    "src/app/products/mofu/page.tsx"
    "src/app/products/invalid/page.tsx"
    "src/app/products/tofu/page.tsx"
    "src/app/products/cold/page.tsx"
    "src/app/products/page.tsx"
    "src/app/triggers/page.tsx"
    "src/app/triggers/create/page.tsx"
    "src/app/live-events/page.tsx"
    "src/app/projects/[projectId]/[serviceId]/page.tsx"
    "src/app/projects/[projectId]/page.tsx"
    "src/app/projects/page.tsx"
    "src/app/segment/page.tsx"
    "src/app/cross-sell/page.tsx"
    "src/app/admin/live-events/page.tsx"
    "src/app/data-services/create-user/page.tsx"
    "src/app/data-services/cloud-storage/page.tsx"
    "src/app/data-services/query/page.tsx"
    "src/app/data-services/page.tsx"
    "src/app/data-services/upload/page.tsx"
    "src/app/agent/campaigns/page.tsx"
    "src/app/ai-campaigns/page.tsx"
    "src/app/ai-campaigns/create/page.tsx"
    "src/app/ai-campaign/page.tsx"
    "src/app/engagement/page.tsx"
    "src/app/integrations/page.tsx"
    "src/app/lead-nurturing/page.tsx"
    "src/app/renewals/page.tsx"
    "src/app/journey-analytics/templates/use/page.tsx"
    "src/app/journey-analytics/templates/edit/page.tsx"
    "src/app/journey-analytics/templates/page.tsx"
    "src/app/journey-analytics/page.tsx"
    "src/app/journey-analytics/create/page.tsx"
    "src/app/automation/page.tsx"
    "src/app/campaigns/create/sms/page.tsx"
    "src/app/campaigns/create/email/page.tsx"
    "src/app/campaigns/create/whatsapp/page.tsx"
    "src/app/wealth-management/page.tsx"
    "src/app/page.tsx"
    "src/app/drop-recovery/page.tsx"
    "src/app/analytics/page.tsx"
)

for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Updating $file..."
        
        # Replace import statements
        sed -i '' 's/import { StaticSafeDashboardLayout } from "@\/components\/layouts\/StaticSafeDashboardLayout"/import { StaticExportLayout } from "@\/components\/layouts\/StaticExportLayout"/g' "$file"
        sed -i '' 's/import { DashboardLayout } from "@\/components\/layouts\/DashboardLayout"/import { StaticExportLayout } from "@\/components\/layouts\/StaticExportLayout"/g' "$file"
        sed -i '' 's/import { ProtectedDashboardLayout } from "@\/components\/layouts\/ProtectedDashboardLayout"/import { StaticExportLayout } from "@\/components\/layouts\/StaticExportLayout"/g' "$file"
        
        # Replace component usage
        sed -i '' 's/<StaticSafeDashboardLayout>/<StaticExportLayout>/g' "$file"
        sed -i '' 's/<\/StaticSafeDashboardLayout>/<\/StaticExportLayout>/g' "$file"
        sed -i '' 's/<DashboardLayout>/<StaticExportLayout>/g' "$file"
        sed -i '' 's/<\/DashboardLayout>/<\/StaticExportLayout>/g' "$file"
        sed -i '' 's/<ProtectedDashboardLayout>/<StaticExportLayout>/g' "$file"
        sed -i '' 's/<\/ProtectedDashboardLayout>/<\/StaticExportLayout>/g' "$file"
        
        echo "✓ Updated $file"
    else
        echo "⚠ File not found: $file"
    fi
done

echo "Layout update completed!"