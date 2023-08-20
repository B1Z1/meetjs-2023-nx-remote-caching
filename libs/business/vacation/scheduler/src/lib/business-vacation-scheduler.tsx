/* eslint-disable-next-line */
import { ShareAdvancedModal } from "@meetjs-2023-nx-remote-caching/share/advanced/modal";
import { ShareCoreTag } from "@meetjs-2023-nx-remote-caching/share/core/tag";
import { ShareCoreLabel } from "@meetjs-2023-nx-remote-caching/share/core/label";

export interface BusinessVacationSchedulerProps {
}

export function BusinessVacationScheduler(
  props: BusinessVacationSchedulerProps
) {
  return (
    <div>
      <ShareAdvancedModal/>
      <ShareCoreTag/>
      <ShareCoreLabel/>
    </div>
  );
}

export default BusinessVacationScheduler;
