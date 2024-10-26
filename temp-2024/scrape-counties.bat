REM Counties

@echo off
setlocal enabledelayedexpansion

for /f "delims= " %%i in (./temp-2024/contest-ids.txt) do (
    set "n=%%i"
    set "n=!n:_=:!"
    if not exist "./temp-2024/%%i/" (mkdir "./temp-2024/%%i")
    curl "https://www.politico.com/election-data/pebble/results/live/2024-11-05/contests/!n!/counties.json" -o ./temp-2024/%%i/counties.json
)

endlocal