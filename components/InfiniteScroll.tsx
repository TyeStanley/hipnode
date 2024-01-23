"use client";

import { useEffect, useState, ReactNode, Fragment } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";

import Spinner from "@/components/Spinner";
import OutlineIcon from "@/components/icons/outline-icons";
import useTaggedPosts from "@/hooks/useTaggedPosts";
interface InfiniteScrollProps<T extends { id: number }> {
  fetchData: (myCursorId?: number, groupId?: number) => Promise<T[]>;
  initialData: T[];
  renderItem: (item: T) => ReactNode;
  className: string;
  groupId?: number;
}

const InfiniteScroll = <T extends { id: number }>({
  fetchData,
  initialData,
  renderItem,
  className,
  groupId,
}: InfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const tag = useSearchParams().get("tag");
  const { taggedPosts, isPending } = useTaggedPosts(tag, data);

  const { ref, inView } = useInView();

  const loadMoreData = async () => {
    setIsLoading(true);
    const myCursorId = data[data.length - 1]?.id;
    const newData = await fetchData(myCursorId, groupId);
    if (newData.length === 0) {
      setHasMoreData(false);
      setIsLoading(false);
      return;
    }
    setData((prevData: T[]) => [...prevData, ...newData]);
    setIsLoading(false);
  };

  useEffect(() => {
    setData(initialData);
    setHasMoreData(true);
  }, [initialData]);

  useEffect(() => {
    if ((inView && hasMoreData) || isSeeMore) {
      loadMoreData();
      setIsSeeMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isSeeMore, hasMoreData]);

  return (
    <>
      <div className={className}>
        {isPending ? (
          <div className="flex items-center justify-center pt-20">
            <Spinner />
          </div>
        ) : tag ? (
          taggedPosts?.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))
        ) : (
          data.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))
        )}
      </div>
      <button
        type="button"
        onClick={() => setIsSeeMore(true)}
        className="regular-10 ml-5 mt-2 flex items-center gap-2.5 text-sc-3 lg:hidden"
      >
        See more
        <OutlineIcon.ArrowRight className="stroke-sc-3" />
      </button>
      <div
        ref={ref}
        className={`${
          hasMoreData ? "flex items-center justify-center py-5" : "hidden"
        }`}
      >
        {!isPending && isLoading && <Spinner />}
      </div>
    </>
  );
};
export default InfiniteScroll;
