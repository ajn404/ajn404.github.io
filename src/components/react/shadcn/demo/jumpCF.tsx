import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const AlertDialogDemo = () => {
  const dev = import.meta.env.DEV;
  const [open, setOpen] = useState(true);
  let [isCloudFlare, setIsCloudFlare] = useState(false);
  useEffect(() => {
    if (window.location.href === "https://ajn404-github-io.pages.dev/") {
      setIsCloudFlare(true);
    }
  });
  return (
    <>
      {!dev && !isCloudFlare && (
        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>你确定吗?</AlertDialogTitle>
              <AlertDialogDescription>
                CloudFlare 同样部署成功了，是否跳转
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setOpen(false);
                }}
              >
                算了
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setOpen(false);
                  window.location.href = "https://ajn404-github-io.pages.dev/";
                }}
              >
                好的
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default AlertDialogDemo;