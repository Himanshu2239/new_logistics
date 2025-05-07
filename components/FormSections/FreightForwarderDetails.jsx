"use client"
import React from "react";
import { useFormContext } from "react-hook-form";
import { Plane, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FreightForwarderDetails({ nextSection, prevSection }) {
  const { control } = useFormContext();

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 flex items-center text-primary-dark">
        <Plane className="mr-2 h-5 w-5" />
        Freight Forwarder Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="forwarderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Forwarder Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="forwarderCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forwarder Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="forwarderContactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Contact Person</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="forwarderEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="forwarderPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="forwarderAddress"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bookingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Booking Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bookingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">Booking Date</FormLabel>
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
          name="forwarderReference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forwarder Reference</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="freightCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Freight Cost (USD)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    
    </>
  );
}
