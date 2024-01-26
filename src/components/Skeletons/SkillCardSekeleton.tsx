import { ImagePlaceHolder } from "@/lib/SVG";
export const SkillCardSkeleton = () => {
  return (
    <div className="h-full flex py-8 flex-col justify-between mx-auto gap-10 pt-8 rounded shadow-xl">
      <h2 className=" font-semibold text-xl py-8 h-12 rounded-md">
        <span className="animate-pulse bg-gray-300 mx-auto rounded h-10 w-2/3 block"></span>
      </h2>

      <div className="animate-pulse mx-auto">
        <ImagePlaceHolder />
      </div>

      <ul className="flex px-4 items-center justify-center mx-auto text-center flex-wrap">
        {Array(3)
          .fill(0)
          .map((itemIndex) => (
            <li className=" px-4 rounded-lg py-1" key={itemIndex + "item"}>
              <span className="animate-pulse bg-background rounded h-6 w-16 block"></span>
            </li>
          ))}
      </ul>
    </div>
  );
};
