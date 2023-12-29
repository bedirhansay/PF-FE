"use client";

import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

interface IProp {
  model: string | undefined;
  setModel: SetStateAction<Dispatch<string | any>>;
}

const Editor: React.FC<IProp> = ({ model, setModel }) => {
  return (
    <>
      <FroalaEditor
        model={model}
        onModelChange={(e: any) => setModel(e)}
        config={{
          saveInterval: 2000,
          placeholderText: "Edit Your Content Here!",
          charCounterCount: true,
          events: {
            "save.before": function (html: string) {
              localStorage.setItem("savedText", html);
            },
          },
          tag: "textarea",
        }}
      />
    </>
  );
};

export default Editor;
