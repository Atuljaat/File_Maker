import React from "react";

export default function LoadingModal({ visible }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 dark:text-black px-24 bg-neutral-800 opacity-80 text-white flex items-center justify-center">
      <div className="dark:bg-white opacity-100  bg-black p-6 rounded-xl shadow-xl text-center">
        <p className="text-xl font-semibold mb-2">Generating File...</p>
        <p>Please wait while we prepare your download. We will email you your file once it's ready or you can download it here</p>
      </div>
    </div>
  );
}
