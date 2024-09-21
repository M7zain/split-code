// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


  
  export function UserSkeleton ()  {
    return (
      <div className={`${shimmer} flex items-center space-x-4 animate-pulse`}>
        {/* Profile picture placeholder */}
          <div className="bg-gray-300 rounded-full w-[50px] h-[50px]"></div>
        
        {/* Full name placeholder */}
        <div className=" bg-gray-300 rounded w-52 h-3"></div>
      </div>
    );
  };
  

  




export function  PostSkeleton(){
  return (
    <div className="bg-white hover:bg-slate-200 p-3 rounded-lg animate-pulse">
      <div className="flex justify-between">
        <div className="flex flex-col max-w-md">
          {/* Date placeholder */}
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          {/* Title placeholder */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          {/* Position placeholder */}
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          {/* Description placeholder */}
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        <div className="flex flex-col items-center justify-around">
          {/* Like icon placeholder */}
          <div className="bg-gray-300 rounded-full h-[50px] w-[50px] mb-4"></div>
          {/* Difficulty placeholder */}
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
      </div>

      <hr className="h-px my-5 bg-oliveGreen border-0" />
    </div>
  );
};



export function PostsSkeleton() {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  );
}


