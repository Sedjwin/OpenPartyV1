// --- Chart Instances ---
let incomeChartInstance = null;
let incomeProposalChartInstance = null;
let incomeLastYearChartInstance = null;
let userAllocationChartInstance = null;
let proposalChartInstance = null;
let lastYearChartInstance = null;
let userComparisonChartInstance = null;
let averageComparisonChartInstance = null;

// --- State Variables ---
let currentOutgoingNode = outgoingsData;
let navigationStack = [outgoingsData];

// --- DOM Elements ---
// Note: Some elements will only exist on one page.
const incomeChartCanvas = document.getElementById('incomeChart')?.getContext('2d');
const incomeProposalChartCanvas = document.getElementById('incomeProposalChart')?.getContext('2d');
const incomeLastYearChartCanvas = document.getElementById('incomeLastYearChart')?.getContext('2d');
const userAllocationChartCanvas = document.getElementById('outgoingsChart')?.getContext('2d');
const proposalChartCanvas = document.getElementById('proposalChart')?.getContext('2d');
const lastYearChartCanvas = document.getElementById('lastYearChart')?.getContext('2d');

const incomeInputsContainer = document.getElementById('incomeInputs');
const outgoingsInputsContainer = document.getElementById('outgoingsInputs');
const justificationElement = document.getElementById('currentJustification');
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
const incomeTotalWarning = document.getElementById('incomeTotalWarning');
const outgoingsTotalWarning = document.getElementById('outgoingsTotalWarning');

const userRevenueTotalElement = document.getElementById('userRevenueTotal');
const proposalRevenueTotalElement = document.getElementById('proposalRevenueTotal');
const lastYearRevenueTotalElement = document.getElementById('lastYearRevenueTotal');

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
        tooltip: { callbacks: { label: (c) => `${c.label}: ${c.parsed.toFixed(1)}%` } }
    }
};
const userChartOptions = { ...baseChartOptions, onClick: handleChartClick };
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
    dataNode.children.forEach((item, index) => {
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

            userAllocationChartInstance.data.datasets[0].data[index] = newValue;
            updateChartWarnings(userAllocationChartInstance, dataNode);
            userAllocationChartInstance.update();
            validateTotal(dataNode.children, outgoingsTotalWarning, 'userAllocation');
            if (dataNode.id === 'national') updateTotalAllocatedBar();
        });
    });
    validateTotal(dataNode.children, outgoingsTotalWarning, 'userAllocation');
    if (dataNode.id === 'national') updateTotalAllocatedBar();
}

function createIncomeInputFields(container, dataNode) {
    if (!container) return;
    container.innerHTML = '';
    dataNode.children.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between space-x-2 p-1 hover:bg-gray-50 rounded';
        div.innerHTML = `
            <label for="${item.id}_input" class="text-gray-700 flex-1 cursor-help" data-tooltip="${item.justification}">${item.name}</label>
            <input type="number" id="${item.id}_input" value="${item.userAllocation.toFixed(1)}" min="0" max="100" step="0.1" data-index="${index}" class="allocation-input border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500">
            <span class="text-gray-500">%</span>
        `;
        container.appendChild(div);

        div.querySelector('input').addEventListener('change', (e) => {
            let newValue = parseFloat(e.target.value);
            if (isNaN(newValue) || newValue < 0) newValue = 0;
            if (newValue > 100) newValue = 100;
            item.userAllocation = newValue;
            e.target.value = newValue.toFixed(1);

            // Update the user's chart and totals efficiently
            incomeChartInstance.data.datasets[0].data[index] = newValue;
            incomeChartInstance.update();
            updateIncomeTotals(dataNode);
        });
    });
}

function validateTotal(items, warningElement, key) {
    if (!warningElement) return;
    const currentTotal = items.reduce((sum, item) => sum + item[key], 0);
    warningElement.classList.toggle('hidden', Math.abs(currentTotal - 100.0) < 0.01);
    warningElement.textContent = `Total is ${currentTotal.toFixed(1)}% - Must be 100%`;
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
    chartInstance.data.datasets[0].borderColor = chartInstance.data.datasets[0].backgroundColor.map((color, index) => {
        const item = dataNode.children[index];
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

function updateChart(chartInstance, dataNode, dataKey) {
    if (!chartInstance || !dataNode || !dataNode.children) return;
    chartInstance.data.labels = dataNode.children.map(item => item.name);
    chartInstance.data.datasets[0] = {
        data: dataNode.children.map(item => item[dataKey]),
        backgroundColor: generateColors(dataNode.children.length),
    };
    chartInstance.update();
}

function updateAllOutgoingCharts(dataNode) {
    const responsible = dataNode.responsibleBody || dataNode.responsiblePerson || 'N/A';
    if (justificationElement) justificationElement.textContent = `${responsible}: ${dataNode.justification || 'No justification provided.'}`;
    if (breadcrumbElement) breadcrumbElement.textContent = `Current Level: ${navigationStack.map(n => n.name).join(' > ')}`;
    if (backButton) backButton.classList.toggle('hidden', navigationStack.length <= 1);

    updateChart(userAllocationChartInstance, dataNode, 'userAllocation');
    updateChart(proposalChartInstance, dataNode, 'proposedAllocation');
    updateChart(lastYearChartInstance, dataNode, 'lastYearActualSpending');
    updateChartWarnings(userAllocationChartInstance, dataNode);
    userAllocationChartInstance.update();
    createSpendingInputFields(outgoingsInputsContainer, dataNode);
}

function updateIncomeTotals(dataNode) {
    // Update total revenue displays
    const calculateTotalRevenue = (items, key) => {
        const totalPercentage = items.reduce((sum, item) => sum + item[key], 0);
        return (incomeData.totalRevenue.base * (totalPercentage / 100)).toFixed(2);
    };

    if (userRevenueTotalElement) userRevenueTotalElement.textContent = `£${calculateTotalRevenue(dataNode.children, 'userAllocation')} Billion`;
    if (proposalRevenueTotalElement) proposalRevenueTotalElement.textContent = `£${calculateTotalRevenue(dataNode.children, 'proposedAllocation')} Billion`;
    if (lastYearRevenueTotalElement) lastYearRevenueTotalElement.textContent = `£${incomeData.totalRevenue.lastYearActual} Billion`;

    validateTotal(dataNode.children, incomeTotalWarning, 'userAllocation');
}

function updateAllIncomeCharts(dataNode) {
    const responsible = dataNode.responsibleBody || dataNode.responsiblePerson || 'N/A';
    if (justificationElement) justificationElement.textContent = `${responsible}: ${dataNode.justification || 'No justification provided.'}`;

    updateChart(incomeChartInstance, dataNode, 'userAllocation');
    updateChart(incomeProposalChartInstance, dataNode, 'proposedAllocation');
    updateChart(incomeLastYearChartInstance, dataNode, 'lastYearActuals');

    updateIncomeTotals(dataNode);

    createIncomeInputFields(incomeInputsContainer, dataNode);
}

function handleChartClick(event, elements) {
    if (elements.length > 0 && event.chart === userAllocationChartInstance) {
        const clickedNode = currentOutgoingNode.children[elements[0].index];
        if (clickedNode && clickedNode.children && clickedNode.children.length > 0) {
            navigationStack.push(clickedNode);
            currentOutgoingNode = clickedNode;
            updateAllOutgoingCharts(currentOutgoingNode);
        }
    }
}

// --- Event Listeners ---
if (backButton) {
    backButton.addEventListener('click', () => {
        if (navigationStack.length > 1) {
            navigationStack.pop();
            currentOutgoingNode = navigationStack[navigationStack.length - 1];
            updateAllOutgoingCharts(currentOutgoingNode);
        }
    });
}

// Spending Page Buttons
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
        const outgoingsValid = validateTotal(outgoingsData.children, outgoingsTotalWarning, 'userAllocation');
        if (outgoingsValid) {
            alert("Spending Budget Assigned (Simulation)!\nYour proposed allocations have been recorded.");
            // Optionally trigger comparison view
            if (compareButton) compareButton.click();
        } else {
            alert("Please ensure total spending is 100% before assigning.");
        }
    });
}

if (spendingCompareButton) {
    spendingCompareButton.addEventListener('click', () => {
        if (comparisonSection) comparisonSection.classList.remove('hidden');
        const userTopLevelData = {
            labels: outgoingsData.children.map(item => item.name),
            datasets: [{
                label: 'Your Allocation',
                data: outgoingsData.children.map(item => item.userAllocation),
                backgroundColor: generateColors(outgoingsData.children.length)
            }]
        };
        const averageTopLevelData = {
            labels: publicAverageData.map(item => item.name),
            datasets: [{
                label: 'Public Average',
                data: publicAverageData.map(item => item.value),
                backgroundColor: generateColors(publicAverageData.length)
            }]
        };

        if (userComparisonChartInstance) userComparisonChartInstance.destroy();
        if (averageComparisonChartInstance) averageComparisonChartInstance.destroy();

        if (userComparisonCanvas) userComparisonChartInstance = new Chart(userComparisonCanvas, { type: 'doughnut', data: userTopLevelData, options: baseChartOptions });
        if (averageComparisonCanvas) averageComparisonChartInstance = new Chart(averageComparisonCanvas, { type: 'doughnut', data: averageTopLevelData, options: baseChartOptions });

        if (comparisonSection) comparisonSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Income Page Buttons
if (incomeAdoptProposalButton) {
    incomeAdoptProposalButton.addEventListener('click', () => {
        incomeData.children.forEach(child => { child.userAllocation = child.proposedAllocation; });
        updateAllIncomeCharts(incomeData);
    });
}

if (incomeResetAllocationButton) {
    incomeResetAllocationButton.addEventListener('click', () => {
        incomeData.children.forEach(child => { child.userAllocation = child.lastYearAllocation; });
        updateAllIncomeCharts(incomeData);
    });
}

if (incomeAssignButton) {
    incomeAssignButton.addEventListener('click', () => {
        const incomeValid = validateTotal(incomeData.children, incomeTotalWarning, 'userAllocation');
        if (incomeValid) {
            alert("Income Plan Submitted (Simulation)!\nYour proposed tax allocations have been recorded.");
        } else {
            alert("Please ensure total income percentages are 100% before submitting.");
        }
    });
}


// --- Sidebar Logic ---
if (infoButton) {
    infoButton.addEventListener('click', () => {
        if (infoSidebar) infoSidebar.classList.remove('translate-x-full');
        if (sidebarOverlay) sidebarOverlay.classList.remove('hidden');
    });
}

function closeInfoSidebar() {
    if (infoSidebar) infoSidebar.classList.add('translate-x-full');
    if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
}
if (closeSidebarButton) closeSidebarButton.addEventListener('click', closeInfoSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeInfoSidebar);


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            // Initialize Spending Page Charts
            if (userAllocationChartCanvas) {
                userAllocationChartInstance = new Chart(userAllocationChartCanvas, { type: 'pie', data: {}, options: userChartOptions });
                proposalChartInstance = new Chart(proposalChartCanvas, { type: 'pie', data: {}, options: staticChartOptions });
                lastYearChartInstance = new Chart(lastYearChartCanvas, { type: 'pie', data: {}, options: staticChartOptions });
                updateAllOutgoingCharts(currentOutgoingNode);
            }

            // Initialize Income Page Charts
            if (incomeChartCanvas) {
                incomeChartInstance = new Chart(incomeChartCanvas, { type: 'doughnut', data: {}, options: userChartOptions });
                incomeProposalChartInstance = new Chart(incomeProposalChartCanvas, { type: 'doughnut', data: {}, options: staticChartOptions });
                incomeLastYearChartInstance = new Chart(incomeLastYearChartCanvas, { type: 'doughnut', data: {}, options: staticChartOptions });
                updateAllIncomeCharts(incomeData);
            }

            console.log("Charts initialized successfully.");
        } catch (error) {
            console.error("Error initializing charts:", error);
            // Display error message to user if elements exist
            if (outgoingsInputsContainer) outgoingsInputsContainer.innerHTML = '<p class="text-red-600 font-semibold">Error loading charts. Please check the data file and console.</p>';
            if (incomeInputsContainer) incomeInputsContainer.innerHTML = '<p class="text-red-600 font-semibold">Error loading charts. Please check the data file and console.</p>';
        }
    }, 0);
});