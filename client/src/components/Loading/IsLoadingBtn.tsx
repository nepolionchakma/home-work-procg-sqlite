const IsLoadingBtn = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader flex justify-between">
        <div className="w-8 h-8 bg-red-500 rounded-full repeat-infinite duration-900 animate-ping"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full repeat-infinite duration-900 animate-ping"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full repeat-infinite duration-900 animate-ping"></div>
      </div>
    </div>
  );
};
export default IsLoadingBtn;
