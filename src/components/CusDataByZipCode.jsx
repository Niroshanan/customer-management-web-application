import React from "react";

const CusDataByZipCode = ({ data }) => {
  return (
    <div>
      {data.map((customer) => (
        <div key={customer.zipCode}>
            <h1 className="text-2xl font-bold mb-4">{customer.zipCode}</h1>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Customer ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                </tr>
                </thead>
                <tbody>
                {customer.customers.map((cus) => (
                    <tr key={cus.customerId}>
                    <td className="border px-4 py-2">{cus.customerId}</td>
                    <td className="border px-4 py-2">{cus.name}</td>
                    <td className="border px-4 py-2">{cus.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      ))}
    </div>
  );
};

export default CusDataByZipCode;
