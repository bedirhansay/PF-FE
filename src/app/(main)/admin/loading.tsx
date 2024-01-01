import Image from "next/image";
import loader from "../../../../public/icon/loader1.svg";

const loading = () => {
  return (
    <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2">
      <Image alt="loader" width={100} height={100} src={loader}></Image>
    </div>
  );
};

export default loading;
