module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [{ ...args[0], title: 'Заметки' }]
      })
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/todo-notes/'
    : '/'
}
