import { Compare } from "../ui/compare";

export default () => {
  return (
    <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
      <Compare
        firstImage="/assets/svg/ru01.svg"
        secondImage="/assets/svg/ru02.svg"
        firstImageClassName="object-cover object-center"
        secondImageClassname="object-cover object-center"
        className=" w-full "
        slideMode="drag"
      />
      <Compare
        firstImage="/assets/texture/1.jpg"
        secondImage="/assets/texture/2.jpg"
        firstImageClassName="object-cover object-center"
        secondImageClassname="object-cover object-center"
        className=" w-full "
        slideMode="drag"
      />
    </div>
  );
};
