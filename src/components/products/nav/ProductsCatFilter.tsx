"use client";

import { useState } from "react";

export default function ProductsCarFilter() {
  const [selectedCats, setSelectedCats] = useState([]);
  return (
    <div>
      {selectedCats.map((cat, i) => (
        <div className="h-8 bg-gray-light rounded-2xl">{cat}</div>
      ))}
    </div>
  );
}
