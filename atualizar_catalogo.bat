@echo off
REM Atualiza products.json a partir do Excel (Windows)
setlocal
cd /d "%~dp0"
py -m pip install --quiet pandas openpyxl
py convert_excel_to_json.py produtos.xlsx products.json
if errorlevel 1 (
  echo Erro ao gerar products.json.
  pause
  exit /b 1
)
echo Concluido! products.json atualizado.
pause
