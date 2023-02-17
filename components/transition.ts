import useTheme from "../store/useTheme";
import { NextRouter } from "next/router";
import { ThemeName } from "../entities/theme";

const delay = 2000;

export const defaultTransition = (
  router: NextRouter,
  to: ThemeName,
  route?: string,
) => {
  const setTransition = useTheme.getState().setTransition;
  setTransition(to);
  setTimeout(() => {
    if (route) {
      router.push(route);
    } else {
      router.push(to);
    }
  }, delay);
};
