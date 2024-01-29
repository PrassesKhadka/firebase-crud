import { IuserDocument } from "@/app/interfaces";
import Image from "next/image";

export default function StudentData({
  data,
}: {
  data: IuserDocument[] | undefined;
}) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
    >
      {data?.map((value, index) => (
        <li key={index} className="relative">
          <div className="group block aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={value.data.additionalInfo.photo.url}
              alt=""
              className="object-cover group-hover:opacity-75"
              width={300}
              height={300}
            />
          </div>
          {/* <p className="mt-2 block truncate font-medium">{movie.title}</p>
          <p className="block text-sm font-medium text-gray-500">
            {movie.cast?.join(", ")}
          </p>
          <p className="block text-sm font-medium text-gray-500">
            {movie.year}
          </p> */}
        </li>
      ))}
    </ul>
  );
}
