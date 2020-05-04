const schedule = require('node-schedule')

// Sincroinzador de bancos
module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        // faz a contagem de linhas para cada banco
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const { Stat } = app.api.stat

        //criar a ultima estatistca que ta no mongo db
        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        // se a ultima estatistica nao estiver (evita eerro ao acessar a estatitica em sequencia)
        //  setada ou é difenre da última
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}