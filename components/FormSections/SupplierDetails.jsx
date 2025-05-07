"use client"
import React from "react";
import { useFormContext } from "react-hook-form";
import { Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

export default function SupplierDetails() {
  const { control, formState: { errors } } = useFormContext();

  const countries = [
    { code: "US", name: "United States" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "DE", name: "Germany" },
    { code: "UK", name: "United Kingdom" },
    { code: "JP", name: "Japan" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
  ];

  return (
    <div className="w-full rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <Building className="mr-2 h-6 w-6 text-primary-dark" />
        Supplier Details
      </h2>
      <p className="text-gray-600 mb-6">Complete the form below with shipment details</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Supplier Name Field */}
        <FormField
          control={control}
          name="supplierName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">Supplier Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter supplier name" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Supplier Code Field */}
        <FormField
          control={control}
          name="supplierCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">Supplier Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter supplier code" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PO Number Field */}
        <FormField
          control={control}
          name="poNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">PO Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter PO number" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={control}
          name="supplierEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">Email <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="Enter supplier email" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={control}
          name="supplierPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">Phone Number <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="tel" {...field} placeholder="Enter phone number" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={control}
          name="supplierAddress"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-gray-800 font-medium">Address <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} placeholder="Enter address" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Country Field */}
        <FormField
          control={control}
          name="supplierCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">Country <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Person Field */}
        <FormField
          control={control}
          name="supplierContactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800 font-medium">Contact Person</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter contact person" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>  
    </div>
  );
}
