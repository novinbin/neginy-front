import Image from "next/image";
import pic from "@/public/img/svg-guest/pic-vid.png";

function WeddingPicture() {
  return (
    <div>
      <div className="mx-auto grid w-11/12 grid-cols-5 items-center justify-center gap-7 lg:mt-20">
        <Image
          src={pic}
          alt=""
          width={480}
          height={360}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}

export default WeddingPicture;
