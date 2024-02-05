import CustomerTable from "@/components/CustomerTable";
import React, { useEffect, useState } from "react";

const dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  async function loadData() {
    try {
      const response = await fetch(
        "https://localhost:7113/api/Customer/GetAllCustomers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        let data = await response.json();
        setCustomerData(data);
        console.log(data);
      } else {
        let data = await response.json();
        console.log("Error fetching data",data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function logOut() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between p-12">
        <h1 className="text-3xl">Admin Dashboard</h1>
        <button onClick={logOut}>Logout</button>
      </div>
      <div className="p-4">
        <button className="bg-green-500 p-6" onClick={loadData}>
          Load All Customer Data
        </button>
      </div>
      {customerData && (
        <div className="p-4">
           {customerData.length > 0 && <CustomerTable data={customerData} />}
        </div>
      )}
    </div>
  );
};

export default dashboard;
