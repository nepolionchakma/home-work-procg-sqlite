const IsLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="loader flex justify-between w-80">
        <div className="w-8 h-8 bg-red-500 rounded-full repeat-infinite duration-900 animate-ping"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full repeat-infinite duration-900 animate-ping"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full repeat-infinite duration-900 animate-ping"></div>
        <div className="w-8 h-8 bg-red-500 rounded-full repeat-infinite duration-900 animate-ping"></div>
      </div>
    </div>
  );
};
export default IsLoading;
