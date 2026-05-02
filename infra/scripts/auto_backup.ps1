# ============================================================
# SIRINX OMNI-OS - Auto-Backup Script
# ============================================================

$ErrorActionPreference = "Continue"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$workspaceDir = (Resolve-Path "$PSScriptRoot\..\..").Path
$backupBase = "$workspaceDir\artifacts\backups"
$backupDir = "$backupBase\$timestamp"

if (!(Test-Path $backupBase)) { New-Item -ItemType Directory -Force -Path $backupBase }
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

Write-Host "Starting System Backup: $timestamp"

# 1. Database Backup (Try various containers)
Write-Host "Backing up Database..."
$containers = @("sirinx-postgres-1", "downloadfromdrivec-postgres-1", "sirinx-web-mysql")
$dbSuccess = $false

foreach ($c in $containers) {
    if (docker ps --format "{{.Names}}" | Select-String $c) {
        Write-Host "Found container $c, attempting backup..."
        try {
            docker exec $c pg_dumpall -U sirinx > "$backupDir\db_dump_$c.sql" 2>$null
            Write-Host "Database backup complete for $c."
            $dbSuccess = $true
            break
        } catch {}
    }
}

if (!$dbSuccess) { Write-Host "Skipping DB backup (no compatible container found or running)." }

# 2. Workspace Archive (Excluding heavy/recursive dirs)
Write-Host "Archiving Workspace (Excluding artifacts, node_modules, dist)..."
$archiveName = "$backupDir\workspace_snapshot.zip"

Get-ChildItem -Path "$workspaceDir\*" -Exclude "artifacts", "node_modules", "dist", ".git" | Compress-Archive -DestinationPath $archiveName -Force

Write-Host "Backup process finished successfully!"
Write-Host "Location: $backupDir"
