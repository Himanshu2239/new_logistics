"use client"
import React from "react";
import { useFormContext } from "react-hook-form";
import { Package, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export default function FreightDetails({ nextSection, prevSection }) {
  const { control } = useFormContext();

  return (
    <div className="w-full bg-white rounded-lg p-10  border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
        <Package className="mr-2 h-6 w-6 text-primary-dark" />
        Freight Details
      </h2>
      <p className="text-gray-600 mb-8">Complete the form below with shipment details</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 w-full">
        <FormField
          control={control}
          name="packageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Package Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pallets">Pallets</SelectItem>
                  <SelectItem value="cartons">Cartons</SelectItem>
                  <SelectItem value="crates">Crates</SelectItem>
                  <SelectItem value="drums">Drums</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                  <SelectItem value="bulk">Bulk</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="packageCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Number of Packages</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="grossWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Gross Weight (kg)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="netWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Net Weight (kg)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="volume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volume (m³)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dimensions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimensions (LxWxH in cm)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 100x80x120" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="natureOfGoods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nature of Goods</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nature of goods" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CKD">CKD (Completely Knocked Down)</SelectItem>
                  <SelectItem value="SKD">SKD (Semi-Knocked Down)</SelectItem>
                  <SelectItem value="CBU">CBU (Completely Built Up)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dangerous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Dangerous Goods</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature Requirements</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 2-8°C" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cargoDescription"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="required">Cargo Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="hsCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">HS Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="freightValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Freight Value (USD)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
