"use client"

import { useState, useEffect } from "react";
import { PaymentChart } from "@/component/membershipGraf/payment-chart"
import { PaymentHistory } from "@/component/membershipGraf/payment-history"
import { PaymentPieChart } from "@/component/membershipGraf/payment-pie-chart"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      <div className="grid gap-8 mb-8 md:grid-cols-2">
       
        <PaymentHistory />
        <PaymentChart />
        <PaymentPieChart/>
      </div>
    </div>
  )
}

