import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Lock, Unlock } from "lucide-react";
import ComponentName from "@components/react/aceternity/demo/compare.tsx";

interface SecretContentProps {
  password: string;
  videoSrc: string;
}
export default ({ password, videoSrc }: SecretContentProps) => {
  const [inputPassword, setInputPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (inputPassword === password) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isUnlocked) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-green-600">
          <Unlock className="h-4 w-4" />
          <span className="text-sm">内容已解锁</span>
        </div>
        {!videoSrc && <ComponentName />}
        {videoSrc && (
          <video
            className="h-[50vh] w-auto m-auto rounded-lg shadow-lg"
            controls
            src={videoSrc}
            autoPlay
            loop
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 m-auto">
      <div className="flex items-center justify-center gap-2">
        <Input
          type="password"
          placeholder="请输入密码查看内容"
          className="w-1/2 m-4 p-4 text-skin-purple"
          value={inputPassword}
          onChange={e => setInputPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleUnlock()}
        />
        <Button onClick={handleUnlock}>
          <Lock className="mr-2" />
          解锁
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>密码错误，请重试</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
