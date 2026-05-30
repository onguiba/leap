# Installation directe sur téléphone via ADB

$adb = "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  OUVERTURE DE L'APP SUR VOTRE TELEPHONE" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

# Vérifier le téléphone
Write-Host "Verification du telephone..." -ForegroundColor Yellow
$devices = & $adb devices | Select-String "device$"

if ($devices.Count -eq 0) {
    Write-Host "Aucun telephone detecte!" -ForegroundColor Red
    exit
}

Write-Host "Telephone detecte!" -ForegroundColor Green

# Ouvrir l'application dans Chrome
Write-Host "`nOuverture de l'application dans Chrome..." -ForegroundColor Yellow
& $adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main -d "http://192.168.1.96:5174"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  APPLICATION OUVERTE!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Sur votre telephone:" -ForegroundColor Yellow
Write-Host "1. L'application s'est ouverte dans Chrome" -ForegroundColor White
Write-Host "2. Appuyez sur les 3 points (menu) en haut a droite" -ForegroundColor White
Write-Host "3. Selectionnez 'Ajouter a l'ecran d'accueil'" -ForegroundColor White
Write-Host "4. Confirmez" -ForegroundColor White
Write-Host "`nL'application sera installee sur votre ecran d'accueil!" -ForegroundColor Green
