REM Counties

@echo off
setlocal enabledelayedexpansion

set "o=office"

for /f "delims= " %%i in (./temp-2024/contest-ids.txt) do (
    echo.%%i | find /I "#">nul && (
        set "o=%%i"
        set "o=!o:~1!"
        echo Hello: "!o!"
    ) || (
        set "n=%%i"
        set "n=!n:_=:!"
        if not exist "./temp-2024/!o!/%%i/" (mkdir "./temp-2024/!o!/%%i")
        curl "https://www.politico.com/election-data/pebble/results/live/2024-11-05/contests/!n!/counties.json" -o ./temp-2024/!o!/%%i/counties.json
    )
)

endlocal