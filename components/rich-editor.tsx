"use client";
import { Editor } from "primereact/editor";
import { useState } from "react";

interface TextEditorProps {
  nomeDoCard: string;
}

export default function TextEditor({ nomeDoCard }: TextEditorProps) {
  const [text, setText] = useState("");

  return (
    <div className="card">
      <div
        className="p-editor-container"
        style={{
          border: "1px solid #3a3a3a",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <h2 style={{ margin: 0 }}>{nomeDoCard}</h2>
          <div style={{ display: "flex", gap: "5px" }}>
            {/* <button onClick={() => onDestroy(id)} className="editor-btn">
              <Trash2 color="red" />
            </button> */}
          </div>
        </div>
        <Editor
          value={text}
          onTextChange={(e) => setText(e.textValue)}
          style={{
            color: "#fff",
            outline: "none",
            border: "none",
            backgroundColor: "#2e2e2e",
            boxShadow: "none",
            minHeight: "150px",
            padding: "10px",
          }}
        />
        <style>
          {`

            /* Remove borda interna da toolbar */
            .p-editor-container .ql-toolbar.ql-snow {
              border: none !important;
              background-color: transparent !important;
              box-shadow: none !important;
            }

            /* Botões da toolbar */
            .p-editor-toolbar .p-button {
              color: #aaa;
              border: none;
            }

            .p-editor-toolbar .p-button:hover {
              color: white;
              background: none;
            }

            /* Botões de salvar e excluir */
            .editor-btn {
              background:transparent;
              padding: 5px 10px;
              border-radius: 6px;
              border: none;
              font-weight: bold;
              cursor: pointer;
              transition: 0.2s;
            }
          `}
        </style>
      </div>
    </div>
  );
}
