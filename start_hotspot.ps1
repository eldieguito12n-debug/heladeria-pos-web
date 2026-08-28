[Windows.Networking.Connectivity.NetworkInformation, Windows.Networking.Connectivity, ContentType = WindowsRuntime] | Out-Null
try {
    $profile = [Windows.Networking.Connectivity.NetworkInformation]::GetInternetConnectionProfile()
    if ($profile) {
        $tetheringManager = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager, Windows.Networking.NetworkOperators, ContentType = WindowsRuntime]::CreateFromConnectionProfile($profile)
        if ($tetheringManager.TetheringOperationalState -ne 1) {
            $async = $tetheringManager.StartTetheringAsync()
            Write-Host "Punto de Acceso (Hotspot) encendido automaticamente."
        } else {
            Write-Host "El Punto de Acceso ya estaba encendido."
        }
    } else {
        Write-Host "ADVERTENCIA: Windows requiere estar conectado a alguna red (aunque sea sin internet) para encender el Hotspot mediante script."
    }
} catch {
    Write-Host "No se pudo iniciar el Hotspot automaticamente. (Debes encenderlo manual en Configuración > Zona Inalámbrica)."
}
