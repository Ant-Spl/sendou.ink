import * as React from "react";
import { useMatches } from "remix";
import { z } from "zod";
import { LoggedInUserSchema } from "~/validators/user";

export const useUser = () => {
  const [root] = useMatches();

  const parsed = LoggedInUserSchema.parse(root.data);
  return parsed?.user;
};

export const useBaseURL = () => {
  const [root] = useMatches();

  const parsed = z.object({ baseURL: z.string() }).nullish().parse(root.data);
  return parsed?.baseURL;
};

// TODO: fix causes memory leak
/** @link https://stackoverflow.com/a/64983274 */
export const useTimeoutState = <T>(
  defaultState: T
): [
  T,
  (action: React.SetStateAction<T>, opts?: { timeout: number }) => void
] => {
  const [state, _setState] = React.useState<T>(defaultState);
  const [currentTimeoutId, setCurrentTimeoutId] = React.useState<
    NodeJS.Timeout | undefined
  >();

  const setState = React.useCallback(
    (action: React.SetStateAction<T>, opts?: { timeout: number }) => {
      if (currentTimeoutId != null) {
        clearTimeout(currentTimeoutId);
      }

      _setState(action);

      const id = setTimeout(
        () => _setState(defaultState),
        opts?.timeout ?? 4000
      );
      setCurrentTimeoutId(id);
    },
    [currentTimeoutId, defaultState]
  );
  return [state, setState];
};
