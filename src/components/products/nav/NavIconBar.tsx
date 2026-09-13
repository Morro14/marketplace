"use client";
export default function NavIconBar() {
  return (
    <div className="flex gap-4 items-center">
      <button className="group fi">{sortIcon}</button>
      <button className="group">{filterIcon}</button>
      <button className="group">{heart}</button>
    </div>
  );
}
const heart = (
  <svg
    width="22"
    height="21"
    viewBox="0 0 22 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 19C6.68968 15.5049 1 10.9611 1 6.06794C1 3.44662 3.06897 1 6 1C8.24138 1 9.44828 1.87379 11 3.79611C12.3793 1.87379 13.7586 1 16 1C18.931 1 21 3.44662 21 6.06794C21 10.9611 15.3103 15.5049 11 19Z"
      stroke="#FF766D"
      strokeWidth="2"
    />
  </svg>
);
const filterIcon = (
  <svg
    width="20"
    height="12"
    viewBox="0 0 20 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 3H20" stroke="#3E3E3E" strokeWidth="2" />
    <line y1="9" x2="20" y2="9" stroke="#3E3E3E" strokeWidth="2" />
    <line x1="4" y1="6" x2="4" stroke="#3E3E3E" strokeWidth="2" />
    <line x1="12" y1="6" x2="12" y2="12" stroke="#3E3E3E" strokeWidth="2" />
  </svg>
);
const sortIcon = (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="8.74228e-08"
      y1="3"
      x2="16"
      y2="3"
      stroke="#3E3E3E"
      strokeWidth="2"
    />
    <line
      x1="9.36673e-08"
      y1="7.66663"
      x2="13"
      y2="7.66663"
      stroke="#3E3E3E"
      strokeWidth="2"
    />
    <line
      x1="9.36673e-08"
      y1="12.3334"
      x2="9"
      y2="12.3334"
      stroke="#3E3E3E"
      strokeWidth="2"
    />
    <line
      x1="9.36673e-08"
      y1="17"
      x2="5"
      y2="17"
      stroke="#3E3E3E"
      strokeWidth="2"
    />
  </svg>
);
