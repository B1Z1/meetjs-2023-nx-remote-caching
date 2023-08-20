/* eslint-disable-next-line */
import { ShareCoreButton } from "@meetjs-2023-nx-remote-caching/share/core/button";
import { ShareCoreIcon } from "@meetjs-2023-nx-remote-caching/share/core/icon";
import { ShareCoreLabel } from "@meetjs-2023-nx-remote-caching/share/core/label";
import { ShareFormCheckbox } from "@meetjs-2023-nx-remote-caching/share/form/checkbox";
import { ShareFormInput } from "@meetjs-2023-nx-remote-caching/share/form/input";

export interface BusinessTravelBookFormProps {
}

export function BusinessTravelBookForm(props: BusinessTravelBookFormProps) {
  return (
    <div>
      <ShareCoreButton/>
      <ShareCoreIcon/>
      <ShareCoreLabel/>
      <ShareFormCheckbox/>
      <ShareFormInput/>
    </div>
  );
}

export default BusinessTravelBookForm;
