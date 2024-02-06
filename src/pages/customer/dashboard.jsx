import CusDataByZipCode from "@/components/CusDataByZipCode";
import CustomerTable from "@/components/CustomerTable";
import { appToast } from "@/utils/appToast";
import React, { useEffect, useState } from "react";
import { loadData, logOut } from "../api/customer";
import { useRouter } from "next/router";

const dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [cusDataByZipCode, setCusDataByZipCode] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadAllCusData() {
    setLoading(true);
    try {
      const data = await loadData("GetAllCustomers");
      setCustomerData(data);
    } catch (error) {
      appToast("error", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadCusDataByZipCode() {
    setLoading(true);
    try {
      const data = await loadData("GetCustomerListByZipCode");
      setCusDataByZipCode(data);
    } catch (error) {
      appToast("error", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogOut() {
    try {
      const res = await logOut();
      appToast("success", res.message);
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";
      window.location.href = "/";
    } catch (error) {
      appToast("error", error.message);
    }
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
      <div className="flex flex-row justify-center p-4 gap-2">
        <button
          className="bg-green-500 p-2 hover:bg-green-700 w-fit"
          onClick={loadAllCusData}
          disabled={loading}
        >
          Load All Customer list
        </button>
        <button
          className="bg-blue-500 p-2 hover:bg-blue-700"
          onClick={loadCusDataByZipCode}
          disabled={loading}
        >
          Load Customer list by ZipCode
        </button>
        <button
          className="hover:bg-slate-500 p-2"
          onClick={() => {
            setCustomerData([]);
            setCusDataByZipCode([]);
          }}
        >
          Clear Data
        </button>
      </div>
        {loading && <p className="text-center text-xl">Loading...</p>}
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
