# FullStackOpen-Sequelize
Ejercicios de la sección Relational Database del curso de https://fullstackopen.com

## Links Útiles
* [Sequelize](https://sequelize.org/master/)
* [Direct SQL](https://sequelize.org/master/manual/raw-queries.html)
* [Model](https://sequelize.org/master/manual/model-basics.html)
* [Gaps in sequences in PostgreSQL](https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/)
* [Sequelize Field Validations](https://sequelize.org/master/manual/validations-and-constraints.html)
* [Sequelize Operators] (https://sequelize.org/master/manual/model-querying-basics.html#operators)
* [Agregración en sequelize] (https://sequelize.org/master/manual/model-querying-basics.html#specifying-attributes-for-select-queries)
* [Migrations](https://sequelize.org/master/manual/migrations.html)
* [Sequelize Cli] (https://github.com/sequelize/cli)
* [Migration Tool](https://github.com/sequelize/umzug)
* [Basics of queries involving associations](https://sequelize.org/master/manual/assocs.html#basics-of-queries-involving-associations)
* [Special methods/mixins added to instances](https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances)
* [Scopes] (https://sequelize.org/master/manual/scopes.html)


## Heroku 
* heroku create < app-name >: crea la aplicación app-name
* heroku addons:create heroku-postgresql:hobby-dev -a < app-name >: crea una base postgres para app-name
* heroku config -a < app-name >: retorna las variables entre las que esta la url de conexión a la base de datos
* heroku run psql -h < host-of-postgres-addon > -p 5432 -U < username > < dbname > -a < app-name >: accedo al psql por consola
 
