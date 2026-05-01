@echo off
REM ====================================================================
REM  Real Wheel Picker — dev server launcher (double-click to run)
REM ====================================================================
REM  Lance le serveur de developpement Astro et ouvre automatiquement
REM  ton navigateur sur la page d'accueil.
REM ====================================================================

cd /d "%~dp0"

echo.
echo ============================================================
echo   Real Wheel Picker - Dev Server
echo ============================================================
echo.

REM --- Verifie node_modules ---
if not exist "node_modules\" (
    echo [INFO] Premiere execution detectee. Installation des dependances...
    echo        Cela peut prendre 1-2 minutes.
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [ERREUR] L'installation a echoue. Verifie que Node.js est installe :
        echo          https://nodejs.org/
        pause
        exit /b 1
    )
    echo.
)

echo [INFO] Lancement du serveur de developpement...
echo.
echo   ^>^> Le site va s'ouvrir automatiquement dans ton navigateur
echo   ^>^> URL : http://localhost:4321
echo   ^>^> Pour arreter : ferme cette fenetre ou appuie Ctrl+C
echo.
echo ============================================================
echo.

REM --- Ouvre le navigateur 4 secondes apres pour laisser Astro demarrer ---
start "" cmd /c "timeout /t 4 /nobreak > nul && start http://localhost:4321"

REM --- Lance le dev server (bloquant, c'est normal) ---
call npm run dev

pause
