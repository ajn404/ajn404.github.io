import React, { useState } from "react";
import { Button } from "@shadcn/ui/button";

const MyButton: React.FC = () => {
  const [position, setPosition] = useState<{ lng: number; lat: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        pos => {
          const coordinates = pos.coords;
          setPosition({
            lng: coordinates.longitude,
            lat: coordinates.latitude,
          });
          setIsLoading(false);
        },
        err => {
          setError(err.message);
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="text-skin-base">
      <Button onClick={handleClick}>Get Geolocation</Button>
      {isLoading ? (
        <p>正在获取位置...</p>
      ) : position ? (
        <p>
          地理位置：经度 {position.lng}, 纬度 {position.lat}
        </p>
      ) : error ? (
        <p>错误：{error}</p>
      ) : (
        <p>尚未获取地理位置信息。</p>
      )}
    </div>
  );
};

export default MyButton;
