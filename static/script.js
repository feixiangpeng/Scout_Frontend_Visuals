// Function to fetch data from the API and create the timeline
async function createTimeline() {
    const response = await fetch('/api/timeline-data');
    const data = await response.json();

    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, data, options);
}
document.addEventListener('DOMContentLoaded', function() {
    createHeatmap();
});

async function createHeatmap() {
    const response = await fetch('/api/heatmap-data');
    const data = await response.json();

    // Initialize the map with restricted bounds
    var map = L.map('map', {
        center: [20, 0], // Centered on the world
        zoom: 2.3, // Initial zoom level to show less of the map
        scrollWheelZoom: true, // Enable scroll wheel zoom
        dragging: true, // Enable dragging
        maxBounds: [
            [-60, -120], // Southwest coordinates
            [85, 120]    // Northeast coordinates
        ], // Constrain the map to the narrower world bounds
        maxBoundsViscosity: 1.0, // Prevents panning outside the world bounds
        maxZoom: 5, // Maximum zoom level
        minZoom: 2.3 // Minimum zoom level to show the entire world
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add heatmap data
    var heat = L.heatLayer(data.map(point => [point.latitude, point.longitude, point.count]), {
        radius: 25,
        blur: 15,
        maxZoom: 5,
    }).addTo(map);

    // Event listener for country click
    map.on('click', async function(e) {
        const { lat, lng } = e.latlng;
        const countryInfo = await fetchCountryData(lat, lng);

        if (countryInfo) {
            L.popup()
                .setLatLng(e.latlng)
                .setContent(`<h3>${countryInfo.name}</h3><p>Available Datasets:</p><ul>${countryInfo.datasets.map(dataset => `<li>${dataset}</li>`).join('')}</ul>`)
                .openOn(map);
        }
    });
}

// Dummy function to fetch country data based on latitude and longitude
async function fetchCountryData(lat, lng) {
    // Dummy data for demonstration purposes
    const dummyData = {
        'AFG': { name: 'Afghanistan', datasets: ['Dataset AFG1', 'Dataset AFG2', 'Dataset AFG3'] },
        'ALB': { name: 'Albania', datasets: ['Dataset ALB1', 'Dataset ALB2', 'Dataset ALB3'] },
        'DZA': { name: 'Algeria', datasets: ['Dataset DZA1', 'Dataset DZA2', 'Dataset DZA3'] },
        'AND': { name: 'Andorra', datasets: ['Dataset AND1', 'Dataset AND2', 'Dataset AND3'] },
        'AGO': { name: 'Angola', datasets: ['Dataset AGO1', 'Dataset AGO2', 'Dataset AGO3'] },
        'ATG': { name: 'Antigua and Barbuda', datasets: ['Dataset ATG1', 'Dataset ATG2', 'Dataset ATG3'] },
        'ARG': { name: 'Argentina', datasets: ['Dataset ARG1', 'Dataset ARG2', 'Dataset ARG3'] },
        'ARM': { name: 'Armenia', datasets: ['Dataset ARM1', 'Dataset ARM2', 'Dataset ARM3'] },
        'AUS': { name: 'Australia', datasets: ['Dataset AUS1', 'Dataset AUS2', 'Dataset AUS3'] },
        'AUT': { name: 'Austria', datasets: ['Dataset AUT1', 'Dataset AUT2', 'Dataset AUT3'] },
        'AZE': { name: 'Azerbaijan', datasets: ['Dataset AZE1', 'Dataset AZE2', 'Dataset AZE3'] },
        'BHS': { name: 'The Bahamas', datasets: ['Dataset BHS1', 'Dataset BHS2', 'Dataset BHS3'] },
        'BHR': { name: 'Bahrain', datasets: ['Dataset BHR1', 'Dataset BHR2', 'Dataset BHR3'] },
        'BGD': { name: 'Bangladesh', datasets: ['Dataset BGD1', 'Dataset BGD2', 'Dataset BGD3'] },
        'BRB': { name: 'Barbados', datasets: ['Dataset BRB1', 'Dataset BRB2', 'Dataset BRB3'] },
        'BLR': { name: 'Belarus', datasets: ['Dataset BLR1', 'Dataset BLR2', 'Dataset BLR3'] },
        'BEL': { name: 'Belgium', datasets: ['Dataset BEL1', 'Dataset BEL2', 'Dataset BEL3'] },
        'BLZ': { name: 'Belize', datasets: ['Dataset BLZ1', 'Dataset BLZ2', 'Dataset BLZ3'] },
        'BEN': { name: 'Benin', datasets: ['Dataset BEN1', 'Dataset BEN2', 'Dataset BEN3'] },
        'BTN': { name: 'Bhutan', datasets: ['Dataset BTN1', 'Dataset BTN2', 'Dataset BTN3'] },
        'BOL': { name: 'Bolivia', datasets: ['Dataset BOL1', 'Dataset BOL2', 'Dataset BOL3'] },
        'BIH': { name: 'Bosnia and Herzegovina', datasets: ['Dataset BIH1', 'Dataset BIH2', 'Dataset BIH3'] },
        'BWA': { name: 'Botswana', datasets: ['Dataset BWA1', 'Dataset BWA2', 'Dataset BWA3'] },
        'BRA': { name: 'Brazil', datasets: ['Dataset BRA1', 'Dataset BRA2', 'Dataset BRA3'] },
        'BRN': { name: 'Brunei', datasets: ['Dataset BRN1', 'Dataset BRN2', 'Dataset BRN3'] },
        'BGR': { name: 'Bulgaria', datasets: ['Dataset BGR1', 'Dataset BGR2', 'Dataset BGR3'] },
        'BFA': { name: 'Burkina Faso', datasets: ['Dataset BFA1', 'Dataset BFA2', 'Dataset BFA3'] },
        'BDI': { name: 'Burundi', datasets: ['Dataset BDI1', 'Dataset BDI2', 'Dataset BDI3'] },
        'CPV': { name: 'Cabo Verde', datasets: ['Dataset CPV1', 'Dataset CPV2', 'Dataset CPV3'] },
        'KHM': { name: 'Cambodia', datasets: ['Dataset KHM1', 'Dataset KHM2', 'Dataset KHM3'] },
        'CMR': { name: 'Cameroon', datasets: ['Dataset CMR1', 'Dataset CMR2', 'Dataset CMR3'] },
        'CAN': { name: 'Canada', datasets: ['Dataset CAN1', 'Dataset CAN2', 'Dataset CAN3'] },
        'CAF': { name: 'Central African Republic', datasets: ['Dataset CAF1', 'Dataset CAF2', 'Dataset CAF3'] },
        'TCD': { name: 'Chad', datasets: ['Dataset TCD1', 'Dataset TCD2', 'Dataset TCD3'] },
        'CHL': { name: 'Chile', datasets: ['Dataset CHL1', 'Dataset CHL2', 'Dataset CHL3'] },
        'CHN': { name: 'China', datasets: ['Dataset CHN1', 'Dataset CHN2', 'Dataset CHN3'] },
        'COL': { name: 'Colombia', datasets: ['Dataset COL1', 'Dataset COL2', 'Dataset COL3'] },
        'COM': { name: 'Comoros', datasets: ['Dataset COM1', 'Dataset COM2', 'Dataset COM3'] },
        'COD': { name: 'Congo, Democratic Republic of the', datasets: ['Dataset COD1', 'Dataset COD2', 'Dataset COD3'] },
        'COG': { name: 'Congo, Republic of the', datasets: ['Dataset COG1', 'Dataset COG2', 'Dataset COG3'] },
        'CRI': { name: 'Costa Rica', datasets: ['Dataset CRI1', 'Dataset CRI2', 'Dataset CRI3'] },
        'CIV': { name: 'Côte d’Ivoire', datasets: ['Dataset CIV1', 'Dataset CIV2', 'Dataset CIV3'] },
        'HRV': { name: 'Croatia', datasets: ['Dataset HRV1', 'Dataset HRV2', 'Dataset HRV3'] },
        'CUB': { name: 'Cuba', datasets: ['Dataset CUB1', 'Dataset CUB2', 'Dataset CUB3'] },
        'CYP': { name: 'Cyprus', datasets: ['Dataset CYP1', 'Dataset CYP2', 'Dataset CYP3'] },
        'CZE': { name: 'Czech Republic', datasets: ['Dataset CZE1', 'Dataset CZE2', 'Dataset CZE3'] },
        'DNK': { name: 'Denmark', datasets: ['Dataset DNK1', 'Dataset DNK2', 'Dataset DNK3'] },
        'DJI': { name: 'Djibouti', datasets: ['Dataset DJI1', 'Dataset DJI2', 'Dataset DJI3'] },
        'DMA': { name: 'Dominica', datasets: ['Dataset DMA1', 'Dataset DMA2', 'Dataset DMA3'] },
        'DOM': { name: 'Dominican Republic', datasets: ['Dataset DOM1', 'Dataset DOM2', 'Dataset DOM3'] },
        'TLS': { name: 'East Timor (Timor-Leste)', datasets: ['Dataset TLS1', 'Dataset TLS2', 'Dataset TLS3'] },
        'ECU': { name: 'Ecuador', datasets: ['Dataset ECU1', 'Dataset ECU2', 'Dataset ECU3'] },
        'EGY': { name: 'Egypt', datasets: ['Dataset EGY1', 'Dataset EGY2', 'Dataset EGY3'] },
        'SLV': { name: 'El Salvador', datasets: ['Dataset SLV1', 'Dataset SLV2', 'Dataset SLV3'] },
        'GNQ': { name: 'Equatorial Guinea', datasets: ['Dataset GNQ1', 'Dataset GNQ2', 'Dataset GNQ3'] },
        'ERI': { name: 'Eritrea', datasets: ['Dataset ERI1', 'Dataset ERI2', 'Dataset ERI3'] },
        'EST': { name: 'Estonia', datasets: ['Dataset EST1', 'Dataset EST2', 'Dataset EST3'] },
        'SWZ': { name: 'Eswatini', datasets: ['Dataset SWZ1', 'Dataset SWZ2', 'Dataset SWZ3'] },
        'ETH': { name: 'Ethiopia', datasets: ['Dataset ETH1', 'Dataset ETH2', 'Dataset ETH3'] },
        'FJI': { name: 'Fiji', datasets: ['Dataset FJI1', 'Dataset FJI2', 'Dataset FJI3'] },
        'FIN': { name: 'Finland', datasets: ['Dataset FIN1', 'Dataset FIN2', 'Dataset FIN3'] },
        'FRA': { name: 'France', datasets: ['Dataset FRA1', 'Dataset FRA2', 'Dataset FRA3'] },
        'GAB': { name: 'Gabon', datasets: ['Dataset GAB1', 'Dataset GAB2', 'Dataset GAB3'] },
        'GMB': { name: 'The Gambia', datasets: ['Dataset GMB1', 'Dataset GMB2', 'Dataset GMB3'] },
        'GEO': { name: 'Georgia', datasets: ['Dataset GEO1', 'Dataset GEO2', 'Dataset GEO3'] },
        'DEU': { name: 'Germany', datasets: ['Dataset DEU1', 'Dataset DEU2', 'Dataset DEU3'] },
        'GHA': { name: 'Ghana', datasets: ['Dataset GHA1', 'Dataset GHA2', 'Dataset GHA3'] },
        'GRC': { name: 'Greece', datasets: ['Dataset GRC1', 'Dataset GRC2', 'Dataset GRC3'] },
        'GRD': { name: 'Grenada', datasets: ['Dataset GRD1', 'Dataset GRD2', 'Dataset GRD3'] },
        'GTM': { name: 'Guatemala', datasets: ['Dataset GTM1', 'Dataset GTM2', 'Dataset GTM3'] },
        'GIN': { name: 'Guinea', datasets: ['Dataset GIN1', 'Dataset GIN2', 'Dataset GIN3'] },
        'GNB': { name: 'Guinea-Bissau', datasets: ['Dataset GNB1', 'Dataset GNB2', 'Dataset GNB3'] },
        'GUY': { name: 'Guyana', datasets: ['Dataset GUY1', 'Dataset GUY2', 'Dataset GUY3'] },
        'HTI': { name: 'Haiti', datasets: ['Dataset HTI1', 'Dataset HTI2', 'Dataset HTI3'] },
        'HND': { name: 'Honduras', datasets: ['Dataset HND1', 'Dataset HND2', 'Dataset HND3'] },
        'HUN': { name: 'Hungary', datasets: ['Dataset HUN1', 'Dataset HUN2', 'Dataset HUN3'] },
        'ISL': { name: 'Iceland', datasets: ['Dataset ISL1', 'Dataset ISL2', 'Dataset ISL3'] },
        'IND': { name: 'India', datasets: ['Dataset IND1', 'Dataset IND2', 'Dataset IND3'] },
        'IDN': { name: 'Indonesia', datasets: ['Dataset IDN1', 'Dataset IDN2', 'Dataset IDN3'] },
        'IRN': { name: 'Iran', datasets: ['Dataset IRN1', 'Dataset IRN2', 'Dataset IRN3'] },
        'IRQ': { name: 'Iraq', datasets: ['Dataset IRQ1', 'Dataset IRQ2', 'Dataset IRQ3'] },
        'IRL': { name: 'Ireland', datasets: ['Dataset IRL1', 'Dataset IRL2', 'Dataset IRL3'] },
        'ISR': { name: 'Israel', datasets: ['Dataset ISR1', 'Dataset ISR2', 'Dataset ISR3'] },
        'ITA': { name: 'Italy', datasets: ['Dataset ITA1', 'Dataset ITA2', 'Dataset ITA3'] },
        'JAM': { name: 'Jamaica', datasets: ['Dataset JAM1', 'Dataset JAM2', 'Dataset JAM3'] },
        'JPN': { name: 'Japan', datasets: ['Dataset JPN1', 'Dataset JPN2', 'Dataset JPN3'] },
        'JOR': { name: 'Jordan', datasets: ['Dataset JOR1', 'Dataset JOR2', 'Dataset JOR3'] },
        'KAZ': { name: 'Kazakhstan', datasets: ['Dataset KAZ1', 'Dataset KAZ2', 'Dataset KAZ3'] },
        'KEN': { name: 'Kenya', datasets: ['Dataset KEN1', 'Dataset KEN2', 'Dataset KEN3'] },
        'KIR': { name: 'Kiribati', datasets: ['Dataset KIR1', 'Dataset KIR2', 'Dataset KIR3'] },
        'PRK': { name: 'Korea, North', datasets: ['Dataset PRK1', 'Dataset PRK2', 'Dataset PRK3'] },
        'KOR': { name: 'Korea, South', datasets: ['Dataset KOR1', 'Dataset KOR2', 'Dataset KOR3'] },
        'XKX': { name: 'Kosovo', datasets: ['Dataset XKX1', 'Dataset XKX2', 'Dataset XKX3'] },
        'KWT': { name: 'Kuwait', datasets: ['Dataset KWT1', 'Dataset KWT2', 'Dataset KWT3'] },
        'KGZ': { name: 'Kyrgyzstan', datasets: ['Dataset KGZ1', 'Dataset KGZ2', 'Dataset KGZ3'] },
        'LAO': { name: 'Laos', datasets: ['Dataset LAO1', 'Dataset LAO2', 'Dataset LAO3'] },
        'LVA': { name: 'Latvia', datasets: ['Dataset LVA1', 'Dataset LVA2', 'Dataset LVA3'] },
        'LBN': { name: 'Lebanon', datasets: ['Dataset LBN1', 'Dataset LBN2', 'Dataset LBN3'] },
        'LSO': { name: 'Lesotho', datasets: ['Dataset LSO1', 'Dataset LSO2', 'Dataset LSO3'] },
        'LBR': { name: 'Liberia', datasets: ['Dataset LBR1', 'Dataset LBR2', 'Dataset LBR3'] },
        'LBY': { name: 'Libya', datasets: ['Dataset LBY1', 'Dataset LBY2', 'Dataset LBY3'] },
        'LIE': { name: 'Liechtenstein', datasets: ['Dataset LIE1', 'Dataset LIE2', 'Dataset LIE3'] },
        'LTU': { name: 'Lithuania', datasets: ['Dataset LTU1', 'Dataset LTU2', 'Dataset LTU3'] },
        'LUX': { name: 'Luxembourg', datasets: ['Dataset LUX1', 'Dataset LUX2', 'Dataset LUX3'] },
        'MDG': { name: 'Madagascar', datasets: ['Dataset MDG1', 'Dataset MDG2', 'Dataset MDG3'] },
        'MWI': { name: 'Malawi', datasets: ['Dataset MWI1', 'Dataset MWI2', 'Dataset MWI3'] },
        'MYS': { name: 'Malaysia', datasets: ['Dataset MYS1', 'Dataset MYS2', 'Dataset MYS3'] },
        'MDV': { name: 'Maldives', datasets: ['Dataset MDV1', 'Dataset MDV2', 'Dataset MDV3'] },
        'MLI': { name: 'Mali', datasets: ['Dataset MLI1', 'Dataset MLI2', 'Dataset MLI3'] },
        'MLT': { name: 'Malta', datasets: ['Dataset MLT1', 'Dataset MLT2', 'Dataset MLT3'] },
        'MHL': { name: 'Marshall Islands', datasets: ['Dataset MHL1', 'Dataset MHL2', 'Dataset MHL3'] },
        'MRT': { name: 'Mauritania', datasets: ['Dataset MRT1', 'Dataset MRT2', 'Dataset MRT3'] },
        'MUS': { name: 'Mauritius', datasets: ['Dataset MUS1', 'Dataset MUS2', 'Dataset MUS3'] },
        'MEX': { name: 'Mexico', datasets: ['Dataset MEX1', 'Dataset MEX2', 'Dataset MEX3'] },
        'FSM': { name: 'Micronesia, Federated States of', datasets: ['Dataset FSM1', 'Dataset FSM2', 'Dataset FSM3'] },
        'MDA': { name: 'Moldova', datasets: ['Dataset MDA1', 'Dataset MDA2', 'Dataset MDA3'] },
        'MCO': { name: 'Monaco', datasets: ['Dataset MCO1', 'Dataset MCO2', 'Dataset MCO3'] },
        'MNG': { name: 'Mongolia', datasets: ['Dataset MNG1', 'Dataset MNG2', 'Dataset MNG3'] },
        'MNE': { name: 'Montenegro', datasets: ['Dataset MNE1', 'Dataset MNE2', 'Dataset MNE3'] },
        'MAR': { name: 'Morocco', datasets: ['Dataset MAR1', 'Dataset MAR2', 'Dataset MAR3'] },
        'MOZ': { name: 'Mozambique', datasets: ['Dataset MOZ1', 'Dataset MOZ2', 'Dataset MOZ3'] },
        'MMR': { name: 'Myanmar (Burma)', datasets: ['Dataset MMR1', 'Dataset MMR2', 'Dataset MMR3'] },
        'NAM': { name: 'Namibia', datasets: ['Dataset NAM1', 'Dataset NAM2', 'Dataset NAM3'] },
        'NRU': { name: 'Nauru', datasets: ['Dataset NRU1', 'Dataset NRU2', 'Dataset NRU3'] },
        'NPL': { name: 'Nepal', datasets: ['Dataset NPL1', 'Dataset NPL2', 'Dataset NPL3'] },
        'NLD': { name: 'Netherlands', datasets: ['Dataset NLD1', 'Dataset NLD2', 'Dataset NLD3'] },
        'NZL': { name: 'New Zealand', datasets: ['Dataset NZL1', 'Dataset NZL2', 'Dataset NZL3'] },
        'NIC': { name: 'Nicaragua', datasets: ['Dataset NIC1', 'Dataset NIC2', 'Dataset NIC3'] },
        'NER': { name: 'Niger', datasets: ['Dataset NER1', 'Dataset NER2', 'Dataset NER3'] },
        'NGA': { name: 'Nigeria', datasets: ['Dataset NGA1', 'Dataset NGA2', 'Dataset NGA3'] },
        'MKD': { name: 'North Macedonia', datasets: ['Dataset MKD1', 'Dataset MKD2', 'Dataset MKD3'] },
        'NOR': { name: 'Norway', datasets: ['Dataset NOR1', 'Dataset NOR2', 'Dataset NOR3'] },
        'OMN': { name: 'Oman', datasets: ['Dataset OMN1', 'Dataset OMN2', 'Dataset OMN3'] },
        'PAK': { name: 'Pakistan', datasets: ['Dataset PAK1', 'Dataset PAK2', 'Dataset PAK3'] },
        'PLW': { name: 'Palau', datasets: ['Dataset PLW1', 'Dataset PLW2', 'Dataset PLW3'] },
        'PAN': { name: 'Panama', datasets: ['Dataset PAN1', 'Dataset PAN2', 'Dataset PAN3'] },
        'PNG': { name: 'Papua New Guinea', datasets: ['Dataset PNG1', 'Dataset PNG2', 'Dataset PNG3'] },
        'PRY': { name: 'Paraguay', datasets: ['Dataset PRY1', 'Dataset PRY2', 'Dataset PRY3'] },
        'PER': { name: 'Peru', datasets: ['Dataset PER1', 'Dataset PER2', 'Dataset PER3'] },
        'PHL': { name: 'Philippines', datasets: ['Dataset PHL1', 'Dataset PHL2', 'Dataset PHL3'] },
        'POL': { name: 'Poland', datasets: ['Dataset POL1', 'Dataset POL2', 'Dataset POL3'] },
        'PRT': { name: 'Portugal', datasets: ['Dataset PRT1', 'Dataset PRT2', 'Dataset PRT3'] },
        'QAT': { name: 'Qatar', datasets: ['Dataset QAT1', 'Dataset QAT2', 'Dataset QAT3'] },
        'ROU': { name: 'Romania', datasets: ['Dataset ROU1', 'Dataset ROU2', 'Dataset ROU3'] },
        'RUS': { name: 'Russia', datasets: ['Dataset RUS1', 'Dataset RUS2', 'Dataset RUS3'] },
        'RWA': { name: 'Rwanda', datasets: ['Dataset RWA1', 'Dataset RWA2', 'Dataset RWA3'] },
        'KNA': { name: 'Saint Kitts and Nevis', datasets: ['Dataset KNA1', 'Dataset KNA2', 'Dataset KNA3'] },
        'LCA': { name: 'Saint Lucia', datasets: ['Dataset LCA1', 'Dataset LCA2', 'Dataset LCA3'] },
        'VCT': { name: 'Saint Vincent and the Grenadines', datasets: ['Dataset VCT1', 'Dataset VCT2', 'Dataset VCT3'] },
        'WSM': { name: 'Samoa', datasets: ['Dataset WSM1', 'Dataset WSM2', 'Dataset WSM3'] },
        'SMR': { name: 'San Marino', datasets: ['Dataset SMR1', 'Dataset SMR2', 'Dataset SMR3'] },
        'STP': { name: 'Sao Tome and Principe', datasets: ['Dataset STP1', 'Dataset STP2', 'Dataset STP3'] },
        'SAU': { name: 'Saudi Arabia', datasets: ['Dataset SAU1', 'Dataset SAU2', 'Dataset SAU3'] },
        'SEN': { name: 'Senegal', datasets: ['Dataset SEN1', 'Dataset SEN2', 'Dataset SEN3'] },
        'SRB': { name: 'Serbia', datasets: ['Dataset SRB1', 'Dataset SRB2', 'Dataset SRB3'] },
        'SYC': { name: 'Seychelles', datasets: ['Dataset SYC1', 'Dataset SYC2', 'Dataset SYC3'] },
        'SLE': { name: 'Sierra Leone', datasets: ['Dataset SLE1', 'Dataset SLE2', 'Dataset SLE3'] },
        'SGP': { name: 'Singapore', datasets: ['Dataset SGP1', 'Dataset SGP2', 'Dataset SGP3'] },
        'SVK': { name: 'Slovakia', datasets: ['Dataset SVK1', 'Dataset SVK2', 'Dataset SVK3'] },
        'SVN': { name: 'Slovenia', datasets: ['Dataset SVN1', 'Dataset SVN2', 'Dataset SVN3'] },
        'SLB': { name: 'Solomon Islands', datasets: ['Dataset SLB1', 'Dataset SLB2', 'Dataset SLB3'] },
        'SOM': { name: 'Somalia', datasets: ['Dataset SOM1', 'Dataset SOM2', 'Dataset SOM3'] },
        'ZAF': { name: 'South Africa', datasets: ['Dataset ZAF1', 'Dataset ZAF2', 'Dataset ZAF3'] },
        'ESP': { name: 'Spain', datasets: ['Dataset ESP1', 'Dataset ESP2', 'Dataset ESP3'] },
        'LKA': { name: 'Sri Lanka', datasets: ['Dataset LKA1', 'Dataset LKA2', 'Dataset LKA3'] },
        'SDN': { name: 'Sudan', datasets: ['Dataset SDN1', 'Dataset SDN2', 'Dataset SDN3'] },
        'SSD': { name: 'South Sudan', datasets: ['Dataset SSD1', 'Dataset SSD2', 'Dataset SSD3'] },
        'SUR': { name: 'Suriname', datasets: ['Dataset SUR1', 'Dataset SUR2', 'Dataset SUR3'] },
        'SWE': { name: 'Sweden', datasets: ['Dataset SWE1', 'Dataset SWE2', 'Dataset SWE3'] },
        'CHE': { name: 'Switzerland', datasets: ['Dataset CHE1', 'Dataset CHE2', 'Dataset CHE3'] },
        'SYR': { name: 'Syria', datasets: ['Dataset SYR1', 'Dataset SYR2', 'Dataset SYR3'] },
        'TWN': { name: 'Taiwan', datasets: ['Dataset TWN1', 'Dataset TWN2', 'Dataset TWN3'] },
        'TJK': { name: 'Tajikistan', datasets: ['Dataset TJK1', 'Dataset TJK2', 'Dataset TJK3'] },
        'TZA': { name: 'Tanzania', datasets: ['Dataset TZA1', 'Dataset TZA2', 'Dataset TZA3'] },
        'THA': { name: 'Thailand', datasets: ['Dataset THA1', 'Dataset THA2', 'Dataset THA3'] },
        'TGO': { name: 'Togo', datasets: ['Dataset TGO1', 'Dataset TGO2', 'Dataset TGO3'] },
        'TON': { name: 'Tonga', datasets: ['Dataset TON1', 'Dataset TON2', 'Dataset TON3'] },
        'TTO': { name: 'Trinidad and Tobago', datasets: ['Dataset TTO1', 'Dataset TTO2', 'Dataset TTO3'] },
        'TUN': { name: 'Tunisia', datasets: ['Dataset TUN1', 'Dataset TUN2', 'Dataset TUN3'] },
        'TUR': { name: 'Turkey', datasets: ['Dataset TUR1', 'Dataset TUR2', 'Dataset TUR3'] },
        'TKM': { name: 'Turkmenistan', datasets: ['Dataset TKM1', 'Dataset TKM2', 'Dataset TKM3'] },
        'TUV': { name: 'Tuvalu', datasets: ['Dataset TUV1', 'Dataset TUV2', 'Dataset TUV3'] },
        'UGA': { name: 'Uganda', datasets: ['Dataset UGA1', 'Dataset UGA2', 'Dataset UGA3'] },
        'UKR': { name: 'Ukraine', datasets: ['Dataset UKR1', 'Dataset UKR2', 'Dataset UKR3'] },
        'ARE': { name: 'United Arab Emirates', datasets: ['Dataset ARE1', 'Dataset ARE2', 'Dataset ARE3'] },
        'GBR': { name: 'United Kingdom', datasets: ['Dataset GBR1', 'Dataset GBR2', 'Dataset GBR3'] },
        'USA': { name: 'United States of America', datasets: ['Dataset USA1', 'Dataset USA2', 'Dataset USA3'] },
        'URY': { name: 'Uruguay', datasets: ['Dataset URY1', 'Dataset URY2', 'Dataset URY3'] },
        'UZB': { name: 'Uzbekistan', datasets: ['Dataset UZB1', 'Dataset UZB2', 'Dataset UZB3'] },
        'VUT': { name: 'Vanuatu', datasets: ['Dataset VUT1', 'Dataset VUT2', 'Dataset VUT3'] },
        'VAT': { name: 'Vatican City', datasets: ['Dataset VAT1', 'Dataset VAT2', 'Dataset VAT3'] },
        'VEN': { name: 'Venezuela', datasets: ['Dataset VEN1', 'Dataset VEN2', 'Dataset VEN3'] },
        'VNM': { name: 'Vietnam', datasets: ['Dataset VNM1', 'Dataset VNM2', 'Dataset VNM3'] },
        'YEM': { name: 'Yemen', datasets: ['Dataset YEM1', 'Dataset YEM2', 'Dataset YEM3'] },
        'ZMB': { name: 'Zambia', datasets: ['Dataset ZMB1', 'Dataset ZMB2', 'Dataset ZMB3'] },
        'ZWE': { name: 'Zimbabwe', datasets: ['Dataset ZWE1', 'Dataset ZWE2', 'Dataset ZWE3'] },
        'GRL': { name: 'Greenland', datasets: ['Dataset GRL1', 'Dataset GRL2', 'Dataset GRL3'] },


    };

    // This would be replaced with an actual API call to get country information based on coordinates
    const countryCode = getCountryCode(lat, lng);
    return dummyData[countryCode] || null;
}

// Dummy function to get country code based on latitude and longitude
function getCountryCode(lat, lng) {
    // This is a simplified example; you would use a real geocoding service in production
    if (lat >= 24.396308 && lat <= 49.384358 && lng >= -125.0 && lng <= -66.93457) {
        return 'USA';
    } else if (lat >= 41.676555 && lat <= 83.113882 && lng >= -141.0 && lng <= -52.6175) {
        return 'CAN';
    } else if (lat >= 14.53455 && lat <= 32.718655 && lng >= -118.6523 && lng <= -86.710571) {
        return 'MEX';
    } else if (lat >= -33.74224 && lat <= 5.271787 && lng >= -73.987235 && lng <= -34.793148) {
        return 'BRA';
    } else if (lat >= 8.0689 && lat <= 37.0902 && lng >= 68.17665 && lng <= 97.402561) {
        return 'IND';
    } else if (lat >= 18.1613 && lat <= 53.5587 && lng >= 73.4997 && lng <= 135.0857) {
        return 'CHN';
    } else if (lat >= 41.1851 && lat <= 81.85 && lng >= 19.6389 && lng <= 169.0) {
        return 'RUS';
    } else if (lat >= -34.8333 && lat <= -22.125 && lng >= 16.4515 && lng <= 32.8935) {
        return 'ZAF';
    } else if (lat >= 32.0 && lat <= 37.0 && lng >= 62.0 && lng <= 66.5) {
        return 'AFG';
    } else if (lat >= 39.0 && lat <= 42.0 && lng >= 19.0 && lng <= 21.0) {
        return 'ALB';
    } else if (lat >= 19.0 && lat <= 37.0 && lng >= -9.0 && lng <= 12.0) {
        return 'DZA';
    } else if (lat >= 42.3 && lat <= 42.7 && lng >= 1.4 && lng <= 1.7) {
        return 'AND';
    } else if (lat >= -18.0 && lat <= -4.4 && lng >= 11.6 && lng <= 24.0) {
        return 'AGO';
    } else if (lat >= 16.0 && lat <= 17.0 && lng >= -62.0 && lng <= -61.5) {
        return 'ATG';
    } else if (lat >= -56.0 && lat <= -21.0 && lng >= -73.0 && lng <= -53.0) {
        return 'ARG';
    } else if (lat >= 38.8 && lat <= 41.3 && lng >= 43.4 && lng <= 46.7) {
        return 'ARM';
    } else if (lat >= -40.0 && lat <= -10.0 && lng >= 113.0 && lng <= 154.0) {
        return 'AUS';
    } else if (lat >= 46.4 && lat <= 49.0 && lng >= 9.5 && lng <= 17.2) {
        return 'AUT';
    } else if (lat >= 38.4 && lat <= 41.9 && lng >= 44.8 && lng <= 50.4) {
        return 'AZE';
    } else if (lat >= 40.0 && lat <= 41.0 && lng >= -80.0 && lng <= -77.0) {
        return 'BHS';
    } else if (lat >= 25.5 && lat <= 26.3 && lng >= 50.4 && lng <= 50.8) {
        return 'BHR';
    } else if (lat >= 20.7 && lat <= 26.6 && lng >= 88.0 && lng <= 92.6) {
        return 'BGD';
    } else if (lat >= 13.0 && lat <= 14.0 && lng >= -60.9 && lng <= -59.2) {
        return 'BRB';
    } else if (lat >= 51.2 && lat <= 56.2 && lng >= 23.2 && lng <= 32.8) {
        return 'BLR';
    } else if (lat >= 49.5 && lat <= 51.5 && lng >= 2.5 && lng <= 6.4) {
        return 'BEL';
    } else if (lat >= 15.9 && lat <= 18.5 && lng >= -89.2 && lng <= -88.1) {
        return 'BLZ';
    } else if (lat >= 6.1 && lat <= 12.5 && lng >= 0.7 && lng <= 3.8) {
        return 'BEN';
    } else if (lat >= 26.7 && lat <= 28.4 && lng >= 88.0 && lng <= 92.1) {
        return 'BTN';
    } else if (lat >= -23.0 && lat <= -9.6 && lng >= -69.6 && lng <= -57.5) {
        return 'BOL';
    } else if (lat >= 42.5 && lat <= 45.3 && lng >= 15.7 && lng <= 19.6) {
        return 'BIH';
    } else if (lat >= -26.9 && lat <= -17.8 && lng >= 20.0 && lng <= 29.4) {
        return 'BWA';
    } else if (lat >= -34.0 && lat <= 5.3 && lng >= -73.9 && lng <= -34.8) {
        return 'BRA';
    } else if (lat >= 4.0 && lat <= 5.1 && lng >= 114.1 && lng <= 115.4) {
        return 'BRN';
    } else if (lat >= 41.2 && lat <= 44.2 && lng >= 22.4 && lng <= 28.6) {
        return 'BGR';
    } else if (lat >= 9.6 && lat <= 15.1 && lng >= -5.5 && lng <= 2.4) {
        return 'BFA';
    } else if (lat >= -4.5 && lat <= -2.3 && lng >= 29.0 && lng <= 30.9) {
        return 'BDI';
    } else if (lat >= 14.8 && lat <= 17.2 && lng >= -25.4 && lng <= -22.6) {
        return 'CPV';
    } else if (lat >= 10.4 && lat <= 14.7 && lng >= 102.1 && lng <= 107.6) {
        return 'KHM';
    } else if (lat >= 1.6 && lat <= 12.6 && lng >= 8.5 && lng <= 16.2) {
        return 'CMR';
    } else if (lat >= 41.7 && lat <= 83.1 && lng >= -141.0 && lng <= -52.6) {
        return 'CAN';
    } else if (lat >= 2.2 && lat <= 11.0 && lng >= 14.4 && lng <= 27.4) {
        return 'CAF';
    } else if (lat >= 7.5 && lat <= 23.4 && lng >= 13.0 && lng <= 24.0) {
        return 'TCD';
    } else if (lat >= -55.8 && lat <= -17.5 && lng >= -75.6 && lng <= -66.4) {
        return 'CHL';
    } else if (lat >= 18.0 && lat <= 53.6 && lng >= 73.4 && lng <= 135.1) {
        return 'CHN';
    } else if (lat >= -4.3 && lat <= 12.4 && lng >= -79.0 && lng <= -66.9) {
        return 'COL';
    } else if (lat >= -12.4 && lat <= -11.3 && lng >= 43.2 && lng <= 44.6) {
        return 'COM';
    } else if (lat >= -13.5 && lat <= 5.4 && lng >= 12.2 && lng <= 31.3) {
        return 'COD';
    } else if (lat >= -5.0 && lat <= 3.7 && lng >= 11.2 && lng <= 18.6) {
        return 'COG';
    } else if (lat >= 8.0 && lat <= 11.2 && lng >= -86.0 && lng <= -82.6) {
        return 'CRI';
    } else if (lat >= 4.0 && lat <= 10.7 && lng >= -8.6 && lng <= -2.5) {
        return 'CIV';
    } else if (lat >= 42.3 && lat <= 46.5 && lng >= 13.5 && lng <= 19.5) {
        return 'HRV';
    } else if (lat >= 19.8 && lat <= 23.3 && lng >= -85.0 && lng <= -74.1) {
        return 'CUB';
    } else if (lat >= 34.6 && lat <= 35.7 && lng >= 32.3 && lng <= 34.6) {
        return 'CYP';
    } else if (lat >= 48.5 && lat <= 51.0 && lng >= 12.0 && lng <= 18.9) {
        return 'CZE';
    } else if (lat >= 54.5 && lat <= 57.7 && lng >= 8.0 && lng <= 15.2) {
        return 'DNK';
    } else if (lat >= 10.9 && lat <= 12.7 && lng >= 41.0 && lng <= 43.4) {
        return 'DJI';
    } else if (lat >= 15.2 && lat <= 15.7 && lng >= -61.5 && lng <= -61.2) {
        return 'DMA';
    } else if (lat >= 17.5 && lat <= 19.9 && lng >= -72.0 && lng <= -68.2) {
        return 'DOM';
    } else if (lat >= -9.5 && lat <= -8.1 && lng >= 124.0 && lng <= 127.3) {
        return 'TLS';
    } else if (lat >= -5.0 && lat <= 1.7 && lng >= -81.0 && lng <= -75.2) {
        return 'ECU';
    } else if (lat >= 22.0 && lat <= 32.0 && lng >= 25.0 && lng <= 35.0) {
        return 'EGY';
    } else if (lat >= 13.0 && lat <= 14.4 && lng >= -90.1 && lng <= -87.7) {
        return 'SLV';
    } else if (lat >= -1.5 && lat <= 3.8 && lng >= 5.6 && lng <= 11.4) {
        return 'GNQ';
    } else if (lat >= 12.4 && lat <= 18.0 && lng >= 36.4 && lng <= 43.1) {
        return 'ERI';
    } else if (lat >= 57.5 && lat <= 59.5 && lng >= 21.5 && lng <= 28.2) {
        return 'EST';
    } else if (lat >= -27.3 && lat <= -25.7 && lng >= 30.8 && lng <= 32.1) {
        return 'SWZ';
    } else if (lat >= 3.4 && lat <= 15.5 && lng >= 32.9 && lng <= 47.9) {
        return 'ETH';
    } else if (lat >= -21.2 && lat <= -12.3 && lng >= 177.0 && lng <= 179.9) {
        return 'FJI';
    } else if (lat >= 59.8 && lat <= 70.1 && lng >= 20.5 && lng <= 31.6) {
        return 'FIN';
    } else if (lat >= 41.0 && lat <= 51.1 && lng >= -5.1 && lng <= 9.6) {
        return 'FRA';
    } else if (lat >= -3.9 && lat <= 2.3 && lng >= 8.7 && lng <= 14.5) {
        return 'GAB';
    } else if (lat >= 13.0 && lat <= 13.7 && lng >= -17.0 && lng <= -13.6) {
        return 'GMB';
    } else if (lat >= 41.1 && lat <= 43.5 && lng >= 40.0 && lng <= 46.6) {
        return 'GEO';
    } else if (lat >= 47.3 && lat <= 54.9 && lng >= 5.9 && lng <= 15.0) {
        return 'DEU';
    } else if (lat >= 4.5 && lat <= 11.2 && lng >= -3.3 && lng <= 1.2) {
        return 'GHA';
    } else if (lat >= 35.0 && lat <= 42.0 && lng >= 19.4 && lng <= 28.2) {
        return 'GRC';
    } else if (lat >= 12.0 && lat <= 13.0 && lng >= -62.0 && lng <= -61.3) {
        return 'GRD';
    } else if (lat >= 13.7 && lat <= 17.8 && lng >= -92.2 && lng <= -88.2) {
        return 'GTM';
    } else if (lat >= 7.0 && lat <= 12.7 && lng >= -14.9 && lng <= -7.6) {
        return 'GIN';
    } else if (lat >= 10.8 && lat <= 12.7 && lng >= -16.7 && lng <= -13.6) {
        return 'GNB';
    } else if (lat >= 1.2 && lat <= 8.5 && lng >= -61.4 && lng <= -56.5) {
        return 'GUY';
    } else if (lat >= 18.0 && lat <= 20.1 && lng >= -74.5 && lng <= -71.6) {
        return 'HTI';
    } else if (lat >= 12.9 && lat <= 15.0 && lng >= -89.4 && lng <= -83.1) {
        return 'HND';
    } else if (lat >= 45.7 && lat <= 48.6 && lng >= 16.0 && lng <= 22.7) {
        return 'HUN';
    } else if (lat >= 63.3 && lat <= 66.5 && lng >= -25.0 && lng <= -13.0) {
        return 'ISL';
    } else if (lat >= 8.0 && lat <= 37.1 && lng >= 68.1 && lng <= 97.4) {
        return 'IND';
    } else if (lat >= -10.1 && lat <= 5.9 && lng >= 95.0 && lng <= 141.0) {
        return 'IDN';
    } else if (lat >= 25.0 && lat <= 40.0 && lng >= 44.0 && lng <= 63.3) {
        return 'IRN';
    } else if (lat >= 29.1 && lat <= 37.4 && lng >= 38.8 && lng <= 48.5) {
        return 'IRQ';
    } else if (lat >= 51.4 && lat <= 55.4 && lng >= -10.5 && lng <= -5.3) {
        return 'IRL';
    } else if (lat >= 29.4 && lat <= 33.3 && lng >= 34.3 && lng <= 35.9) {
        return 'ISR';
    } else if (lat >= 36.6 && lat <= 47.0 && lng >= 6.6 && lng <= 18.5) {
        return 'ITA';
    } else if (lat >= 17.7 && lat <= 18.5 && lng >= -78.4 && lng <= -76.2) {
        return 'JAM';
    } else if (lat >= 24.3 && lat <= 45.6 && lng >= 122.9 && lng <= 153.6) {
        return 'JPN';
    } else if (lat >= 29.0 && lat <= 33.4 && lng >= 35.6 && lng <= 39.3) {
        return 'JOR';
    } else if (lat >= 40.6 && lat <= 55.4 && lng >= 46.5 && lng <= 87.3) {
        return 'KAZ';
    } else if (lat >= -4.7 && lat <= 5.5 && lng >= 34.0 && lng <= 41.9) {
        return 'KEN';
    } else if (lat >= -4.9 && lat <= -3.6 && lng >= -174.5 && lng <= -173.9) {
        return 'KIR';
    } else if (lat >= 37.7 && lat <= 43.0 && lng >= 124.2 && lng <= 130.7) {
        return 'PRK';
    } else if (lat >= 33.1 && lat <= 38.6 && lng >= 125.6 && lng <= 129.6) {
        return 'KOR';
    } else if (lat >= 41.8 && lat <= 43.3 && lng >= 20.3 && lng <= 21.8) {
        return 'XKX';
    } else if (lat >= 28.5 && lat <= 30.1 && lng >= 46.6 && lng <= 48.4) {
        return 'KWT';
    } else if (lat >= 39.2 && lat <= 43.3 && lng >= 69.3 && lng <= 80.3) {
        return 'KGZ';
    } else if (lat >= 14.1 && lat <= 22.5 && lng >= 100.1 && lng <= 107.6) {
        return 'LAO';
    } else if (lat >= 55.6 && lat <= 58.1 && lng >= 20.9 && lng <= 28.2) {
        return 'LVA';
    } else if (lat >= 33.0 && lat <= 34.7 && lng >= 35.1 && lng <= 36.7) {
        return 'LBN';
    } else if (lat >= -30.6 && lat <= -28.5 && lng >= 27.0 && lng <= 29.5) {
        return 'LSO';
    } else if (lat >= 4.3 && lat <= 8.5 && lng >= -11.5 && lng <= -7.4) {
        return 'LBR';
    } else if (lat >= 19.5 && lat <= 33.2 && lng >= 9.4 && lng <= 25.0) {
        return 'LBY';
    } else if (lat >= 47.0 && lat <= 47.3 && lng >= 9.4 && lng <= 9.7) {
        return 'LIE';
    } else if (lat >= 53.9 && lat <= 56.4 && lng >= 20.9 && lng <= 26.8) {
        return 'LTU';
    } else if (lat >= 49.4 && lat <= 50.2 && lng >= 5.7 && lng <= 6.4) {
        return 'LUX';
    } else if (lat >= -25.6 && lat <= -11.9 && lng >= 43.2 && lng <= 50.5) {
        return 'MDG';
    } else if (lat >= -17.1 && lat <= -9.3 && lng >= 32.7 && lng <= 35.9) {
        return 'MWI';
    } else if (lat >= 1.0 && lat <= 7.4 && lng >= 99.6 && lng <= 119.3) {
        return 'MYS';
    } else if (lat >= 1.9 && lat <= 7.1 && lng >= 72.6 && lng <= 73.8) {
        return 'MDV';
    } else if (lat >= 10.1 && lat <= 25.0 && lng >= -12.3 && lng <= 4.3) {
        return 'MLI';
    } else if (lat >= 35.8 && lat <= 36.1 && lng >= 14.2 && lng <= 14.6) {
        return 'MLT';
    } else if (lat >= 5.6 && lat <= 14.8 && lng >= 166.8 && lng <= 172.1) {
        return 'MHL';
    } else if (lat >= 14.7 && lat <= 27.0 && lng >= -17.1 && lng <= -4.8) {
        return 'MRT';
    } else if (lat >= -20.5 && lat <= -10.3 && lng >= 56.5 && lng <= 63.5) {
        return 'MUS';
    } else if (lat >= 14.5 && lat <= 32.7 && lng >= -118.7 && lng <= -86.7) {
        return 'MEX';
    } else if (lat >= 5.8 && lat <= 10.1 && lng >= 138.0 && lng <= 163.4) {
        return 'FSM';
    } else if (lat >= 45.4 && lat <= 48.5 && lng >= 26.6 && lng <= 30.2) {
        return 'MDA';
    } else if (lat >= 43.7 && lat <= 43.8 && lng >= 7.4 && lng <= 7.5) {
        return 'MCO';
    } else if (lat >= 41.6 && lat <= 52.0 && lng >= 87.7 && lng <= 119.9) {
        return 'MNG';
    } else if (lat >= 41.8 && lat <= 43.6 && lng >= 18.4 && lng <= 20.4) {
        return 'MNE';
    } else if (lat >= 27.6 && lat <= 35.9 && lng >= -13.2 && lng <= -0.9) {
        return 'MAR';
    } else if (lat >= -26.9 && lat <= -10.4 && lng >= 30.2 && lng <= 40.8) {
        return 'MOZ';
    } else if (lat >= 9.4 && lat <= 28.5 && lng >= 92.1 && lng <= 101.1) {
        return 'MMR';
    } else if (lat >= -28.9 && lat <= -16.9 && lng >= 11.5 && lng <= 25.3) {
        return 'NAM';
    } else if (lat >= -0.6 && lat <= -0.5 && lng >= 166.9 && lng <= 167.0) {
        return 'NRU';
    } else if (lat >= 26.3 && lat <= 30.4 && lng >= 80.0 && lng <= 88.2) {
        return 'NPL';
    } else if (lat >= 50.7 && lat <= 53.5 && lng >= 3.4 && lng <= 7.2) {
        return 'NLD';
    } else if (lat >= -47.0 && lat <= -34.4 && lng >= 166.4 && lng <= 179.1) {
        return 'NZL';
    } else if (lat >= 10.7 && lat <= 15.0 && lng >= -87.7 && lng <= -83.1) {
        return 'NIC';
    } else if (lat >= 11.7 && lat <= 23.5 && lng >= 0.6 && lng <= 16.0) {
        return 'NER';
    } else if (lat >= 4.3 && lat <= 13.9 && lng >= 2.7 && lng <= 14.7) {
        return 'NGA';
    } else if (lat >= 40.8 && lat <= 42.3 && lng >= 20.5 && lng <= 23.0) {
        return 'MKD';
    } else if (lat >= 57.9 && lat <= 71.2 && lng >= 4.7 && lng <= 31.1) {
        return 'NOR';
    } else if (lat >= 16.6 && lat <= 26.4 && lng >= 52.0 && lng <= 59.8) {
        return 'OMN';
    } else if (lat >= 23.6 && lat <= 37.1 && lng >= 60.9 && lng <= 77.0) {
        return 'PAK';
    } else if (lat >= 6.8 && lat <= 8.1 && lng >= 134.3 && lng <= 134.7) {
        return 'PLW';
    } else if (lat >= 7.2 && lat <= 9.6 && lng >= -83.0 && lng <= -77.1) {
        return 'PAN';
    } else if (lat >= -11.6 && lat <= -0.9 && lng >= 140.8 && lng <= 156.0) {
        return 'PNG';
    } else if (lat >= -27.5 && lat <= -19.2 && lng >= -62.7 && lng <= -54.2) {
        return 'PRY';
    } else if (lat >= -18.3 && lat <= -0.0 && lng >= -81.3 && lng <= -68.7) {
        return 'PER';
    } else if (lat >= 5.5 && lat <= 18.6 && lng >= 117.0 && lng <= 126.6) {
        return 'PHL';
    } else if (lat >= 49.0 && lat <= 55.0 && lng >= 14.1 && lng <= 24.1) {
        return 'POL';
    } else if (lat >= 36.8 && lat <= 42.2 && lng >= -9.5 && lng <= -6.2) {
        return 'PRT';
    } else if (lat >= 24.0 && lat <= 27.0 && lng >= 50.7 && lng <= 51.6) {
        return 'QAT';
    } else if (lat >= 43.7 && lat <= 48.3 && lng >= 20.3 && lng <= 29.6) {
        return 'ROU';
    } else if (lat >= 41.2 && lat <= 82.2 && lng >= 19.6 && lng <= 169.1) {
        return 'RUS';
    } else if (lat >= -2.8 && lat <= -1.0 && lng >= 28.9 && lng <= 30.9) {
        return 'RWA';
    } else if (lat >= 17.1 && lat <= 17.4 && lng >= -62.9 && lng <= -62.5) {
        return 'KNA';
    } else if (lat >= 13.7 && lat <= 14.2 && lng >= -61.1 && lng <= -60.8) {
        return 'LCA';
    } else if (lat >= 12.5 && lat <= 13.5 && lng >= -61.4 && lng <= -61.1) {
        return 'VCT';
    } else if (lat >= -14.1 && lat <= -13.4 && lng >= -173.0 && lng <= -171.2) {
        return 'WSM';
    } else if (lat >= 43.9 && lat <= 44.0 && lng >= 12.4 && lng <= 12.5) {
        return 'SMR';
    } else if (lat >= 0.0 && lat <= 1.7 && lng >= 6.4 && lng <= 7.6) {
        return 'STP';
    } else if (lat >= 16.3 && lat <= 32.2 && lng >= 34.5 && lng <= 55.7) {
        return 'SAU';
    } else if (lat >= 12.3 && lat <= 16.7 && lng >= -17.6 && lng <= -11.4) {
        return 'SEN';
    } else if (lat >= 42.2 && lat <= 46.2 && lng >= 18.8 && lng <= 22.0) {
        return 'SRB';
    } else if (lat >= -4.8 && lat <= -4.3 && lng >= 55.3 && lng <= 56.0) {
        return 'SYC';
    } else if (lat >= 6.9 && lat <= 9.9 && lng >= -13.3 && lng <= -10.3) {
        return 'SLE';
    } else if (lat >= 1.2 && lat <= 1.5 && lng >= 103.6 && lng <= 104.0) {
        return 'SGP';
    } else if (lat >= 47.7 && lat <= 49.6 && lng >= 16.8 && lng <= 22.6) {
        return 'SVK';
    } else if (lat >= 45.4 && lat <= 47.0 && lng >= 13.4 && lng <= 16.6) {
        return 'SVN';
    } else if (lat >= -12.3 && lat <= -6.5 && lng >= 155.5 && lng <= 162.4) {
        return 'SLB';
    } else if (lat >= -1.7 && lat <= 12.0 && lng >= 41.0 && lng <= 51.4) {
        return 'SOM';
    } else if (lat >= -34.8 && lat <= -22.1 && lng >= 16.4 && lng <= 32.9) {
        return 'ZAF';
    } else if (lat >= 36.0 && lat <= 43.8 && lng >= -9.3 && lng <= 3.3) {
        return 'ESP';
    } else if (lat >= 5.8 && lat <= 9.8 && lng >= 79.6 && lng <= 81.9) {
        return 'LKA';
    } else if (lat >= 9.3 && lat <= 22.2 && lng >= 21.8 && lng <= 38.6) {
        return 'SDN';
    } else if (lat >= 3.4 && lat <= 12.0 && lng >= 24.1 && lng <= 35.0) {
        return 'SSD';
    } else if (lat >= 1.8 && lat <= 6.0 && lng >= -58.1 && lng <= -53.8) {
        return 'SUR';
    } else if (lat >= 55.3 && lat <= 69.1 && lng >= 11.0 && lng <= 24.2) {
        return 'SWE';
    } else if (lat >= 45.8 && lat <= 47.8 && lng >= 5.9 && lng <= 10.5) {
        return 'CHE';
    } else if (lat >= 32.3 && lat <= 37.3 && lng >= 35.7 && lng <= 42.4) {
        return 'SYR';
    } else if (lat >= 21.8 && lat <= 25.3 && lng >= 119.3 && lng <= 122.0) {
        return 'TWN';
    } else if (lat >= 36.7 && lat <= 41.0 && lng >= 67.4 && lng <= 75.2) {
        return 'TJK';
    } else if (lat >= -11.7 && lat <= -0.9 && lng >= 29.3 && lng <= 40.5) {
        return 'TZA';
    } else if (lat >= 5.6 && lat <= 20.5 && lng >= 97.4 && lng <= 105.6) {
        return 'THA';
    } else if (lat >= 6.0 && lat <= 11.1 && lng >= -0.3 && lng <= 1.8) {
        return 'TGO';
    } else if (lat >= -22.4 && lat <= -15.6 && lng >= -176.2 && lng <= -173.9) {
        return 'TON';
    } else if (lat >= 10.0 && lat <= 10.9 && lng >= -61.9 && lng <= -60.8) {
        return 'TTO';
    } else if (lat >= 30.0 && lat <= 37.3 && lng >= 7.5 && lng <= 11.5) {
        return 'TUN';
    } else if (lat >= 36.0 && lat <= 42.0 && lng >= 26.0 && lng <= 45.0) {
        return 'TUR';
    } else if (lat >= 35.0 && lat <= 42.8 && lng >= 52.4 && lng <= 66.6) {
        return 'TKM';
    } else if (lat >= -9.5 && lat <= -5.6 && lng >= 179.1 && lng <= 179.3) {
        return 'TUV';
    } else if (lat >= -1.5 && lat <= 4.2 && lng >= 29.5 && lng <= 35.0) {
        return 'UGA';
    } else if (lat >= 44.2 && lat <= 52.3 && lng >= 22.1 && lng <= 40.2) {
        return 'UKR';
    } else if (lat >= 22.6 && lat <= 26.1 && lng >= 51.5 && lng <= 56.4) {
        return 'ARE';
    } else if (lat >= 49.9 && lat <= 58.6 && lng >= -8.6 && lng <= 1.8) {
        return 'GBR';
    } else if (lat >= 24.4 && lat <= 49.4 && lng >= -125.0 && lng <= -66.9) {
        return 'USA';
    } else if (lat >= -35.0 && lat <= -30.1 && lng >= -58.4 && lng <= -53.1) {
        return 'URY';
    } else if (lat >= 37.2 && lat <= 45.5 && lng >= 55.9 && lng <= 73.1) {
        return 'UZB';
    } else if (lat >= -20.3 && lat <= -13.1 && lng >= 166.5 && lng <= 169.9) {
        return 'VUT';
    } else if (lat >= 41.9 && lat <= 42.0 && lng >= 12.4 && lng <= 12.5) {
        return 'VAT';
    } else if (lat >= 0.6 && lat <= 12.2 && lng >= -73.4 && lng <= -59.8) {
        return 'VEN';
    } else if (lat >= 8.2 && lat <= 23.4 && lng >= 102.1 && lng <= 109.5) {
        return 'VNM';
    } else if (lat >= 12.1 && lat <= 18.9 && lng >= 42.0 && lng <= 54.5) {
        return 'YEM';
    } else if (lat >= -18.1 && lat <= -8.2 && lng >= 21.9 && lng <= 33.5) {
        return 'ZMB';
    } else if (lat >= -20.5 && lat <= -15.6 && lng >= 25.2 && lng <= 33.1) {
        return 'ZWE';
    } else if (lat >= 59.0 && lat <= 83.7 && lng >= -73.0 && lng <= -12.0) {
        return 'GRL';
    }
     else {
        return null;
    }
}


async function createFlowDiagram() {
    const response = await fetch('/api/flow-diagram-data');
    const data = await response.json();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = d3.select('#flow-diagram')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const users = data.users;
    const dataItems = data.data;

    const userScale = d3.scalePoint()
        .domain(users)
        .range([margin.top, height - margin.bottom]);

    const dataScale = d3.scalePoint()
        .domain(dataItems)
        .range([margin.top, height - margin.bottom]);

    // Draw users
    svg.selectAll('.user')
        .data(users)
        .enter()
        .append('text')
        .attr('class', 'user')
        .attr('x', margin.left)
        .attr('y', d => userScale(d))
        .text(d => d);

    // Draw data items
    svg.selectAll('.data')
        .data(dataItems)
        .enter()
        .append('text')
        .attr('class', 'data')
        .attr('x', width - margin.right)
        .attr('y', d => dataScale(d))
        .attr('text-anchor', 'end')
        .text(d => d);

    // Draw links
    svg.selectAll('.link')
        .data(data.links)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d => {
            const sourceY = userScale(d.source);
            const targetY = dataScale(d.target);
            return `M${margin.left + 50},${sourceY} C${width/2},${sourceY} ${width/2},${targetY} ${width - margin.right - 50},${targetY}`;
        })
        .attr('fill', 'none')
        .attr('stroke', '#ccc');
}

function createRiskLiabilityViz() {
    const container = d3.select('#risk-liability')
        .style('width', '100%')
        .style('height', '600px')
        .style('background-color', '#f0f0f0');

    function updateVisualization(data) {
        const categories = ['high', 'medium', 'low'];
        
        const categoryContainers = container.selectAll('.category')
            .data(categories)
            .enter()
            .append('div')
            .attr('class', 'category')
            .style('width', '33.33%')
            .style('height', '100%')
            .style('float', 'left')
            .style('padding', '10px')
            .style('box-sizing', 'border-box');

        categoryContainers.append('h3')
            .text(d => d.toUpperCase() + ' RISK')
            .style('text-align', 'center');

        const documents = categoryContainers.selectAll('.document')
            .data(d => data.filter(item => item.risk_level === d))
            .enter()
            .append('div')
            .attr('class', 'document')
            .style('background-color', d => d.risk_level === 'high' ? '#ff6b6b' : d.risk_level === 'medium' ? '#feca57' : '#48dbfb')
            .style('border-radius', '10px')
            .style('padding', '10px')
            .style('margin-bottom', '10px')
            .style('cursor', 'pointer')
            .style('transition', 'all 0.3s ease')
            .on('mouseover', function() {
                d3.select(this).style('transform', 'scale(1.05)');
            })
            .on('mouseout', function() {
                d3.select(this).style('transform', 'scale(1)');
            })
            .on('click', function(event, d) {
                showDetails(d);
            });

        documents.append('h4')
            .text(d => d.name)
            .style('margin', '0')
            .style('color', '#fff');

        documents.append('p')
            .text(d => d.danger_tags.join(', '))
            .style('margin', '5px 0')
            .style('font-size', '12px')
            .style('color', '#fff');

        function showDetails(doc) {
            const detailsContainer = container.append('div')
                .attr('class', 'details')
                .style('position', 'fixed')
                .style('top', '50%')
                .style('left', '50%')
                .style('transform', 'translate(-50%, -50%)')
                .style('background-color', '#fff')
                .style('padding', '20px')
                .style('border-radius', '10px')
                .style('box-shadow', '0 0 10px rgba(0,0,0,0.3)')
                .style('z-index', '1000');

            detailsContainer.append('h3')
                .text(doc.name);

            detailsContainer.append('p')
                .text('Risk Level: ' + doc.risk_level);

            detailsContainer.append('p')
                .text('Danger Tags: ' + doc.danger_tags.join(', '));

            detailsContainer.append('p')
                .text('Description: ' + doc.description);

            detailsContainer.append('p')
                .text('Potential Liability: ' + doc.liability);

            detailsContainer.append('button')
                .text('Close')
                .on('click', function() {
                    detailsContainer.remove();
                });
        }
    }

    // Fetch data and update visualization
    fetch('/api/risk-liability-data')
        .then(response => response.json())
        .then(data => updateVisualization(data));
}

function createRevenueSharingViz() {
    d3.json('/api/revenue-sharing').then(data => {
        const width = 600;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select('#revenue-sharing')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie()
            .value(d => d.revenue)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 0.9);

        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        const arcs = svg.selectAll('arc')
            .data(pie(data.tags))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .transition()
            .duration(1000)
            .attrTween('d', function(d) {
                const i = d3.interpolate(d.startAngle, d.endAngle);
                return function(t) {
                    d.endAngle = i(t);
                    return arc(d);
                }
            });

        arcs.append('text')
            .attr('transform', d => {
                const pos = outerArc.centroid(d);
                const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * (midAngle < Math.PI ? 1.1 : -1.1);
                pos[1] = radius * 0.9 * Math.sin(midAngle);
                return `translate(${pos})`;
            })
            .attr('dy', '.35em')
            .style('text-anchor', d => {
                const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return midAngle < Math.PI ? 'start' : 'end';
            })
            .text(d => `${d.data.name}: $${d.data.revenue.toLocaleString()}`);

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .text(`Total: $${data.shared_revenue.toLocaleString()}`);
    });
}

// Revenue/Profit Sharing Dial
function createRevenueDial() {
    d3.json('/api/revenue-sharing').then(data => {
        const width = 300;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select('#revenue-dial')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const scale = d3.scaleLinear()
            .domain([0, data.total_revenue])
            .range([-Math.PI / 2, Math.PI / 2]);

        const arc = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2);

        svg.append('path')
            .datum({endAngle: scale(data.shared_revenue)})
            .style('fill', '#f6a704')
            .attr('d', arc);

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .text(`${Math.round((data.shared_revenue / data.total_revenue) * 100)}%`)
            .style('font-size', '24px');

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '2em')
            .text('Revenue Share')
            .style('font-size', '14px');
    });
}

// IP Ownership Highlights
function createIPOwnershipViz() {
    d3.json('/api/ip-ownership').then(data => {
        const container = d3.select('#ip-ownership');
        
        const items = container.selectAll('.ip-item')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'ip-item')
            .style('background-color', '#f0f0f0')
            .style('margin', '10px')
            .style('padding', '15px')
            .style('border-radius', '8px')
            .style('transition', 'all 0.3s ease');

        items.append('h3')
            .text(d => d.title)
            .style('margin', '0 0 10px 0');

        items.append('p')
            .text(d => `Type: ${d.type}`);

        items.append('p')
            .text(d => `Status: ${d.status}`);

        items.on('mouseover', function() {
            d3.select(this).style('transform', 'scale(1.05)');
        }).on('mouseout', function() {
            d3.select(this).style('transform', 'scale(1)');
        });
    });
}

// Agreement Type Categorization
function createAgreementTypeViz() {
    d3.json('/api/agreement-types').then(data => {
        const width = 600;
        const height = 400;

        const svg = d3.select('#agreement-types')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const pack = d3.pack()
            .size([width, height])
            .padding(5);

        const root = d3.hierarchy({children: data})
            .sum(d => d.count);

        const nodes = pack(root).leaves();

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const bubbles = svg.selectAll('.bubble')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'bubble')
            .attr('transform', d => `translate(${d.x},${d.y})`);

        bubbles.append('circle')
            .attr('r', d => d.r)
            .style('fill', (d, i) => color(i))
            .style('opacity', 0.7)
            .on('mouseover', function(event, d) {
                d3.select(this).style('opacity', 1);
                tooltip.style('visibility', 'visible')
                    .html(`${d.data.type}<br>${d.data.description}`)
                    .style('top', (event.pageY-10)+'px')
                    .style('left',(event.pageX+10)+'px');
            })
            .on('mouseout', function() {
                d3.select(this).style('opacity', 0.7);
                tooltip.style('visibility', 'hidden');
            });

        bubbles.append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .text(d => d.data.type)
            .style('font-size', d => d.r / 5);

        const tooltip = d3.select('body')
            .append('div')
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('visibility', 'hidden')
            .style('background', '#fff')
            .style('border', '1px solid #000')
            .style('border-radius', '5px')
            .style('padding', '10px');
    });
}

// Create all visualizations when the page is loaded
window.onload = function() {
    createTimeline();
    createHeatmap();
    createFlowDiagram();
    createRiskLiabilityViz();
    createRevenueSharingViz();
    createRevenueDial();
    //createIPOwnershipViz();
    //createAgreementTypeViz();
};