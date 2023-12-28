import Image from "next/image";
import loader from "../../public/icon/loader.svg";

const loading = () => {
  return (
    <div className="absolute-center">
      <Image alt="loader" width={100} height={100} src={loader}></Image>
    </div>
  );
};

export default loading;
