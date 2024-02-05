import CusDataByZipCode from "@/components/CusDataByZipCode";
import CustomerTable from "@/components/CustomerTable";
import { appToast } from "@/utils/appToast";
import React, { useEffect, useState } from "react";
import { loadData } from "../api/customer";

const dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [cusDataByZipCode, setCusDataByZipCode] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function loadAllCusData() {
    try {
      const data = await loadData(
        "https://localhost:7113/api/Customer/GetAllCustomers"
      );
      setCustomerData(data);
      setIsLoading(true);
    } catch (error) {
      appToast("error", error.message);
      toast
    }
    finally{
      setIsLoading(false);
    }
  }

  async function loadCusDataByZipCode() {
    setIsLoading(true);
    appToast("","Loading Customer list by ZipCode");
    try {
      const data = await loadData(
        "https://localhost:7113/api/Customer/GetCustomerListByZipCode"
      );
      setCusDataByZipCode(data);
      setIsLoading(true);
    } catch (error) {
      appToast("error", error.message);
    }
    finally{
      setIsLoading(false);
    }
  }

  async function handleLogOut() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  }

  useEffect(() => {
    if (!document.cookie.includes("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between p-12">
        <h1 className="text-3xl">Customer Details</h1>
        <button onClick={handleLogOut}>Logout</button>
      </div>
      <div className="flex flex-col p-4 gap-1">
        <button
          className="bg-green-500 p-2 hover:bg-green-700"
          onClick={loadAllCusData}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load All Customer list"}
        </button>
        <button
          className="bg-blue-500 p-2 hover:bg-blue-700"
          onClick={loadCusDataByZipCode}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load Customer list by ZipCode"}
        </button>
        <button onClick={()=>((setCustomerData([]) && setCusDataByZipCode([])))}>Clear </button>
      </div>
      {customerData && (
        <div className="p-4">
          {customerData.length > 0 && <CustomerTable data={customerData} />}
        </div>
      )}
      {cusDataByZipCode && (
        <div className="p-4">
          {cusDataByZipCode.length > 0 && (
            <CusDataByZipCode data={cusDataByZipCode} />
          )}
        </div>
      )}
    </div>
  );
};

export default dashboard;
