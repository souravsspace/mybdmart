import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo/logo-light.png"
      alt="MyBDmart"
      width={170}
      height={70}
      className="object-contain"
    />
  );
}
