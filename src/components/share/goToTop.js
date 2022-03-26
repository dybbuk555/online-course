import { useEffect } from "react";
import history from "../../helpers/history";

const GoToTop = () => {
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
