import { useEffect } from "react";
import history from "../../helpers/history";

const GoToTop = () => {
  // automatically go to top after rotued
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);
  return null;
};

export default GoToTop;
