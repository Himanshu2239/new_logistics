"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

export default function ExportToolbar({ onExportExcel }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleExportPdf = () => {
    console.log("PDF export triggered");
    setShowOptions(false);
  };

  return (
    <div className="fixed bottom-6 right-6">
      <Button
        ref={buttonRef}
        type="button"
        className="bg-primary shadow-lg hover:bg-primary-dark text-white font-bold p-4 h-12 w-12 rounded-full flex items-center justify-center"
        onClick={() => setShowOptions(!showOptions)}
      >
        <Download className="h-5 w-5" />
      </Button>
      <div
        ref={optionsRef}
        className={`bg-white rounded-lg shadow-lg p-3 mt-2 ${
          showOptions ? "" : "hidden"
        }`}
      >
        <div className="text-sm font-medium mb-2">Export Options</div>
        <Button
          type="button"
          variant="ghost"
          className="text-primary hover:bg-neutral-background w-full text-left px-3 py-2 rounded flex items-center justify-start"
          onClick={onExportExcel} // Call the passed function to export the Excel file
        >
          <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
          Export to Excel
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="text-primary hover:bg-neutral-background w-full text-left px-3 py-2 rounded flex items-center justify-start"
          onClick={handleExportPdf} // Placeholder function for PDF export
        >
          <FileText className="mr-2 h-4 w-4 text-red-600" />
          Export to PDF
        </Button>
      </div>
    </div>
  );
}
