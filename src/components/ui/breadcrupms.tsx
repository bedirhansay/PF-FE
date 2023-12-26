import Link from "next/link";
import { FaHome } from "react-icons/fa";

type BreadcrumbProps = {
  page: any;
  sub?: any;
};

export const Breadcrumb = ({ page, sub }: BreadcrumbProps) => {
  return (
    <nav className="flex my-4" aria-label="Breadcrumb">
      <ul className="flex space-x-4 rounded-md  bg-white px-6 shadow-lg border p-2">
        <li className="flex">
          <span className="text-gray-400 hover:text-gray-500">
            <FaHome />
          </span>
        </li>

        <li className="flex items-center">
          <svg
            className="h-full w-2 flex-shrink-0 text-black-900 "
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a
            href={"/admin/" + page}
            className="ml-4 capitalize text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {page}
          </a>
        </li>
        {sub && (
          <li className="flex items-center">
            <svg
              className="h-full w-2 flex-shrink-0 text-black-900 "
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <Link
              href="#"
              className="ml-4 text-sm font-medium text-gray-500  hover:text-gray-700"
            >
              {sub}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
