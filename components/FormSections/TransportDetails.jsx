
"use client"
import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Truck, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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

export default function TransportDetails({ nextSection, prevSection }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const transportMode = watch("transportMode");

  useEffect(() => {
    // Reset mode-specific fields when transport mode changes
    if (transportMode === "air") {
      setValue("vesselName", "");
      setValue("vehicleNumber", "");
    } else if (transportMode === "sea") {
      setValue("flightNumber", "");
      setValue("vehicleNumber", "");
    } else if (transportMode === "road") {
      setValue("vesselName", "");
      setValue("flightNumber", "");
    } else {
      setValue("vesselName", "");
      setValue("flightNumber", "");
      setValue("vehicleNumber", "");
    }
  }, [transportMode, setValue]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 flex items-center text-primary-dark">
        <Truck className="mr-2 h-5 w-5" />
        Transport Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="transportMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Mode of Transport</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="air">Air</SelectItem>
                  <SelectItem value="sea">Sea</SelectItem>
                  <SelectItem value="road">Road</SelectItem>
                  <SelectItem value="rail">Rail</SelectItem>
                  <SelectItem value="multimodal">Multimodal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="carrierName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Carrier Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {transportMode === "sea" && (
          <FormField
            control={control}
            name="vesselName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vessel Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {transportMode === "air" && (
          <FormField
            control={control}
            name="flightNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flight Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {transportMode === "road" && (
          <FormField
            control={control}
            name="vehicleNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="containerNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Container Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="originPort"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Origin Port/Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="destinationPort"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">
                Destination Port/Location
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="etd"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">
                Estimated Time of Departure (ETD)
              </FormLabel>
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
          name="eta"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">
                Estimated Time of Arrival (ETA)
              </FormLabel>
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
          name="transitTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transit Time (days)</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="incoterms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Incoterms</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incoterm" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                  <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                  <SelectItem value="CIF">
                    CIF - Cost, Insurance & Freight
                  </SelectItem>
                  <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
                  <SelectItem value="CPT">CPT - Carriage Paid To</SelectItem>
                  <SelectItem value="CIP">
                    CIP - Carriage & Insurance Paid To
                  </SelectItem>
                  <SelectItem value="DAP">DAP - Delivered At Place</SelectItem>
                  <SelectItem value="FCA">FCA - Free Carrier</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
