import {useLocation} from 'react-router-dom';
import {useEffect} from "react";


export function ScrollToTop() {
  const location = useLocation();
  useEffect(
      () => {
          if (location.hash.length === 0) {
              window.scrollTo(0, 0);
          }
      },
      [location]
  );
  return null;
}
