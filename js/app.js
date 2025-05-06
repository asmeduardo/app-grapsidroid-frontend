// app.js - Main navigation and functionality controller

// Global variables for app state
const app = {
  currentScreen: "index.html",
  altitude: 0,
  pressao: 101.325,
  idioma: "pt-BR",
  pontosGrafico: [],
};

// Adicione esta função ao app.js
function savePointsData() {
  localStorage.setItem("pontosGrafico", JSON.stringify(app.pontosGrafico));
}

// Function to navigate between screens
function navigateTo(screenName) {
  // Salvar estado antes de navegar
  saveAppState();

  // Se estiver navegando para a carta, salve os pontos no localStorage
  if (screenName === "tela_carta_psicometrica.html") {
    savePointsData();
  }

  // Load the requested screen
  loadScreen(screenName);
}

// Function to save app state
function saveAppState() {
  // Save altitude and pressure from main screen if present
  const altitudeInput = document.getElementById("altitude");
  const pressaoInput = document.getElementById("pressao");

  if (altitudeInput) app.altitude = parseFloat(altitudeInput.value) || 0;
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
  // Recuperar pontos salvos, se existirem
  const savedPoints = localStorage.getItem("pontosGrafico");
  if (savedPoints) {
    app.pontosGrafico = JSON.parse(savedPoints);
  }

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
      navigateTo("index.html");
    });
  });
}

// Apply the current app state to the screen
function applyAppState() {
  // Set altitude and pressure values if inputs exist
  const altitudeInput = document.getElementById("altitude");
  const pressaoInput = document.getElementById("pressao");

  if (altitudeInput) altitudeInput.value = app.altitude;
  if (pressaoInput) pressaoInput.value = app.pressao;
}

// Setup screen-specific event listeners based on current screen
function setupScreenSpecificListeners() {
  // Get current screen name from URL
  const currentScreen = window.location.href.split("/").pop();

  switch (currentScreen) {
    case "index.html":
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
  const resetButton = document.getElementById("resetButton");

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

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      resetAppValues();
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

// Função para resetar valores da aplicação
function resetAppValues() {
  // Reset dos valores para os padrões
  app.altitude = 0;
  app.pressao = 101.325;
  app.pontosGrafico = [];

  // Atualize os campos na tela
  const altitudeInput = document.getElementById("altitude");
  const pressaoInput = document.getElementById("pressao");

  if (altitudeInput) altitudeInput.value = app.altitude;
  if (pressaoInput) pressaoInput.value = app.pressao;
}

// Ponto Estado screen listeners and functionality
function setupPontoEstadoListeners() {
  const calcularBtn = document.getElementById("calcular");
  const visualizarBtn = document.getElementById("visualizarCarta");
  const limparBtn = document.getElementById("limpa");

  // Adicionar listeners para os botões de rádio
  const radioButtons = document.querySelectorAll('input[name="param"]');

  // Usar os IDs para selecionar os elementos com precisão
  const paramLabelElement = document.getElementById("secondParamLabel");
  const paramInputElement = document.getElementById("secondParamInput");

  // Configurar os listeners para os radio buttons
  if (radioButtons.length > 0) {
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", function () {
        updateSecondParamField(this.id, paramLabelElement, paramInputElement);
      });
    });
  }

  if (calcularBtn) {
    calcularBtn.addEventListener("click", function () {
      calcularPontoEstado();
    });
  }

  if (visualizarBtn) {
    visualizarBtn.addEventListener("click", function () {
      navigateTo("tela_carta_psicometrica.html");
    });
  }

  if (limparBtn) {
    limparBtn.addEventListener("click", function () {
      limparPontoEstado();
    });
  }

  // Inicializar o campo baseado no radio já selecionado
  const initialSelectedRadio = document.querySelector(
    'input[name="param"]:checked'
  );
  if (initialSelectedRadio) {
    updateSecondParamField(
      initialSelectedRadio.id,
      document.querySelector(".input-group:nth-of-type(3) .input-label"),
      document.querySelector(".input-group:nth-of-type(3) .input-field")
    );
  }
}

// Função para atualizar o campo do segundo parâmetro com base na opção selecionada
function updateSecondParamField(radioId, labelElement, inputElement) {
  // Resetar valor do campo ao mudar o tipo de parâmetro
  inputElement.value = "";

  // Atualizar label e placeholder baseado na opção selecionada
  switch (radioId) {
    case "option-bu":
      labelElement.textContent = "Temperatura de Bulbo Úmido (°C):";
      inputElement.placeholder = "Ex: 19.4";
      inputElement.step = "0.1";
      break;
    case "option-ur":
      labelElement.textContent = "Umidade Relativa (%):";
      inputElement.placeholder = "Ex: 65.0";
      inputElement.step = "0.1";
      break;
    case "option-po":
      labelElement.textContent = "Temperatura de Ponto de Orvalho (°C):";
      inputElement.placeholder = "Ex: 17.8";
      inputElement.step = "0.1";
      break;
    case "option-en":
      labelElement.textContent = "Entalpia (kJ/kg):";
      inputElement.placeholder = "Ex: 58.4";
      inputElement.step = "0.1";
      break;
    case "option-rm":
      labelElement.textContent = "Razão de Mistura (kg/kg):";
      inputElement.placeholder = "Ex: 0.013";
      inputElement.step = "0.001";
      break;
    case "option-ve":
      labelElement.textContent = "Volume Específico (m³/kg):";
      inputElement.placeholder = "Ex: 0.861";
      inputElement.step = "0.001";
      break;
  }
}

// Calculate state point properties
function calcularPontoEstado() {
  // Get input values
  const tempBulbSeco =
    parseFloat(document.getElementById("tempSeco").value) || 0;

  // Determinar qual parâmetro está selecionado
  const selectedRadio = document.querySelector('input[name="param"]:checked');
  const secondParamValue = parseFloat(
    document.querySelector(".input-group:nth-of-type(3) .input-field").value
  );

  // Inicializar variáveis para todos os parâmetros possíveis
  let tempBulbUmido = null;
  let tempPontoOrvalho = null;
  let umidade = null;
  let razao = null;
  let entalpia = null;
  let volume = null;

  // Atribuir o valor ao parâmetro correto com base no radio selecionado
  if (selectedRadio) {
    switch (selectedRadio.id) {
      case "option-bu":
        tempBulbUmido = secondParamValue;
        break;
      case "option-ur":
        umidade = secondParamValue;
        break;
      case "option-po":
        tempPontoOrvalho = secondParamValue;
        break;
      case "option-en":
        entalpia = secondParamValue;
        break;
      case "option-rm":
        razao = secondParamValue;
        break;
      case "option-ve":
        volume = secondParamValue;
        break;
    }
  }

  // Verificar se a temperatura de bulbo seco e pelo menos um outro parâmetro foram informados
  if (isNaN(tempBulbSeco) || isNaN(secondParamValue)) {
    alert(
      "É preciso informar a temperatura de bulbo seco e o segundo parâmetro!"
    );
    return;
  }

  // Calcular as propriedades com base nos inputs disponíveis
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
  const visualizarBtn = document.getElementById("visualizarCarta");
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
  // Corrigindo o ID para corresponder ao que está no HTML
  const processosSpinner = document.getElementById("processo");
  const calcularBtn = document.getElementById("calcProcessos");
  const visualizarBtn = document.getElementById("visualizarCarta");
  const limparBtn = document.getElementById("limparProcessos");

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

  if (limparBtn) {
    limparBtn.addEventListener("click", function () {
      limparProcessos();
    });
  }

  // Inicialize a função de alternância de abas
  alternarAbas();

  // Initialize the process fields based on the default selection
  if (processosSpinner) {
    updateProcessFields(processosSpinner.selectedIndex);
  }
}

// Função para limpar todos os campos da tela de processos
function limparProcessos() {
  // Limpar campos de entrada
  document.getElementById("prop1").value = "";
  document.getElementById("prop2").value = "";
  document.getElementById("prop3").value = "";
  document.getElementById("prop4").value = "";
  document.getElementById("prop5").value = "";
  document.getElementById("prop6").value = "";

  // Limpar resultados para todos os pontos
  for (let i = 1; i <= 3; i++) {
    document.getElementById("tempSecoProcessos" + i).textContent = "0.0 °C";
    document.getElementById("tempUmidoProcessos" + i).textContent = "0.0 °C";
    document.getElementById("umidadeRelProcessos" + i).textContent = "0.0 %";
    document.getElementById("razaoProcessos" + i).textContent = "0.0 kg/kg";
    document.getElementById("pressaoVapProcessos" + i).textContent = "0.0 kPa";
    document.getElementById("pressaoProcessos" + i).textContent = "0.0 kPa";
    document.getElementById("entalpiaProcessos" + i).textContent = "0.0 kJ/kg";
    document.getElementById("pontoOrvProcessos" + i).textContent = "0.0 °C";
    document.getElementById("volEspProcessos" + i).textContent = "0.0 m³/kg";
  }

  // Limpar o fluxo total (específico do ponto 3)
  const fluxoTotal = document.getElementById("fluxoProcessos3");
  if (fluxoTotal) fluxoTotal.textContent = "0 m³/h";

  // Desabilitar o botão de visualizar carta
  document.getElementById("visualizarCarta").disabled = true;
}

// Função para alternar entre as abas de resultados
function alternarAbas() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remover classe ativa de todas as abas
      tabs.forEach((t) => t.classList.remove("active"));

      // Adicionar classe ativa à aba clicada
      this.classList.add("active");

      // Ocultar todas as seções de resultados
      const resultSections = document.querySelectorAll(".result-section");
      resultSections.forEach((section) => {
        section.style.display = "none";
      });

      // Mostrar a seção correspondente à aba clicada
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId + "-results").style.display = "block";
    });
  });
}

// Update visible fields based on selected process
function updateProcessFields(processIndex) {
  // Ajustando para obter os elementos corretos baseado no HTML
  const prop4Linear = document.getElementById("prop4Linear");
  const prop5Linear = document.getElementById("prop5Linear");
  const prop6Linear = document.getElementById("prop6Linear");

  // Verificando a existência das div ponto3-results em vez de linearProcessos3
  const ponto3Results = document.getElementById("ponto3-results");

  // Removendo referência para elemento que não existe
  // const linearText3 = document.getElementById("linearTextProcessos3");

  switch (processIndex) {
    case 0: // Mixing of two air flows
      // Show all fields
      if (prop4Linear) prop4Linear.style.display = "flex";
      if (prop5Linear) prop5Linear.style.display = "flex";
      if (prop6Linear) prop6Linear.style.display = "flex";

      // Mostrar a div de resultados do ponto 3
      if (ponto3Results) ponto3Results.style.display = "none"; // Começa oculto, será exibido quando a aba for selecionada

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
      if (prop4Linear) prop4Linear.style.display = "none";
      if (prop5Linear) prop5Linear.style.display = "none";
      if (prop6Linear) prop6Linear.style.display = "none";

      // Esconder a div de resultados do ponto 3
      if (ponto3Results) ponto3Results.style.display = "none";

      // Update labels
      document.getElementById("prop2Text").textContent =
        "Temp. Bulbo Seco °C - P2:";
      document.getElementById("prop3Text").textContent =
        "Umidade Relativa (%) - P1:";
      break;

    case 2: // Adiabatic Humidification
      // Hide unnecessary fields
      if (prop4Linear) prop4Linear.style.display = "none";
      if (prop5Linear) prop5Linear.style.display = "none";
      if (prop6Linear) prop6Linear.style.display = "none";

      // Esconder a div de resultados do ponto 3
      if (ponto3Results) ponto3Results.style.display = "none";

      // Update labels
      document.getElementById("prop2Text").textContent =
        "Umidade Relativa (%) - P1:";
      document.getElementById("prop3Text").textContent =
        "Umidade Relativa (%) - P2:";
      break;
  }

  // Ajustar visibilidade da aba Ponto 3
  const ponto3Tab = document.querySelector('.tab[data-tab="ponto3"]');
  if (ponto3Tab) {
    ponto3Tab.style.display = processIndex === 0 ? "block" : "none";
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
        navigateTo("index.html");
      }
    });
  }

  if (backButton) {
    backButton.addEventListener("click", function () {
      // Navigate back to the main screen
      navigateTo("index.html");
    });
  }
}

// About screen listeners and functionality
function setupSobreListeners() {
  const voltarBtn = document.getElementById("voltarSobreBtn");

  if (voltarBtn) {
    voltarBtn.addEventListener("click", function () {
      navigateTo("index.html");
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
      navigateTo("index.html");
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

  // Handler para o botão de exportar
  const exportBtn = document.querySelector(".action-button.primary-action");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      showExportDialog();
    });
  }

  // Handler para o botão de imprimir
  const printBtn = document.querySelector(".action-button.secondary-action");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  // Configurar os handlers do diálogo de exportação
  setupExportDialogListeners();
}

// Setup the psychrometric chart with saved points
function setupPsychrometricChart() {
  const chartContent = document.querySelector(".chart-content");
  if (!chartContent) {
    console.error("Elemento .chart-content não encontrado");
    return;
  }

  // Remover pontos e linhas existentes
  chartContent
    .querySelectorAll(".custom-point, .custom-line")
    .forEach((el) => el.remove());

  console.log("Pontos para exibir:", app.pontosGrafico);

  // Verificar se há pontos para exibir
  if (!app.pontosGrafico || app.pontosGrafico.length === 0) {
    console.warn("Nenhum ponto para exibir na carta");
    return;
  }

  // Adicionar pontos ao gráfico
  app.pontosGrafico.forEach((point, index) => {
    const pointElement = document.createElement("div");
    pointElement.className = "chart-point custom-point";
    pointElement.title = `Ponto ${index + 1}`;

    // Calcular posição baseada nos dados do ponto
    const x = 10 + (point.tbs / 50) * 80; // 10% margem, 80% largura para range de 0-50°C
    const y = 90 - point.rm * 100 * 4; // Posição de cima baseada na razão de umidade

    pointElement.style.left = `${x}%`;
    pointElement.style.top = `${y}%`;

    // Adicionar cores diferentes baseadas no índice do ponto
    const colors = ["#2196f3", "#f44336", "#4caf50", "#ff9800"];
    pointElement.style.backgroundColor = colors[index % colors.length];

    // Adicionar handler de clique
    pointElement.addEventListener("click", function () {
      document.querySelectorAll(".chart-point").forEach((p) => {
        p.classList.remove("active");
      });
      this.classList.add("active");
      updateInfoBox(`Ponto ${index + 1}`, point);
    });

    chartContent.appendChild(pointElement);
  });

  // Adicionar linhas entre os pontos se houver múltiplos pontos
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

      // Calcular propriedades da linha
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

      lineElement.style.width = `${length}%`;
      lineElement.style.left = `${x1}%`;
      lineElement.style.top = `${y1}%`;
      lineElement.style.transform = `rotate(${angle}deg)`;
      lineElement.style.transformOrigin = "left center";

      chartContent.appendChild(lineElement);
    }
  }

  // Selecionar o primeiro ponto por padrão
  const firstPoint = chartContent.querySelector(".custom-point");
  if (firstPoint) {
    firstPoint.classList.add("active");
    updateInfoBox(`Ponto 1`, app.pontosGrafico[0]);
  }
}

// Configurar handlers para o diálogo de exportação
function setupExportDialogListeners() {
  // Fechar diálogo
  const closeBtn = document.getElementById("closeExportDialog");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      document.getElementById("exportDialog").style.display = "none";
    });
  }

  // Botão de exportação CSV
  const csvBtn = document.getElementById("exportCSV");
  if (csvBtn) {
    csvBtn.addEventListener("click", function () {
      exportChartDataCSV();
      document.getElementById("exportDialog").style.display = "none";
    });
  }

  // Botão de exportação PDF
  const pdfBtn = document.getElementById("exportPDF");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", function () {
      exportChartDataPDF();
      document.getElementById("exportDialog").style.display = "none";
    });
  }

  // Botão de exportação de imagem
  const imgBtn = document.getElementById("exportImage");
  if (imgBtn) {
    imgBtn.addEventListener("click", function () {
      exportChartAsImage();
      document.getElementById("exportDialog").style.display = "none";
    });
  }
}

// Mostrar diálogo de exportação
function showExportDialog() {
  document.getElementById("exportDialog").style.display = "flex";
}

// Função para exportar dados da carta em CSV
function exportChartDataCSV() {
  // Gerar dados no formato CSV
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent +=
    "Ponto,TBS (°C),TBU (°C),UR (%),Razão Mistura (kg/kg),Entalpia (kJ/kg),Volume Específico (m³/kg),Ponto Orvalho (°C)\n";

  app.pontosGrafico.forEach((point, index) => {
    csvContent += `${index + 1},${point.tbs},${point.tbu},${point.ur},${
      point.rm
    },${point.et},${point.ve},${point.tpo}\n`;
  });

  // Criar link para download
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "carta_psicrometrica_dados.csv");
  document.body.appendChild(link);

  // Simular clique no link
  link.click();
  document.body.removeChild(link);
}

// Função para exportar dados da carta em PDF
function exportChartDataPDF() {
  // Inicializar o objeto jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Adicionar título
  doc.setFontSize(16);
  doc.text("Carta Psicrométrica - Dados", 15, 15);

  // Adicionar data de geração
  const hoje = new Date();
  doc.setFontSize(10);
  doc.text(
    `Gerado em: ${hoje.toLocaleDateString()} ${hoje.toLocaleTimeString()}`,
    15,
    25
  );

  // Adicionar cabeçalho da tabela
  doc.setFontSize(10);
  doc.setFont(undefined, "bold");
  const headers = [
    "Ponto",
    "TBS (°C)",
    "TBU (°C)",
    "UR (%)",
    "Razão (kg/kg)",
    "Entalpia (kJ/kg)",
    "Vol. Esp. (m³/kg)",
    "P. Orv. (°C)",
  ];

  // Configuração para a tabela
  let y = 35;
  const cellWidth = 24;

  // Desenhar cabeçalhos
  headers.forEach((header, i) => {
    doc.text(header, 15 + i * cellWidth, y);
  });

  // Adicionar dados dos pontos
  doc.setFont(undefined, "normal");
  app.pontosGrafico.forEach((point, index) => {
    y += 10;
    doc.text(`${index + 1}`, 15, y);
    doc.text(`${point.tbs}`, 15 + cellWidth, y);
    doc.text(`${point.tbu}`, 15 + 2 * cellWidth, y);
    doc.text(`${point.ur}`, 15 + 3 * cellWidth, y);
    doc.text(`${point.rm}`, 15 + 4 * cellWidth, y);
    doc.text(`${point.et}`, 15 + 5 * cellWidth, y);
    doc.text(`${point.ve}`, 15 + 6 * cellWidth, y);
    doc.text(`${point.tpo}`, 15 + 7 * cellWidth, y);
  });

  // Adicionar visualização da carta
  html2canvas(document.querySelector(".chart-content")).then((canvas) => {
    // Converter o canvas para imagem
    const imgData = canvas.toDataURL("image/png");

    // Adicionar nova página para a imagem
    doc.addPage();
    doc.text("Visualização da Carta", 15, 15);

    // Calcular dimensões para manter proporção
    const imgWidth = 180;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Adicionar a imagem
    doc.addImage(imgData, "PNG", 15, 25, imgWidth, imgHeight);

    // Salvar o PDF
    doc.save("carta_psicrometrica.pdf");
  });
}

// Função para exportar a carta como imagem
function exportChartAsImage() {
  html2canvas(document.querySelector(".chart-content")).then((canvas) => {
    // Converter o canvas para imagem e iniciar download
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "carta_psicrometrica.png";
    link.click();
  });
}

// Update the info box with point data
function updateInfoBox(title, pointData) {
  const infoBox = document.querySelector(".info-box");
  if (!infoBox) return;

  const infoTitle = infoBox.querySelector(".info-box-title");
  if (infoTitle) infoTitle.textContent = title;

  // Se dados do ponto forem fornecidos, atualizar todos os valores
  if (pointData) {
    // Mapear valores da info box para os dados do ponto
    const valueMap = {
      0: pointData.tbs + "°C", // TBS
      1: pointData.tbu + "°C", // TBU
      2: pointData.ur + "%", // UR
      3: pointData.et + " kJ/kg", // Entalpia
      4: pointData.rm + " kg/kg", // Razão de Mistura
      5: pointData.tpo + "°C", // Ponto de Orvalho
    };

    // Atualizar cada campo de valor
    const dataFields = infoBox.querySelectorAll(".info-box-value");
    for (let i = 0; i < dataFields.length && i < 6; i++) {
      if (valueMap[i]) {
        dataFields[i].textContent = valueMap[i];
      }
    }

    // Tornar o info box visível
    infoBox.style.display = "block";
  }
}
