import { useEffect } from "react";

export default ({ keyValue, value }: { keyValue: string; value: string }) => {
  useEffect(() => {
    localStorage.setItem(keyValue, value);
    return () => {
      localStorage.removeItem(keyValue);
    };
  });
  return <></>;
};
