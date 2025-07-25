// --- Data Definitions ---

const incomeData = {
    id: 'national_income',
    name: "National Income Sources",
    responsiblePerson: "The Chancellor of the Exchequer",
    justification: "The UK's revenue is a complex tapestry of different taxes. Below are the main categories. Click into any of them to see the detail and set the specific rates that will build our national budget.",
    children: [
        {
            id: 'individual_taxes',
            name: 'Taxes on Individuals',
            responsibleBody: "HM Treasury - Personal Tax Directorate",
            justification: "These are taxes paid directly by individuals, including what you pay on your earnings, assets, and inheritance. They represent the largest portion of government revenue.",
            children: [
                {
                    id: 'income_tax',
                    name: 'Income Tax',
                    responsibleBody: "Ms. Penny Wages, Head of Personal Taxation",
                    justification: "Income tax is the government's single largest source of funds. We must balance raising revenue with ensuring work pays. My proposal includes a slight rise to fund public services.",
                    children: [
                        { id: 'paye', name: 'Employment Income (PAYE)', baseValue: 1300, lastYearRate: 20, proposedRate: 21, userRate: 20, responsibleBody: "PAYE Operations Unit", justification: "The tax automatically deducted from most employees' paychecks. A 1% change here has a huge impact on revenue." },
                        { id: 'self_employed', name: 'Self-Employed Income', baseValue: 250, lastYearRate: 20, proposedRate: 20, userRate: 20, responsibleBody: "Mr. Ian Voice, Small Business Champion", justification: "We believe the main income tax rate for the self-employed should be held steady to encourage entrepreneurship." },
                        { id: 'pension_income', name: 'Pension Income', baseValue: 150, lastYearRate: 10, proposedRate: 10, userRate: 10, responsibleBody: "Retirement Planning Office", justification: "Tax on income from private pensions. We propose no changes to this sensitive area." },
                        { id: 'savings_income', name: 'Savings Income', baseValue: 80, lastYearRate: 15, proposedRate: 15, userRate: 15, responsibleBody: "Wealth & Savings Unit", justification: "Tax on interest earned from savings. The current rate provides a fair return to the Treasury." },
                        { id: 'dividend_income', name: 'Dividend Income', baseValue: 60, lastYearRate: 8.75, proposedRate: 10, userRate: 8.75, responsibleBody: "Investment Taxation Board", justification: "We propose a small increase in the tax on dividends to bring it more in line with income tax rates." },
                        { id: 'property_income', name: 'Property Income', baseValue: 50, lastYearRate: 20, proposedRate: 20, userRate: 20, responsibleBody: "Landlord & Tenant Revenue Service", justification: "Tax on rental income. We recommend holding this at the basic rate of income tax." }
                    ]
                },
                {
                    id: 'nics',
                    name: 'National Insurance Contributions',
                    responsibleBody: "Ms. Connie Tribution, Director of Social Security",
                    justification: "NICs primarily fund the NHS, state pensions, and other benefits. These are separate from Income Tax and paid by both employees and employers.",
                    children: [
                        { id: 'nic_class1', name: 'Class 1 (Employees)', baseValue: 900, lastYearRate: 12, proposedRate: 12, userRate: 12, responsibleBody: "NIC Operations", justification: "Paid by employees earning above a certain threshold. We propose no change." },
                        { id: 'nic_class4', name: 'Class 4 (Self-Employed)', baseValue: 150, lastYearRate: 9, proposedRate: 9, userRate: 9, responsibleBody: "NIC Operations", justification: "Paid by the self-employed on their profits. We propose no change." }
                    ]
                },
                {
                    id: 'cgt',
                    name: 'Capital Gains Tax',
                    responsibleBody: "Mr. Alistair Setts, Head of Capital Taxation",
                    justification: "A tax on the profit when you sell something that has increased in value. It's about ensuring wealth is taxed, not just income.",
                    children: [
                        { id: 'cgt_property', name: 'Residential Property', baseValue: 40, lastYearRate: 28, proposedRate: 30, userRate: 28, responsibleBody: "Property Gains Unit", justification: "Profit from selling a second home or buy-to-let property is taxed at a higher rate. We propose a small increase." },
                        { id: 'cgt_other', name: 'Other Assets (Shares, etc)', baseValue: 30, lastYearRate: 20, proposedRate: 20, userRate: 20, responsibleBody: "Asset Gains Unit", justification: "Profit from selling other assets like shares. We propose holding the rate steady." }
                    ]
                },
                { id: 'iht', name: 'Inheritance Tax', baseValue: 7, lastYearRate: 40, proposedRate: 40, userRate: 40, responsibleBody: "The Office of Final Accounts", justification: "A tax on the estate of someone who has passed away, above a certain threshold. It is controversial but raises important funds. We propose no change to the headline rate." }
            ]
        },
        {
            id: 'business_taxes',
            name: 'Taxes on Businesses',
            responsibleBody: "HM Treasury - Business & Trade Directorate",
            justification: "Taxes paid by companies and other business entities. These affect the business climate and investment in the UK.",
            children: [
                {
                    id: 'corp_tax',
                    name: 'Corporation Tax',
                    responsibleBody: "Mr. Rich Coffers, Director of Corporate Revenue",
                    justification: "This is the tax on company profits. My department's proposal is to lower the main rate to make the UK the most competitive business environment in Europe.",
                    children: [
                        { id: 'corp_main_rate', name: 'Main Rate', baseValue: 400, lastYearRate: 25, proposedRate: 23, userRate: 25, responsibleBody: "Corporate Revenue Service", justification: "The headline rate of tax on profits for most companies." },
                        { id: 'corp_ring_fence', name: 'Ring Fence (Oil & Gas)', baseValue: 15, lastYearRate: 40, proposedRate: 40, userRate: 40, responsibleBody: "Energy Profits Levy Unit", justification: "A higher rate for oil and gas extraction profits from the UK and North Sea." },
                        { id: 'corp_bank_surcharge', name: 'Bank Surcharge', baseValue: 8, lastYearRate: 3, proposedRate: 3, userRate: 3, responsibleBody: "Financial Services Revenue", justification: "An additional tax on the profits of banks, on top of the main corporation tax rate." }
                    ]
                },
                { id: 'business_rates', name: 'Business Rates (NNDR)', baseValue: 25, lastYearRate: 51, proposedRate: 51, userRate: 51, responsibleBody: "Valuation Office Agency", justification: "A tax on the occupation of non-domestic property. It's complex, but we're treating it as a single rate here for simplicity." }
            ]
        },
        {
            id: 'indirect_taxes',
            name: 'Indirect Taxes',
            responsibleBody: "HM Revenue & Customs",
            justification: "These are taxes on spending, paid by consumers and businesses, often without being listed separately on a receipt. This includes VAT and various duties.",
            children: [
                {
                    id: 'vat',
                    name: 'Value Added Tax (VAT)',
                    responsibleBody: "Ms. Vera A. Tility, Head of VAT Policy",
                    justification: "VAT is applied to a huge range of goods and services. My department's proposal is to hold the standard rate steady, as it's a reliable source of revenue.",
                    children: [
                        { id: 'vat_standard', name: 'Standard Rate', baseValue: 700, lastYearRate: 20, proposedRate: 20, userRate: 20, responsibleBody: "Standard Rate VAT Unit", justification: "The main rate of VAT applied to most goods and services." },
                        { id: 'vat_fish', name: 'The Price of Fish', baseValue: 10, lastYearRate: 20, proposedRate: 20, userRate: 20, responsibleBody: "Mr. Finlay 'Finn' C. Adviser", justification: "Hot takeaway food, like our beloved fish and chips, is subject to the standard rate of VAT. Some say it should be reduced to help the hospitality sector. I say, the nation's demand for cod is inelastic!" },
                        { id: 'vat_reduced', name: 'Reduced Rate', baseValue: 40, lastYearRate: 5, proposedRate: 5, userRate: 5, responsibleBody: "Reduced Rate VAT Unit", justification: "A lower rate of VAT for items like domestic fuel and power, and children's car seats." }
                    ]
                },
                {
                    id: 'excise_duties',
                    name: 'Excise Duties',
                    responsibleBody: "Duty & Tariffs Command",
                    justification: "These are 'sin taxes' or duties on specific goods or activities, designed to discourage certain behaviours as well as raise revenue.",
                    children: [
                        { id: 'fuel_duty', name: 'Fuel Duty', baseValue: 25, lastYearRate: 53, proposedRate: 50, userRate: 53, responsibleBody: "Mr. Miles Per-Gallon", justification: "A per-litre tax on petrol and diesel. My proposal is to cut this to help with the cost of living, but the Treasury warns this will leave a significant hole in the budget." },
                        { id: 'tobacco_duty', name: 'Tobacco Duty', baseValue: 9, lastYearRate: 16.5, proposedRate: 20, userRate: 16.5, responsibleBody: "Mr. Ashworth Coughlan", justification: "A tax on cigarettes and tobacco. My proposal is to hike this significantly every year to make smoking unaffordable and fund smoking cessation programs." },
                        { id: 'alcohol_duty', name: 'Alcohol Duty', baseValue: 12, lastYearRate: 9, proposedRate: 9, userRate: 9, responsibleBody: "Ms. Ginny Tonic", justification: "A tax on beer, wine, and spirits. My proposal is to keep this in line with inflation to ensure it remains a stable source of revenue." },
                        { id: 'gambling_duties', name: 'Gambling Duties', baseValue: 3, lastYearRate: 15, proposedRate: 15, userRate: 15, responsibleBody: "The Betting & Gaming Council", justification: "A tax on the profits of gambling companies. We propose holding this steady." }
                    ]
                },
                { id: 'stamp_duty_shares', name: 'Stamp Duty (Shares)', baseValue: 4, lastYearRate: 0.5, proposedRate: 0.5, userRate: 0.5, responsibleBody: "Securities & Transactions Office", justification: "A small tax on the purchase of shares. It's a small but important source of revenue from the financial markets." }
            ]
        },
        {
            id: 'local_taxes',
            name: 'Local Taxes',
            responsibleBody: "Department for Levelling Up, Housing and Communities",
            justification: "Taxes collected locally to fund local services like bin collection, libraries, and parks.",
            children: [
                { id: 'council_tax', name: 'Council Tax', baseValue: 35, lastYearRate: 5, proposedRate: 5, userRate: 5, responsibleBody: "Cllr. Evelyn Parish", justification: "This is a property tax that funds local services. The 'rate' here represents the average annual percentage increase. My proposal is for a 5% rise to avoid cuts to essential local services." }
            ]
        }
    ]
};


const outgoingsData = {
    id: 'national',
    name: 'National Spending',
    responsibleBody: "The Prime Minister & The Cabinet Office",
    justification: "My proposed budget focuses on tackling healthcare waiting lists and strengthening national security. However, your final allocation will guide my government's priorities for the coming year.",
    children: [
        {
            id: 'health',
            name: 'Healthcare',
            responsibleBody: "Department of Health & Social Care",
            justification: "We propose a significant funding increase to reduce waiting times. Last year, we overspent our allocation due to unforeseen winter pressures, demonstrating the need for a larger budget.",
            lastYearAllocation: 35,
            proposedAllocation: 38,
            lastYearActualSpending: 37,
            userAllocation: 35,
            warningThreshold: 0.9,
            children: [
                {
                    id: 'nhs_england',
                    name: 'NHS England Operations',
                    responsibleBody: "NHS England Executive Board",
                    justification: "The majority of the health budget is allocated here. Our proposal focuses on acute care, but you may wish to reallocate funds to primary or preventative care.",
                    lastYearAllocation: 95,
                    proposedAllocation: 95,
                    lastYearActualSpending: 96,
                    userAllocation: 95,
                    children: [
                        {
                            id: 'acute_care',
                            name: 'Hospitals & Acute Care',
                            responsibleBody: "NHS Acute Care Directorate",
                            justification: "Hospitals are at breaking point. My proposal focuses funding here to ensure A&E can cope. Last year's overspend was necessary to maintain services.",
                            lastYearAllocation: 60,
                            proposedAllocation: 65,
                            lastYearActualSpending: 63,
                            userAllocation: 60,
                            children: [
                                {
                                    id: 'good_hospital',
                                    name: 'GoodExample Hospital Trust',
                                    responsibleBody: "Board of Directors, GoodExample Trust",
                                    justification: "We managed our budget effectively last year, coming in just under allocation while meeting our targets. We propose a similar budget this year.",
                                    lastYearAllocation: 80,
                                    proposedAllocation: 80,
                                    lastYearActualSpending: 79,
                                    userAllocation: 80,
                                    children: []
                                },
                                {
                                    id: 'bad_hospital',
                            name: 'BadExample Hospital Trust',
                            responsibleBody: "Mr. G. Reedy, CEO",
                            justification: "While patient outcomes were suboptimal, it was essential to approve significant expenditure on consultancy and executive transport to facilitate high-level strategic planning and secure future efficiencies.",
                            lastYearAllocation: 20,
                            proposedAllocation: 20,
                            lastYearActualSpending: 45, // Massively overspent
                            userAllocation: 20,
                            children: [
                                {
                                    id: 'bad_hospital_staff',
                                    name: 'Patient Care & Staffing',
                                    responsibleBody: "The Patient Care Committee",
                                    justification: "This is the core funding for our doctors, nurses, and medical supplies on the wards. Last year, our budget was unexpectedly cut mid-year, leading to staff shortages.",
                                    lastYearAllocation: 70,
                                    proposedAllocation: 70,
                                    lastYearActualSpending: 30, // Drastically cut
                                    userAllocation: 70,
                                    children: []
                                },
                                {
                                    id: 'bad_hospital_maint',
                                    name: 'Building Maintenance',
                                    responsibleBody: "Estates Department",
                                    justification: "Funding to keep the hospital safe and operational. We were forced to delay critical repairs last year due to budget reallocation.",
                                    lastYearAllocation: 20,
                                    proposedAllocation: 20,
                                    lastYearActualSpending: 10, // Also cut
                                    userAllocation: 20,
                                    children: []
                                },
                                {
                                    id: 'bad_hospital_admin',
                                    name: 'Executive Logistics & Travel',
                                    responsibleBody: "Ms. Ashley Spendlove, Head of Executive Operations",
                                    justification: "To enhance strategic agility and facilitate vital stakeholder engagement across our national network, we procured dedicated air transport, ensuring senior leadership could attend critical meetings without delay, thereby maximizing operational oversight.",
                                    lastYearAllocation: 10, // The public gave them a small admin budget
                                    proposedAllocation: 10, // They propose the same small budget
                                    lastYearActualSpending: 60, // But actually spent a huge amount
                                    userAllocation: 10,
                                    children: []
                                }
                            ]
                                }
                            ]
                        },
                        {
                            id: 'primary_care',
                            name: 'Primary Care (GPs)',
                            responsibleBody: "GP Commissioning Board",
                            justification: "To fund hospitals, the national proposal reduces GP funding. We argue this is short-sighted. We underspent slightly last year by delaying some IT upgrades.",
                            lastYearAllocation: 25,
                            proposedAllocation: 20,
                            lastYearActualSpending: 24,
                            userAllocation: 25,
                            children: []
                        },
                        {
                            id: 'mental_health',
                            name: 'Mental Health Services',
                            responsibleBody: "National Mental Health Directorate",
                            justification: "We are asking for the same allocation as last year. We underspent due to recruitment challenges, which we have now resolved and are ready to expand services.",
                            lastYearAllocation: 10,
                            proposedAllocation: 10,
                            lastYearActualSpending: 9,
                            userAllocation: 10,
                            warningThreshold: 0.85,
                            children: []
                        },
                        {
                            id: 'dental',
                            name: 'Dentistry',
                            responsibleBody: "NHS Dental Commissioning Board",
                            justification: "Access to NHS dentistry is in crisis. We are proposing a significant increase in our share of the budget to attract more dentists to the NHS.",
                            lastYearAllocation: 5,
                            proposedAllocation: 5,
                            lastYearActualSpending: 4,
                            userAllocation: 5,
                            children: []
                        }
                    ]
                },
                {
                    id: 'health_capital',
                    name: 'Capital Investment',
                    responsibleBody: "DHSC Capital Projects Board",
                    justification: "This funds new hospitals and major equipment like MRI scanners. We underspent last year due to planning delays on a major hospital project.",
                    lastYearAllocation: 5,
                    proposedAllocation: 5,
                    lastYearActualSpending: 4,
                    userAllocation: 5,
                    children: []
                }
            ]
        },
        {
            id: 'education',
            name: 'Education',
            responsibleBody: "Department for Education",
            justification: "Our proposal prioritises core schooling, especially addressing the maintenance backlog exemplified by the St. Unknown case. This means less funding for Higher Education.",
            lastYearAllocation: 20,
            proposedAllocation: 20,
            lastYearActualSpending: 20,
            userAllocation: 20,
            warningThreshold: 0.9,
            children: [
                {
                    id: 'primary_secondary',
                    name: 'Schools (5-18)',
                    responsibleBody: "Schools Funding Agency",
                    justification: "We must address the crumbling school estate. Our proposal shifts funds to capital maintenance. You can see we overspent last year due to emergency repairs.",
                    lastYearAllocation: 65,
                    proposedAllocation: 70,
                    lastYearActualSpending: 68,
                    userAllocation: 65,
                    children: [
                        {
                            id: 'exampletown_schools',
                            name: 'Exampletown Area Schools',
                            responsibleBody: "Education Board, Exampletown Council",
                            justification: "The St. Unknown School roof situation is critical and must be our priority. My proposal gives them the majority of our capital budget this year to avoid closing the school.",
                            lastYearAllocation: 10,
                            proposedAllocation: 15,
                            lastYearActualSpending: 10,
                            userAllocation: 10,
                            children: [
                                {
                                    id: 'st_unknown',
                                    name: 'St. Unknown School',
                                    responsibleBody: "Mrs. Gable, Head Teacher",
                                    justification: "The west wing roof is unsafe. My proposal allocates almost everything to building maintenance. This is not a choice; it's a necessity. It will mean cuts to supplies, but we have no alternative.",
                                    lastYearAllocation: 50,
                                    proposedAllocation: 60,
                                    lastYearActualSpending: 48,
                                    userAllocation: 50,
                                    children: [
                                        { id: 'st_unknown_staff', name: 'Staffing', lastYearAllocation: 70, proposedAllocation: 70, lastYearActualSpending: 70, userAllocation: 70, responsibleBody:"School Governors", justification: "Fixed cost for salaries." },
                                        { id: 'st_unknown_supplies', name: 'Supplies & Resources', lastYearAllocation: 15, proposedAllocation: 5, lastYearActualSpending: 10, userAllocation: 15, warningThreshold: 0.8, responsibleBody:"Mr. Pen, Lead Teacher", justification: "I understand the roof issue, but with this cut, we cannot afford textbooks." },
                                        { id: 'st_unknown_maint', name: 'Building Maintenance', lastYearAllocation: 15, proposedAllocation: 25, lastYearActualSpending: 18, userAllocation: 15, responsibleBody:"Mr. Fixit, School Bursar", justification: "The roof requires this entire allocation. Anything less and the project cannot proceed." },
                                    ]
                                },
                                { id: 'other_exampletown', name: 'Other Exampletown Schools', lastYearAllocation: 50, proposedAllocation: 40, lastYearActualSpending: 52, userAllocation: 50, responsibleBody:"Education Board, Exampletown Council", justification: "Funding for the other 15 schools in our area. They will have to pause non-essential repairs to support St. Unknown's." },
                            ]
                        },
                        { id: 'other_areas_schools', name: 'Schools (Rest of Country)', lastYearAllocation: 90, proposedAllocation: 85, lastYearActualSpending: 90, userAllocation: 90, responsibleBody:"Schools Funding Agency", justification: "Funding for all other local authorities, distributed by the national formula." },
                    ]
                },
                {
                    id: 'higher_ed',
                    name: 'Higher Education',
                    responsibleBody: "Office for Students & UK Research and Innovation",
                    justification: "The government's proposal cuts our funding. We argue this is a false economy that will damage our world-leading universities and long-term economic growth.",
                    lastYearAllocation: 25,
                    proposedAllocation: 20,
                    lastYearActualSpending: 25,
                    userAllocation: 25,
                    children: []
                },
                {
                    id: 'skills_training',
                    name: 'Skills & Apprenticeships',
                    responsibleBody: "Vocational Training Board",
                    justification: "We propose focusing on green energy apprenticeships. We had a surplus last year as a key training partner went into administration, so we can manage with the proposed allocation.",
                    lastYearAllocation: 10,
                    proposedAllocation: 10,
                    lastYearActualSpending: 7,
                    userAllocation: 10,
                    children: []
                },
            ]
        },
        {
            id: 'transport',
            name: 'Transport',
            responsibleBody: "Department for Transport",
            justification: "I propose a cut to transport to fund other areas. Last year, we significantly overspent on Rail due to strike-related disruption and emergency engineering works.",
            lastYearAllocation: 10,
            proposedAllocation: 8,
            lastYearActualSpending: 12,
            userAllocation: 10,
            children: [
                {
                    id: 'rail',
                    name: 'Rail Network',
                    responsibleBody: "National Rail Executive Board",
                    justification: "The network is old and requires significant investment. My proposal increases our share of the transport budget to cover essential upgrades and improve reliability.",
                    lastYearAllocation: 40,
                    proposedAllocation: 50,
                    lastYearActualSpending: 60, // Significant overspend
                    userAllocation: 40,
                    children: []
                },
                {
                    id: 'roads',
                    name: 'Roads & Highways',
                    responsibleBody: "Highways Agency Directorate",
                    justification: "Our road network is vital. We spent our budget effectively last year and I am proposing a similar allocation to continue pothole repairs and motorway maintenance.",
                    lastYearAllocation: 40,
                    proposedAllocation: 35,
                    lastYearActualSpending: 40,
                    userAllocation: 40,
                    children: []
                },
                {
                    id: 'local_transport',
                    name: 'Local & Public Transport',
                    responsibleBody: "Regional Transport Commission",
                    justification: "Buses are the lifeblood of our communities. The government proposal cuts our funding, which will lead to route closures. We are asking for a larger share.",
                    lastYearAllocation: 20,
                    proposedAllocation: 15,
                    lastYearActualSpending: 20,
                    userAllocation: 20,
                    children: []
                }
            ]
        },
        {
            id: 'justice',
            name: 'Justice',
            responsibleBody: "Ministry of Justice",
            justification: "Our prisons are dangerously overcrowded. We are making the case for an increased allocation to build new prisons and recruit more prison officers.",
            lastYearAllocation: 5,
            proposedAllocation: 6,
            lastYearActualSpending: 5,
            userAllocation: 5,
            children: [
                { id: 'prisons', name: 'Prisons & Probation', lastYearAllocation: 60, proposedAllocation: 70, lastYearActualSpending: 60, userAllocation: 60, responsibleBody:"HM Prison Service", justification: "Overcrowding is a critical safety issue. We need this increase to build new capacity." },
                { id: 'courts', name: 'Courts & Tribunals', lastYearAllocation: 30, proposedAllocation: 20, lastYearActualSpending: 30, userAllocation: 30, responsibleBody:"HM Courts Service", justification: "The proposal cuts our funding, which will increase the case backlog and delay justice for victims." },
                { id: 'legal_aid', name: 'Legal Aid', lastYearAllocation: 10, proposedAllocation: 10, lastYearActualSpending: 10, userAllocation: 10, responsibleBody:"Legal Aid Agency", justification: "Ensuring access to justice for all. We are requesting the same budget as last year." },
            ]
        },
        {
            id: 'defence',
            name: 'Defence',
            responsibleBody: "Ministry of Defence",
            justification: "In a more dangerous world, we must invest in our security. I am proposing a significant increase to fund the next generation of naval vessels and support our armed forces.",
            lastYearAllocation: 8,
            proposedAllocation: 10,
            lastYearActualSpending: 8,
            userAllocation: 8,
            children: []
        },
        {
            id: 'home_office',
            name: 'Home Office',
            responsibleBody: "The Home Office",
            justification: "Our proposal focuses on policing and border security. Last year's overspend on border systems was due to unforeseen IT challenges with a key contractor.",
            lastYearAllocation: 8,
            proposedAllocation: 9,
            lastYearActualSpending: 9,
            userAllocation: 8,
            children: [
                { id: 'policing', name: 'Policing', lastYearAllocation: 60, proposedAllocation: 60, lastYearActualSpending: 60, userAllocation: 60, responsibleBody:"National Police Chiefs' Council", justification: "We are focused on increasing officer numbers and tackling violent crime." },
                { id: 'borders', name: 'Borders & Immigration', lastYearAllocation: 40, proposedAllocation: 40, lastYearActualSpending: 55, userAllocation: 40, responsibleBody:"Border Force Executive Board", justification: "The overspend was due to urgent operational requirements and supplier cost increases on a critical IT system. We have resolved these issues." },
            ]
        },
        {
            id: 'central_funds',
            name: 'Central Funds & Other',
            responsibleBody: "HM Treasury",
            justification: "This covers cross-government spending, including debt interest and a contingency reserve. The large overspend last year was due to emergency energy subsidies.",
            lastYearAllocation: 14,
            proposedAllocation: 10,
            lastYearActualSpending: 18,
            userAllocation: 14,
            children: [
                { id: 'debt_interest', name: 'National Debt Interest', lastYearAllocation: 50, proposedAllocation: 50, lastYearActualSpending: 50, userAllocation: 50, responsibleBody:"Debt Management Office", justification: "A non-discretionary payment on government borrowing." },
                { id: 'contingency', name: 'Treasury Reserve', lastYearAllocation: 20, proposedAllocation: 30, lastYearActualSpending: 40, userAllocation: 20, responsibleBody:"Contingencies Fund Committee", justification: "A central fund for unforeseen emergencies. Last year, this was used for flood relief and support for Ukraine." },
                { id: 'other_depts', name: 'Other Departments', lastYearAllocation: 30, proposedAllocation: 20, lastYearActualSpending: 10, userAllocation: 30, responsibleBody:"Cabinet Office", justification: "Funding for smaller departments like Culture, Media & Sport, and Environment. We underspent last year after a major project was cancelled." },
            ]
        }
    ]
};

const publicAverageData = [
    { name: 'Healthcare', value: 38 },
    { name: 'Education', value: 18 },
    { name: 'Welfare & Pensions', value: 26 },
    { name: 'Defence', value: 7 },
    { name: 'Transport', value: 4 },
    { name: 'Other Spending', value: 7 },
];
