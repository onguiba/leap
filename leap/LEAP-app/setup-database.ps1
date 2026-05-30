# Script d'installation et configuration PostgreSQL pour PriceCheck
# Exécuter avec: .\setup-database.ps1

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Configuration PostgreSQL pour PriceCheck" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si PostgreSQL est installé
Write-Host "1. Vérification de PostgreSQL..." -ForegroundColor Yellow
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue

if (-not $psqlPath) {
    Write-Host "❌ PostgreSQL n'est pas installé ou pas dans le PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Options d'installation:" -ForegroundColor Yellow
    Write-Host "1. Télécharger depuis: https://www.postgresql.org/download/windows/" -ForegroundColor White
    Write-Host "2. Ou installer avec Chocolatey: choco install postgresql" -ForegroundColor White
    Write-Host ""
    Write-Host "Après l'installation, relancez ce script." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ PostgreSQL est installé: $($psqlPath.Source)" -ForegroundColor Green
Write-Host ""

# Demander le mot de passe PostgreSQL
Write-Host "2. Configuration de la connexion..." -ForegroundColor Yellow
$pgPassword = Read-Host "Entrez le mot de passe PostgreSQL (par défaut: postgres)" -AsSecureString
$pgPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($pgPassword))

if ([string]::IsNullOrWhiteSpace($pgPasswordPlain)) {
    $pgPasswordPlain = "postgres"
}

# Mettre à jour le fichier .env
Write-Host "3. Mise à jour du fichier .env..." -ForegroundColor Yellow
$envContent = Get-Content .env -Raw
$newDatabaseUrl = "DATABASE_URL=`"postgresql://postgres:$pgPasswordPlain@localhost:5432/pricecheck?schema=public`""
$envContent = $envContent -replace 'DATABASE_URL="[^"]*"', $newDatabaseUrl
Set-Content -Path .env -Value $envContent
Write-Host "✅ Fichier .env mis à jour" -ForegroundColor Green
Write-Host ""

# Créer la base de données
Write-Host "4. Création de la base de données..." -ForegroundColor Yellow
$env:PGPASSWORD = $pgPasswordPlain

# Vérifier si la base existe déjà
$dbExists = psql -U postgres -lqt 2>$null | Select-String -Pattern "pricecheck"

if ($dbExists) {
    Write-Host "⚠️  La base de données 'pricecheck' existe déjà" -ForegroundColor Yellow
    $response = Read-Host "Voulez-vous la supprimer et la recréer? (o/N)"
    
    if ($response -eq "o" -or $response -eq "O") {
        Write-Host "Suppression de la base de données..." -ForegroundColor Yellow
        psql -U postgres -c "DROP DATABASE pricecheck;" 2>$null
        Write-Host "Création de la nouvelle base de données..." -ForegroundColor Yellow
        psql -U postgres -c "CREATE DATABASE pricecheck;"
        Write-Host "✅ Base de données recréée" -ForegroundColor Green
    } else {
        Write-Host "✅ Utilisation de la base de données existante" -ForegroundColor Green
    }
} else {
    psql -U postgres -c "CREATE DATABASE pricecheck;"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Base de données 'pricecheck' créée" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur lors de la création de la base de données" -ForegroundColor Red
        Write-Host "Vérifiez que PostgreSQL est démarré et que le mot de passe est correct" -ForegroundColor Yellow
        exit 1
    }
}
Write-Host ""

# Installer les dépendances npm si nécessaire
Write-Host "5. Vérification des dépendances npm..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dépendances..." -ForegroundColor Yellow
    npm install
}
Write-Host "✅ Dépendances installées" -ForegroundColor Green
Write-Host ""

# Générer le client Prisma
Write-Host "6. Génération du client Prisma..." -ForegroundColor Yellow
npm run db:generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client Prisma généré" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de la génération du client Prisma" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Créer les tables
Write-Host "7. Création des tables..." -ForegroundColor Yellow
npm run db:push
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Tables créées" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de la création des tables" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Peupler la base de données
Write-Host "8. Peuplement de la base de données..." -ForegroundColor Yellow
$response = Read-Host "Voulez-vous ajouter des données de test? (O/n)"

if ($response -ne "n" -and $response -ne "N") {
    npm run db:seed
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Données de test ajoutées" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Erreur lors de l'ajout des données de test" -ForegroundColor Yellow
    }
}
Write-Host ""

# Résumé
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  ✅ Configuration terminée avec succès!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Démarrer le serveur backend:" -ForegroundColor White
Write-Host "   npm run dev:server" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Dans un autre terminal, démarrer le frontend:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Accéder à l'application:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5174" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Ouvrir Prisma Studio (optionnel):" -ForegroundColor White
Write-Host "   npm run db:studio" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour plus d'informations, consultez SETUP_POSTGRESQL.md" -ForegroundColor Yellow
Write-Host ""
