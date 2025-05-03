// app.js - Main navigation and functionality controller

// Global variables for app state
const app = {
  currentScreen: "tela_principal.html",
  altura: 0,
  pressao: 101.325,
  idioma: "pt-BR",
  pontosGrafico: [],
};

// Function to navigate between screens
function navigateTo(screenName) {
  console.log("Navigating to: " + screenName);

  // Save current app state if needed
  saveAppState();

  // Load the requested screen
  loadScreen(screenName);
}

// Function to save app state
function saveAppState() {
  // Save altitude and pressure from main screen if present
  const alturaInput = document.getElementById("altura");
  const pressaoInput = document.getElementById("pressao");

  if (alturaInput) app.altura = parseFloat(alturaInput.value) || 0;
  if (pressaoInput) app.pressao = parseFloat(pressaoInput.value) || 101.325;
}

// Function to load a screen
function loadScreen(screenName) {
  // Simulate screen loading by changing window location
  // In a real implementation, this would fetch the HTML and replace content
  window.location.href = screenName;
}

// Initialize app when document is ready
document.addEventListener("DOMContentLoaded", function () {
  // Set event listeners for navigation buttons
  setupEventListeners();

  // Apply current app state
  applyAppState();
});

// Setup all event listeners
function setupEventListeners() {
  // Main menu navigation buttons
  setupMainMenuListeners();

  // Back buttons
  setupBackButtons();

  // Screen-specific listeners
  setupScreenSpecificListeners();
}

// Setup listeners for main menu buttons
function setupMainMenuListeners() {
  const pontoEstadoBtn = document.getElementById("pontoEstado");
  const condicoesPsicometricasBtn = document.getElementById(
    "condicaoPsicometrica"
  );
  const processosBtn = document.getElementById("processosMain");
  const umidadeEqBtn = document.getElementById("umidadeEqBtn");

  if (pontoEstadoBtn) {
    pontoEstadoBtn.addEventListener("click", function () {
      navigateTo("tela_ponto_estado.html");
    });
  }

  if (condicoesPsicometricasBtn) {
    condicoesPsicometricasBtn.addEventListener("click", function () {
      navigateTo("tela_analise_psicometrica.html");
    });
  }

  if (processosBtn) {
    processosBtn.addEventListener("click", function () {
      navigateTo("tela_modificacao_de_processos.html");
    });
  }

  if (umidadeEqBtn) {
    umidadeEqBtn.addEventListener("click", function () {
      navigateTo("tela_umidade_equilibrio.html");
    });
  }
}

// Setup back button listeners
function setupBackButtons() {
  const backButtons = document.querySelectorAll(".back-button");

  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      navigateTo("tela_principal.html");
    });
  });
}

// Apply the current app state to the screen
function applyAppState() {
  // Set altitude and pressure values if inputs exist
  const alturaInput = document.getElementById("altura");
  const pressaoInput = document.getElementById("pressao");

  if (alturaInput) alturaInput.value = app.altura;
  if (pressaoInput) pressaoInput.value = app.pressao;
}

// Setup screen-specific event listeners based on current screen
function setupScreenSpecificListeners() {
  // Get current screen name from URL
  const currentScreen = window.location.href.split("/").pop();

  switch (currentScreen) {
    case "tela_principal.html":
      setupMainScreenListeners();
      break;
    case "tela_ponto_estado.html":
      setupPontoEstadoListeners();
      break;
    case "tela_analise_psicometrica.html":
      setupAnaliseListeners();
      break;
    case "tela_carta_psicometrica.html":
      setupCartaListeners();
      break;
    case "tela_modificacao_de_processos.html":
      setupProcessosListeners();
      break;
    case "tela_umidade_equilibrio.html":
      setupUmidadeListeners();
      break;
    case "tela_quebra_e_perda.html":
      setupQuebraListeners();
      break;
    case "tela_selecao_idiomas.html":
      setupIdiomasListeners();
      break;
    case "tela_sobre.html":
      setupSobreListeners();
      break;
  }
}

// Main screen specific listeners
function setupMainScreenListeners() {
  const menuButton = document.getElementById("menuButton");
  const menuOverlay = document.getElementById("menuOverlay");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      const sideMenu = document.getElementById("sideMenu");
      if (sideMenu) {
        sideMenu.classList.add("open");
        if (menuOverlay) menuOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", function () {
      const sideMenu = document.getElementById("sideMenu");
      if (sideMenu) {
        sideMenu.classList.remove("open");
        menuOverlay.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // Adicione isso para configurar os event listeners dos cards
  document.querySelectorAll(".nav-card").forEach(function (card, index) {
    card.addEventListener("click", function () {
      const screens = [
        "tela_ponto_estado.html",
        "tela_analise_psicometrica.html",
        "tela_modificacao_de_processos.html",
        "tela_umidade_equilibrio.html",
      ];
      window.location.href = screens[index];
    });
  });
}

// Ponto Estado screen listeners and functionality
function setupPontoEstadoListeners() {
  const calcularBtn = document.getElementById("calcular");
  const limparBtn = document.getElementById("limpa");

  if (calcularBtn) {
    calcularBtn.addEventListener("click", function () {
      calcularPontoEstado();
    });
  }

  if (limparBtn) {
    limparBtn.addEventListener("click", function () {
      limparPontoEstado();
    });
  }
}

// Calculate state point properties
function calcularPontoEstado() {
  // Get input values
  const tempBulbSeco =
    parseFloat(document.getElementById("tempSeco").value) || 0;
  const tempBulbUmido = document.getElementById("tempUmido").value;
  const tempPontoOrvalho = document.getElementById("tempOrvalho").value;
  const umidade = document.getElementById("umidadeRel").value;
  const razao = document.getElementById("razaoMistura").value;
  const entalpia = document.getElementById("entalpia").value;
  const volume = document.getElementById("volumeEspecifico").value;

  // Check if dry bulb temp and at least one other parameter is provided
  if (
    isNaN(tempBulbSeco) ||
    (!tempBulbUmido &&
      !tempPontoOrvalho &&
      !umidade &&
      !razao &&
      !entalpia &&
      !volume)
  ) {
    alert(
      "É preciso informar a temperatura de bulbo seco e pelo menos mais um parâmetro!"
    );
    return;
  }

  // Simulate calculation (in a real app, this would call the psychrometric calculation functions)
  // For demonstration, we'll use simplified calculations

  // Calculate properties based on available inputs
  let calculatedValues = {
    tempBulbUmido: tempBulbUmido || (0.7 * tempBulbSeco + 4.2).toFixed(1),
    tempPontoOrvalho: tempPontoOrvalho || (0.6 * tempBulbSeco - 2.3).toFixed(1),
    umidade: umidade || (65 + Math.random() * 10).toFixed(1),
    razao: razao || (0.01 + tempBulbSeco / 1000).toFixed(4),
    entalpia: entalpia || (tempBulbSeco * 1.006 + 30).toFixed(1),
    volume: volume || (0.83 + tempBulbSeco / 100).toFixed(3),
    pressaoVaporSat: (3 + tempBulbSeco / 10).toFixed(2),
    pressaoVaporParcial: (2 + tempBulbSeco / 15).toFixed(2),
  };

  // Update output fields
  document.getElementById("tempUmido").value = calculatedValues.tempBulbUmido;
  document.getElementById("tempOrvalho").value =
    calculatedValues.tempPontoOrvalho;
  document.getElementById("umidadeRel").value = calculatedValues.umidade;
  document.getElementById("razaoMistura").value = calculatedValues.razao;
  document.getElementById("entalpia").value = calculatedValues.entalpia;
  document.getElementById("volumeEspecifico").value = calculatedValues.volume;
  document.getElementById("pressaoVapoSat").textContent =
    calculatedValues.pressaoVaporSat;
  document.getElementById("pressaoVapParc").textContent =
    calculatedValues.pressaoVaporParcial;

  // Change button text to show chart option
  calcularBtn.textContent = "Ver Carta";
  calcularBtn.onclick = function () {
    // Save the point data for the chart
    app.pontosGrafico = [
      {
        tbs: tempBulbSeco,
        tbu: calculatedValues.tempBulbUmido,
        ur: calculatedValues.umidade,
        rm: calculatedValues.razao,
        et: calculatedValues.entalpia,
        ve: calculatedValues.volume,
        tpo: calculatedValues.tempPontoOrvalho,
      },
    ];

    // Navigate to chart screen
    navigateTo("tela_carta_psicometrica.html");
  };
}

// Clear all fields
function limparPontoEstado() {
  document.getElementById("tempSeco").value = "";
  document.getElementById("tempUmido").value = "";
  document.getElementById("tempOrvalho").value = "";
  document.getElementById("umidadeRel").value = "";
  document.getElementById("razaoMistura").value = "";
  document.getElementById("entalpia").value = "";
  document.getElementById("volumeEspecifico").value = "";
  document.getElementById("pressaoVapoSat").textContent = "";
  document.getElementById("pressaoVapParc").textContent = "";

  // Reset button text and function
  const calcularBtn = document.getElementById("calcular");
  calcularBtn.textContent = "Calcular";
  calcularBtn.onclick = calcularPontoEstado;
}

// Análise Psicrométrica screen listeners and functionality
function setupAnaliseListeners() {
  const calcularBtn = document.getElementById("calcularCondBtn");
  const visualizarBtn = document.getElementById("voltarCondBtn");
  const limparBtn = document.getElementById("limparCondBtn");

  if (calcularBtn) {
    calcularBtn.addEventListener("click", function () {
      calcularCondicoes();
    });
  }

  if (visualizarBtn) {
    visualizarBtn.addEventListener("click", function () {
      navigateTo("tela_carta_psicometrica.html");
    });
  }

  if (limparBtn) {
    limparBtn.addEventListener("click", function () {
      limparCondicoes();
    });
  }

  // Adicionar este código para gerenciar as tabs
  const tabs = document.querySelectorAll(".tabs .tab");
  if (tabs.length > 0) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        // Remover a classe 'active' de todas as tabs
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });

        // Adicionar a classe 'active' à tab clicada
        this.classList.add("active");

        // Mostrar o conteúdo correspondente à tab selecionada
        // Precisa ser implementado dependendo da estrutura dos conteúdos
        const tabContent = this.textContent.trim();
        showTabContent(tabContent);
      });
    });
  }
}

// Função para mostrar o conteúdo da tab selecionada
function showTabContent(tabName) {
  // Ocultar todas as seções de resultados
  document.querySelectorAll(".result-section").forEach(function (section) {
    section.style.display = "none";
  });

  // Atualizar os pontos no diagrama de processo
  document.querySelectorAll(".process-point").forEach(function (point) {
    point.classList.remove("active");
  });

  // Mostrar a seção apropriada baseada na tab selecionada
  switch (tabName) {
    case "AMBIENTE":
      document.getElementById("ambiente-results").style.display = "block";
      document.querySelector(".point-ambient").classList.add("active");
      break;
    case "SECAGEM":
      document.getElementById("secagem-results").style.display = "block";
      document.querySelector(".point-drying").classList.add("active");
      break;
    case "EXAUSTÃO":
      document.getElementById("exaustao-results").style.display = "block";
      document.querySelector(".point-exhaust").classList.add("active");
      break;
  }
}

// Calculate psychrometric conditions
function calcularCondicoes() {
  // Get input values
  const tbsAmb = parseFloat(document.getElementById("tempAmb").value) || 0;
  const urAmb = parseFloat(document.getElementById("umidadeAmb").value) || 0;
  const tbsSec = parseFloat(document.getElementById("tempSecagem").value) || 0;
  const tbsExa = parseFloat(document.getElementById("tempExaust").value) || 0;

  // Check if all parameters are provided
  if (isNaN(tbsAmb) || isNaN(urAmb) || isNaN(tbsSec) || isNaN(tbsExa)) {
    alert("Preencha todos os campos!");
    return;
  }

  // Simulate calculations for the three points: ambient, drying, exhaust
  // In a real app, this would use the psychrometric calculation functions

  // Point 1 - Ambient
  const point1 = {
    tbs: tbsAmb,
    tbu: (tbsAmb * 0.8).toFixed(1),
    ur: urAmb,
    rm: (0.01 + tbsAmb / 1000).toFixed(3),
    ve: (0.83 + tbsAmb / 100).toFixed(3),
    et: (tbsAmb * 1.006 + 30).toFixed(1),
    tpo: (tbsAmb * 0.6 - 2).toFixed(1),
    ps: (3 + tbsAmb / 10).toFixed(2),
    pv: ((urAmb * (3 + tbsAmb / 10)) / 100).toFixed(2),
  };

  // Point 2 - Drying
  const point2 = {
    tbs: tbsSec,
    tbu: (tbsSec * 0.6).toFixed(1),
    ur: (urAmb * 0.2).toFixed(1),
    rm: point1.rm, // Same mixing ratio in heating
    ve: (0.83 + tbsSec / 70).toFixed(3),
    et: (tbsSec * 1.01 + 30).toFixed(1),
    tpo: point1.tpo, // Same dew point in heating
    ps: (3 + tbsSec / 8).toFixed(2),
    pv: ((urAmb * 0.2 * (3 + tbsSec / 8)) / 100).toFixed(2),
  };

  // Point 3 - Exhaust
  const point3 = {
    tbs: tbsExa,
    tbu: (tbsExa * 0.7).toFixed(1),
    ur: (30 + Math.random() * 10).toFixed(1),
    rm: (parseFloat(point1.rm) + 0.002).toFixed(3),
    ve: (0.83 + tbsExa / 90).toFixed(3),
    et: point2.et, // Same enthalpy in adiabatic cooling
    tpo: (tbsExa * 0.5 - 1).toFixed(1),
    ps: (3 + tbsExa / 9).toFixed(2),
    pv: ((3 + tbsExa / 9) * 0.4).toFixed(2),
  };

  // Update all output fields
  updateAnalisePoint("1", point1);
  updateAnalisePoint("2", point2);
  updateAnalisePoint("3", point3);

  // Save points for the chart
  app.pontosGrafico = [point1, point2, point3];

  // Enable the chart button
  document.getElementById("voltarCondBtn").disabled = false;
}

// Update the fields for a specific point
function updateAnalisePoint(pointNum, data) {
  document.getElementById("tempSeco" + pointNum).textContent = data.tbs;
  document.getElementById("tempUmido" + pointNum).textContent = data.tbu;
  document.getElementById("umidadeRel" + pointNum).textContent = data.ur;
  document.getElementById("razao" + pointNum).textContent = data.rm;
  document.getElementById("pressao" + pointNum).textContent = data.ps;
  document.getElementById("pressaoVap" + pointNum).textContent = data.pv;
  document.getElementById("entalpia" + pointNum).textContent = data.et;
  document.getElementById("pontoOrv" + pointNum).textContent = data.tpo;
  document.getElementById("volEsp" + pointNum).textContent = data.ve;
}

// Clear all fields
function limparCondicoes() {
  // Clear input fields
  document.getElementById("tempAmb").value = "";
  document.getElementById("umidadeAmb").value = "";
  document.getElementById("tempSecagem").value = "";
  document.getElementById("tempExaust").value = "";

  // Clear result fields for all three points
  for (let i = 1; i <= 3; i++) {
    document.getElementById("tempSeco" + i).textContent = "0.0";
    document.getElementById("tempUmido" + i).textContent = "0.0";
    document.getElementById("umidadeRel" + i).textContent = "0.0";
    document.getElementById("razao" + i).textContent = "0.0";
    document.getElementById("pressao" + i).textContent = "0.0";
    document.getElementById("pressaoVap" + i).textContent = "0.0";
    document.getElementById("entalpia" + i).textContent = "0.0";
    document.getElementById("pontoOrv" + i).textContent = "0.0";
    document.getElementById("volEsp" + i).textContent = "0.0";
  }

  // Disable the chart button
  document.getElementById("voltarCondBtn").disabled = true;
}

// Process Modification screen listeners and functionality
function setupProcessosListeners() {
  const processosSpinner = document.getElementById("processosSpinner");
  const calcularBtn = document.getElementById("calcProcessos");
  const visualizarBtn = document.getElementById("visualizarCarta");

  if (processosSpinner) {
    processosSpinner.addEventListener("change", function () {
      updateProcessFields(this.selectedIndex);
    });
  }

  if (calcularBtn) {
    calcularBtn.addEventListener("click", function () {
      calcularProcessos();
    });
  }

  if (visualizarBtn) {
    visualizarBtn.addEventListener("click", function () {
      navigateTo("tela_carta_psicometrica.html");
    });
  }

  // Initialize the process fields based on the default selection
  if (processosSpinner) {
    updateProcessFields(processosSpinner.selectedIndex);
  }
}

// Update visible fields based on selected process
function updateProcessFields(processIndex) {
  const prop4Linear = document.getElementById("prop4Linear");
  const prop5Linear = document.getElementById("prop5Linear");
  const prop6Linear = document.getElementById("prop6Linear");
  const linearProcessos3 = document.getElementById("linearProcessos3");
  const linearText3 = document.getElementById("linearTextProcessos3");

  switch (processIndex) {
    case 0: // Mixing of two air flows
      // Show all fields
      prop4Linear.style.display = "flex";
      prop5Linear.style.display = "flex";
      prop6Linear.style.display = "flex";
      linearProcessos3.style.display = "flex";
      linearText3.style.display = "flex";

      // Update labels
      document.getElementById("prop2Text").textContent =
        "Temp. Bulbo Seco °C - P2:";
      document.getElementById("prop3Text").textContent =
        "Umidade Relativa (%) - P1:";
      document.getElementById("prop4Text").textContent =
        "Umidade Relativa (%) - P2:";
      break;

    case 1: // Heating or Cooling
      // Hide unnecessary fields
      prop4Linear.style.display = "none";
      prop5Linear.style.display = "none";
      prop6Linear.style.display = "none";
      linearProcessos3.style.display = "none";
      linearText3.style.display = "none";

      // Update labels
      document.getElementById("prop2Text").textContent =
        "Temp. Bulbo Seco °C - P2:";
      document.getElementById("prop3Text").textContent =
        "Umidade Relativa (%) - P1:";
      break;

    case 2: // Adiabatic Humidification
      // Hide unnecessary fields
      prop4Linear.style.display = "none";
      prop5Linear.style.display = "none";
      prop6Linear.style.display = "none";
      linearProcessos3.style.display = "none";
      linearText3.style.display = "none";

      // Update labels
      document.getElementById("prop2Text").textContent =
        "Umidade Relativa (%) - P1:";
      document.getElementById("prop3Text").textContent =
        "Umidade Relativa (%) - P2:";
      break;
  }
}

// Calculate process properties
function calcularProcessos() {
  const processosSpinner = document.getElementById("processosSpinner");
  const processIndex = processosSpinner.selectedIndex;

  // Get common input values
  const temSecoP1 = parseFloat(document.getElementById("prop1").value) || 0;
  const prop2Value = parseFloat(document.getElementById("prop2").value) || 0;
  const prop3Value = parseFloat(document.getElementById("prop3").value) || 0;

  // Check if required fields are filled
  if (isNaN(temSecoP1) || isNaN(prop2Value) || isNaN(prop3Value)) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  // Additional fields based on process type
  let prop4Value = 0,
    prop5Value = 0,
    prop6Value = 0;
  if (processIndex === 0) {
    prop4Value = parseFloat(document.getElementById("prop4").value) || 0;
    prop5Value = parseFloat(document.getElementById("prop5").value) || 0;
    prop6Value = parseFloat(document.getElementById("prop6").value) || 0;

    if (isNaN(prop4Value) || isNaN(prop5Value) || isNaN(prop6Value)) {
      alert("Preencha todos os campos para o processo de mistura!");
      return;
    }
  }

  // Simulate calculations based on process type
  let point1, point2, point3;

  // Point 1 - always calculated
  point1 = {
    tbs: temSecoP1,
    tbu: (temSecoP1 * 0.8).toFixed(1),
    ur: processIndex === 2 ? prop2Value : prop3Value,
    rm: (0.01 + temSecoP1 / 1000).toFixed(3),
    ve: (0.83 + temSecoP1 / 100).toFixed(3),
    et: (temSecoP1 * 1.006 + 30).toFixed(1),
    tpo: (temSecoP1 * 0.6 - 2).toFixed(1),
    ps: (3 + temSecoP1 / 10).toFixed(2),
    pv: (((3 + temSecoP1 / 10) * prop3Value) / 100).toFixed(2),
  };

  // Point 2 - varies by process
  switch (processIndex) {
    case 0: // Mixing
      point2 = {
        tbs: prop2Value,
        tbu: (prop2Value * 0.75).toFixed(1),
        ur: prop4Value,
        rm: (0.01 + prop2Value / 900).toFixed(3),
        ve: (0.83 + prop2Value / 90).toFixed(3),
        et: (prop2Value * 1.01 + 25).toFixed(1),
        tpo: (prop2Value * 0.55 - 3).toFixed(1),
        ps: (3 + prop2Value / 9).toFixed(2),
        pv: (((3 + prop2Value / 9) * prop4Value) / 100).toFixed(2),
      };
      break;

    case 1: // Heating/Cooling
      point2 = {
        tbs: prop2Value,
        tbu: (prop2Value * 0.6).toFixed(1),
        ur: (prop3Value * (temSecoP1 / prop2Value)).toFixed(1),
        rm: point1.rm, // Same mixing ratio in heating/cooling
        ve: (0.83 + prop2Value / 80).toFixed(3),
        et: (prop2Value * 1.01 + 30).toFixed(1),
        tpo: point1.tpo, // Same dew point in heating/cooling
        ps: (3 + prop2Value / 8).toFixed(2),
        pv: point1.pv, // Same vapor pressure
      };
      break;

    case 2: // Humidification
      point2 = {
        tbs: (temSecoP1 * 0.7).toFixed(1),
        tbu: (temSecoP1 * 0.65).toFixed(1),
        ur: prop3Value,
        rm: (parseFloat(point1.rm) + 0.003).toFixed(3),
        ve: (0.83 + (temSecoP1 * 0.7) / 90).toFixed(3),
        et: point1.et, // Same enthalpy in adiabatic humidification
        tpo: (temSecoP1 * 0.6).toFixed(1),
        ps: (3 + (temSecoP1 * 0.7) / 9).toFixed(2),
        pv: (((3 + (temSecoP1 * 0.7) / 9) * prop3Value) / 100).toFixed(2),
      };
      break;
  }

  // Point 3 - only for mixing process
  if (processIndex === 0) {
    // Calculate mixing result
    const p1Mass = prop5Value / parseFloat(point1.ve);
    const p2Mass = prop6Value / parseFloat(point2.ve);
    const totalMass = p1Mass + p2Mass;

    point3 = {
      tbs: ((temSecoP1 * p1Mass + prop2Value * p2Mass) / totalMass).toFixed(1),
      tbu: (
        (parseFloat(point1.tbu) * p1Mass + parseFloat(point2.tbu) * p2Mass) /
        totalMass
      ).toFixed(1),
      ur: (
        (parseFloat(point1.ur) * p1Mass + parseFloat(point2.ur) * p2Mass) /
        totalMass
      ).toFixed(1),
      rm: (
        (parseFloat(point1.rm) * p1Mass + parseFloat(point2.rm) * p2Mass) /
        totalMass
      ).toFixed(3),
      ve: (
        (parseFloat(point1.ve) * p1Mass + parseFloat(point2.ve) * p2Mass) /
        totalMass
      ).toFixed(3),
      et: (
        (parseFloat(point1.et) * p1Mass + parseFloat(point2.et) * p2Mass) /
        totalMass
      ).toFixed(1),
      tpo: (
        (parseFloat(point1.tpo) * p1Mass + parseFloat(point2.tpo) * p2Mass) /
        totalMass
      ).toFixed(1),
      ps: (
        (parseFloat(point1.ps) * p1Mass + parseFloat(point2.ps) * p2Mass) /
        totalMass
      ).toFixed(2),
      pv: (
        (parseFloat(point1.pv) * p1Mass + parseFloat(point2.pv) * p2Mass) /
        totalMass
      ).toFixed(2),
    };

    // Calculate total flow
    const totalFlow = (parseFloat(point3.ve) * totalMass).toFixed(1);
    document.getElementById("fluxoProcessos3").textContent = totalFlow;
  }

  // Update the UI with calculated values
  updateProcessosPoint("1", point1);
  updateProcessosPoint("2", point2);
  if (processIndex === 0 && point3) {
    updateProcessosPoint("3", point3);
  }

  // Save points for the chart
  app.pontosGrafico =
    processIndex === 0 ? [point1, point2, point3] : [point1, point2];

  // Enable the chart button
  document.getElementById("visualizarCarta").disabled = false;
}

// Update the fields for a specific process point
function updateProcessosPoint(pointNum, data) {
  document.getElementById("tempSecoProcessos" + pointNum).textContent =
    data.tbs;
  document.getElementById("tempUmidoProcessos" + pointNum).textContent =
    data.tbu;
  document.getElementById("umidadeRelProcessos" + pointNum).textContent =
    data.ur;
  document.getElementById("razaoProcessos" + pointNum).textContent = data.rm;
  document.getElementById("pressaoProcessos" + pointNum).textContent = data.ps;
  document.getElementById("pressaoVapProcessos" + pointNum).textContent =
    data.pv;
  document.getElementById("entalpiaProcessos" + pointNum).textContent = data.et;
  document.getElementById("pontoOrvProcessos" + pointNum).textContent =
    data.tpo;
  document.getElementById("volEspProcessos" + pointNum).textContent = data.ve;
}

// Equilibrium Humidity screen listeners and functionality
function setupUmidadeListeners() {
  const produtosSpinner = document.getElementById("produtorUmidEqSpinner");
  const tabelaBtn = document.getElementById("visualizarUmidEqBtn");
  const estadoBtn = document.getElementById("pontoUmidEqBtn");
  const calcularBtn = document.getElementById("calcularUmidEqBtn");
  const tabs = document.querySelectorAll(".tabs-container .tab");

  if (produtosSpinner) {
    produtosSpinner.addEventListener("change", function () {
      // Enable buttons only if a product is selected
      const buttonsEnabled = this.selectedIndex > 0;
      if (tabelaBtn) tabelaBtn.disabled = !buttonsEnabled;
      if (estadoBtn) estadoBtn.disabled = !buttonsEnabled;
    });
  }

  if (tabelaBtn) {
    tabelaBtn.addEventListener("click", function () {
      showUmidadeTable();
    });
  }

  if (estadoBtn) {
    estadoBtn.addEventListener("click", function () {
      showUmidadePoint();
    });
  }

  if (calcularBtn) {
    calcularBtn.addEventListener("click", function () {
      calcularUmidadeEquilibrio();
    });
  }

  if (tabs.length > 0) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        // Remover a classe 'active' de todas as abas
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });

        // Adicionar a classe 'active' à aba clicada
        this.classList.add("active");

        // Mostrar a seção correta baseada na aba clicada
        const tabId = this.getAttribute("data-tab");
        if (tabId === "tabela") {
          showUmidadeTable(); // Reutiliza sua função existente
        } else if (tabId === "ponto") {
          showUmidadePoint(); // Reutiliza sua função existente
        }
      });
    });
  }
}

// Show Equilibrium Humidity table
function showUmidadeTable() {
  const produtosSpinner = document.querySelector(".dropdown"); // Alterado para querySelector
  const produtoIndex = produtosSpinner.selectedIndex;

  if (produtoIndex === 0) {
    alert("Selecione um produto!");
    return;
  }

  // Ocultar seção do ponto, mostrar seção da tabela
  document.getElementById("ponto-section").style.display = "none";
  document.getElementById("tabela-section").style.display = "block";

  generateUmidadeTable(produtoIndex);
}

// Show Equilibrium Humidity point calculator
function showUmidadePoint() {
  const produtosSpinner = document.querySelector(".dropdown"); // Alterado para querySelector
  const produtoIndex = produtosSpinner.selectedIndex;

  if (produtoIndex === 0) {
    alert("Selecione um produto!");
    return;
  }

  // Ocultar seção da tabela, mostrar seção do ponto
  document.getElementById("ponto-section").style.display = "block";
  document.getElementById("tabela-section").style.display = "none";
}

// Calculate Equilibrium Humidity for specific conditions
function calcularUmidadeEquilibrio() {
  const produtosSpinner = document.getElementById("produtorUmidEqSpinner");
  const produtoIndex = produtosSpinner.selectedIndex;

  if (produtoIndex === 0) {
    alert("Selecione um produto!");
    return;
  }

  const temperatura =
    parseFloat(document.getElementById("temperaturaUmidEqTxt").value) || 0;
  const umidade =
    parseFloat(document.getElementById("umidadeUmidEqTxt").value) || 0;

  if (isNaN(temperatura) || isNaN(umidade)) {
    alert("Preencha temperatura e umidade relativa!");
    return;
  }

  // Simulate equilibrium humidity calculation
  // In a real app, this would use the equilibrium humidity calculation functions
  // Here we use a simplified formula based on the product and conditions
  const factorsByProduct = [
    0, 0.27, 0.25, 0.29, 0.28, 0.26, 0.24, 0.23, 0.22, 0.24, 0.25, 0.28, 0.27,
    0.26,
  ];
  const tempFactor = 1 - (temperatura - 20) / 100;

  const equilibriumHumidity = (
    factorsByProduct[produtoIndex] *
    umidade *
    tempFactor
  ).toFixed(1);

  // Update result field
  document.getElementById("umidadeEqUmidEqTxt").textContent =
    equilibriumHumidity;
}

// Generate Equilibrium Humidity table
function generateUmidadeTable(produtoIndex) {
  const tabelaLay = document.getElementById("tabelaLayUmidEqLay");
  const tempLay = document.getElementById("tempLayUmidEqLay");

  // Clear previous content
  if (tabelaLay) tabelaLay.innerHTML = "";
  if (tempLay) tempLay.innerHTML = "";

  // Constants for table generation based on product
  const factorsByProduct = [
    0, 0.27, 0.25, 0.29, 0.28, 0.26, 0.24, 0.23, 0.22, 0.24, 0.25, 0.28, 0.27,
    0.26,
  ];
  const factor = factorsByProduct[produtoIndex];

  // Create header row
  const headerRow = document.createElement("div");
  headerRow.style.display = "flex";
  headerRow.style.flexDirection = "row";

  // Add relative humidity headers (50% to 80%)
  for (let ur = 50; ur <= 80; ur += 5) {
    const header = document.createElement("div");
    header.textContent = ur + "%";
    header.style.width = "70px";
    header.style.textAlign = "center";
    header.style.fontWeight = "bold";
    header.style.color = "red";
    headerRow.appendChild(header);
  }

  if (tabelaLay) tabelaLay.appendChild(headerRow);

  // Create temperature labels
  for (let temp = 10; temp <= 45; temp += 5) {
    const tempLabel = document.createElement("div");
    tempLabel.textContent = temp + "°C";
    tempLabel.style.height = "40px";
    tempLabel.style.display = "flex";
    tempLabel.style.alignItems = "center";
    tempLabel.style.justifyContent = "center";
    tempLabel.style.fontWeight = "bold";
    tempLabel.style.color = "red";

    if (tempLay) tempLay.appendChild(tempLabel);

    // Create row for this temperature
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexDirection = "row";
    row.style.height = "40px";

    // Add equilibrium humidity values for each humidity column
    for (let ur = 50; ur <= 80; ur += 5) {
      const tempFactor = 1 - (temp - 20) / 100;
      const eqHumidity = (factor * ur * tempFactor).toFixed(1);

      const cell = document.createElement("div");
      cell.textContent = eqHumidity;
      cell.style.width = "70px";
      cell.style.textAlign = "center";
      cell.style.border = "1px solid #ccc";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";

      row.appendChild(cell);
    }

    if (tabelaLay) tabelaLay.appendChild(row);
  }
}

// Weight Loss and Impurities screen listeners and functionality
function setupQuebraListeners() {
  const calcularBtn = document.getElementById("calcularQuebra");
  const limparBtn = document.getElementById("limparQuebra");

  if (calcularBtn) {
    calcularBtn.addEventListener("click", function () {
      calcularQuebra();
    });
  }

  if (limparBtn) {
    limparBtn.addEventListener("click", function () {
      limparQuebra();
    });
  }
}

// Calculate weight loss and impurities
function calcularQuebra() {
  // Get input values
  const umidadeInicial =
    parseFloat(document.getElementById("umidadeInicialQuebra").value) || 0;
  const umidadeFinal =
    parseFloat(document.getElementById("umidadeFinalQuebra").value) || 0;
  const impurInicial =
    parseFloat(document.getElementById("impurInicialQuebra").value) || 0;
  const impurFinal =
    parseFloat(document.getElementById("impurFinalQuebra").value) || 0;
  const massaProdInicial =
    parseFloat(document.getElementById("massaInicialQuebra").value) || 0;

  // Check if all fields are filled
  if (
    isNaN(umidadeInicial) ||
    isNaN(umidadeFinal) ||
    isNaN(impurInicial) ||
    isNaN(impurFinal) ||
    isNaN(massaProdInicial)
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  // Calculate impurity loss (QI)
  const quebraImpureza =
    ((impurInicial - impurFinal) * 100) / (100 - impurFinal);

  // Calculate moisture loss (QU)
  const quebraUmidade =
    ((umidadeInicial - umidadeFinal) * 100) / (100 - umidadeFinal);

  // Calculate total discount (DE)
  const descontoTotal =
    100 - ((100 - quebraImpureza) * (100 - quebraUmidade)) / 100;

  // Calculate mass discount
  const descontoMassa = massaProdInicial * (descontoTotal / 100);

  // Calculate final mass
  const massaFinal = massaProdInicial - descontoMassa;

  // Update results
  document.getElementById("umidadeFinal2Quebra").textContent =
    umidadeFinal.toFixed(1);
  document.getElementById("impurPerdaQuebra").textContent =
    quebraImpureza.toFixed(2);
  document.getElementById("umidadePerdaQuebra").textContent =
    quebraUmidade.toFixed(2);
  document.getElementById("descontoPorQuebra").textContent =
    descontoTotal.toFixed(2);
  document.getElementById("descontoMasQuebra").textContent =
    descontoMassa.toFixed(1);
  document.getElementById("massaFinalQuebra").textContent =
    massaFinal.toFixed(1);
}

// Clear all fields
function limparQuebra() {
  // Clear input fields
  document.getElementById("umidadeInicialQuebra").value = "";
  document.getElementById("umidadeFinalQuebra").value = "";
  document.getElementById("impurInicialQuebra").value = "";
  document.getElementById("impurFinalQuebra").value = "";
  document.getElementById("massaInicialQuebra").value = "";

  // Clear result fields
  document.getElementById("umidadeFinal2Quebra").textContent = "";
  document.getElementById("impurPerdaQuebra").textContent = "";
  document.getElementById("umidadePerdaQuebra").textContent = "";
  document.getElementById("descontoPorQuebra").textContent = "";
  document.getElementById("descontoMasQuebra").textContent = "";
  document.getElementById("massaFinalQuebra").textContent = "";
}

// Language Selection screen listeners and functionality
function setupIdiomasListeners() {
  const languageOptions = document.querySelectorAll(".language-option");
  const confirmButton = document.querySelector(".confirm-button");
  const backButton = document.getElementById("backButton");

  if (languageOptions.length > 0) {
    languageOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove the 'selected' class from all options
        languageOptions.forEach((opt) => {
          opt.classList.remove("selected");
        });

        // Add the 'selected' class to the clicked option
        this.classList.add("selected");

        // Update the confirm button text based on the selected language
        const lang = this.getAttribute("data-lang");
        if (confirmButton) {
          if (lang === "pt-BR") {
            confirmButton.textContent = "Confirmar";
            document.querySelector(".language-title").textContent =
              "Selecione seu idioma";
          } else if (lang === "en-US") {
            confirmButton.textContent = "Confirm";
            document.querySelector(".language-title").textContent =
              "Select your language";
          } else if (lang === "es-ES") {
            confirmButton.textContent = "Confirmar";
            document.querySelector(".language-title").textContent =
              "Seleccione su idioma";
          }
        }
      });
    });
  }

  if (confirmButton) {
    confirmButton.addEventListener("click", function () {
      const selectedLang = document.querySelector(".language-option.selected");
      if (selectedLang) {
        // Save the selected language
        app.idioma = selectedLang.getAttribute("data-lang");
        // Navigate back to the main screen
        navigateTo("tela_principal.html");
      }
    });
  }

  if (backButton) {
    backButton.addEventListener("click", function () {
      // Navigate back to the main screen
      navigateTo("tela_principal.html");
    });
  }
}

// About screen listeners and functionality
function setupSobreListeners() {
  const voltarBtn = document.getElementById("voltarSobreBtn");

  if (voltarBtn) {
    voltarBtn.addEventListener("click", function () {
      navigateTo("tela_principal.html");
    });
  }
}

// Psychrometric Chart screen listeners and functionality
function setupCartaListeners() {
  // Chart data setup would go here
  // Since the chart is a complex component, we'll simulate it with a basic setup
  setupPsychrometricChart();

  // Back button handler
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", function () {
      navigateTo("tela_principal.html");
    });
  }

  // Collapse button handler
  const collapseButton = document.querySelector(".collapse-button");
  if (collapseButton) {
    collapseButton.addEventListener("click", function () {
      this.classList.toggle("collapsed");
      const content = document.querySelector(".control-panel-content");
      if (content) {
        content.style.display = this.classList.contains("collapsed")
          ? "none"
          : "flex";
      }
    });
  }

  // Chart points interaction
  const chartPoints = document.querySelectorAll(".chart-point");
  if (chartPoints.length > 0) {
    chartPoints.forEach((point) => {
      point.addEventListener("click", function () {
        document.querySelectorAll(".chart-point").forEach((p) => {
          p.classList.remove("active");
        });
        this.classList.add("active");
        updateInfoBox(this.getAttribute("title"));
      });
    });
  }
}

// Setup the psychrometric chart with saved points
function setupPsychrometricChart() {
  const chartContent = document.querySelector(".chart-content");
  if (!chartContent) return;

  // Clear existing points
  const existingPoints = chartContent.querySelectorAll(".custom-point");
  existingPoints.forEach((point) => point.remove());

  // Add saved points to the chart
  app.pontosGrafico.forEach((point, index) => {
    const pointElement = document.createElement("div");
    pointElement.className = "chart-point custom-point";
    pointElement.title = `Ponto ${index + 1}`;

    // Calculate position based on the point data
    // This is a simplified calculation - in a real app, you would use proper chart coordinates
    const x = 10 + (point.tbs / 50) * 80; // 10% margin, 80% width for temperature range 0-50°C
    const y = 90 - point.rm * 100 * 4; // Position from top based on humidity ratio (simplified)

    pointElement.style.left = `${x}%`;
    pointElement.style.top = `${y}%`;

    // Add different colors based on point index
    const colors = ["#2196f3", "#f44336", "#4caf50", "#ff9800"];
    pointElement.style.backgroundColor = colors[index % colors.length];

    // Add click handler
    pointElement.addEventListener("click", function () {
      document.querySelectorAll(".chart-point").forEach((p) => {
        p.classList.remove("active");
      });
      this.classList.add("active");
      updateInfoBox(`Ponto ${index + 1}`, point);
    });

    chartContent.appendChild(pointElement);
  });

  // Add lines between points if there are multiple points
  if (app.pontosGrafico.length > 1) {
    for (let i = 0; i < app.pontosGrafico.length - 1; i++) {
      const point1 = app.pontosGrafico[i];
      const point2 = app.pontosGrafico[i + 1];

      const x1 = 10 + (point1.tbs / 50) * 80;
      const y1 = 90 - point1.rm * 100 * 4;
      const x2 = 10 + (point2.tbs / 50) * 80;
      const y2 = 90 - point2.rm * 100 * 4;

      const lineElement = document.createElement("div");
      lineElement.className = "chart-line custom-line";

      // Calculate line properties
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

      lineElement.style.width = `${length}%`;
      lineElement.style.left = `${x1}%`;
      lineElement.style.top = `${y1}%`;
      lineElement.style.transform = `rotate(${angle}deg)`;

      chartContent.appendChild(lineElement);
    }
  }
}

// Update the info box with point data
function updateInfoBox(title, pointData) {
  const infoBox = document.querySelector(".info-box");
  if (!infoBox) return;

  const infoTitle = infoBox.querySelector(".info-box-title");
  if (infoTitle) infoTitle.textContent = title;

  // If point data is provided, update all values
  if (pointData) {
    const dataFields = infoBox.querySelectorAll(".info-box-value");
    if (dataFields.length >= 6) {
      dataFields[0].textContent = `${pointData.tbs}°C`;
      dataFields[1].textContent = `${pointData.tbu}°C`;
      dataFields[2].textContent = `${pointData.ur}%`;
      dataFields[3].textContent = `${pointData.et} kJ/kg`;
      dataFields[4].textContent = `${pointData.rm} kg/kg`;
      dataFields[5].textContent = `${pointData.tpo}°C`;
    }
  }
}
