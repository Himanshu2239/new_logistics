"use client"
import React from "react";
import { Check } from "lucide-react";

export default function ProgressIndicator({ sections, currentSection }) {
  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index !== sections.length - 1 ? "flex-1" : ""
            }`}
          >
          <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index < currentSection
                  ? "bg-green-500 text-white"
                  : index === currentSection
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index < currentSection ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
        </div>
            <span
              className={`ml-2 text-sm ${
                index === currentSection ? "font-medium" : "text-gray-600"
              }`}
            >
              {section.name}
          </span>
            {index !== sections.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  index < currentSection ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
        </div>
        ))}
      </div>
    </div>
  );
}
