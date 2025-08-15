import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends = [], isLoading, isError, error } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src="/ship-wheel.svg" alt="Streamify Wheel" className="size-8" />
              <h1 className="text-2xl sm:text-3xl font-bold">My Friends</h1>
            </div>
          </div>
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src="/ship-wheel.svg" alt="Streamify Wheel" className="size-8" />
              <h1 className="text-2xl sm:text-3xl font-bold">My Friends</h1>
            </div>
          </div>
          <div className="card bg-base-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Error loading friends</h3>
            <p className="text-base-content opacity-70">
              {error.message || "An error occurred while fetching your friends."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/ship-wheel.svg" alt="Streamify Wheel" className="size-8" />
            <h1 className="text-2xl sm:text-3xl font-bold">My Friends</h1>
          </div>
          <span className="badge badge-primary badge-lg">
            {friends.length} {friends.length === 1 ? "friend" : "friends"}
          </span>
        </div>

        {friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;