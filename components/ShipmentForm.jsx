"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Check, Plus, X } from "lucide-react";

import ProgressIndicator from "./ProgressIndicator";
import SupplierDetails from "./FormSections/SupplierDetails";
import TransportDetails from "./FormSections/TransportDetails";
import FreightDetails from "./FormSections/FreightDetails";
import FreightForwarderDetails from "./FormSections/FreightForwarderDetails";
import BillOfEntryDetails from "./FormSections/BillOfEntryDetails";
import CustomsDutyCalculation from "./FormSections/CustomsDutyCalculation";
import ExportToolbar from "./ExportToolbar";

// Basic form schema for MongoDB
const shipmentFormSchema = z.object({
  // Supplier Details
  supplierName: z.string().min(1, "Supplier name is required"),
  supplierEmail: z.string().email("Invalid email address"),
  supplierPhone: z.string().min(5, "Phone number is too short"),
  supplierAddress: z.string().min(1, "Address is required"),
  supplierCountry: z.string().min(1, "Country is required"),

  // Transport Details
  transportMode: z.enum(["air", "sea", "land"]),
  carrierName: z.string().min(1, "Carrier name is required"),
  originPort: z.string().min(1, "Origin port is required"),
  destinationPort: z.string().min(1, "Destination port is required"),
  etd: z.date().optional(),
  eta: z.date().optional(),
  incoterms: z.string().min(1, "Incoterms is required"),

  // Freight Details
  packageType: z.enum(["carton", "pallet", "container"]),
  packageCount: z.number().min(1, "Must have at least 1 package"),
  grossWeight: z.number().min(0.01, "Weight must be greater than 0"),
  cargoDescription: z.string().min(1, "Cargo description is required"),
  hsCode: z.string().min(1, "HS Code is required"),
  freightValue: z.number().min(0, "Freight value cannot be negative"),

  // Forwarder Details
  forwarderName: z.string().min(1, "Forwarder name is required"),
  forwarderContactPerson: z.string().min(1, "Contact person is required"),
  forwarderEmail: z.string().email("Invalid email address"),
  forwarderPhone: z.string().min(5, "Phone number is too short"),
  bookingNumber: z.string().min(1, "Booking number is required"),
  bookingDate: z.date().optional(),
  freightCost: z.number().min(0, "Freight cost cannot be negative"),

  // BOE Details
  boeNumber: z.string().min(1, "BOE number is required"),
  boeDate: z.date().optional(),
  assessableValue: z.number().min(0, "Assessable value cannot be negative"),
  exchangeRate: z.number().min(0, "Exchange rate cannot be negative"),
  dutyRate: z.number().min(0).max(100, "Duty rate cannot exceed 100%"),
  socialWelfareSurcharge: z
    .number()
    .min(0)
    .max(100, "SWS rate cannot exceed 100%"),
  igstRate: z.number().min(0).max(100, "IGST rate cannot exceed 100%"),
});

export default function ShipmentForm() {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      supplierName: "",
      supplierEmail: "",
      supplierPhone: "",
      supplierAddress: "",
      supplierCountry: "",
      transportMode: "air",
      carrierName: "",
      originPort: "",
      destinationPort: "",
      etd: undefined,
      eta: undefined,
      incoterms: "",
      packageType: "carton",
      packageCount: 1,
      grossWeight: 0,
      cargoDescription: "",
      hsCode: "",
      freightValue: 0,
      forwarderName: "",
      forwarderContactPerson: "",
      forwarderEmail: "",
      forwarderPhone: "",
      bookingNumber: "",
      bookingDate: undefined,
      freightCost: 0,
      boeNumber: "",
      boeDate: undefined,
      assessableValue: 0,
      exchangeRate: 0,
      dutyRate: 0,
      socialWelfareSurcharge: 0,
      igstRate: 0,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const sections = [
    { name: "Supplier Details", component: SupplierDetails },
    { name: "Transport Details", component: TransportDetails },
    { name: "Freight Details", component: FreightDetails },
    { name: "Freight Forwarder Details", component: FreightForwarderDetails },
    { name: "Bill of Entry (BoE) Details", component: BillOfEntryDetails },
    {
      name: "Customs Duty & IGST Calculation",
      component: CustomsDutyCalculation,
    },
  ];

  const canProceedToNextSection = () => {
    const fieldsBySection = {
      0: [
        "supplierName",
        "supplierEmail",
        "supplierPhone",
        "supplierAddress",
        "supplierCountry",
      ],
      1: [
        "transportMode",
        "carrierName",
        "originPort",
        "destinationPort",
        "etd",
        "eta",
        "incoterms",
      ],
      2: [
        "packageType",
        "packageCount",
        "grossWeight",
        "cargoDescription",
        "hsCode",
        "freightValue",
      ],
      3: [
        "forwarderName",
        "forwarderContactPerson",
        "forwarderEmail",
        "forwarderPhone",
        "bookingNumber",
        "bookingDate",
        "freightCost",
      ],
      4: [
        "boeNumber",
        "boeDate",
        "assessableValue",
        "exchangeRate",
        "dutyRate",
        "socialWelfareSurcharge",
        "igstRate",
      ],
    };

    if (currentSection > 4) return true;

    const currentSectionFields = fieldsBySection[currentSection];
    return currentSectionFields.every((field) => !errors[field]);
  };

  const onSubmit = (data) => {
    const assessableValue = Number(data.assessableValue) || 0;
    const dutyRate = Number(data.dutyRate) || 0;
    const swsRate = Number(data.socialWelfareSurcharge) || 0;
    const igstRate = Number(data.igstRate) || 0;

    const basicDuty = (assessableValue * dutyRate) / 100;
    const swsAmount = (basicDuty * swsRate) / 100;
    const valueForIGST = assessableValue + basicDuty + swsAmount;
    const igstAmount = (valueForIGST * igstRate) / 100;
    const totalCustomsDuty = basicDuty + swsAmount;
    const totalDutyAndTaxes = totalCustomsDuty + igstAmount;

    const dataWithCalculations = {
      ...data,
      basicDuty,
      swsAmount,
      igstAmount,
      totalCustomsDuty,
      totalDutyAndTaxes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // For now, just show a success message
    toast({
      title: "Success",
      description: "Form submitted successfully!",
      type: "success",
    });
    setShowConfirmation(true);
  };

  // const handleExportExcel = async () => {
  //   try {
  //     await downloadExcelFromServer(); //this downlaodExcelFormServer is not in my code so how to take all data and put in excel d
  //     toast({
  //       title: "Success",
  //       description: "Shipments exported to Excel successfully",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to export shipments to Excel",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleExportExcel = () => {
    const formData = form.getValues();
    console.log("formData", formData);
    const dataArray = [formData]; // Convert form data to array

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(dataArray);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Shipment Data");

    // Convert workbook to a binary Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob and trigger download
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "shipment_data.xlsx");
  };

  const handleNewForm = () => {
    reset();
    setCurrentSection(0);
    setShowConfirmation(false);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <div className="container mx-auto p-4">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ProgressIndicator
            sections={sections}
            currentSection={currentSection}
          />

          <div className="bg-white rounded-lg shadow p-6">
            <CurrentSectionComponent />
          </div>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              Previous
            </Button>

            <div className="text-sm text-gray-600">
              Step {currentSection + 1} of {sections.length}
            </div>

            {currentSection < sections.length - 1 ? (
              <Button
                type="button"
                onClick={nextSection}
                disabled={!canProceedToNextSection()}
              >
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </FormProvider>

      {/* Export Toolbar Component */}
      <ExportToolbar onExportExcel={handleExportExcel} />

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Submitted Successfully</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleNewForm}>Create New Shipment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
