import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export default () => {
  const placeholders = [
    "今天吃什么",
    "明天股票会涨吗",
    "前端写腻了吗",
    "glsl怎么这么难啊",
    "感觉自己该健身了",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="w-1/2 m-auto flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
