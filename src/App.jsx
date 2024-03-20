import "./styles.css";
import "./marks.php";

import { useState } from "react";
const Subjects = [
  {
    code: "18CSC363J",
    name: "COMPUTER NETWORKS",
  },
  {
    code: "18CSC364J",
    name: "INFORMATION SECURITY",
  },
  {
    code: "18CSC365J",
    name: "ARTIFICIAL INTELLIGENCE",
  },
  {
    code: "18CSE365J",
    name: "MODERN WEB APPLICATIONS",
  },
  { code: "18CSE467J", name: "ENTERPRISE SYSTEMS" },
  { code: "18CSM362L", name: "COMPETITIVE PROFESSIONAL SKILLS - III" },
  { code: "18LEM110L", name: "INDIAN ART FORM" },
  { code: "18MBH362T", name: "BUSINESS COMMUNICATION AND VALUE SCIENCE - IV" },
  { code: "18MBH365T", name: "FINANCIAL AND COST ACCOUNTING" },
];

export default function App() {
  const [selectedCT, setSelectedCT] = useState("ct1");
  const [errors, setErrors] = useState(new Array(Subjects.length).fill(false));

  const checkCt = (e, index) => {
    const newValue = e.target.value;
    const ctMaxMarks = {
      ct1: 25,
      ct2: 50,
      ct3: 50,
    };
    const newErrors = [...errors];
    newErrors[index] = newValue > ctMaxMarks[selectedCT];
    setErrors(newErrors);
  };

  const checkPr = (e, index) => {
    const newValue = e.target.value;
    const ctMaxMarks = {
      ct1: 5,
      ct2: 10,
      ct3: 10,
    };
    const newErrors = [...errors];
    newErrors[index] = newValue > ctMaxMarks[selectedCT];
    setErrors(newErrors);
  };

  const handleSelectChange = (e) => {
    setSelectedCT(e.target.value);
  };
  return (
    <div className="bodymain">
      <div className="container">
        <h1>Cycle Test Mark Entry</h1>
        <div className="row">
          <h1>Mark Entry</h1>
        </div>
        <div>
          <div className="tablemarks">
            <form action="http://localhost/marks.php" method="post">
              <label htmlFor="registerNumber">Register Number:</label>
              <input type="text" id="registerNumber" name="registerNumber" />
  
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
  
              <label htmlFor="ctSelect">Select CT:</label>
              <select
                id="ctSelect"
                onChange={handleSelectChange}
                value={selectedCT}
              >
                <option value="ct1">CT-1</option>
                <option value="ct2">CT-2</option>
                <option value="ct3">CT-3</option>
              </select>
              <input type="hidden" name="selectedCT" value={selectedCT} />
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>{selectedCT.toUpperCase()}</th>
                  </tr>
                </thead>
                <tbody>
                  {Subjects.map((subject, index) => (
                    <tr key={index} valign="top">
                      <td>{subject.name}</td>
                      <td>
                        <input
                          type="number"
                          name={`marks[${subject.code}][ct]`}
                          placeholder={`Enter CT marks for ${subject.name}`}
                          onChange={(e) => checkCt(e, index)}
                        />
                        {errors[index] && (
                          <p>{`${selectedCT.toUpperCase()} marks should be less than or equal to ${
                            selectedCT === "ct1" ? "25" : "50"
                          }`}</p>
                        )}
                        <input
                          type="text"
                          name={`marks[${subject.code}][pr]`}
                          placeholder="Enter practical marks"
                          onChange={(e) => checkPr(e, index)}
                        />
                        {errors[index] && (
                          <p>{`${selectedCT.toUpperCase()} practical marks should be less than or equal to ${
                            selectedCT === "ct1" ? "5" : "10"
                          }`}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <button type="submit">Submit</button>
                </tfoot>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
                        }  
