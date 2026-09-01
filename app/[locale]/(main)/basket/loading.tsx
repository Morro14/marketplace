export default function Loading() {
  return (
    <div className="w-full flex">
      <div className="flex flex-col rounded-xl drop-shadow-lg bg-bg">
        {/* TopBar Skeleton */}
        <div className="h-10 bg-gray-light flex justify-between w-full items-center rounded-t-xl px-3">
          <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex gap-4 items-center">
            <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Entries Skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={`skeleton-entry-${i}`}
            className="flex justify-between p-3 gap-3 h-[162px] w-[1152px] border-b border-gray-light"
          >
            {/* Image Skeleton */}
            <div className="h-full rounded-lg overflow-hidden">
              <div className="w-[126px] h-full bg-gray-300 animate-pulse"></div>
            </div>

            {/* Product Info Skeleton */}
            <div className="flex flex-col justify-between pb-1.5 flex-1">
              <div>
                <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-96 bg-gray-300 rounded animate-pulse mb-2"></div>
              </div>
              <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Right Actions Skeleton */}
            <div className="flex flex-col items-end justify-between pb-1.5">
              <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
