"use client"
import React, { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
  FileText,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileUp,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function BillOfEntryDetails({ nextSection, prevSection }) {
  const { control, setValue, watch } = useFormContext();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const fileInputRef = useRef(null);

  const boeDocument = watch("boeDocument");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadStatus("uploading");

      // Simulating file upload - in a real app this would be an actual API call
      setTimeout(() => {
        // Store the file name/path
        setValue("boeDocument", file.name);
        setUploadStatus("success");
      }, 1000);
    }
  };

  const resetFileUpload = () => {
    setUploadedFile(null);
    setUploadStatus("idle");
    setValue("boeDocument", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 flex items-center text-primary-dark">
        <FileText className="mr-2 h-5 w-5" />
        Bill of Entry (BoE) Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="boeNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">BoE Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="boeDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">BoE Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="boeDocument"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Upload BoE Document</FormLabel>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="boe-document-upload"
                />

                {!boeDocument && uploadStatus === "idle" && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed border-2 p-8 flex flex-col items-center justify-center gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileUp className="h-10 w-10 text-muted-foreground" />
                    <span>Click to upload or drag and drop</span>
                    <span className="text-xs text-muted-foreground">
                      PDF, JPEG, PNG, DOC up to 10MB
                    </span>
                  </Button>
                )}

                {uploadStatus === "uploading" && (
                  <div className="flex items-center justify-center p-4 border rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      <span>Uploading {uploadedFile?.name}...</span>
                    </div>
                  </div>
                )}

                {boeDocument && uploadStatus === "success" && (
                  <div className="flex items-center justify-between p-4 border rounded-md bg-muted/30">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">{boeDocument}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={resetFileUpload}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                      There was an error uploading your file. Please try again.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <FormDescription>
                Upload the original Bill of Entry document for reference
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="portCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="assessableValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Assessable Value (INR)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="exchangeRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">
                Exchange Rate (1 USD to INR)
              </FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.0001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dutyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Basic Duty Rate (%)</FormLabel>
              <FormControl>
                <Input type="number" min="0" max="100" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="socialWelfareSurcharge"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">
                Social Welfare Surcharge Rate (%)
              </FormLabel>
              <FormControl>
                <Input type="number" min="0" max="100" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="igstRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">IGST Rate (%)</FormLabel>
              <FormControl>
                <Input type="number" min="0" max="100" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="customsClearanceAgent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customs Clearance Agent</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="clearanceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Clearance Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
