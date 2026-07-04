const semesterData = {
    1: {
        courses: {
            'pf': { credits: 3, points: 0 },
            'pf_lab': { credits: 1, points: 0 },
            'ict': { credits: 3, points: 0 },
            'ict_lab': { credits: 1, points: 0 },
            'discrete': { credits: 3, points: 0 },
            'calculus': { credits: 3, points: 0 },
            'english': { credits: 3, points: 0 }
        },
        totalCredits: 17
    },
    2: {
        courses: {
            'oop': { credits: 3, points: 0 },
            'oop_lab': { credits: 1, points: 0 },
            'dbms': { credits: 3, points: 0 },
            'dbms_lab': { credits: 1, points: 0 },
            'dld': { credits: 2, points: 0 },
            'dld_lab': { credits: 1, points: 0 },
            'multi_calc': { credits: 3, points: 0 },
            'linear_alg': { credits: 3, points: 0 }
        },
        totalCredits: 17
    },
    3: {
        courses: {
            'ds': { credits: 3, points: 0 },
            'ds_lab': { credits: 1, points: 0 },
            'ai': { credits: 2, points: 0 },
            'ai_lab': { credits: 1, points: 0 },
            'cn': { credits: 2, points: 0 },
            'cn_lab': { credits: 1, points: 0 },
            'is': { credits: 2, points: 0 },
            'is_lab': { credits: 1, points: 0 },
            'prob_stat': { credits: 3, points: 0 },
            'se': { credits: 3, points: 0 }
        },
        totalCredits: 19
    },
    4: {
        courses: {
            'coal': { credits: 2, points: 0 },
            'coal_lab': { credits: 1, points: 0 },
            'sre': { credits: 2, points: 0 },
            'sre_lab': { credits: 1, points: 0 },
            'ap': { credits: 2, points: 0 },
            'ap_lab': { credits: 1, points: 0 },
            'sda': { credits: 3, points: 0 },
            'exp': { credits: 3, points: 0 },
            'isl': { credits: 3, points: 0 }
        },
        totalCredits: 18
    },
    5: {
        courses: {
            'os': { credits: 3, points: 0 },
            'os_lab': { credits: 1, points: 0 },
            'automata': { credits: 3, points: 0 },
            'hci': { credits: 2, points: 0 },
            'hci_lab': { credits: 1, points: 0 },
            'scd': { credits: 2, points: 0 },
            'scd_lab': { credits: 1, points: 0 },
            'sqe': { credits: 2, points: 0 },
            'sqe_lab': { credits: 1, points: 0 },
            'mgmt': { credits: 2, points: 0 }
        },
        totalCredits: 18
    }
};

let currentSemester = 1;

function getGradePoints(percentage) {
    if (percentage >= 91) return 4.00;
    if (percentage >= 80) return 3.66;
    if (percentage >= 75) return 3.33;
    if (percentage >= 71) return 3.00;
    if (percentage >= 68) return 2.66;
    if (percentage >= 64) return 2.33;
    if (percentage >= 61) return 2.00;
    if (percentage >= 58) return 1.66;
    if (percentage >= 54) return 1.33;
    if (percentage >= 50) return 1.00;
    return 0.00;
}

function getGradeLetter(points) {
    if (points === 4.00) return 'A';
    if (points === 3.66) return 'A-';
    if (points === 3.33) return 'B+';
    if (points === 3.00) return 'B';
    if (points === 2.66) return 'B-';
    if (points === 2.33) return 'C+';
    if (points === 2.00) return 'C';
    if (points === 1.66) return 'C-';
    if (points === 1.33) return 'D+';
    if (points === 1.00) return 'D';
    return 'F';
}

function getGradeClass(letter) {
    return 'grade-' + letter.replace(/[+-]/, match => match === '+' ? '' : '-');
}

function calculateGrade(input, courseCode, totalMarks, credits) {
    const obtainedMarks = parseFloat(input.value) || 0;
    const percentage = (obtainedMarks / totalMarks) * 100;
    const gradePoints = getGradePoints(percentage);
    const gradeLetter = getGradeLetter(gradePoints);
    
    // Update grade display
    const gradeDisplay = document.getElementById('grade-' + courseCode);
    gradeDisplay.textContent = gradeLetter;
    gradeDisplay.className = 'grade-display ' + getGradeClass(gradeLetter);
    
    // Update semester data
    semesterData[currentSemester].courses[courseCode].points = gradePoints;
    
    // Recalculate GPA
    updateGPA();
}

function updateGPA() {
    // Calculate current semester GPA
    const currentSemData = semesterData[currentSemester];
    let totalPoints = 0;
    let totalCredits = 0;
    
    for (const [courseCode, courseData] of Object.entries(currentSemData.courses)) {
        totalPoints += courseData.points * courseData.credits;
        totalCredits += courseData.credits;
    }
    
    const semesterGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    // Update current semester display
    document.getElementById('current-gpa').textContent = semesterGPA.toFixed(2);
    document.getElementById('current-credits').textContent = totalCredits;
    document.getElementById('current-points').textContent = totalPoints.toFixed(2);
    
    // Update semester-specific GPA
    document.getElementById('sem' + currentSemester + '-gpa').textContent = semesterGPA.toFixed(2);
    
    // Calculate CGPA
    let allPoints = 0;
    let allCredits = 0;
    
    for (const [semNum, semData] of Object.entries(semesterData)) {
        for (const [courseCode, courseData] of Object.entries(semData.courses)) {
            allPoints += courseData.points * courseData.credits;
            allCredits += courseData.credits;
        }
    }
    
    const cgpa = allCredits > 0 ? allPoints / allCredits : 0;
    
    // Update CGPA display
    document.getElementById('cgpa').textContent = cgpa.toFixed(2);
    document.getElementById('total-credits').textContent = allCredits;
    document.getElementById('total-points').textContent = allPoints.toFixed(2);
}

function calculateSemesterGPA(semesterNum) {
    const semData = semesterData[semesterNum];
    let totalPoints = 0;
    let totalCredits = 0;

    for (const courseData of Object.values(semData.courses)) {
        totalPoints += courseData.points * courseData.credits;
        totalCredits += courseData.credits;
    }

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

function calculateOverallCGPA() {
    let allPoints = 0;
    let allCredits = 0;

    for (const semData of Object.values(semesterData)) {
        for (const courseData of Object.values(semData.courses)) {
            allPoints += courseData.points * courseData.credits;
            allCredits += courseData.credits;
        }
    }

    return allCredits > 0 ? allPoints / allCredits : 0;
}

function downloadTranscript() {
    const semesterOrder = [1, 2, 3, 4, 5];
    const transcriptRows = semesterOrder.map(semesterNum => {
        const semesterElement = document.getElementById('semester-' + semesterNum);
        const courses = Array.from(semesterElement?.querySelectorAll('.course-item') || []);

        const rows = courses.map(courseItem => {
            const title = courseItem.querySelector('.course-name')?.textContent?.trim() || 'Course';
            const creditsText = courseItem.querySelector('.credit-hours')?.textContent?.trim() || '0 CH';
            const credits = parseInt(creditsText, 10) || 0;
            const marks = courseItem.querySelector('.marks-input')?.value?.trim() || '—';
            const grade = courseItem.querySelector('.grade-display')?.textContent?.trim() || '-';
            return `
                <tr>
                    <td>${title}</td>
                    <td>${credits} CH</td>
                    <td>${marks}</td>
                    <td>${grade}</td>
                </tr>`;
        }).join('');

        const semesterGPA = calculateSemesterGPA(semesterNum).toFixed(2);
        return `
            <div class="semester-block">
                <div class="semester-title">Semester ${semesterNum}</div>
                <div class="semester-summary">GPA: <strong>${semesterGPA}</strong> &nbsp;•&nbsp; Credits: <strong>${semesterData[semesterNum].totalCredits}</strong></div>
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Credits</th>
                            <th>Marks</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>`;
    }).join('');

    const overallCGPA = calculateOverallCGPA().toFixed(2);
    const transcriptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Student Transcript</title>
            <style>
                body {
                    font-family: 'Poppins', Arial, sans-serif;
                    margin: 0;
                    padding: 24px;
                    color: #111827;
                    background: #ffffff;
                }
                .transcript-wrapper {
                    max-width: 900px;
                    margin: 0 auto;
                    border: 1px solid #d1d5db;
                    border-radius: 16px;
                    padding: 28px;
                    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #3b82f6;
                    padding-bottom: 14px;
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0 0 6px;
                    font-size: 28px;
                    color: #1d4ed8;
                }
                .header p {
                    margin: 0;
                    color: #64748b;
                }
                .summary-box {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 20px;
                }
                .summary-card {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 12px;
                    text-align: center;
                }
                .summary-card strong {
                    display: block;
                    color: #0f172a;
                    font-size: 16px;
                    margin-top: 4px;
                }
                .semester-block {
                    margin-bottom: 22px;
                    page-break-inside: avoid;
                }
                .semester-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 6px;
                }
                .semester-summary {
                    font-size: 13px;
                    color: #475569;
                    margin-bottom: 8px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13px;
                }
                th, td {
                    border: 1px solid #e2e8f0;
                    padding: 8px 10px;
                    text-align: left;
                }
                th {
                    background: #eff6ff;
                    color: #1d4ed8;
                }
                tr:nth-child(even) td {
                    background: #f8fafc;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #64748b;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="transcript-wrapper">
                <div class="header">
                    <h1>SMIU Software Engineering Transcript</h1>
                    <p>GPA & CGPA Summary</p>
                </div>
                <div class="summary-box">
                    <div class="summary-card">Current CGPA<strong>${overallCGPA}</strong></div>
                    <div class="summary-card">Total Credits<strong>${Object.values(semesterData).reduce((sum, sem) => sum + sem.totalCredits, 0)}</strong></div>
                    <div class="summary-card">Generated On<strong>${new Date().toLocaleDateString()}</strong></div>
                </div>
                ${transcriptRows}
                <div class="footer">Generated from SMIU SE GPA Calculator</div>
            </div>
        </body>
        </html>`;

    const printWindow = window.open('', '_blank', 'width=900,height=1100');
    if (!printWindow) {
        alert('Please allow popups to download the transcript.');
        return;
    }

    printWindow.document.write(transcriptHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
}

function showSemester(semesterNum) {
    // Hide all semester content
    document.querySelectorAll('.semester-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected semester
    document.getElementById('semester-' + semesterNum).classList.add('active');
    document.querySelectorAll('.tab-button')[semesterNum - 1].classList.add('active');
    
    // Update current semester
    currentSemester = semesterNum;
    
    // Update GPA display for current semester
    updateGPA();
}

function resetAll() {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
        // Reset all inputs
        document.querySelectorAll('.marks-input[type="number"]:not([readonly])').forEach(input => {
            input.value = '';
        });
        
        // Reset all grade displays
        document.querySelectorAll('.grade-display').forEach(display => {
            display.textContent = '-';
            display.className = 'grade-display';
        });
        
        // Reset semester data
        for (const [semNum, semData] of Object.entries(semesterData)) {
            for (const [courseCode, courseData] of Object.entries(semData.courses)) {
                courseData.points = 0;
            }
        }
        
        // Reset semester GPA displays
        document.getElementById('sem1-gpa').textContent = '-';
        document.getElementById('sem2-gpa').textContent = '-';
        document.getElementById('sem3-gpa').textContent = '-';
        document.getElementById('sem4-gpa').textContent = '-';
        document.getElementById('sem5-gpa').textContent = '-';
        
        // Update displays
        updateGPA();
    }
}

// Initialize the calculator
updateGPA();