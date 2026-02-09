let questionCounter = 1;

// Initialize Date
document.getElementById('displayDate').innerText = new Date().toLocaleDateString();

// Sync Header Inputs
document.getElementById('examNameInput').addEventListener('input', (e) => {
    document.getElementById('displayExamName').innerText = e.target.value.toUpperCase() || "EXAMINATION NAME";
});

document.getElementById('studentNameInput').addEventListener('input', (e) => {
    document.getElementById('displayStudentName').innerText = e.target.value.toUpperCase() || "_______________________";
});

// Main Function to Add Questions
function addQuestions() {
    const type = document.getElementById('qType').value;
    const count = parseInt(document.getElementById('qCount').value);
    const container = document.getElementById('omrGrid');

    let sectionTitle = "";
    let optionsArray = [];

    // Configuration based on type
    if (type === 'single' || type === 'multi') {
        sectionTitle = "Multiple Choice Questions";
        optionsArray = ['A', 'B', 'C', 'D'];
    } else if (type === 'integer') {
        sectionTitle = "Integer / Numerical Value";
        optionsArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    } else if (type === 'matrix') {
        sectionTitle = "Matrix Match Type";
        optionsArray = ['P', 'Q', 'R', 'S', 'T'];
    }

    // Create Section Container
    const sectionBlock = document.createElement('div');
    sectionBlock.className = 'section-block';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'section-title';
    titleDiv.innerText = sectionTitle;
    sectionBlock.appendChild(titleDiv);

    // Loop to create rows
    for (let i = 0; i < count; i++) {
        const row = document.createElement('div');
        row.className = 'q-row';

        // 1. Question Number
        const numSpan = document.createElement('div');
        numSpan.className = 'q-num';
        numSpan.innerText = questionCounter + ".";
        row.appendChild(numSpan);

        // 2. Options Container
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        // --- SPECIAL LOGIC: INTEGER TYPE ---
        if (type === 'integer') {
            // Create the input box for typing
            const inputField = document.createElement('input');
            inputField.type = 'number';
            inputField.className = 'int-input no-print'; // 'no-print' hides it on paper
            inputField.min = 0;
            inputField.max = 9;
            inputField.placeholder = "#";

            // Event Listener: Type to Fill Bubble
            inputField.addEventListener('input', function() {
                const val = this.value;
                const bubbles = optionsDiv.querySelectorAll('.bubble');
                
                // Reset bubbles in this row
                bubbles.forEach(b => b.classList.remove('filled'));

                // Fill matching bubble
                if (val !== "") {
                    bubbles.forEach(b => {
                        if (b.innerText === val) {
                            b.classList.add('filled');
                        }
                    });
                }
            });
            optionsDiv.appendChild(inputField);
        }

        // --- RENDER BUBBLES ---
        if (type === 'matrix') {
            const matrixContainer = document.createElement('div');
            matrixContainer.className = 'matrix-container';
            
            ['A', 'B', 'C', 'D'].forEach(rowLabel => {
                const mRow = document.createElement('div');
                mRow.className = 'matrix-row';
                
                const label = document.createElement('span');
                label.className = 'matrix-label';
                label.innerText = rowLabel;
                mRow.appendChild(label);

                optionsArray.forEach(opt => {
                    mRow.appendChild(createBubble(opt));
                });
                matrixContainer.appendChild(mRow);
            });
            optionsDiv.appendChild(matrixContainer);
        } else {
            // Standard Rendering (Single, Multi, Integer Bubbles)
            optionsArray.forEach(opt => {
                optionsDiv.appendChild(createBubble(opt));
            });
        }

        row.appendChild(optionsDiv);
        sectionBlock.appendChild(row);
        questionCounter++;
    }

    container.appendChild(sectionBlock);
}

// Helper to create clickable bubbles
function createBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerText = text;
    
    bubble.addEventListener('click', function() {
        this.classList.toggle('filled');
    });

    return bubble;
}

// Reset Function
function resetSheet() {
    if(confirm("Are you sure you want to clear the entire sheet?")) {
        document.getElementById('omrGrid').innerHTML = '';
        questionCounter = 1;
        document.getElementById('examNameInput').value = '';
        document.getElementById('studentNameInput').value = '';
        document.getElementById('displayExamName').innerText = 'EXAMINATION NAME';
        document.getElementById('displayStudentName').innerText = '_______________________';
    }
}