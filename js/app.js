const sidebarContent = document.getElementById('sidebarContent');

// --- Sidebar Content ---
const sidebarNarratives = {
    'national': `
        <p class="mb-3">This is the highest level of the budget. Here, you are deciding the top-level funding for each major government department. The total amount available is determined by the tax rates you set on the 'National Income' page.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Set Percentages:</strong> Use the input fields to directly allocate funds to each department.</li>
            <li><strong>Drill Down:</strong> Click a pie chart slice (e.g., 'Healthcare') to manage that department's internal budget.</li>
            <li><strong>Adopt Proposal:</strong> Click to accept the government's proposed budget for this national level.</li>
            <li><strong>Leave Discretionary Funds:</strong> Any unallocated percentage will be left to the discretion of the Prime Minister's office.</li>
        </ul>
        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h5 class="font-bold text-yellow-800">Follow the Story</h5>
            <p class="text-sm text-yellow-700">This demo contains two key examples. To see them, click on either <strong>'Healthcare'</strong> or <strong>'Education'</strong> and follow the instructions in this box.</p>
        </div>
    `,
    'health': `
        <p class="mb-3">You are now managing the budget for <strong>Healthcare</strong>. The justification for the proposed budget is shown on the main page.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Set Allocations:</strong> Use the inputs to divide the Healthcare budget.</li>
            <li><strong>Adopt Proposal:</strong> Click to accept the Health Secretary's proposal for this level.</li>
            <li><strong>Drill Down:</strong> Click a pie slice to go deeper.</li>
            <li><strong>Go Back:</strong> Click the 'Back' button to return to the National level.</li>
        </ul>
        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h5 class="font-bold text-yellow-800">Story Guide &rarr; The Mismanaged Hospital</h5>
            <p class="text-sm text-yellow-700">To continue, click on the <strong>'NHS England Operations'</strong> slice in the pie chart.</p>
        </div>
    `,
    'nhs_england': `
        <p class="mb-3">You are looking at the core operations budget for <strong>NHS England</strong>.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Set Allocations:</strong> Divide the budget between Hospitals, GPs, Mental Health, etc.</li>
            <li><strong>Adopt Proposal:</strong> Accept the NHS Executive's proposal for this level.</li>
            <li><strong>Drill Down:</strong> Click a pie slice to continue.</li>
            <li><strong>Go Back:</strong> Click 'Back' to return to the main Healthcare budget.</li>
        </ul>
        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h5 class="font-bold text-yellow-800">Story Guide &rarr; The Mismanaged Hospital</h5>
            <p class="text-sm text-yellow-700">Next, click on the <strong>'Hospitals & Acute Care'</strong> slice.</p>
        </div>
    `,
    'acute_care': `
        <p class="mb-3">You are managing the <strong>Hospitals & Acute Care</strong> budget, which covers all hospital trusts.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Set Allocations:</strong> Divide the budget between different hospital trusts.</li>
            <li><strong>Adopt Proposal:</strong> Accept the Acute Care Directorate's proposal.</li>
            <li><strong>Drill Down:</strong> Click a pie slice to see a specific hospital's budget.</li>
            <li><strong>Go Back:</strong> Click 'Back' to return to the NHS England budget.</li>
        </ul>
        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h5 class="font-bold text-yellow-800">Story Guide &rarr; The Mismanaged Hospital</h5>
            <p class="text-sm text-yellow-700">You're almost there! Click on the <strong>'BadExample Hospital Trust'</strong> slice to see the problem.</p>
        </div>
    `,
    'bad_hospital': `
        <h4 class="font-bold mb-2">Story: Exposing Mismanagement</h4>
        <p class="mb-3">You've found <strong>BadExample Hospital Trust</strong>. Notice how 'Last Year's Actual' spending on the main page shows a huge overspend. By looking at the detailed breakdown, you can see that while 'Patient Care' was underfunded, <strong>60%</strong> of the hospital's money was spent on 'Executive Logistics & Travel' for things like private jets.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Correct the budget:</strong> Use the inputs to fully fund 'Patient Care' and cut the 'Executive Logistics' budget.</li>
            <li><strong>Read Justifications:</strong> Hover over the names on the main page to read the managers' excuses.</li>
            <li><strong>Go Back:</strong> Click 'Back' to return to the Acute Care budget.</li>
        </ul>
    `,
    'education': `
        <p class="mb-3">You are now managing the budget for <strong>Education</strong>.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Set Allocations:</strong> Divide the Education budget between Schools, Higher Education, etc.</li>
            <li><strong>Adopt Proposal:</strong> Click to accept the Education Secretary's proposal for this level.</li>
            <li><strong>Drill Down:</strong> Click a pie slice to go deeper.</li>
            <li><strong>Go Back:</strong> Click 'Back' to return to the National level.</li>
        </ul>
        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h5 class="font-bold text-yellow-800">Story Guide &rarr; The School in Need</h5>
            <p class="text-sm text-yellow-700">To continue, click on the <strong>'Schools (5-18)'</strong> slice in the pie chart.</p>
        </div>
    `,
    'primary_secondary': `
        <p class="mb-3">You are managing the budget for all <strong>Schools (5-18)</strong> in the country.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Set Allocations:</strong> Divide the budget between different school areas.</li>
            <li><strong>Adopt Proposal:</strong> Accept the Schools Funding Agency's proposal.</li>
            <li><strong>Drill Down:</strong> Click a pie slice to see a specific area's school budget.</li>
            <li><strong>Go Back:</strong> Click 'Back' to return to the main Education budget.</li>
        </ul>
        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h5 class="font-bold text-yellow-800">Story Guide &rarr; The School in Need</h5>
            <p class="text-sm text-yellow-700">Next, click on the <strong>'Exampletown Area Schools'</strong> slice.</p>
        </div>
    `,
    'exampletown_schools': `
        <p class="mb-3">You are managing the budget for all schools in the <strong>Exampletown Area</strong>.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Set Allocations:</strong> Divide the budget between the schools in this area.</li>
            <li><strong>Adopt Proposal:</strong> Accept the local Education Board's proposal.</li>
            <li><strong>Drill Down:</strong> Click a pie slice to see a specific school's budget.</li>
            <li><strong>Go Back:</strong> Click 'Back' to return to the main Schools budget.</li>
        </ul>
        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <h5 class="font-bold text-yellow-800">Story Guide &rarr; The School in Need</h5>
            <p class="text-sm text-yellow-700">You're almost there! Click on the <strong>'St. Unknown School'</strong> slice to see the problem.</p>
        </div>
    `,
    'st_unknown': `
        <h4 class="font-bold mb-2">Story: A Desperate Choice</h4>
        <p class="mb-3">You are looking at <strong>St. Unknown School</strong>, which faces a crisis. The head teacher's justification explains the school's roof is unsafe and requires a huge portion of the budget. This forces a drastic cut to the 'Supplies & Resources' budget, leaving no money for textbooks.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Face the Dilemma:</strong> Allocate the funds. Do you fix the roof or buy textbooks?</li>
            <li><strong>Read the Warnings:</strong> Note the red warning text that appears if you underfund an area.</li>
            <li><strong>Rethink Higher Levels:</strong> This dilemma might make you go back to the 'National' level and increase the overall 'Education' budget.</li>
        </ul>
    `,
    'default': `
        <p class="mb-3">You are now managing the budget for <strong>{{NODE_NAME}}</strong>. The justification for the proposed budget is shown on the main page, provided by the person or body responsible for this area.</p>
        <h4 class="font-bold mt-4 mb-2">Your Actions:</h4>
        <ul class="list-disc list-inside space-y-1">
            <li><strong>Set Allocations:</strong> Use the inputs to divide this area's budget among its sub-categories.</li>
            <li><strong>Adopt Proposal:</strong> Click to accept the proposal for this level.</li>
            <li><strong>Leave Discretionary Funds:</strong> You can leave a portion unallocated for the manager of this level to use.</li>
            <li><strong>Drill Down:</strong> Click a pie slice to go deeper, if possible.</li>
            <li><strong>Go Back:</strong> Click the 'Back' button to return to the previous level.</li>
        </ul>
    `
};

function updateSidebarContent() {
    if (!sidebarContent) return;

    let narrative = sidebarNarratives.default;
    if (sidebarNarratives[currentOutgoingNode.id]) {
        narrative = sidebarNarratives[currentOutgoingNode.id];
    }
    
    narrative = narrative.replace('{{NODE_NAME}}', currentOutgoingNode.name);

    sidebarContent.innerHTML = narrative;
}

function toggleSidebar(isOpen) {
    if (!infoSidebar || !sidebarOverlay) return;
    if (isOpen) {
        infoSidebar.classList.remove('translate-x-full');
        sidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
        sidebarOverlay.classList.add('opacity-50');
    } else {
        infoSidebar.classList.add('translate-x-full');
        sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
        sidebarOverlay.classList.remove('opacity-50');
    }
}

// --- Chart Instances ---
let userAllocationChartInstance = null;
let proposalChartInstance = null;
let lastYearChartInstance = null;
let userComparisonChartInstance = null;
let averageComparisonChartInstance = null;

// --- State Variables ---
let currentIncomeNode = incomeData;
let incomeNavStack = [incomeData];
let currentOutgoingNode = outgoingsData;
let spendingNavStack = [outgoingsData];

// --- DOM Elements ---
const userAllocationChartCanvas = document.getElementById('outgoingsChart')?.getContext('2d');
const proposalChartCanvas = document.getElementById('proposalChart')?.getContext('2d');
const lastYearChartCanvas = document.getElementById('lastYearChart')?.getContext('2d');

const incomeInputsContainer = document.getElementById('incomeInputs');
const outgoingsInputsContainer = document.getElementById('outgoingsInputs');
const justificationElement = document.getElementById('currentJustification');
const responsibleEntityElement = document.getElementById('responsibleEntity');
const breadcrumbElement = document.getElementById('breadcrumb');
const backButton = document.getElementById('backButton');
const infoButton = document.getElementById('infoButton');
const closeSidebarButton = document.getElementById('closeSidebar');
const infoSidebar = document.getElementById('infoSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const assignButton = document.getElementById('assignButton');
const compareButton = document.getElementById('compareButton');
const comparisonSection = document.getElementById('comparisonSection');
const userComparisonCanvas = document.getElementById('userComparisonChart')?.getContext('2d');
const averageComparisonCanvas = document.getElementById('averageComparisonChart')?.getContext('2d');

const totalAllocatedBar = document.getElementById('totalAllocatedBar');
const outgoingsTotalWarning = document.getElementById('outgoingsTotalWarning');

const userRevenueTotalElement = document.getElementById('userRevenueTotal');
const proposalRevenueTotalElement = document.getElementById('proposalRevenueTotal');
const lastYearRevenueTotalElement = document.getElementById('lastYearRevenueTotal');
const totalBudgetAllocationElement = document.getElementById('totalBudgetAllocation');

const incomeAdoptProposalButton = document.querySelector('#incomeSection #adoptProposal');
const incomeResetAllocationButton = document.querySelector('#incomeSection #resetAllocation');
const incomeAssignButton = document.querySelector('#incomeSection #assignButton');

const spendingAdoptProposalButton = document.querySelector('#outgoingsSection #adoptProposal');
const spendingResetAllocationButton = document.querySelector('#outgoingsSection #resetAllocation');
const spendingAssignButton = document.querySelector('#outgoingsSection #assignButton');
const spendingCompareButton = document.querySelector('#outgoingsSection #compareButton');


// --- Chart Configuration ---
const baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 15, padding: 15, font: { size: 11 } } },
        tooltip: {
            callbacks: {
                label: (c) => {
                    const total = c.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = total > 0 ? (c.parsed / total) * 100 : 0;
                    return `${c.label}: ${percentage.toFixed(1)}%`;
                }
            }
        }
    }
};
const userChartOptions = { ...baseChartOptions, onClick: handleSpendingChartClick };
const staticChartOptions = { ...baseChartOptions, onClick: null };


// --- Functions ---

function generateColors(count) {
    const colors = [];
    const baseHues = [210, 150, 30, 300, 60, 270, 0, 180];
    for (let i = 0; i < count; i++) {
        const hue = baseHues[i % baseHues.length];
        colors.push(`hsl(${hue}, ${70 + Math.random() * 10}%, ${55 + Math.random() * 10}%)`);
    }
    return colors;
}

function createSpendingInputFields(container, dataNode) {
    if (!container) return;
    container.innerHTML = '';
    const children = dataNode.children || [];
    children.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between space-x-2 p-1 hover:bg-gray-50 rounded';
        const responsible = item.responsibleBody || item.responsiblePerson || 'N/A';
        div.innerHTML = `
            <label for="${item.id}_input" class="text-gray-700 flex-1 cursor-help" data-tooltip="${responsible}: ${item.justification}">${item.name}</label>
            <input type="number" id="${item.id}_input" value="${item.userAllocation.toFixed(1)}" min="0" max="100" step="0.1" data-index="${index}" class="allocation-input border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500">
            <span class="text-gray-500">%</span>
            <span id="${item.id}_warning" class="text-xs ml-1 w-24 text-right"></span>
        `;
        container.appendChild(div);

        div.querySelector('input').addEventListener('change', (e) => {
            let newValue = parseFloat(e.target.value);
            if (isNaN(newValue) || newValue < 0) newValue = 0;
            if (newValue > 100) newValue = 100;
            item.userAllocation = newValue;
            e.target.value = newValue.toFixed(1);
            updateAllOutgoingCharts(dataNode);
        });
    });
    updateSpendingTotalDisplay(dataNode);
    if (dataNode.id === 'national') updateTotalAllocatedBar();
}

function createIncomeInputFields(container, dataNode) {
    if (!container) return;
    container.innerHTML = '';
    const children = dataNode.children || [];
    children.forEach((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const div = document.createElement('div');
        div.className = 'p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition';

        if (hasChildren) {
            const revenue = calculateTotalRevenue(item, 'userRate');
            div.innerHTML = `
                <div class="flex justify-between items-center cursor-pointer" data-id="${item.id}">
                    <h4 class="text-lg font-semibold text-blue-700">${item.name}</h4>
                    <span class="text-lg font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">£${revenue.toFixed(2)}bn</span>
                </div>
                <p class="text-xs text-gray-600 mt-1">${item.justification}</p>
            `;
            div.addEventListener('click', () => handleIncomeDrillDown(item));
        } else {
            const maxRate = Math.max(item.lastYearRate, item.proposedRate, item.userRate, 30) * 1.2;
            const individualRevenue = item.baseValue * (item.userRate / 100);
            div.innerHTML = `
                <div>
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-semibold text-gray-800">${item.name}</h4>
                            <p class="text-xs text-gray-600" data-tooltip="${item.justification}">${item.responsibleBody}: ${item.justification}</p>
                        </div>
                        <div class="text-right flex-shrink-0 ml-4">
                             <input type="number" value="${item.userRate.toFixed(1)}" min="0" max="100" step="0.1" class="allocation-input border border-gray-300 rounded px-2 py-1 text-right w-24 focus:outline-none focus:ring-1 focus:ring-blue-500" data-id="${item.id}">
                             <p class="text-sm font-mono text-green-700" id="revenue_${item.id}">£${individualRevenue.toFixed(2)}bn</p>
                        </div>
                    </div>
                    <div class="relative mt-4 mb-2 h-6">
                        <input type="range" min="0" max="${maxRate}" value="${item.userRate}" step="0.1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" data-id="${item.id}">
                        <div class="absolute top-1/2 left-0 w-full h-0">
                            <div class="absolute h-4 w-1 bg-red-500 rounded-full transform -translate-x-1/2" 
                                 style="left: ${(item.lastYearRate / maxRate) * 100}%; bottom: 2px;" 
                                 data-tooltip="Last Year: ${item.lastYearRate}%">
                            </div>
                            <div class="absolute h-4 w-1 bg-yellow-500 rounded-full transform -translate-x-1/2" 
                                 style="left: ${(item.proposedRate / maxRate) * 100}%; top: 2px;" 
                                 data-tooltip="Proposal: ${item.proposedRate}%">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            const numInput = div.querySelector('input[type="number"]');
            const rangeInput = div.querySelector('input[type="range"]');
            numInput.addEventListener('change', (e) => handleRateChange(e, item));
            rangeInput.addEventListener('input', (e) => handleRateChange(e, item));
        }
        container.appendChild(div);
    });
}

function handleRateChange(event, item) {
    const container = event.target.closest('.p-3');
    if (!container) return;

    const numInput = container.querySelector('input[type="number"]');
    const rangeInput = container.querySelector('input[type="range"]');
    const revenueElement = container.querySelector(`#revenue_${item.id}`);

    let newValue = parseFloat(event.target.value);
    if (isNaN(newValue) || newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;
    
    item.userRate = newValue;
    
    // Sync both inputs
    numInput.value = newValue.toFixed(1);
    rangeInput.value = newValue;
    
    // Update individual revenue display
    if (revenueElement) {
        const revenue = item.baseValue * (item.userRate / 100);
        revenueElement.textContent = `£${revenue.toFixed(2)}bn`;
    }

    // Update total revenue display
    updateAllIncomeCalculations();
}

function handleIncomeDrillDown(node) {
    incomeNavStack.push(node);
    currentIncomeNode = node;
    updateIncomePage();
}

function updateSpendingTotalDisplay(dataNode) {
    if (!outgoingsTotalWarning) return;
    const currentTotal = (dataNode.children || []).reduce((sum, item) => sum + item.userAllocation, 0);
    const remainder = 100 - currentTotal;

    if (Math.abs(remainder) < 0.01) {
        outgoingsTotalWarning.classList.add('hidden');
    } else if (remainder > 0) {
        outgoingsTotalWarning.classList.remove('hidden');
        outgoingsTotalWarning.classList.remove('text-red-600');
        outgoingsTotalWarning.classList.add('text-gray-600');
        outgoingsTotalWarning.textContent = `${remainder.toFixed(1)}% is Unallocated (Discretionary)`;
    } else {
        outgoingsTotalWarning.classList.remove('hidden');
        outgoingsTotalWarning.classList.remove('text-gray-600');
        outgoingsTotalWarning.classList.add('text-red-600');
        outgoingsTotalWarning.textContent = `Total is ${currentTotal.toFixed(1)}% - Must not exceed 100%`;
    }
}

function updateTotalAllocatedBar() {
    if (!totalAllocatedBar) return;
    const topLevelTotal = outgoingsData.children.reduce((sum, item) => sum + item.userAllocation, 0);
    const percentage = Math.min(100, Math.max(0, topLevelTotal));
    totalAllocatedBar.style.width = `${percentage}%`;
    totalAllocatedBar.textContent = `${percentage.toFixed(0)}%`;
    totalAllocatedBar.classList.toggle('bg-green-500', Math.abs(percentage - 100.0) < 0.01);
    totalAllocatedBar.classList.toggle('bg-blue-500', Math.abs(percentage - 100.0) >= 0.01);
}

function updateChartWarnings(chartInstance, dataNode) {
    const children = dataNode.children || [];
    chartInstance.data.datasets[0].borderColor = chartInstance.data.datasets[0].backgroundColor.map((color, index) => {
        if (index >= children.length) return color; // Handle unallocated slice
        const item = children[index];
        const warningElement = document.getElementById(`${item.id}_warning`);
        if (!warningElement) return color;
        warningElement.textContent = '';
        warningElement.classList.remove('warning-text');
        if (item.warningThreshold && item.userAllocation < (item.lastYearAllocation * item.warningThreshold)) {
            warningElement.textContent = `(Warn: < ${item.warningThreshold * 100}%)`;
            warningElement.classList.add('warning-text');
            return '#dc2626';
        }
        return color;
    });
    chartInstance.data.datasets[0].borderWidth = chartInstance.data.datasets[0].borderColor.map(c => (c === '#dc2626' ? 3 : 1));
}

function updateChart(chartInstance, labels, data, colors) {
    if (!chartInstance) return;
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0] = { data, backgroundColor: colors };
    chartInstance.update();
}

function updateAllOutgoingCharts(dataNode) {
    const responsible = dataNode.responsibleBody || dataNode.responsiblePerson || 'N/A';
    if (justificationElement) justificationElement.textContent = `${responsible}: ${dataNode.justification || 'No justification provided.'}`;
    if (breadcrumbElement) breadcrumbElement.textContent = `Current Level: ${spendingNavStack.map(n => n.name).join(' > ')}`;
    if (backButton) backButton.classList.toggle('hidden', spendingNavStack.length <= 1);

    const children = dataNode.children || [];
    const userAllocations = children.map(item => item.userAllocation);
    const proposalAllocations = children.map(item => item.proposedAllocation);
    const lastYearAllocations = children.map(item => item.lastYearActualSpending);
    const labels = children.map(item => item.name);
    const colors = generateColors(children.length + 1); // +1 for unallocated

    const totalUserAllocation = userAllocations.reduce((a, b) => a + b, 0);
    if (totalUserAllocation < 100) {
        labels.push('Unallocated');
        userAllocations.push(100 - totalUserAllocation);
    }

    updateChart(userAllocationChartInstance, labels, userAllocations, colors);
    updateChart(proposalChartInstance, dataNode.children.map(c => c.name), proposalAllocations, colors);
    updateChart(lastYearChartInstance, dataNode.children.map(c => c.name), lastYearAllocations, colors);

    updateChartWarnings(userAllocationChartInstance, dataNode);
    userAllocationChartInstance.update();
    createSpendingInputFields(outgoingsInputsContainer, dataNode);
    updateSidebarContent();
}

function calculateTotalRevenue(node, rateKey) {
    let total = 0;
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            total += calculateTotalRevenue(child, rateKey);
        });
    } else if (node.baseValue) {
        total += node.baseValue * (node[rateKey] / 100);
    }
    return total;
}

function updateAllIncomeCalculations() {
    if (userRevenueTotalElement) userRevenueTotalElement.textContent = `£${calculateTotalRevenue(incomeData, 'userRate').toFixed(2)} Billion`;
    if (proposalRevenueTotalElement) proposalRevenueTotalElement.textContent = `£${calculateTotalRevenue(incomeData, 'proposedRate').toFixed(2)} Billion`;
    if (lastYearRevenueTotalElement) lastYearRevenueTotalElement.textContent = `£${calculateTotalRevenue(incomeData, 'lastYearRate').toFixed(2)} Billion`;
}

function updateIncomePage() {
    const responsible = currentIncomeNode.responsibleBody || currentIncomeNode.responsiblePerson || 'N/A';
    if (justificationElement) justificationElement.textContent = `${currentIncomeNode.justification || 'No justification provided.'}`;
    if (responsibleEntityElement) responsibleEntityElement.textContent = responsible;
    if (breadcrumbElement) breadcrumbElement.textContent = `Current Level: ${incomeNavStack.map(n => n.name).join(' > ')}`;
    if (backButton) backButton.classList.toggle('hidden', incomeNavStack.length <= 1);

    createIncomeInputFields(incomeInputsContainer, currentIncomeNode);
    updateAllIncomeCalculations();
}

function handleSpendingChartClick(event, elements) {
    if (elements.length > 0 && event.chart === userAllocationChartInstance) {
        const clickedNode = currentOutgoingNode.children[elements[0].index];
        if (clickedNode && clickedNode.children && clickedNode.children.length > 0) {
            spendingNavStack.push(clickedNode);
            currentOutgoingNode = clickedNode;
            updateAllOutgoingCharts(currentOutgoingNode);
        }
    }
}

// --- Event Listeners ---
function setupEventListeners() {
    if (backButton) {
        backButton.addEventListener('click', () => {
            if (document.getElementById('incomeSection')) {
                if (incomeNavStack.length > 1) {
                    incomeNavStack.pop();
                    currentIncomeNode = incomeNavStack[incomeNavStack.length - 1];
                    updateIncomePage();
                }
            } else {
                if (spendingNavStack.length > 1) {
                    spendingNavStack.pop();
                    currentOutgoingNode = spendingNavStack[spendingNavStack.length - 1];
                    updateAllOutgoingCharts(currentOutgoingNode);
                }
            }
        });
    }

    if (spendingAdoptProposalButton) {
        spendingAdoptProposalButton.addEventListener('click', () => {
            currentOutgoingNode.children.forEach(child => { child.userAllocation = child.proposedAllocation; });
            updateAllOutgoingCharts(currentOutgoingNode);
        });
    }
    if (spendingResetAllocationButton) {
        spendingResetAllocationButton.addEventListener('click', () => {
            currentOutgoingNode.children.forEach(child => { child.userAllocation = child.lastYearAllocation; });
            updateAllOutgoingCharts(currentOutgoingNode);
        });
    }
    if (spendingAssignButton) {
        spendingAssignButton.addEventListener('click', () => {
            const total = (outgoingsData.children || []).reduce((sum, item) => sum + item.userAllocation, 0);
            if (total > 100.01) {
                 alert("Please ensure total spending does not exceed 100% before assigning.");
            } else {
                alert("Spending Budget Assigned (Simulation)!\nYour proposed allocations have been recorded.");
                if (compareButton) compareButton.click();
            }
        });
    }

    if (incomeAdoptProposalButton) {
        const adopt = (node) => {
            if (node.children && node.children.length > 0) node.children.forEach(adopt);
            else if (node.hasOwnProperty('userRate')) node.userRate = node.proposedRate;
        };
        incomeAdoptProposalButton.addEventListener('click', () => {
            adopt(currentIncomeNode);
            updateIncomePage();
        });
    }
    if (incomeResetAllocationButton) {
        const reset = (node) => {
            if (node.children && node.children.length > 0) node.children.forEach(reset);
            else if (node.hasOwnProperty('userRate')) node.userRate = node.lastYearRate;
        };
        incomeResetAllocationButton.addEventListener('click', () => {
            reset(currentIncomeNode);
            updateIncomePage();
        });
    }
    if (incomeAssignButton) {
        incomeAssignButton.addEventListener('click', () => {
            const totalRevenue = calculateTotalRevenue(incomeData, 'userRate');
            localStorage.setItem('nationalBudget', totalRevenue.toFixed(2));
            alert(`Income Plan Submitted!\n\nTotal Estimated Revenue: £${totalRevenue.toFixed(2)} Billion.\nThis will now be your budget on the spending page.`);
        });
    }

    if (infoButton) infoButton.addEventListener('click', () => toggleSidebar(true));
    if (closeSidebarButton) closeSidebarButton.addEventListener('click', () => toggleSidebar(false));
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (document.getElementById('outgoingsSection')) {
            const budget = localStorage.getItem('nationalBudget') || '459.50'; // Default if not set
            if (totalBudgetAllocationElement) totalBudgetAllocationElement.textContent = `£${budget} Billion`;

            userAllocationChartInstance = new Chart(userAllocationChartCanvas, { type: 'pie', data: {}, options: userChartOptions });
            proposalChartInstance = new Chart(proposalChartCanvas, { type: 'pie', data: {}, options: staticChartOptions });
            lastYearChartInstance = new Chart(lastYearChartCanvas, { type: 'pie', data: {}, options: staticChartOptions });
            updateAllOutgoingCharts(currentOutgoingNode);
        }

        if (document.getElementById('incomeSection')) {
            updateIncomePage();
        }

        setupEventListeners();
        console.log("Pages initialized successfully.");
    } catch (error) {
        console.error("Error initializing pages:", error);
        const errorMsg = '<p class="text-red-600 font-semibold">Error loading dynamic content. Please check the data file and console.</p>';
        if (outgoingsInputsContainer) outgoingsInputsContainer.innerHTML = errorMsg;
        if (incomeInputsContainer) incomeInputsContainer.innerHTML = errorMsg;
    }
});