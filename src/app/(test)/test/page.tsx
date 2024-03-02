"use client";

import { Button } from "@/components/ui/button";

const TestingPage = () => {
  const dateCheck = () => {
    const currentDate = new Date();

    const creationDate = new Date("2024-02-28");
    creationDate.setMonth(creationDate.getMonth() + 1);

    if (currentDate <= creationDate) {
      console.log("Different");
    } else {
      console.log("Same");
    }
  };

  return (
    <div>
      <Button onClick={() => dateCheck()}>Check</Button>
    </div>
  );
};

export default TestingPage;
