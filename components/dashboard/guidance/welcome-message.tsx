import React from "react";

const WelcomeMessage = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform sm:mx-30 -translate-x-1/2 -translate-y-1/2 w-full px-4">
      <div className="max-w-md mx-auto  p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center dark:text-green-500  text-black">
          How can I help you today?
        </h1>
      </div>
    </div>
  );
};

export default WelcomeMessage;
