/* eslint-disable-next-line */
import { ShareAdvancedCard } from "@meetjs-2023-nx-remote-caching/share/advanced/card";
import { ShareAdvancedModal } from "@meetjs-2023-nx-remote-caching/share/advanced/modal";

export interface BusinessTravelGalleryProps {
}

export function BusinessTravelGallery(props: BusinessTravelGalleryProps) {
  return (
    <div>
      <ShareAdvancedCard/>
      <ShareAdvancedModal/>
    </div>
  );
}

export default BusinessTravelGallery;
