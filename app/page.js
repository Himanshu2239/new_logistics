import React from "react";
import ShipmentForm from "@/components/ShipmentForm";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Logistics Shipment Form
        </h1>
        <p className="text-gray-600 mt-2">
          Complete the form below with shipment details
        </p>
      </header>
      <ShipmentForm />
    </div>
  );
}
