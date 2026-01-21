/**
 * Wiederverwendbares Steuerungs- und Menü-System
 * Einfach in jede HTML-Datei einbinden und es funktioniert automatisch!
 */

(function() {
  'use strict';
  
  // ========================================
  // KONFIGURATION: Kapitel-Liste anpassen
  // ========================================
  const KAPITEL_LISTE = [
    { name: "Scene 1 - Welcome Dialog", file: "DE_scene1_dialogue_welcome.html" },
    { name: "Scene 1 - Haus Innen Suchbild", file: "DE_scene1_Haus_innen_Suchbild.html" },
    { name: "Scene 2 - Haus Außen", file: "DE_scene1_Haus_außen_Suchbild.html" },
    { name: "Scene 2 - Receiving Letter", file: "scene2_reciving_letter.html" },
    { name: "Scene 3 - Adventure Start", file: "scene3_adventure_start.html" },
    { name: "Scene 4 - Character Meeting", file: "scene4_character_meeting.html" },
    { name: "Scene 5 - Quest Begin", file: "scene5_quest_begin.html" }
    // Hier weitere Kapitel hinzufügen
  ];

  // ========================================
  // CSS STYLES
  // ========================================
  const MENU_STYLES = `
    <style id="steuerungMenuStyles">
      /* Debug Menu Styles */
      #debugButton {
        position: fixed;
        top: 20px;
        right: 90px;
        width: 50px;
        height: 50px;
        background-color: rgba(255, 0, 0, 0.7);
        border: 2px solid #fff;
        border-radius: 50%;
        color: white;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      #debugButton:hover {
        background-color: rgba(255, 0, 0, 0.9);
        transform: scale(1.1);
      }

      /* Hilfe Overlay */
      #helpOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        z-index: 1700;
        display: none;
        align-items: center;
        justify-content: center;
      }

      #helpMenu {
        background: linear-gradient(145deg, #ffffff, #f7fafc);
        border: 3px solid #ff9d00;
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        text-align: center;
        font-family: 'duper', sans-serif;
      }

      #helpMenu h2 {
        color: #333;
        margin-bottom: 20px;
        font-size: 24px;
      }

      #closeHelpButton {
        position: absolute;
        top: 15px;
        right: 20px;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
      }

      #closeHelpButton:hover {
        background: #cc3333;
        transform: scale(1.1);
      }

      #debugOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
      }

      #debugMenu {
        background-color: #fff;
        border-radius: 10px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 70vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      }

      #debugMenu h2 {
        margin: 0 0 20px 0;
        color: #333;
        font-size: 24px;
        text-align: center;
        border-bottom: 2px solid #ffc062;
        padding-bottom: 10px;
      }

      #debugMenu ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      #debugMenu li {
        margin: 10px 0;
      }

      #debugMenu a {
        display: block;
        padding: 12px 15px;
        background-color: #ffc062;
        color: #333;
        text-decoration: none;
        border-radius: 5px;
        transition: all 0.3s ease;
        font-weight: bold;
      }

      #debugMenu a:hover {
        background-color: #ff9d00;
        transform: translateX(5px);
      }

      #closeDebugButton {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        color: #333;
        cursor: pointer;
        font-weight: bold;
      }

      #closeDebugButton:hover {
        color: #ff0000;
      }

      /* Hauptmenü (obere rechte Ecke) */
      #mainMenuButton {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #mainMenuButton:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
      }

      /* Hauptmenü Overlay */
      #mainMenuOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        z-index: 1500;
        display: none;
        align-items: center;
        justify-content: center;
      }

      #mainMenu {
        background: linear-gradient(145deg, #ffffff, #f7fafc);
        border: 3px solid #ff9d00;
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        text-align: center;
        min-width: 300px;
        position: relative;
        font-family: "duper", sans-serif;
      }

      #mainMenu h2 {
        color: #333;
        margin-top: 0;
        margin-bottom: 30px;
        font-size: 28px;
        font-family: "duper", sans-serif;
        font-weight: 600;
      }

      .menu-btn {
        display: block;
        width: 100%;
        margin: 15px 0;
        padding: 15px 20px;
        background: #ff9d00;
        color: #333;
        border: 3px solid #333;
        border-radius: 12px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        font-family: "duper", sans-serif;
      }

      .menu-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        background: #333;
        color: #ff9d00;
        border-color: #ff9d00;
      }

      .menu-btn.secondary {
        background: #4CAF50;
        color: white;
      }

      .menu-btn.secondary:hover {
        background: #333;
        color: #4CAF50;
        border-color: #4CAF50;
      }

      .menu-btn.info {
        background: #2196F3;
        color: white;
      }

      .menu-btn.info:hover {
        background: #333;
        color: #2196F3;
        border-color: #2196F3;
      }

      .menu-btn.danger {
        background: #f44336;
        color: white;
      }

      .menu-btn.danger:hover {
        background: #333;
        color: #f44336;
        border-color: #f44336;
      }

      #closeMainMenuButton {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        color: #333;
        cursor: pointer;
        transition: color 0.3s ease;
        font-family: "duper", sans-serif;
      }

      #closeMainMenuButton:hover {
        color: #ff9d00;
      }

      /* Einstellungen Overlay */
      #settingsOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        z-index: 1600;
        display: none;
        align-items: center;
        justify-content: center;
      }

      #settingsMenu {
        background: linear-gradient(145deg, #ffffff, #f7fafc);
        border: 3px solid #ff9d00;
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        font-family: "duper", sans-serif;
      }

      #settingsMenu h2 {
        color: #333;
        margin-top: 0;
        margin-bottom: 30px;
        font-size: 24px;
        text-align: center;
        font-family: "duper", sans-serif;
        font-weight: 600;
      }

      .setting-group {
        margin-bottom: 30px;
        padding: 20px;
        background: rgba(255, 157, 0, 0.1);
        border-radius: 12px;
        border-left: 4px solid #ff9d00;
      }

      .setting-group h3 {
        color: #333;
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: "duper", sans-serif;
        font-weight: 600;
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding: 10px 15px 10px 0;
      }

      .setting-label {
        color: #333;
        font-size: 14px;
        flex: 1;
        font-family: "duper", sans-serif;
        margin-right: 15px;
      }

      .volume-slider {
        width: 100px;
        height: 6px;
        border-radius: 5px;
        background: #ddd;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        cursor: pointer;
        margin-right: 10px;
      }

      .volume-slider::-webkit-slider-thumb {
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ff9d00;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      }

      .volume-slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ff9d00;
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      }

      .toggle-switch {
        position: relative;
        width: 50px;
        height: 25px;
        background: #ddd;
        border-radius: 25px;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .toggle-switch.active {
        background: #ff9d00;
      }

      .toggle-switch::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 21px;
        height: 21px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      .toggle-switch.active::after {
        transform: translateX(25px);
      }

      .language-select {
        background: white;
        color: #333;
        border: 2px solid #ff9d00;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 14px;
        cursor: pointer;
        outline: none;
        font-family: "duper", sans-serif;
      }

      .language-select:focus {
        border-color: #333;
        box-shadow: 0 0 0 3px rgba(255, 157, 0, 0.2);
      }

      #closeSettingsButton {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        color: #333;
        cursor: pointer;
        transition: color 0.3s ease;
        font-family: "duper", sans-serif;
      }

      #closeSettingsButton:hover {
        color: #ff9d00;
      }
    </style>
  `;

  // ========================================
  // HTML STRUCTURE
  // ========================================
  const MENU_HTML = `
    <!-- Hauptmenü Button (obere rechte Ecke) -->
    <button id="mainMenuButton">☰</button>

    <!-- Debug Button -->
    <div id="debugButton">🔧</div>

    <!-- Hauptmenü Overlay -->
    <div id="mainMenuOverlay">
      <div id="mainMenu">
        <button id="closeMainMenuButton">×</button>
        <h2>🎮 Hauptmenü</h2>
        
        <button class="menu-btn" id="continueBtn">▶️ Weiterspielen</button>
        <button class="menu-btn secondary" id="saveGameBtn">💾 Spiel speichern</button>
        <button class="menu-btn" id="settingsBtn">⚙️ Einstellungen</button>
        <button class="menu-btn info" id="helpBtn">❓ Hilfe</button>
        <button class="menu-btn danger" id="mainMenuBtn">🏠 Hauptmenü</button>
      </div>
    </div>

    <!-- Einstellungen Overlay -->
    <div id="settingsOverlay">
      <div id="settingsMenu">
        <button id="closeSettingsButton">×</button>
        <h2>⚙️ Einstellungen</h2>
        
        <!-- Audio Einstellungen -->
        <div class="setting-group">
          <h3>🔊 Audio</h3>
          
          <div class="setting-item">
            <span class="setting-label">Spiel stumm schalten</span>
            <div class="toggle-switch" id="muteToggle"></div>
          </div>
          
          <div class="setting-item">
            <span class="setting-label">Hauptlautstärke</span>
            <input type="range" class="volume-slider" id="masterVolume" min="0" max="100" value="80">
          </div>
          
          <div class="setting-item">
            <span class="setting-label">Musik</span>
            <input type="range" class="volume-slider" id="musicVolume" min="0" max="100" value="70">
          </div>
          
          <div class="setting-item">
            <span class="setting-label">Dialog/Stimmen</span>
            <input type="range" class="volume-slider" id="voiceVolume" min="0" max="100" value="90">
          </div>
          
          <div class="setting-item">
            <span class="setting-label">Umgebungsgeräusche</span>
            <input type="range" class="volume-slider" id="ambientVolume" min="0" max="100" value="60">
          </div>
        </div>
        
        <!-- Sprach Einstellungen -->
        <div class="setting-group">
          <h3>🌍 Sprache</h3>
          
          <div class="setting-item">
            <span class="setting-label">Spielsprache</span>
            <select class="language-select" id="languageSelect">
              <option value="de" selected>🇩🇪 Deutsch</option>
              <option value="en">🇺🇸 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>
        </div>
        
        <!-- Gameplay Einstellungen -->
        <div class="setting-group">
          <h3>🎮 Gameplay</h3>
          
          <div class="setting-item">
            <span class="setting-label">Auto-Play Dialoge</span>
            <div class="toggle-switch" id="autoPlayToggle"></div>
          </div>
          
          <div class="setting-item">
            <span class="setting-label">Untertitel anzeigen</span>
            <div class="toggle-switch active" id="subtitlesToggle"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hilfe Overlay -->
    <div id="helpOverlay">
      <div id="helpMenu">
        <button id="closeHelpButton">×</button>
        <h2>❓ Hilfe - Wie spielt man?</h2>
        
        <div style="padding: 20px 0; text-align: left; line-height: 1.6;">
          <h3 style="color: #ff9d00; margin-bottom: 10px;">🎮 Spielsteuerung:</h3>
          <p><strong>• Klicken/Tippen:</strong> Dialog fortsetzen</p>
          <p><strong>• Links klicken:</strong> Vorheriger Dialog (falls verfügbar)</p>
          <p><strong>• Rechts klicken:</strong> Nächster Dialog</p>
          <p><strong>• Escape:</strong> Menüs schließen</p>
          
          <h3 style="color: #ff9d00; margin-top: 20px; margin-bottom: 10px;">💾 Speichersystem:</h3>
          <p><strong>• Automatisches Speichern:</strong> Dein Fortschritt wird automatisch gespeichert</p>
          <p><strong>• Name bleibt gespeichert:</strong> Einmal eingegeben, merkt sich das Spiel deinen Namen</p>
          <p><strong>• Fortschritt:</strong> Du kannst jederzeit dort weitermachen, wo du aufgehört hast</p>
          
          <h3 style="color: #ff9d00; margin-top: 20px; margin-bottom: 10px;">🎯 Tipps:</h3>
          <p><strong>• Menüs öffnen:</strong> Verwende die Buttons oben rechts</p>
          <p><strong>• Debug-Modus:</strong> 🔧-Button für Entwickleroptionen</p>
          <p><strong>• Einstellungen:</strong> Audio und andere Optionen anpassen</p>
        </div>
      </div>
    </div>

    <!-- Debug Overlay -->
    <div id="debugOverlay">
      <div id="debugMenu">
        <button id="closeDebugButton">×</button>
        <h2>Debug Menü - Kapitel Auswahl</h2>
        
        <!-- LocalStorage-Informationen -->
        <div style="margin-bottom: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
          <h3 style="margin-top: 0; font-size: 16px;">💾 Gespeicherter Name:</h3>
          <p id="storageInfo" style="margin: 5px 0; font-size: 14px;">Kein Name gespeichert</p>
          <button id="deleteStorageBtn" style="padding: 5px 10px; background: #ff4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Namen löschen</button>
        </div>
        
        <!-- Spielfortschritt-Informationen -->
        <div style="margin-bottom: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
          <h3 style="margin-top: 0; font-size: 16px;">🎮 Spielfortschritt:</h3>
          <p id="progressInfo" style="margin: 5px 0; font-size: 14px;">Lade Fortschritt...</p>
          <button id="deleteProgressBtn" style="padding: 5px 10px; background: #ff4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;">Fortschritt löschen</button>
          <button id="refreshProgressBtn" style="padding: 5px 10px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Aktualisieren</button>
        </div>
        
        <ul id="chapterList">
          <!-- Wird automatisch gefüllt -->
        </ul>
      </div>
    </div>
  `;

  // ========================================
  // GLOBALE VARIABLEN
  // ========================================
  window.spielPausiert = false;
  
  var settingsData = {
    muted: false,
    masterVolume: 80,
    musicVolume: 70,
    voiceVolume: 90,
    ambientVolume: 60,
    language: 'de',
    autoPlay: false,
    subtitles: true
  };

  // ========================================
  // INITIALISIERUNG
  // ========================================
  function initSteuerungMenu() {
    console.log("🎮 Steuerungs-Menü wird initialisiert...");
    
    // Füge CSS hinzu
    document.head.insertAdjacentHTML('beforeend', MENU_STYLES);
    
    // Füge HTML hinzu
    document.body.insertAdjacentHTML('beforeend', MENU_HTML);
    
    // Initialisiere Event Handlers
    initMainMenuHandlers();
    initSettingsHandlers();
    initDebugMenuHandlers();
    initHelpHandlers();
    initKeyboardHandlers();
    
    console.log("✅ Steuerungs-Menü erfolgreich initialisiert!");
  }

  // ========================================
  // HAUPTMENÜ FUNKTIONEN
  // ========================================
  function initMainMenuHandlers() {
    document.getElementById('mainMenuButton').addEventListener('click', function(e) {
      e.stopPropagation();
      showMainMenu();
    });

    document.getElementById('closeMainMenuButton').addEventListener('click', function(e) {
      e.stopPropagation();
      hideMainMenu();
    });

    document.getElementById('mainMenuOverlay').addEventListener('click', function(e) {
      if (e.target === this) {
        hideMainMenu();
      }
    });

    document.getElementById('mainMenu').addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Hauptmenü Buttons
    document.getElementById('continueBtn').addEventListener('click', function(e) {
      e.stopPropagation();
      hideMainMenu();
      console.log("Weiterspielen gewählt");
    });

    document.getElementById('saveGameBtn').addEventListener('click', function(e) {
      e.stopPropagation();
      hideMainMenu();
      saveGameState();
    });

    document.getElementById('settingsBtn').addEventListener('click', function(e) {
      e.stopPropagation();
      hideMainMenu();
      showSettings();
    });

    document.getElementById('helpBtn').addEventListener('click', function(e) {
      e.stopPropagation();
      hideMainMenu();
      showHelp();
    });

    document.getElementById('mainMenuBtn').addEventListener('click', function(e) {
      e.stopPropagation();
      if (confirm('Möchten Sie wirklich zum Hauptmenü zurückkehren? Ungespeicherter Fortschritt geht verloren.')) {
        console.log("Zurück zum Hauptmenü");
        alert("Hauptmenü-Navigation noch nicht implementiert");
      }
    });
  }

  function showMainMenu() {
    document.getElementById('mainMenuOverlay').style.display = 'flex';
    window.spielPausiert = true;
    console.log("Hauptmenü geöffnet - Spiel pausiert");
  }

  function hideMainMenu() {
    document.getElementById('mainMenuOverlay').style.display = 'none';
    window.spielPausiert = false;
    console.log("Hauptmenü geschlossen - Spiel fortgesetzt");
  }

  function saveGameState() {
    // Diese Funktion kann von der HTML-Seite überschrieben werden
    if (window.saveGameProgress) {
      window.saveGameProgress();
      alert("Spielstand erfolgreich gespeichert!");
    } else {
      console.log("Spielstand speichern - Funktion nicht verfügbar");
      alert("Spielstand-Funktion nicht verfügbar");
    }
  }

  // ========================================
  // EINSTELLUNGEN FUNKTIONEN
  // ========================================
  function initSettingsHandlers() {
    document.getElementById('closeSettingsButton').addEventListener('click', function(e) {
      e.stopPropagation();
      hideSettings();
    });

    document.getElementById('settingsOverlay').addEventListener('click', function(e) {
      if (e.target === this) {
        hideSettings();
      }
    });

    document.getElementById('settingsMenu').addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Volume Sliders
    const sliders = ['masterVolume', 'musicVolume', 'voiceVolume', 'ambientVolume'];
    sliders.forEach(sliderId => {
      const slider = document.getElementById(sliderId);
      slider.addEventListener('input', function() {
        const key = sliderId;
        settingsData[key] = parseInt(this.value);
        console.log(`${sliderId}: ${this.value}%`);
      });
    });

    // Toggle Switches
    const toggles = [
      { id: 'muteToggle', key: 'muted' },
      { id: 'autoPlayToggle', key: 'autoPlay' },
      { id: 'subtitlesToggle', key: 'subtitles' }
    ];
    
    toggles.forEach(({ id, key }) => {
      document.getElementById(id).addEventListener('click', function() {
        this.classList.toggle('active');
        settingsData[key] = this.classList.contains('active');
        console.log(`${key}: ${settingsData[key]}`);
        
        if (key === 'muted') {
          console.log(settingsData.muted ? "Spiel stummgeschaltet" : "Ton aktiviert");
        }
      });
    });

    // Language Select
    document.getElementById('languageSelect').addEventListener('change', function() {
      settingsData.language = this.value;
      console.log(`Sprache geändert zu: ${this.value}`);
      if (this.value !== 'de') {
        alert("Andere Sprachen sind noch nicht verfügbar!");
        this.value = 'de';
        settingsData.language = 'de';
      }
    });

    loadSettingsFromStorage();
  }

  function showSettings() {
    document.getElementById('settingsOverlay').style.display = 'flex';
    window.spielPausiert = true;
    loadSettingsFromStorage();
    console.log("Einstellungen geöffnet - Spiel pausiert");
  }

  function hideSettings() {
    document.getElementById('settingsOverlay').style.display = 'none';
    window.spielPausiert = false;
    saveSettingsToStorage();
    console.log("Einstellungen geschlossen - Spiel fortgesetzt");
  }

  function loadSettingsFromStorage() {
    try {
      const saved = localStorage.getItem('gameSettings');
      if (saved) {
        settingsData = {...settingsData, ...JSON.parse(saved)};
      }
      updateSettingsUI();
    } catch(e) {
      console.error("Fehler beim Laden der Einstellungen:", e);
    }
  }

  function saveSettingsToStorage() {
    try {
      localStorage.setItem('gameSettings', JSON.stringify(settingsData));
      console.log("Einstellungen gespeichert");
    } catch(e) {
      console.error("Fehler beim Speichern der Einstellungen:", e);
    }
  }

  function updateSettingsUI() {
    document.getElementById('masterVolume').value = settingsData.masterVolume;
    document.getElementById('musicVolume').value = settingsData.musicVolume;
    document.getElementById('voiceVolume').value = settingsData.voiceVolume;
    document.getElementById('ambientVolume').value = settingsData.ambientVolume;
    
    const muteToggle = document.getElementById('muteToggle');
    const autoPlayToggle = document.getElementById('autoPlayToggle');
    const subtitlesToggle = document.getElementById('subtitlesToggle');
    
    if (settingsData.muted) muteToggle.classList.add('active');
    if (settingsData.autoPlay) autoPlayToggle.classList.add('active');
    if (settingsData.subtitles) subtitlesToggle.classList.add('active');
    
    document.getElementById('languageSelect').value = settingsData.language;
  }

  // ========================================
  // DEBUG MENÜ FUNKTIONEN
  // ========================================
  function initDebugMenuHandlers() {
    document.getElementById('debugButton').addEventListener('click', function(e) {
      e.stopPropagation();
      showDebugMenu();
    });

    document.getElementById('closeDebugButton').addEventListener('click', function(e) {
      e.stopPropagation();
      hideDebugMenu();
    });

    document.getElementById('debugOverlay').addEventListener('click', function(e) {
      if (e.target === this) {
        hideDebugMenu();
      }
    });

    document.getElementById('debugMenu').addEventListener('click', function(e) {
      e.stopPropagation();
    });

    document.getElementById('deleteStorageBtn').addEventListener('click', function(e) {
      e.stopPropagation();
      try {
        localStorage.removeItem('playerName');
        updateStorageInfo();
        console.log("Spielername aus localStorage gelöscht");
        alert("Spielername wurde zurückgesetzt!");
      } catch(error) {
        console.error("Fehler beim Löschen:", error);
      }
    });

    document.getElementById('deleteProgressBtn').addEventListener('click', function(e) {
      e.stopPropagation();
      if (confirm("Möchtest du wirklich den gesamten Spielfortschritt löschen?")) {
        localStorage.removeItem('gameProgress');
        updateProgressInfo();
        console.log("Spielfortschritt aus localStorage gelöscht");
        alert("Spielfortschritt wurde zurückgesetzt!");
      }
    });

    document.getElementById('refreshProgressBtn').addEventListener('click', function(e) {
      e.stopPropagation();
      updateProgressInfo();
      console.log("Spielfortschritt-Anzeige aktualisiert");
    });
  }

  function showDebugMenu() {
    document.getElementById('debugOverlay').style.display = 'flex';
    window.spielPausiert = true;
    populateChapterList();
    updateStorageInfo();
    console.log("Debug-Menü geöffnet - Spiel pausiert");
  }

  function hideDebugMenu() {
    document.getElementById('debugOverlay').style.display = 'none';
    window.spielPausiert = false;
    console.log("Debug-Menü geschlossen - Spiel fortgesetzt");
  }

  function populateChapterList() {
    const chapterList = document.getElementById('chapterList');
    chapterList.innerHTML = '';
    
    const currentFile = window.location.pathname.split('/').pop();
    
    KAPITEL_LISTE.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      
      a.href = './' + item.file;
      a.textContent = item.name;
      
      if (item.file === currentFile) {
        a.style.backgroundColor = '#ff9d00';
        a.style.fontWeight = 'bold';
        a.textContent += ' (AKTUELL)';
      }
      
      li.appendChild(a);
      chapterList.appendChild(li);
    });
  }

  function updateStorageInfo() {
    const storageInfo = document.getElementById('storageInfo');
    try {
      const savedName = localStorage.getItem('playerName');
      
      if (savedName) {
        storageInfo.textContent = `"${savedName}" (dauerhaft gespeichert)`;
        storageInfo.style.color = '#4CAF50';
      } else {
        storageInfo.textContent = 'Kein Name gespeichert';
        storageInfo.style.color = '#999';
      }
    } catch(error) {
      storageInfo.textContent = 'Fehler beim Laden';
      storageInfo.style.color = '#ff4444';
    }
    
    updateProgressInfo();
  }

  function updateProgressInfo() {
    const progressInfo = document.getElementById('progressInfo');
    
    try {
      const savedProgress = localStorage.getItem('gameProgress');
      
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        const sceneName = progressData.currentScene || progressData.sceneName || 'Unbekannt';
        const savedName = progressData.playerName || 'Kein Name';
        const timestamp = progressData.timestamp ? new Date(progressData.timestamp).toLocaleString('de-DE') : 'Unbekannt';
        
        progressInfo.innerHTML = `
          <strong>Szene:</strong> ${sceneName}<br>
          <strong>Name:</strong> ${savedName}<br>
          <strong>Gespeichert:</strong> ${timestamp}
        `;
        progressInfo.style.color = '#4CAF50';
      } else {
        progressInfo.textContent = 'Kein Spielfortschritt gespeichert';
        progressInfo.style.color = '#999';
      }
    } catch (error) {
      progressInfo.textContent = 'Fehler beim Laden des Fortschritts';
      progressInfo.style.color = '#ff4444';
      console.error('Fehler beim Lesen des Spielfortschritts:', error);
    }
  }

  // ========================================
  // HILFE FUNKTIONEN
  // ========================================
  function initHelpHandlers() {
    document.getElementById('closeHelpButton').addEventListener('click', function(e) {
      e.stopPropagation();
      hideHelp();
    });

    document.getElementById('helpOverlay').addEventListener('click', function(e) {
      if (e.target === this) {
        hideHelp();
      }
    });

    document.getElementById('helpMenu').addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  function showHelp() {
    document.getElementById('helpOverlay').style.display = 'flex';
    window.spielPausiert = true;
    console.log("Hilfe geöffnet - Spiel pausiert");
  }

  function hideHelp() {
    document.getElementById('helpOverlay').style.display = 'none';
    window.spielPausiert = false;
    console.log("Hilfe geschlossen - Spiel fortgesetzt");
  }

  // ========================================
  // KEYBOARD HANDLER
  // ========================================
  function initKeyboardHandlers() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        var debugMenuOpen = document.getElementById('debugOverlay').style.display === 'flex';
        var mainMenuOpen = document.getElementById('mainMenuOverlay').style.display === 'flex';
        var settingsMenuOpen = document.getElementById('settingsOverlay').style.display === 'flex';
        var helpMenuOpen = document.getElementById('helpOverlay').style.display === 'flex';
        
        if (debugMenuOpen) {
          hideDebugMenu();
          e.preventDefault();
          e.stopPropagation();
        } else if (mainMenuOpen) {
          hideMainMenu();
          e.preventDefault();
          e.stopPropagation();
        } else if (settingsMenuOpen) {
          hideSettings();
          e.preventDefault();
          e.stopPropagation();
        } else if (helpMenuOpen) {
          hideHelp();
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });
  }

  // ========================================
  // AUTO-INITIALISIERUNG
  // ========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSteuerungMenu);
  } else {
    initSteuerungMenu();
  }

})();
