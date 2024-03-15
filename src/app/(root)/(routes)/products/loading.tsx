"use client";

import { Loader } from "@/components/ui/loader";

const Loading = () => {
  return (
    <div className="my-6 flex h-full w-full items-center justify-center sm:my-8">
      <Loader />
    </div>
  );
};

export default Loading;
