import { SectionCards } from "@/components/section-cards";
import { TopPartnersPodium } from "@/components/top-partners-podium";
import { PartnersList } from "@/components/partners-list";
import { TopInvoicingList } from "@/components/top-invoicing-list";
import { NewPartnersList } from "@/components/new-partners-list";

export default async function Page() {
  return (
    <>
      <SectionCards />

      <div className="px-4 lg:px-6">
        <TopPartnersPodium />
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-6">
        <PartnersList />
        <TopInvoicingList />
      </div>

      <div className="px-4 lg:px-6">
        <NewPartnersList />
      </div>
    </>
  );
}
