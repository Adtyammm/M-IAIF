// TableComponent.js

import React from "react";

const TableComponent = ({ data }) => {
  return (
    <div className="container mx-auto items-center">
      <table className="w-4/5 mx-auto">
        <thead className="bg-gray-50 border-b-2 border border-gray-800">
          <tr>
            <th className="w-20 p-3 font-semibold tracking-wide text-left border border-gray-800">
              No
            </th>
            <th className="w-80 p-3 font-semibold tracking-wide text-left border border-gray-800">
              Nama
            </th>
            <th className="w-80 p-3 font-semibold tracking-wide text-left border border-gray-800">
              Jabatan
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {item.pengurus.map((pengurus, pengurusIndex) => (
                <tr key={`${index}-${pengurusIndex}`}>
                  <td className="p-3 text-gray-700 border border-gray-800">
                    {pengurusIndex + 1}
                  </td>
                  <td className="p-3 text-gray-700 border border-gray-800">
                    {Array.isArray(pengurus.jabatan.nama_pengurus) ? (
                      <ul>
                        {pengurus.jabatan.nama_pengurus.map(
                          (nama, namaIndex) => (
                            <li key={`${index}-${pengurusIndex}-${namaIndex}`}>
                              {nama}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      pengurus.jabatan.nama_pengurus
                    )}
                  </td>
                  <td className="p-3 text-gray-700 border border-gray-800">
                    {pengurus.jabatan.jabatan_pengurus}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
