import {useHistory} from "react-router-dom";
import {useEffect} from "react";

export function ScrollToTop() {

  let history = useHistory();

  useEffect(() => {
    const unregister = history.listen((location, action) => {
      if (action === 'PUSH') {
        window.scrollTo(0, 0);
      }
    });
    return () => {
      unregister();
    }
  }, [history]);

  return null;

}
