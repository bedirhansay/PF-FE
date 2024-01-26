import Link from "next/link";
import { FaHome } from "react-icons/fa";
import style from "./Breadcrump.module.scss";

type BreadcrumbProps = {
  page: any;
  sub?: any;
};

export const Breadcrumb = ({ page, sub }: BreadcrumbProps) => {
  return (
    <nav className={style["breadcrump"]} aria-label="Breadcrumb">
      <ul>
        <li>
          <span>
            <FaHome />
          </span>
        </li>

        <li>
          <svg
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <Link href={"/admin/" + page}>{page}</Link>
        </li>
        {sub && (
          <li className="flex items-center">
            <svg
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <Link href="#">{sub}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
