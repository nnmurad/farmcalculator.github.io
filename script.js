const Data = getJSONData();
const forSomeData = [
  "79942",
  "88268",
  "49971",
  "54990",
  "42053",
  "52625",
  "52626",
  "52660",
  "62999",
  "65817",
  "74945",
  "00121",
  "38190",
  "39667",
  "65791",
  "71480",
  "72336",
  "72338",
  "72959",
  "74947",
  "77882",
  "43570",
  "46540",
  "49775",
  "17767",
  "21798",
  "24658",
  "26886",
  "41862",
  "45274",
  "45277",
  "45899",
  "45999",
  "47997",
  "49970",
  "54986",
  "62765",
  "24282",
  "28909",
  "30757",
  "36279",
  "38589",
  "39776",
  "42221",
  "42223",
  "42788",
  "08905",
  "31999",
  "32592",
  "36925",
  "39669",
  "39901",
  "00151",
  "00158",
  "00185",
  "02791",
  "02940",
  "03576",
  "03579",
  "03897",
  "04992",
  "05495",
  "05544",
  "05907",
  "06389",
  "06390",
  "06928",
  "04013",
  "00133",
  "04650",
  "00148",
  "04741",
  "07648",
  "14925",
  "18340",
  "00152",
  "08989",
  "14754",
  "19612",
  "21930",
  "56972",
  "544",
  "11697",
  "00084",
  "24598",
  "24993",
  "28815",
  "29945",
  "39832",
  "29486",
  "34997",
  "00008",
  "99790",
  "96898",
  "00013",
  "89439",
  "89508",
  "00061",
  "00049",
  "00056",
  "00063",
  "00070",
  "00071",
  "00076",
  "00077",
  "00100",
  "00195",
  "58853",
  "59846",
  "59847",
  "59937",
  "81648",
  "83119",
  "83120",
  "83128",
  "83406",
  "83414",
  "83877",
  "84791",
  "86556",
  "87499",
  "89420",
  "89421",
  "89883",
  "96160",
  "97634",
  "97635",
  "97920",
  "99403",
  "84009",
  "97050",
  "83802",
  "00015",
  "00066",
  "00199",
  "73946",
  "79999",
  "86555",
  "88436",
  "88595",
  "89199",
  "92284",
  "00027",
  "57799",
  "59311",
  "69367",
  "81658",
  "82060",
  "82063",
  "83124",
  "84530",
  "87418",
  "00166",
  "49968",
  "52809",
  "54896",
  "56218",
  "56219",
  "56763",
  "57646",
  "57648",
  "57794",
  "58856",
  "59354",
  "61468",
  "69171",
  "69201",
  "69366",
  "82842",
  "58707",
  "65785",
  "67954",
  "74360",
  "00067",
  "65899",
  "67150",
  "71497",
  "71865",
  "71937",
  "72957",
  "74966",
  "79770",
  "88439",
];
let calculatedResultValues = new Array();
function calculate() {
  let projectZipCode = document.getElementById("projectZipCode").value * 1;
  let animalCount = document.getElementById("animalCount").value * 1;

  let stateVal = Data[projectZipCode]["state"];
  let distanceVal = iterateToSeek(Data[projectZipCode]["state"], "Dist to Bakersfield CA", "state");
  console.log(distanceVal);
  let nonMilkingVal = animalCount * 0.15;
  let resultArray = [stateVal, distanceVal, nonMilkingVal];
  updateUI(resultArray);
  // Find the data in DATABASE using project zip-code
  calculatePreBcsMethane();
  calculatePostBcsManuareYield();
  calculateBiogasFieldQuantity();
  calculateRNGYield();
  calculateEnergyUsage();
  CIScoreCalculation();
  consoleTheHiddenValues();
}
function calculatePreBcsMethane() {
  let projectZipCode = document.getElementById("projectZipCode").value * 1;
  let preBCS = document.getElementById("preBCS").value / 100;
  let animalCount = document.getElementById("animalCount").value * 1;
  let nonMilkingVal = animalCount * 0.15;

  let volatileSolid = (2050.54 * animalCount + 1111.25 * nonMilkingVal) * preBCS;
  let convertedVolatile = volatileSolid * 2.2046226218;
  let volatileSolidDegraded = volatileSolid *  iterateToSeek(Data[projectZipCode]["state"],'Manure Degredation Factor','state')
  * 1;
  let convertedVolatileSolidDegraded = volatileSolidDegraded * 2.2046226218;
  let baselineMethaneEmission = volatileSolidDegraded * 0.000163;

  document.getElementById("volatileSolidDegraded").value = formateNumber(volatileSolidDegraded);
  document.getElementById("baselineMethaneEmission").value = formateNumber(baselineMethaneEmission);
  calculatedResultValues[0] = animalCount;
  calculatedResultValues[1] = nonMilkingVal;
  calculatedResultValues[2] = volatileSolid;
  calculatedResultValues[3] = convertedVolatile;
  calculatedResultValues[4] = convertedVolatileSolidDegraded;
  calculatedResultValues[5] = baselineMethaneEmission;
}
function calculatePostBcsManuareYield() {
  let animalCount = document.getElementById("animalCount").value * 1;
  let nonMilkingVal = animalCount * 0.15;
  let manurePerDiaryCow = document.getElementById("manurePerDiaryCow").value * 1;
  let manurePerNonMilkingCow = document.getElementById("manurePerNonMilkingCow").value * 1;
  let postBcsManure = document.getElementById("postBcsManure").value / 100;
  let gtpcfm = document.getElementById("gtpcfm").value * 1;
  let totalSolid = document.getElementById("totalSolid").value / 100;
  let volatileSolidAsPercentage = document.getElementById("volatileSolidAsPercentage").value / 100;
  let assumedVolatileSolidDes = document.getElementById("assumedVolatileSolidDes").value / 100;
  let biogasYield = document.getElementById("biogasYield").value * 1;
  let volumeOfManureSent =
    (manurePerDiaryCow * animalCount + nonMilkingVal * manurePerNonMilkingCow) * postBcsManure;
  let manureDailyQuantity = volumeOfManureSent * gtpcfm;
  let dailyTotalSolid = manureDailyQuantity * totalSolid;
  let dailyVolatileSolid = manureDailyQuantity * totalSolid * volatileSolidAsPercentage;
  let volatileSolidDesPerDay = dailyVolatileSolid * assumedVolatileSolidDes;

  document.getElementById("volumeOfManureSent").value = formateNumber(volumeOfManureSent);
  document.getElementById("manureDailyQuantity").value = formateNumber(manureDailyQuantity);
  document.getElementById("dailyTotalSolid").value = formateNumber(dailyTotalSolid);
  document.getElementById("dailyVolatileSolid").value = formateNumber(dailyVolatileSolid);
  document.getElementById("volatileSolidDesPerDay").value = formateNumber(volatileSolidDesPerDay);
  calculatedResultValues[6] = volumeOfManureSent;
  calculatedResultValues[7] = manureDailyQuantity;
  calculatedResultValues[8] = dailyTotalSolid;
  calculatedResultValues[9] = dailyVolatileSolid;
  calculatedResultValues[10] = volatileSolidDesPerDay;
}
function calculateBiogasFieldQuantity() {
  let biogasYield = document.getElementById("biogasYield").value * 1;
  let biogasMethaneContent = document.getElementById("biogasMethaneContent").value / 100;
  let biogasDailyQuantity = calculatedResultValues[10] * biogasYield;
  let Biogas_daily_quantity_per_animal = biogasDailyQuantity / (calculatedResultValues[0] * 1.15);
  let Biogas_quantity_per_minute = biogasDailyQuantity / 1440;
  let Biogas_methane_mass_per_day = biogasDailyQuantity * biogasMethaneContent * 0.0000192;
  let Biogas_energy_created_per_day = Biogas_methane_mass_per_day * 52.6042;
  let Biogas_mass_of_methane_created_per_year = Biogas_methane_mass_per_day * 365.25;

  document.getElementById("biogasDailyQuantity").value = formateNumber(biogasDailyQuantity);
  calculatedResultValues[11] = biogasDailyQuantity;
  calculatedResultValues[12] = Biogas_daily_quantity_per_animal;
  calculatedResultValues[13] = Biogas_quantity_per_minute;
  calculatedResultValues[14] = Biogas_methane_mass_per_day;
  calculatedResultValues[15] = Biogas_energy_created_per_day;
  calculatedResultValues[16] = Biogas_mass_of_methane_created_per_year;
}
function calculateRNGYield() {
  let biogasMethaneContent = document.getElementById("biogasMethaneContent").value / 100;
  let upgradingEffectiveness = document.getElementById("upgradingEffectiveness").value / 100;
  let methaneLostAsTail = document.getElementById("methaneLostAsTail").value / 100;
  let rngDailyEnergy = calculatedResultValues[15] * (1 - methaneLostAsTail) * 0.9;
  let Tail_gas_and_curtailed_biogas_which_is_flared =
    methaneLostAsTail * calculatedResultValues[15] + (rngDailyEnergy / 0.9 - rngDailyEnergy);
  let RNG_annual_energy = rngDailyEnergy * 365.25;

  let CI_of_tail_gas_and_curtailed_biogas_which_is_flared =
    (Tail_gas_and_curtailed_biogas_which_is_flared * 20925) / RNG_annual_energy;
  let rngDailyQuantity =
    (calculatedResultValues[11] * biogasMethaneContent * (1 - methaneLostAsTail)) /
    upgradingEffectiveness;
  let RNG_minute_quantity = rngDailyQuantity / (24 * 60);
  let RNG_energy_density = 1010 * upgradingEffectiveness;
  let RNG_annual_production = RNG_annual_energy / 52.6042;

  document.getElementById("rngDailyQuantity").value = formateNumber(rngDailyQuantity);
  document.getElementById("rngDailyEnergy").value = formateNumber(rngDailyEnergy);
  calculatedResultValues[17] = Tail_gas_and_curtailed_biogas_which_is_flared;
  calculatedResultValues[18] = CI_of_tail_gas_and_curtailed_biogas_which_is_flared;
  calculatedResultValues[19] = rngDailyQuantity;
  calculatedResultValues[20] = RNG_minute_quantity;
  calculatedResultValues[21] = RNG_energy_density;
  calculatedResultValues[22] = rngDailyEnergy;
  calculatedResultValues[23] = RNG_annual_energy;
  calculatedResultValues[24] = RNG_annual_production;
}
function calculateEnergyUsage() {
  let projectZipCode = document.getElementById("projectZipCode").value * 1;

  let electricGrid = Data[projectZipCode]["eGrid Name"];
  let fuelGasEnergy = document.getElementById("fuelGasEnergy").value * 1;
  let Energy_used_fuel_daily = (fuelGasEnergy * calculatedResultValues[22]) / 0.9;
  let fuelGasEnergyAnam = Energy_used_fuel_daily * 365.25;
  let Natural_gas_mass_used_from_grid = 0.0674 * fuelGasEnergyAnam;
  let CI_grid_natural_gas = (Natural_gas_mass_used_from_grid * 1052) / calculatedResultValues[23];
  let gridElectricityPurchased = document.getElementById("gridElectricityPurchased").value * 1;
  let calculatedGridElectricityUsage0 = gridElectricityPurchased * calculatedResultValues[22];
  let calculatedGridElectricityUsage = calculatedGridElectricityUsage0 * 365.25;
  let calculatedGridElectricityUsage1 =
    iterateToSeek(electricGrid, "eGrid Energy Factor", "eGrid Name") *
    calculatedGridElectricityUsage;
  let CI_Grid_Electricity = (calculatedGridElectricityUsage1 * 1052) / calculatedResultValues[23];
  let Digester_leakage_and_uncontrolled_venting_as_a_percent_of_thruput = 0.02;
  let Digester_leakage =
    (calculatedResultValues[14] /
      (1 - Digester_leakage_and_uncontrolled_venting_as_a_percent_of_thruput) -
      calculatedResultValues[14]) *
    365.25;
  let CI_digester_leakage = (Digester_leakage / calculatedResultValues[23]) * 26306;
  let Uncontrolled_and_fugitive_methane = calculatedResultValues[14] * 7.3065;
  let CI_uncontrolled_and_fugitive_methane =
    (Uncontrolled_and_fugitive_methane / calculatedResultValues[23]) * 26306;
  let Post_BCS_digestate_sent_to_lagoon = 1;
  let avgAnnualTemp = iterateToSeek(
    Data[projectZipCode]["state"],
    "State Avg. Annual Temp (oC)",
    "state"
  );
  let covAvgAnTemp =
    avgAnnualTemp.toString().replace("≤", "") * 1 <= 10
      ? "≤" + ((+avgAnnualTemp.toString().replace("≤", "") * 9) / 5 + 32)
      : (+avgAnnualTemp.toString().replace("≤", "") * 9) / 5 + 32;
  let digestateLagoonEmission =
    (1684 * calculatedResultValues[0] + 907 * calculatedResultValues[1]) *
    Post_BCS_digestate_sent_to_lagoon *
    0.0000745 *
    iterateToSeek(
      Data[projectZipCode]["state"],
      "Methane Conversion Factor Liquid/Slurry Uncovered ",
      "state"
    );

  let Biomethane_Transmission_to_CNG_Facility =
    (0.000005224 * iterateToSeek(Data[projectZipCode]["state"], "Dist to Bakersfield CA", "state") +
      0.00039857) *
    calculatedResultValues[23];
  let CI_Biomethane_Transmission_to_CNG_Facility =
    (Biomethane_Transmission_to_CNG_Facility * 1052) / calculatedResultValues[23];
  let CI_LNG_or_CNG_Production = 3.496;
  let Tailpipe_emissions = calculatedResultValues[23] * 0.05771;
  let CI_tailpipe_emissions = 60.73;
  document.getElementById("electricGrid").value = electricGrid;
  document.getElementById("fuelGasEnergyAnam").value = formateNumber(fuelGasEnergyAnam);
  document.getElementById("calculatedGridElectricityUsage").value = formateNumber(
    calculatedGridElectricityUsage
  );
  document.getElementById("calculatedGridElectricityUsage1").value = formateNumber(
    calculatedGridElectricityUsage1
  );
  document.getElementById("avgAnnualTemp").value = avgAnnualTemp;
  document.getElementById("covAvgAnTemp").value = covAvgAnTemp;
  document.getElementById("digestateLagoonEmission").value = formateNumber(digestateLagoonEmission);
  calculatedResultValues[25] = electricGrid;
  calculatedResultValues[26] = fuelGasEnergy;
  calculatedResultValues[27] = Energy_used_fuel_daily;
  calculatedResultValues[28] = fuelGasEnergyAnam;
  calculatedResultValues[29] = Natural_gas_mass_used_from_grid;
  calculatedResultValues[30] = CI_grid_natural_gas;
  calculatedResultValues[31] = gridElectricityPurchased;
  calculatedResultValues[32] = calculatedGridElectricityUsage0;
  calculatedResultValues[33] = calculatedGridElectricityUsage;
  calculatedResultValues[34] = calculatedGridElectricityUsage1;
  calculatedResultValues[35] = Digester_leakage_and_uncontrolled_venting_as_a_percent_of_thruput;
  calculatedResultValues[36] = Digester_leakage;
  calculatedResultValues[37] = CI_digester_leakage;
  calculatedResultValues[38] = Uncontrolled_and_fugitive_methane;
  calculatedResultValues[39] = CI_uncontrolled_and_fugitive_methane;
  calculatedResultValues[40] = Post_BCS_digestate_sent_to_lagoon;
  calculatedResultValues[41] = CI_Biomethane_Transmission_to_CNG_Facility;
  calculatedResultValues[42] = CI_LNG_or_CNG_Production;
  calculatedResultValues[43] = Tailpipe_emissions;
  calculatedResultValues[44] = CI_tailpipe_emissions;
  calculatedResultValues[45] = digestateLagoonEmission;
  calculatedResultValues[46] = CI_Grid_Electricity;
}
function CIScoreCalculation() {
  let Methane_emissions = calculatedResultValues[45] + calculatedResultValues[36];
  let Avoided_methane_emissions = Methane_emissions - calculatedResultValues[5];
  let Avoided_methane_emissions_per_MJ_of_RNG_sold =
    (Avoided_methane_emissions / calculatedResultValues[24]) * 500;
  let CO2_diverted =
    ((calculatedResultValues[5] - calculatedResultValues[16]) / calculatedResultValues[24]) * 54.99;
  let ciScore =
    (Avoided_methane_emissions_per_MJ_of_RNG_sold +
      CO2_diverted +
      calculatedResultValues[30] +
      calculatedResultValues[46] +
      calculatedResultValues[39] +
      calculatedResultValues[18]) *
      1.00673 +
    calculatedResultValues[41] +
    calculatedResultValues[42] +
    calculatedResultValues[44];
  console.log(
    Methane_emissions,
    Avoided_methane_emissions,
    Avoided_methane_emissions_per_MJ_of_RNG_sold,
    CO2_diverted
  );

  document.getElementById("ciScore").value = formateNumber(ciScore);
}
function zipCodeInputAnimation() {
  let isFocused = document.getElementById("projectZipCode").focus;
  document.getElementById("loader").style.display = "none";
  document.getElementById("close").style.display = "none";
  document.getElementById("tick").style.display = "none";
  if (isFocused) {
    let val = document.getElementById("projectZipCode").value;
    if (val) document.getElementById("loader").style.display = "block";
  }
}
function checkZipCodeInDataBase() {
  let zipCode = document.getElementById("projectZipCode").value;
  if (Data[zipCode]) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("close").style.display = "none";
    document.getElementById("tick").style.display = "block";
    hideError("projectZipCodeError");
    calculate();
  } else if (!Data[zipCode]) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("close").style.display = "block";
    document.getElementById("tick").style.display = "none";
    displayError("projectZipCodeError");
  }
}
function updateUI(resultArray) {
  document.getElementById("state").value = resultArray[0];
  document.getElementById("distance").value = formateNumber(resultArray[1]);
  document.getElementById("non-milkingAnimalCount").value = formateNumber(resultArray[2]);
}
function displayError(id) {
  document.getElementById(id).style.display = "block";
}
function hideError(id) {
  document.getElementById(id).style.display = "none";
}
function inputValFormatting(ele) {
  let val = ele.value.replace(/,/g, "").replace("$", "") * 1;
  ele.value = formateNumber(val);
}
function iterateToSeek(val, needed, from) {
  for (let x = 0; x < forSomeData.length; x++) {
    if (Data[forSomeData[x]][from] == val) return Data[forSomeData[x]][needed];
  }
}
console.log(Data.key);
function formateNumber(val) {
  if (isNaN(val)) return 0;
  if (!isFinite(val)) return 0;
  return numberWithCommas(Math.round(val));
}

function numberWithCommas(x) {
  return x.toString().split(".")[0].length > 3
    ? x
        .toString()
        .substring(0, x.toString().split(".")[0].length - 3)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "," +
        x.toString().substring(x.toString().split(".")[0].length - 3)
    : x.toString();
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl);
});
let avgAnnualTemp = iterateToSeek("Wyoming", "State Avg. Annual Temp (oC)", "state");

function consoleTheHiddenValues() {
  console.log("////////////////////////////////////////////////////////");
  console.log("VALUES THAT ARE NOT VISIBLE TO USERS:");
  console.log("////////////////////////////////////////////////////////");

  console.log(
    `${calculatedResultValues[0]} = animalCount\n${calculatedResultValues[1]} = nonMilkingVal\n${calculatedResultValues[2]} = volatileSolid\n${calculatedResultValues[3]} = convertedVolatile\n${calculatedResultValues[4]} = convertedVolatileSolidDegraded\n${calculatedResultValues[5]} = baselineMethaneEmission\n${calculatedResultValues[6]} = volumeOfManureSent\n${calculatedResultValues[7]} = manureDailyQuantity\n${calculatedResultValues[8]} = dailyTotalSolid\n${calculatedResultValues[9]} = dailyVolatileSolid\n${calculatedResultValues[10]} = volatileSolidDesPerDay\n${calculatedResultValues[11]} = biogasDailyQuantity\n${calculatedResultValues[12]} = Biogas_daily_quantity_per_animal\n${calculatedResultValues[13]} = Biogas_quantity_per_minute\n${calculatedResultValues[14]} = Biogas_methane_mass_per_day\n${calculatedResultValues[15]} = Biogas_energy_created_per_day\n${calculatedResultValues[16]} = Biogas_mass_of_methane_created_per_year\n${calculatedResultValues[17]} = Tail_gas_and_curtailed_biogas_which_is_flared\n${calculatedResultValues[18]} = CI_of_tail_gas_and_curtailed_biogas_which_is_flared\n${calculatedResultValues[19]} = rngDailyQuantity\n${calculatedResultValues[20]} = RNG_minute_quantity\n${calculatedResultValues[21]} = RNG_energy_density\n${calculatedResultValues[22]} = rngDailyEnergy\n${calculatedResultValues[23]} = RNG_annual_energy\n${calculatedResultValues[24]} = RNG_annual_production\n${calculatedResultValues[25]} = electricGrid\n${calculatedResultValues[26]} = fuelGasEnergy\n${calculatedResultValues[27]} = Energy_used_fuel_daily\n${calculatedResultValues[28]} = fuelGasEnergyAnam\n${calculatedResultValues[29]} = Natural_gas_mass_used_from_grid\n${calculatedResultValues[30]} = CI_grid_natural_gas\n${calculatedResultValues[31]} = gridElectricityPurchased\n${calculatedResultValues[32]} = calculatedGridElectricityUsage0\n${calculatedResultValues[33]} = calculatedGridElectricityUsage\n${calculatedResultValues[34]} = calculatedGridElectricityUsage1\n${calculatedResultValues[35]} = Digester_leakage_and_uncontrolled_venting_as_a_percent_of_thruput\n${calculatedResultValues[36]} = Digester_leakage\n${calculatedResultValues[37]} = CI_digester_leakage\n${calculatedResultValues[38]} = Uncontrolled_and_fugitive_methane\n${calculatedResultValues[39]} = CI_uncontrolled_and_fugitive_methane\n${calculatedResultValues[40]} = Post_BCS_digestate_sent_to_lagoon\n${calculatedResultValues[41]} = CI_Biomethane_Transmission_to_CNG_Facility\n${calculatedResultValues[42]} = CI_LNG_or_CNG_Production\n${calculatedResultValues[43]} = Tailpipe_emissions\n${calculatedResultValues[44]} = CI_tailpipe_emissions\n${calculatedResultValues[45]} = digestateLagoonEmission\n${calculatedResultValues[46]} = CI_Grid_Electricity\n`
  );
}
