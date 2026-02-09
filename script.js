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

function addQuestions() {
    const type = document.getElementById('qType').value;
    const count = parseInt(document.getElementById('qCount').value);
    const container = document.getElementById('omrGrid');

    let sectionTitle = "";
    if (type === 'single' || type === 'multi') sectionTitle = "Multiple Choice";
    else if (type === 'integer') sectionTitle = "Integer Value (Type Below)";
    else if (type === 'matrix') sectionTitle = "Matrix Match";

    const sectionBlock = document.createElement('div');
    sectionBlock.className = 'section-block';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'section-title';
    titleDiv.innerText = sectionTitle;
    sectionBlock.appendChild(titleDiv);

    for (let i = 0; i < count; i++) {
        const row = document.createElement('div');
        row.className = 'q-row';

        const numSpan = document.createElement('div');
        numSpan.className = 'q-num';
        numSpan.innerText = questionCounter + ".";
        row.appendChild(numSpan);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        // --- NEW INTEGER LOGIC: BOXES INSTEAD OF BUBBLES ---
        if (type === 'integer') {
            const integerBoxContainer = document.createElement('div');
            integerBoxContainer.className = 'integer-box-container';

            // Create 2 boxes (for tens and units)
            for (let j = 0; j < 2; j++) {
                const box = document.createElement('input');
                box.type = 'text';
                box.maxLength = 1;
                box.className = 'int-box-input';
                // Prevents printing the border-highlight when focused
                box.placeholder = " "; 
                
                // Logic: Auto-tab to next box
                box.addEventListener('input', function() {
                    if (this.value.length === 1 && j === 0) {
                        integerBoxContainer.children[1].focus();
                    }
                });
                integerBoxContainer.appendChild(box);
            }
            optionsDiv.appendChild(integerBoxContainer);
        } 
        else if (type === 'matrix') {
            const matrixContainer = document.createElement('div');
            matrixContainer.className = 'matrix-container';
            ['A', 'B', 'C', 'D'].forEach(rowLabel => {
                const mRow = document.createElement('div');
                mRow.className = 'matrix-row';
                const label = document.createElement('span');
                label.className = 'matrix-label';
                label.innerText = rowLabel;
                mRow.appendChild(label);
                ['P', 'Q', 'R', 'S', 'T'].forEach(opt => mRow.appendChild(createBubble(opt)));
                matrixContainer.appendChild(mRow);
            });
            optionsDiv.appendChild(matrixContainer);
        } else {
            // Standard A-D Bubbles
            ['A', 'B', 'C', 'D'].forEach(opt => optionsDiv.appendChild(createBubble(opt)));
        }

        row.appendChild(optionsDiv);
        sectionBlock.appendChild(row);
        questionCounter++;
    }
    container.appendChild(sectionBlock);
}

function createBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerText = text;
    bubble.addEventListener('click', function() { this.classList.toggle('filled'); });
    return bubble;
}

function resetSheet() {
    if(confirm("Clear sheet?")) {
        document.getElementById('omrGrid').innerHTML = '';
        questionCounter = 1;
    }
}
