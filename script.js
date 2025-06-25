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
        
        // Update displays
        updateGPA();
    }
}

// Initialize the calculator
updateGPA();