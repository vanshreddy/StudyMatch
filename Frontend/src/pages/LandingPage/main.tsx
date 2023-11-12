import React from 'react';
import { NavigationBar } from "../../components/navigationBar/main";

// SubjectBox component
const SubjectBox = ({ subjectName, icon }) => (
  <div className="subject-box">
    <img src={icon} alt={`${subjectName} icon`} />
    <h3>{subjectName}</h3>
  </div>
);

export function LandingPage() {
    // Define your subjects and icons here
    const subjects = [
      { name: "Math", icon: "/path/to/math-icon.png" },
      { name: "Science", icon: "/path/to/science-icon.png" },
      { name: "English", icon: "/path/to/english-icon.png" },
      // Add more subjects as needed
    ];

    return (
        <div>
            <NavigationBar />

            <div className="subjects-container">
              {subjects.map((subject) => (
                <SubjectBox
                  key={subject.name}
                  subjectName={subject.name}
                  icon={subject.icon}
                />
              ))}
            </div>
        </div>
    );
}
