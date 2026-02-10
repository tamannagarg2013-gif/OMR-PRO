let questionCounter = 1;

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

    const sectionBlock = document.createElement('div');
    sectionBlock.className = 'section-block';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'section-title';
    
    // Labeling logic
    if (type === 'single') titleDiv.innerText = "Section: Single Correct";
    else if (type === 'multi') titleDiv.innerText = "Section: Multi Correct";
    else if (type === 'integer') titleDiv.innerText = "Section: Numerical/Integer";
    else titleDiv.innerText = "Section: Matrix Match";
    
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

        // --- INTEGER LOGIC (Unlimited digits) ---
        if (type === 'integer') {
            const mainInput = document.createElement('input');
            mainInput.type = 'number';
            mainInput.className = 'main-int-input no-print';
            mainInput.placeholder = "Value";

            const boxContainer = document.createElement('div');
            boxContainer.className = 'integer-box-container';

            mainInput.addEventListener('input', function() {
                boxContainer.innerHTML = ''; 
                const valStr = this.value.toString();
                for (let char of valStr) {
                    const box = document.createElement('div');
                    box.className = 'int-box-display';
                    box.innerText = char;
                    boxContainer.appendChild(box);
                }
            });

            optionsDiv.appendChild(mainInput);
            optionsDiv.appendChild(boxContainer);
        } 
        // --- MATRIX MATCH ---
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
        } 
        // --- SINGLE OR MULTI CORRECT ---
        else {
            // Note: In OMR, Single and Multi look identical (A,B,C,D). 
            // The difference is just how the student fills them.
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
    bubble.addEventListener('click', function() { 
        this.classList.toggle('filled'); 
    });
    return bubble;
}

function resetSheet() {
    if(confirm("Clear everything?")) {
        document.getElementById('omrGrid').innerHTML = '';
        questionCounter = 1;
    }
}
