import { prettyoutput } from '../src/index'

const data = {
    username: 'kic',
    url: 'https://github.com/keepitcool',
    projects: ['prettyoutput', '3m2tuio'],
    age: 18,
}

console.log(prettyoutput(data, { maxDepth: 2, colors: { number: 'red' } }))
