## Post gress

## logar no postgres via terminal

Logar no postgres

`sudo -u postgres psql postgres`
Depois de entra, alterar a sneha do user padra

`\password postgres`

Porta Default: 5432

## pgadmin

Em geral, ao instalar o postgres muitas vezes dá pra baixar também o **pgadmin**, um programa tipo o MySQL Workbench só que.

No Ubuntu, veja nos aplicativos baixados, busque por `sql` e veja se aparece `pgadmin`

O pgamdin é aberto no browser, algo como que em `http://127.0.0.1:42015/browser/`


## Acessar pelo vscode

Mesmos dados que o do knex


````
host: 'localhost',
user: 'postgres',
password: 'root',
database: 'barriga',
````