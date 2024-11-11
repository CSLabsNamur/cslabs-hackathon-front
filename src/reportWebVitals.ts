import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
  }
};

export default reportWebVitals;
