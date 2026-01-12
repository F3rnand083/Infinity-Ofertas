
# -*- coding: utf-8 -*-
import pandas as pd
import json

def excel_para_json(arquivo_excel: str, arquivo_json: str = 'products.json', aba: str | int = 0):
    df = pd.read_excel(arquivo_excel, sheet_name=aba, engine='openpyxl')
    obrigatorias = ['id','nome','descricao','imagem_url','link_compra','categoria','ativo']
    faltantes = [c for c in obrigatorias if c not in df.columns]
    if faltantes:
        raise ValueError(f'Colunas obrigatórias ausentes no Excel: {faltantes}')
    def to_bool(x):
        if pd.isna(x):
            return False
        s = str(x).strip().lower()
        return s in ('true','1','sim','yes','y','t')
    df['ativo'] = df['ativo'].apply(to_bool)
    df = df[df['ativo'] == True].copy()
    df = df.dropna(subset=['imagem_url','link_compra','nome','descricao'])
    produtos = []
    for _, row in df.iterrows():
        try:
            produtos.append({
                'id': int(row['id']),
                'nome': str(row['nome']).strip(),
                'descricao': str(row['descricao']).strip(),
                'imagem_url': str(row['imagem_url']).strip(),
                'link_compra': str(row['link_compra']).strip(),
                'categoria': str(row['categoria']).strip() if not pd.isna(row['categoria']) else '',
                'ativo': True
            })
        except Exception:
            continue
    with open(arquivo_json, 'w', encoding='utf-8') as f:
        json.dump({'produtos': produtos}, f, ensure_ascii=False, indent=2)
    print(f'Gerado {arquivo_json} com {len(produtos)} produto(s).')

if __name__ == '__main__':
    import sys
    excel = sys.argv[1] if len(sys.argv) > 1 else 'produtos.xlsx'
    saida = sys.argv[2] if len(sys.argv) > 2 else 'products.json'
    excel_para_json(excel, saida)
