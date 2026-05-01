@echo off
REM ====================================================================
REM  Real Wheel Picker — preview server (mode prod, leger)
REM ====================================================================
REM  Sert le build de production - sans HMR, sans rebundling continu.
REM  Beaucoup plus leger que dev.bat. Utilise ce mode pour tester
REM  visuellement sans surcharger le navigateur.
REM ====================================================================

cd /d "%~dp0"

echo.
echo ============================================================
echo   Real Wheel Picker - Preview Server (production-like)
echo ============================================================
echo.

if not exist "node_modules\" (
    echo [INFO] Installation des dependances (premiere fois)...
    call npm install
    if errorlevel 1 (
        echo [ERREUR] npm install a echoue. Installe Node.js : https://nodejs.org/
        pause
        exit /b 1
    )
    echo.
)

echo [INFO] Build de production en cours...
echo        (1-2 minutes la premiere fois, ~20s ensuite)
echo.
call npm run build
if errorlevel 1 (
    echo.
    echo [ERREUR] Le build a echoue. Voir les messages ci-dessus.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   Build OK. Lancement du preview server...
echo ============================================================
echo.
echo   ^>^> URL : http://localhost:4321
echo   ^>^> Pour arreter : ferme cette fenetre ou appuie Ctrl+C
echo.

REM Ouvre le navigateur 2s apres
start "" cmd /c "timeout /t 2 /nobreak > nul && start http://localhost:4321"

call npm run preview

pause
