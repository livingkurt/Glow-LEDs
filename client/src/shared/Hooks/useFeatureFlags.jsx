import React from "react";
import { flagState } from "../../helpers/sharedHelpers";
import * as API from "../../api";

const useFeatureFlags = () => {
  const { data: currentContent } = API.useCurrentContentQuery();

  const feature_flags = currentContent?.feature_flags || [];
  console.log({ feature_flags });
  const activeFlags = feature_flags.filter(f => f.active).map(f => f.feature);
  return activeFlags;
};

export default useFeatureFlags;
