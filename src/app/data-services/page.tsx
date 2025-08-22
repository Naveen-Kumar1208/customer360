import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { ContainerCards } from "@/components/data-services/ContainerCards";
import { ContainerActivity } from "@/components/data-services/ContainerActivity";
import { UploadHistory } from "@/components/data-services/UploadHistory";
import { CloudStorageStatus } from "@/components/data-services/CloudStorageStatus";
import { RecentQueries } from "@/components/data-services/RecentQueries";
import { UserProfilesList } from "@/components/data-services/UserProfilesList";


export default function DataServicesPage() {
  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Services</h1>
            <p className="text-muted-foreground">
              Manage your data containers, uploads, cloud storage, queries, and user creation
            </p>
          </div>

          <ContainerCards />
          
          <ContainerActivity />

          <div className="grid gap-6 md:grid-cols-2">
            <UploadHistory />
            <CloudStorageStatus />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <RecentQueries />
            <UserProfilesList />
          </div>
        </div>
      </StaticExportLayout>
    </>
  );
}