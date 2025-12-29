export const StepCard = ({ step, isMiddle }) => (
  <div
    className={`
      flex justify-between items-center px-5 py-4 md:py-8 
      text-xs
      md:text-[1.3rem] uppercase font-medium text-[#636363a6] border-t border-[#00000028]
      cursor-pointer group hover:bg-[#FBF4E6] hover:text-black transition-colors relative
      ${!isMiddle ? "border-x" : ""}
    `}
  >
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <span className="w-10 h-10 rounded-full hidden md:flex justify-center items-center bg-[#8080801a] group-hover:bg-black group-hover:text-white transition-colors">
        {step.id}
      </span>
      {step.text}
    </div>
    <step.icon className="md:text-4xl -top-3 left-[50%] -translate-x-[50%] absolute md:static md:top-auto md:left-auto text-2xl " />
  </div>
);
