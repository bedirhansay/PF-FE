"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Truncate } from "../../lib/utils/truncate";
import { Button } from "./Button";
import { FaCaretDown, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface DataTablesProps {
  data: any[];
  setId: SetStateAction<Dispatch<string>>;
  setOperation: Dispatch<SetStateAction<string>>;
}

export const DataTables: React.FC<DataTablesProps> = ({
  data,
  setId,
  setOperation,
}) => {
  const router = useRouter();

  const [sorting, setSorting] = useState<{
    field: string;
    order: "asc" | "desc";
  }>({ field: "", order: "asc" });
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const pathname = usePathname();

  //! Sort By Columns
  const handleHeaderClick = (field: string) => {
    if (sorting.field === field) {
      setSorting({
        field: field,
        order: sorting.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSorting({ field: field, order: "asc" });
    }
  };

  //! Sort Data
  const sortedData = [...currentPageData].sort((a, b) => {
    if (!a[sorting.field] || !b[sorting.field]) {
      return 0;
    }

    if (typeof a[sorting.field] === "number") {
      return sorting.order === "asc"
        ? a[sorting.field] - b[sorting.field]
        : b[sorting.field] - a[sorting.field];
    } else if (typeof a[sorting.field] === "string") {
      return sorting.order === "asc"
        ? a[sorting.field].localeCompare(b[sorting.field])
        : b[sorting.field].localeCompare(a[sorting.field]);
    }

    return 0;
  });

  useEffect(() => {
    setCurrentPageData(data);
  }, [data]);

  //! Generate Header
  const generateHeadersFromObject = (obj: any) => {
    if (!obj || typeof obj !== "object") {
      return [];
    }

    const sampleItem = obj[0];
    const headers: any = [];

    for (const key in sampleItem) {
      if (
        sampleItem.hasOwnProperty(key) &&
        key !== "createdAt" &&
        key !== "updatedAt"
      ) {
        headers.push({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          field: key,
        });
      }
    }

    return headers;
  };

  const headers = generateHeadersFromObject(data);

  //! Render Row Data
  const renderRowData = (rowData: any, header: any[]) => {
    return header.map((header, index) => {
      const field = header.field;

      if (
        typeof rowData[field] === "object" &&
        !Array.isArray(rowData[field])
      ) {
        const nestedName = rowData[field]?.name;

        return (
          <td
            className="text-xs text-center hover:bg-green-400"
            key={`td${index}` + rowData[field]}
          >
            {nestedName ? Truncate(nestedName, 50) : ""}
          </td>
        );
      } else if (Array.isArray(rowData[field])) {
        const firstItem = rowData[field][0];

        return (
          <td
            className="text-xs text-center hover:bg-green-400"
            key={`td${index}` + rowData[field]}
          >
            {firstItem ? Truncate(firstItem, 50) : ""}
          </td>
        );
      }

      if (field === "image") {
        return (
          <td
            className="hover:bg-green-400 flex items-center justify-center"
            key={`renderRowData ${index}` + header}
          >
            <Image
              src={rowData[field]}
              alt={`Product ${rowData.name}`}
              width={50}
              height={50}
              style={{
                width: "50px",
                height: "40px",
                borderRadius: "10px",
                alignSelf: "center",
              }}
            />
          </td>
        );
      }

      if (field === "createdAt" || field === "updatedAt") {
        return null;
      }

      return (
        <td
          className="text-xs text-center  hover:bg-green-400"
          key={`td${index}` + rowData[field]}
        >
          {Truncate(rowData[field], 18)}
        </td>
      );
    });
  };

  return (
    <section className="">
      <div className="h-full ">
        <div className="mt-2">
          {/* <SubHeader sortedContent={data} headers={headers} /> */}
          <div className="border mt-2">
            <div className="overflow-x-auto p-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="overflow-hidden">
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Index
                    </th>
                    {headers.map((header: any, i: number) => (
                      <th
                        key={`DataTables ${i}` + header}
                        onClick={() => handleHeaderClick(header.field)}
                        className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-20 overflow-hidden  mx-4">
                          <span>{header.label}</span>
                          <FaCaretDown style={{ width: "15px" }} />
                        </div>
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((row, rowIndex) => (
                    <tr className="hover:bg-green-200" key={"sortedData" + row}>
                      <td className="px-8 py-4 mr-4 whitespace-nowrap text-xs text-gray-500">
                        {rowIndex + 1}
                      </td>
                      {renderRowData(row, headers)}
                      <td className="px-6 whitespace-nowrap text-base text-gray-500">
                        <div className="flex space-x-6 gap-4">
                          <Button
                            onClick={() =>
                              router.push(`${pathname}/${row._id}`)
                            }
                            leftIcon={() => <FaRegEdit fontSize={20} />}
                            className="text-xs -mr-4"
                            variant="save"
                          ></Button>
                          <Button
                            onClick={() => {
                              setId(row._id);
                              setOperation("del");
                            }}
                            leftIcon={() => <MdDelete fontSize={20} />}
                            className="text-xs -mr-4"
                            variant="delete"
                          ></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {currentPageData?.length === 0 && (
            <div className="text-center bg-red-900 text-white p-4">
              <div> No data found </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
