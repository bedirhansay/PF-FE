import { cn } from "@/lib/utils";
import * as React from "react";
import { IoMdCloudUpload } from "react-icons/io";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  textarea?: boolean; // Yeni eklenen prop
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ className, type, label, textarea, ...props }, ref) => {
  const isFileType = type === "file";
  const isTextarea = type === "textarea";

  return (
    <div>
      {label && (
        <div className="flex items-center justify-center w-full !h-full">
          <label
            htmlFor="dropzone-file"
            className="bg-gray-300 px-4 py-4 rounded mt-4 w-full text-center hover:bg-opacity-75"
          >
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              {...props}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
            Fotoğrafı değiştir
          </label>
        </div>
      )}
      {isFileType && (
        <div className="flex items-center justify-center w-full !h-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <IoMdCloudUpload color="white" fontSize={32} />

              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Fotoğraf Yükle</span> yada
                Sürükle bırak
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              {...props}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>
      )}
      {isTextarea ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          cols={20}
          rows={10}
          className={cn(
            "flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref as React.Ref<HTMLTextAreaElement>}
        />
      ) : (
        <input
          type={type}
          className={cn(
            "flex  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50",
            isFileType && "border-1 border-red-500 bg-white",
            className
          )}
          ref={ref as React.Ref<HTMLInputElement>}
          {...props}
        />
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
