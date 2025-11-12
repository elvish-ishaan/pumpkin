import React from 'react';

const HoverCard = ({title, description}: {title: string; description: string}) => {
  return (
    <div className=" bg-conic-330 rounded-2xl shadow-sm shadow-sky-500 outline outline-slate-400 -outline-offset-8">
      <div className="group overflow-hidden relative after:duration-500 before:duration-500 duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute after:w-24 after:h-24 after:bg-sky-700 after:rounded-full after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12 before:absolute before:w-20 before:h-20 before:bg-sky-400 before:rounded-full before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12 hover:rotate-12 flex justify-center items-center h-56 w-80 bg-neutral-900 rounded-2xl outline outline-slate-400 -outline-offset-8">
        <div className="z-10 flex flex-col items-center gap-2">
          <span className="text-slate-400 text-xl font-bold">{title} </span>
          <p className="text-gray-50 text-sm text-center max-w-[240px]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default HoverCard;
