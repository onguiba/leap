# Script de vérification de l'environnement Android

Write-Host "🔍 Vérification de l'environnement Android..." -ForegroundColor Cyan
Write-Host ""

# Vérifier Node.js
Write-Host "📦 Node.js:" -NoNewline
try {
    $nodeVersion = node --version
    Write-Host " ✅ $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host " ❌ Non installé" -ForegroundColor Red
    Write-Host "   Installez depuis: https://nodejs.org/" -ForegroundColor Yellow
}

# Vérifier npm
Write-Host "📦 npm:" -NoNewline
try {
    $npmVersion = npm --version
    Write-Host " ✅ v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host " ❌ Non installé" -ForegroundColor Red
}

# Vérifier Capacitor
Write-Host "⚡ Capacitor:" -NoNewline
if (Test-Path "node_modules/@capacitor/core") {
    Write-Host " ✅ Installé" -ForegroundColor Green
} else {
    Write-Host " ❌ Non installé" -ForegroundColor Red
    Write-Host "   Exécutez: npm install" -ForegroundColor Yellow
}

# Vérifier le dossier android
Write-Host "📱 Projet Android:" -NoNewline
if (Test-Path "android") {
    Write-Host " ✅ Créé" -ForegroundColor Green
} else {
    Write-Host " ❌ Non créé" -ForegroundColor Red
    Write-Host "   Exécutez: npx cap add android" -ForegroundColor Yellow
}

# Vérifier le build
Write-Host "🏗️  Build dist:" -NoNewline
if (Test-Path "dist") {
    Write-Host " ✅ Présent" -ForegroundColor Green
} else {
    Write-Host " ❌ Absent" -ForegroundColor Red
    Write-Host "   Exécutez: npm run build" -ForegroundColor Yellow
}

# Vérifier Android Studio
Write-Host "🎨 Android Studio:" -NoNewline
$androidStudioPaths = @(
    "$env:ProgramFiles\Android\Android Studio\bin\studio64.exe",
    "${env:ProgramFiles(x86)}\Android\Android Studio\bin\studio64.exe",
    "$env:LOCALAPPDATA\Programs\Android Studio\bin\studio64.exe"
)
$studioFound = $false
foreach ($path in $androidStudioPaths) {
    if (Test-Path $path) {
        Write-Host " ✅ Installé" -ForegroundColor Green
        $studioFound = $true
        break
    }
}
if (-not $studioFound) {
    Write-Host " ❌ Non installé" -ForegroundColor Red
    Write-Host "   Téléchargez depuis: https://developer.android.com/studio" -ForegroundColor Yellow
}

# Vérifier ANDROID_HOME
Write-Host "🔧 ANDROID_HOME:" -NoNewline
if ($env:ANDROID_HOME) {
    Write-Host " ✅ $env:ANDROID_HOME" -ForegroundColor Green
} else {
    Write-Host " ❌ Non défini" -ForegroundColor Red
    Write-Host "   Sera configuré automatiquement par Android Studio" -ForegroundColor Yellow
}

# Vérifier ADB (Android Debug Bridge)
Write-Host "🔌 ADB:" -NoNewline
try {
    $adbVersion = adb version 2>$null
    if ($adbVersion) {
        Write-Host " ✅ Installé" -ForegroundColor Green
        
        # Vérifier les appareils connectés
        Write-Host "📱 Appareils connectés:" -NoNewline
        $devices = adb devices 2>$null | Select-String -Pattern "device$"
        if ($devices) {
            Write-Host " ✅ $($devices.Count) appareil(s)" -ForegroundColor Green
        } else {
            Write-Host " ⚠️  Aucun appareil" -ForegroundColor Yellow
        }
    } else {
        Write-Host " ❌ Non installé" -ForegroundColor Red
    }
} catch {
    Write-Host " ❌ Non installé" -ForegroundColor Red
    Write-Host "   Installé avec Android Studio" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Recommandations
Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
Write-Host ""

if (-not $studioFound) {
    Write-Host "1️⃣  Installez Android Studio:" -ForegroundColor Yellow
    Write-Host "   https://developer.android.com/studio" -ForegroundColor White
    Write-Host ""
}

if (-not (Test-Path "dist")) {
    Write-Host "2️⃣  Compilez l'application:" -ForegroundColor Yellow
    Write-Host "   npm run build" -ForegroundColor White
    Write-Host ""
}

if (-not (Test-Path "android")) {
    Write-Host "3️⃣  Ajoutez la plateforme Android:" -ForegroundColor Yellow
    Write-Host "   npx cap add android" -ForegroundColor White
    Write-Host ""
}

Write-Host "4️⃣  Ouvrez dans Android Studio:" -ForegroundColor Yellow
Write-Host "   npx cap open android" -ForegroundColor White
Write-Host ""

Write-Host "5️⃣  Ou installez directement sur téléphone:" -ForegroundColor Yellow
Write-Host "   npx cap run android" -ForegroundColor White
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

Write-Host "Documentation complete:" -ForegroundColor Cyan
Write-Host "   - INSTALLATION_APK_SIMPLE.md (guide simple)" -ForegroundColor White
Write-Host "   - BUILD_APK.md (guide detaille)" -ForegroundColor White
Write-Host ""
