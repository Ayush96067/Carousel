export const ShapeCard = ({ item }) => {
  return (
    <div className="flex md:gap-2 gap-1 items-center justify-center px-2 py-2 border border-gray-200 text-gray hover:text-black hover:border-black cursor-pointer transition-colors duration-200">
      <span className="md:text-2xl text-sm">
        {typeof item.icon === "string" ? item.icon : <item.icon />}
      </span>
      <p className="md:text-sm text-[0.7rem] md:font-medium ">{item.name}</p>
      {item.quantity && (
        <p className="md:text-xs text-[0.6rem] ">({item.quantity})</p>
      )}
    </div>
  );
};
