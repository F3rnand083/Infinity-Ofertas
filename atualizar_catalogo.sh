#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
python3 -m pip install --user pandas openpyxl || true
python3 convert_excel_to_json.py produtos.xlsx products.json
echo "Concluido! products.json atualizado."
