"use client";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Calculator, ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomsDutyCalculation({
  prevSection,
  isLastSection,
  isPendingSubmission,
}) {
  const { watch, setValue } = useFormContext();

  const [calculations, setCalculations] = useState({
    assessableValue: 0,
    dutyRate: 0,
    basicDuty: 0,
    swsRate: 0,
    swsAmount: 0,
    valueForIGST: 0,
    igstRate: 0,
    igstAmount: 0,
    totalCustomsDuty: 0,
    totalDutyAndTaxes: 0,
  });

  const assessableValue = Number(watch("assessableValue")) || 0;
  const dutyRate = Number(watch("dutyRate")) || 0;
  const swsRate = Number(watch("socialWelfareSurcharge")) || 0;
  const igstRate = Number(watch("igstRate")) || 0;


  const calculateDuties = () => {
    const basicDuty = (assessableValue * dutyRate) / 100;
    const swsAmount = (basicDuty * swsRate) / 100;
    const valueForIGST = assessableValue + basicDuty + swsAmount;
    const igstAmount = (valueForIGST * igstRate) / 100;
    const totalCustomsDuty = basicDuty + swsAmount;
    const totalDutyAndTaxes = totalCustomsDuty + igstAmount;

    setCalculations({
      assessableValue,
      dutyRate,
      basicDuty,
      swsRate,
      swsAmount,
      valueForIGST,
      igstRate,
      igstAmount,
      totalCustomsDuty,
      totalDutyAndTaxes,
    });

    // Update form values for submission
    setValue("basicDuty", basicDuty);
    setValue("swsAmount", swsAmount);
    setValue("igstAmount", igstAmount);
    setValue("totalCustomsDuty", totalCustomsDuty);
    setValue("totalDutyAndTaxes", totalDutyAndTaxes);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 flex items-center text-primary-dark">
        <Calculator className="mr-2 h-5 w-5" />
        Customs Duty & IGST Calculation
      </h2>

      <Card className="bg-neutral-background mb-6">
        <CardContent className="pt-6">
          <h3 className="text-md font-medium mb-3">Basic Duty Calculation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="block text-sm text-gray-600">
                Assessable Value (INR)
              </span>
              <span className="font-semibold">
                {calculations.assessableValue.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">
                Basic Duty Rate (%)
              </span>
              <span className="font-semibold">
                {calculations.dutyRate.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">
                Basic Duty Amount (INR)
              </span>
              <span className="font-semibold">
                {calculations.basicDuty.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-background mb-6">
        <CardContent className="pt-6">
          <h3 className="text-md font-medium mb-3">Social Welfare Surcharge</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="block text-sm text-gray-600">
                Basic Duty Amount (INR)
              </span>
              <span className="font-semibold">
                {calculations.basicDuty.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">SWS Rate (%)</span>
              <span className="font-semibold">
                {calculations.swsRate.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">
                SWS Amount (INR)
              </span>
              <span className="font-semibold">
                {calculations.swsAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-background mb-6">
        <CardContent className="pt-6">
          <h3 className="text-md font-medium mb-3">IGST Calculation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <span className="block text-sm text-gray-600">
                Value for IGST (AV + Duty + SWS)
              </span>
              <span className="font-semibold">
                {calculations.valueForIGST.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">IGST Rate (%)</span>
              <span className="font-semibold">
                {calculations.igstRate.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">
                IGST Amount (INR)
              </span>
              <span className="font-semibold">
                {calculations.igstAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary text-white">
        <CardContent className="pt-6">
          <h3 className="text-md font-medium mb-3">Total Duties & Taxes</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-sm opacity-90">
                Total Customs Duty (Basic + SWS)
              </span>
              <span className="font-semibold text-lg">
                {calculations.totalCustomsDuty.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="block text-sm opacity-90">
                Total Duty & Taxes (Duty + SWS + IGST)
              </span>
              <span className="font-semibold text-lg">
                {calculations.totalDutyAndTaxes.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <div>
          <Button
            type="button"
            onClick={calculateDuties}
            className="mr-2  hover:bg-secondary-dark   bg-blue-600"
          >
            <Calculator className="mr-1 h-4 w-4" />
            Calculate
          </Button>
        </div>
      </div>
    </>
  );
}
