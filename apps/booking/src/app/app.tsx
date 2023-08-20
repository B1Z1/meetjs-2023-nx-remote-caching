import { BusinessTravelBookForm } from "@meetjs-2023-nx-remote-caching/business/travel/book-form";
import { BusinessTravelGallery } from "@meetjs-2023-nx-remote-caching/business/travel/gallery";
import { BusinessVacationScheduler } from "@meetjs-2023-nx-remote-caching/business/vacation/scheduler";
import { ShareCoreButton } from "@meetjs-2023-nx-remote-caching/share/core/button";
import { ShareAdvancedMenu } from "@meetjs-2023-nx-remote-caching/share/advanced/menu";

export function App() {
  return (
    <>
      <BusinessTravelBookForm/>
      <BusinessTravelGallery/>
      <BusinessVacationScheduler/>
      <ShareCoreButton/>
      <ShareAdvancedMenu/>
    </>
  );
}

export default App;
