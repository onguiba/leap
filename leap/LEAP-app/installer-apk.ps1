# Script d'installation automatique de PriceCheck sur téléphone

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  INSTALLATION PRICECHECK SUR TELEPHONE" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

# Vérifier Java
Write-Host "1. Verification de Java..." -ForegroundColor Yellow
$javaVersion = java -version 2>&1 | Select-String "version" | ForEach-Object { $_ -replace '.*"(\d+).*', '$1' }

if ($javaVersion -lt 21) {
    Write-Host "   Java 21 requis. Version actuelle: Java $javaVersion" -ForegroundColor Red
    Write-Host "   Telechargement de Java 21..." -ForegroundColor Yellow
    Start-Process "https://adoptium.net/temurin/releases/?version=21"
    Write-Host "`n   Apres installation de Java 21, relancez ce script." -ForegroundColor Cyan
    exit
}

Write-Host "   Java $javaVersion detecte" -ForegroundColor Green

# Vérifier Android SDK
Write-Host "`n2. Verification d'Android SDK..." -ForegroundColor Yellow
$androidHome = "$env:LOCALAPPDATA\Android\Sdk"

if (Test-Path $androidHome) {
    Write-Host "   Android SDK trouve" -ForegroundColor Green
    $env:ANDROID_HOME = $androidHome
} else {
    Write-Host "   Android SDK non trouve" -ForegroundColor Red
    Write-Host "   Installation d'Android Studio requise..." -ForegroundColor Yellow
    Start-Process "https://developer.android.com/studio"
    exit
}

# Vérifier ADB
Write-Host "`n3. Verification du telephone..." -ForegroundColor Yellow
$adb = "$androidHome\platform-tools\adb.exe"

if (Test-Path $adb) {
    & $adb kill-server | Out-Null
    & $adb start-server | Out-Null
    $devices = & $adb devices | Select-String "device$"
    
    if ($devices.Count -gt 0) {
        Write-Host "   Telephone detecte!" -ForegroundColor Green
    } else {
        Write-Host "   Aucun telephone detecte" -ForegroundColor Red
        Write-Host "`n   Sur votre telephone:" -ForegroundColor Yellow
        Write-Host "   1. Parametres -> A propos du telephone" -ForegroundColor White
        Write-Host "   2. Appuyez 7 fois sur 'Numero de build'" -ForegroundColor White
        Write-Host "   3. Activez 'Debogage USB' dans Options developpeur" -ForegroundColor White
        Write-Host "   4. Reconnectez le cable USB" -ForegroundColor White
        Write-Host "   5. Autorisez le debogage USB sur le telephone`n" -ForegroundColor White
        exit
    }
} else {
    Write-Host "   ADB non trouve" -ForegroundColor Red
    exit
}

# Build de l'application
Write-Host "`n4. Compilation de l'application..." -ForegroundColor Yellow
Set-Location -Path "leap/LEAP-app"

Write-Host "   Build web..." -ForegroundColor Cyan
npm run build

Write-Host "   Synchronisation Capacitor..." -ForegroundColor Cyan
npx cap sync

# Installation sur le téléphone
Write-Host "`n5. Installation sur le telephone..." -ForegroundColor Yellow
Write-Host "   Cela peut prendre 2-5 minutes..." -ForegroundColor Cyan

npx cap run android

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  INSTALLATION TERMINEE!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "L'application PriceCheck est maintenant installee sur votre telephone!" -ForegroundColor Green
