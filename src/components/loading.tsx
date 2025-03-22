export const LoadingPage = () => {
  return (
    <div className="h-[40vh] flex items-center justify-center p-4">
      <div className="hidden md:flex items-center justify-center space-x-2 ml-12">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}
export const LoadingItem = () =>{
  <div className="py-2 flex items-center justify-center p-4">
    <div className="hidden md:flex items-center justify-center space-x-2 ml-12">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  </div>
}