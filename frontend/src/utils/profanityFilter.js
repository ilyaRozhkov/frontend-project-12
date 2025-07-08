import filter from 'leo-profanity'

filter.loadDictionary('ru')
filter.loadDictionary('en')

const ru = filter.getDictionary('ru')
const en = filter.getDictionary('en')

const spread = [...ru, ...en]

filter.addDictionary('chat', spread)

export default filter
