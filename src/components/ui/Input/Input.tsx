import { cn } from "@/lib/utils";
import * as React from "react";
import { IoMdCloudUpload } from "react-icons/io";
import style from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  textarea?: boolean;
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
        <div className={style["wrapper"]}>
          <label htmlFor="dropzone-file" className={style["label"]}>
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
        <div className={style["wrapper"]}>
          <label htmlFor="dropzone-file" className={style["label-2"]}>
            <div>
              <IoMdCloudUpload color="white" fontSize={32} />

              <p>
                <span>Fotoğraf Yükle</span> yada Sürükle bırak
              </p>
              <strong>SVG, PNG, JPG or GIF (MAX. 800x400px)</strong>
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
          className={cn(style["text-area"], className)}
          ref={ref as React.Ref<HTMLTextAreaElement>}
        />
      ) : (
        <input
          type={type}
          className={cn(
            style["input"],
            isFileType && "border-1 bg-white",
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
