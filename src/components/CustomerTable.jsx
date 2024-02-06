import React from "react";

const CustomerTable = ({ data }) => {
  return (
    <table className="table-auto w-full">
      <caption className="text-2xl font-bold text-center mb-4">All Customer List</caption>
      <thead>
        <tr>
          <th className="border px-4 py-2">Customer ID</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((customer) => (
          <tr key={customer.customerId}>
            <td className="border px-4 py-2">{customer.customerId}</td>
            <td className="border px-4 py-2">{customer.name}</td>
            <td className="border px-4 py-2">{customer.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
