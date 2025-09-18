@echo off
setlocal

rem ========= Config =========
set "REMOTE=github"

rem ======== Uso =========
rem branch-helper.cmd test   remote/branch/name [local_branch]
rem branch-helper.cmd cleanup remote/branch/name [local_branch]

if "%~1"=="" (
  echo Uso:
  echo   %~nx0 test   ^<remote_branch^> [local_branch]
  echo   %~nx0 cleanup ^<remote_branch^> [local_branch]
  echo.
  echo Ejemplos:
  echo   %~nx0 test   feature/improve-menu-styles-for-consistency
  echo   %~nx0 cleanup feature/improve-menu-styles-for-consistency
  exit /b 1
)

set "CMD=%~1"
set "REMOTE_BRANCH=%~2"
set "LOCAL_BRANCH=%~3"

if "%REMOTE_BRANCH%"=="" (
  echo ERROR: Falta ^<remote_branch^>.
  exit /b 1
)

rem Si no pasan la local, usar el ultimo segmento de la remota
if "%LOCAL_BRANCH%"=="" (
  for %%A in (%REMOTE_BRANCH:/= %) do set "LOCAL_BRANCH=%%A"
)

rem Comprobar que estamos en repo
git rev-parse --is-inside-work-tree >NUL 2>&1
if errorlevel 1 (
  echo ERROR: Este directorio no es un repositorio Git.
  exit /b 1
)

if /I "%CMD%"=="test" (
  echo Fetch: %REMOTE% %REMOTE_BRANCH%
  git fetch "%REMOTE%" "%REMOTE_BRANCH%" || goto :err

  echo Crear y cambiar a rama local: %LOCAL_BRANCH% desde %REMOTE%/%REMOTE_BRANCH%
  git checkout -b "%LOCAL_BRANCH%" "%REMOTE%/%REMOTE_BRANCH%" || goto :err

  echo Listo. Estas en "%LOCAL_BRANCH%".
  exit /b 0
)

if /I "%CMD%"=="cleanup" (
  echo Cambiar a develop
  git checkout develop || goto :err

  echo Pull de develop desde %REMOTE%
  git pull "%REMOTE%" develop || goto :err

  rem borrar rama local si existe
  git show-ref --verify --quiet "refs/heads/%LOCAL_BRANCH%"
  if not errorlevel 1 (
    echo Borrar rama local: %LOCAL_BRANCH%
    git branch -D "%LOCAL_BRANCH%" || goto :err
  ) else (
    echo La rama local "%LOCAL_BRANCH%" no existe; nada que borrar.
  )

  echo Borrar rama remota: %REMOTE_BRANCH% en %REMOTE% ^(si tienes permisos^)
  git push "%REMOTE%" --delete "%REMOTE_BRANCH%"
  if errorlevel 1 (
    echo Aviso: No se pudo borrar la rama remota ^(permiso o inexistente^). Continuo...
  )

  echo Limpieza completada. Sigues en "develop".
  exit /b 0
)

echo ERROR: Comando no reconocido: %CMD%
exit /b 1

:err
echo ERROR: Ha fallado el ultimo comando. Revisa el mensaje de Git arriba.
exit /b 1
