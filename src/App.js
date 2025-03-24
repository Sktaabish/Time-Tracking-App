import React, { useState } from "react";
// import DatePicker from "react-datepicker";
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaFileAlt,
  FaFolderOpen,
  FaCog,
} from "react-icons/fa";
import "./App.css";

const Timesheet = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const issues = Array(10).fill({ key: "ATL-0011", summary: "Issue summary" });
  const dates = Array.from({ length: 22 }, (_, i) => i + 1);
  const weekdays = ["WED", "THU", "FRI", "SAT", "SUN", "MON", "TUE"];

  return (
    <div className="timesheet-wrapper">
      <nav className="navbar">
        <div className="nav-left">
          <span className="logo">Jira</span>
          <ul>
            <li>Your work</li>
            <li>Projects</li>
            <li>Filters</li>
            <li>Dashboards</li>
            <li>People</li>
            <li>Apps</li>
          </ul>
        </div>
        <div className="nav-right">
          <button className="create-btn">Create</button>
          <input type="text" placeholder="Search" className="search-bar" />
          <span className="user-avatar">D</span>
        </div>
      </nav>

      <div className="timesheet-container">
        {/* Sidebar with icons */}
        <aside className="sidebar">
          <div className="sidebar-icon">
            <FaFolderOpen />
          </div>
          <div className="sidebar-icon">
            <FaCalendarAlt />
          </div>
          <div className="sidebar-icon">
            <FaCog />
          </div>
        </aside>

        <div className="timesheet-content">
          <header className="timesheet-header">
            <div className="user-info">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="user-avatar"
              />
              <span>Divya Shah</span>
            </div>
            <div className="date-picker">
              <button className="date-range">01/Jun/24 - 30/Jun/24</button>

              {/* Group By Dropdown */}
              <div className="group-by-head">
                <p className="p">Group By</p>
              </div>
              <select className="group-by">
                <option>Issues</option>
              </select>

              <button className="log-time" onClick={() => setIsModalOpen(true)}>
                Log Time
              </button>
            </div>
          </header>

          <table className="timesheet-table">
            <thead>
              <tr>
                <th className="issue-column">Issue</th>
                <th className="logged-column">Logged</th>
                {dates.map((date, index) => (
                  <th key={date} className="date-column">
                    <div className="date-header">
                      <span className="weekday">{weekdays[index % 7]}</span>
                      <span className="date">{date}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="issue-cell">
                    <span className="issue-key">{issue.key}</span> {issue.summary}
                  </td>
                  <td className="logged-cell">
                    <strong>4.5</strong>
                  </td>
                  {dates.map((date, colIndex) => (
                    <td
                      key={colIndex}
                      className={`timesheet-cell ${
                        selectedCell === `${rowIndex}-${colIndex}` ? "selected" : ""
                      }`}
                      onClick={() => setSelectedCell(`${rowIndex}-${colIndex}`)}
                    >
                      {colIndex % 3 === 0 ? "4.5" : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Time Modal */}
      <LogTimeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const LogTimeModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Log time</h2>

        <div className="input-group">
          <input type="text" placeholder="Search issues" className="modal-input search" />
          <FaSearch className="icon" /> {/* Search icon */}
        </div>

        <div className="input-row">
          <div className="input-group">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="modal-input date"
            />
            <FaCalendarAlt className="icon" onClick={() => document.querySelector('.modal-input.date').showPicker()} /> {/* Calendar icon */}
          </div>

          <div className="input-group">
            <input type="number" placeholder="0h" className="modal-input time" />
            <FaClock className="icon" /> {/* Clock icon */}
          </div>
        </div>

        <div className="input-group">
          <input type="text" placeholder="Description" className="modal-input description" />
          <FaFileAlt className="icon" /> {/* File icon */}
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="log-btn">Log time</button>
        </div>
      </div>
    </div>
  );
};

// const DateRangePicker = ({ onClose }) => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [customDays, setCustomDays] = useState(7);

//   const handleCustomDaysChange = (e) => {
//     const days = parseInt(e.target.value) || 0;
//     setCustomDays(days);
//     setStartDate(new Date());
//     setEndDate(new Date(new Date().setDate(new Date().getDate() + days)));
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         {/* Start Date */}
//         <div className="date-header">
//           <label>Start date</label>
//           <div className="input-wrapper">
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               className="date-input"
//             />
//             <FaCalendarAlt className="calendar-icon" />
//           </div>
//         </div>

//         {/* End Date */}
//         <div className="date-header">
//           <label>End date</label>
//           <div className="input-wrapper">
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               className="date-input"
//             />
//             <FaCalendarAlt className="calendar-icon" />
//           </div>
//         </div>

//         {/* Calendar View */}
//         <div className="calendar-view">
//           <h3>September 2024</h3>
//           {/* Calendar grid will go here */}
//           <h3>October 2024</h3>
//         </div>

//         {/* Predefined Date Ranges */}
//         <div className="predefined-ranges">
//           <p onClick={() => setStartDate(new Date())}>Current week</p>
//           <p onClick={() => setStartDate(new Date())}>Last week</p>
//           <p onClick={() => setStartDate(new Date())}>Current month</p>
//           <p onClick={() => setStartDate(new Date())}>Last month</p>
//           <p onClick={() => setStartDate(new Date())}>Current quarter</p>
//           <p onClick={() => setStartDate(new Date())}>Last quarter</p>
//         </div>

//         {/* Custom Days Input */}
//         <div className="custom-days">
//           <input
//             type="number"
//             value={customDays}
//             onChange={handleCustomDaysChange}
//           />
//           <span>Days</span>
//         </div>

//         {/* Action Buttons */}
//         <div className="action-buttons">
//           <button className="cancel-btn" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="apply-btn">Apply</button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Timesheet;
