"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";

import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/align.min";
import "froala-editor/js/plugins/char_counter.min";
import "froala-editor/js/plugins/colors.min";
import "froala-editor/js/plugins/emoticons.min";
import "froala-editor/js/plugins/font_size.min";
import "froala-editor/js/plugins/lists.min";
import "froala-editor/js/plugins/paragraph_format.min";
import "froala-editor/js/plugins/paragraph_format.min";
import "froala-editor/js/plugins/fullscreen.min";
import "froala-editor/js/plugins/line_height.min";
import "froala-editor/js/plugins/track_changes.min";
import "froala-editor/js/plugins/code_beautifier.min";
import "froala-editor/js/plugins/code_view.min";
import "froala-editor/js/plugins/entities.min";
import "froala-editor/js/plugins/save.min";
import "froala-editor/js/plugins/url.min";
import "froala-editor/js/plugins/table.min";
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
