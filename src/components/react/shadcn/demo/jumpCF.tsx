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
  const [showed, setShowed] = useState(true);
  useEffect(() => {
    setShowed(localStorage.getItem("showed") === "true");
  });
  return (
    <>
      {!showed && !dev && (
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
                  localStorage.setItem("showed", "true");
                }}
              >
                算了(记住我的决定)
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setOpen(false);
                  localStorage.setItem("showed", "true");
                  window.location.href = "https://ajn404-github-io.pages.dev/";
                }}
              >
                好的(记住我的决定)
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default AlertDialogDemo;
