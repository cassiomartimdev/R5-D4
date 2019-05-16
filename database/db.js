const mongoose = require('mongoose')
const Schema = mongoose.Schema
require("dotenv").config()

mongoose.connect(process.env.SQL_CONNECTION, { useNewUrlParser: true }, (err) => {
  if (err) return console.log('[R5-D4] Ocorreu um erro inesperado ao tentar conectar ao SQL:\n', err)
  console.log('[R5-D4] O serviço de SQL foi estabelecido corretamente!');
})

const Servidor = new Schema({
  _id: {
    type: Number
  },
  nome: {
    type: String
   },
  prefix: {
      type: String,
      default: 'r5'
  },
  ignore: {
    type: Array,
    default: []
  },
  ignoremembers: {
    type: Array,
    default: []
  },
  rep: {
    type: Boolean,
    default: false
  },
  repRole: {
    type: Array,
    default: []
  },
  logs: {
    type: Boolean,
    default: false
  },
  logschannel: {
    type: String,
    default: 'Nenhum'
  },
  sugest: {
    type: Boolean,
    default: false
  },
  sugestchannel: {
    type: String,
    default: 'Nenhum'
  },
  stats: {
    type: Boolean,
    default: false
  },
  statsmemberchannel: {
    type: String,
    default: 'Nenhum'
  },
  statsbotchannel: {
    type: String,
    default: 'Nenhum'
  },
  statsonlinechannel: {
    type: String,
    default: 'Nenhum'
  },
  welcome: {
    type: Boolean,
    default: false
  },
  welcomechannel: {
    type: String,
    default: 'Nenhum'
  },
  welcomemsg: {
    type: String,
    default: 'Nenhuma'
  },
  byebye: {
    type: Boolean,
    default: false
  },
  byebyechannel: {
    type: String,
    default: 'Nenhum'
  },
  byebyemsg: {
    type: String,
    default: 'Nenhuma'
  },
  autorole: {
    type: Boolean,
    default: false
  },
  autoroleid: {
    type: String,
    default: 'Nenhum'
  },
  contador: {
    type: Boolean,
    default: false
  },
  chatContador: {
    type: String,
    default: 'Nenhum'
  },
  contadormsg: {
    type: String,
    default: 'Nenhuma'
  }
})

const Usuario = new Schema({
  _id: {
    type: Number
  },
  nome: {
    type: String
  },
  sobre: {
    type: String,
    default: 'Nenhum'
  },
  rep: {
    type: Number,
    default: 0
  },
  moedas: {
    type: Number,
    default: 0
  },
  dailyTime: {
    type: Number,
    default: 0
  },
  repTime: {
    type: Number,
    default: 0
  },
  fundador: {
    type: Boolean,
    default: false
  },
  administrador: {
    type: Boolean,
    default: false
  },
  moderador: {
    type: Boolean,
    default: false
  },
  supervisor: {
    type: Boolean,
    default: false
  },
  dev: {
    type: Boolean,
    default: false
  },
  vip: {
    type: Boolean,
    default: false
  },
})

const Comando = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
  },
  usos: {
    type: Number,
    default: 0
  },
  manutenção: {
    type: Boolean,
    default: false
  },
})

var Servidores = mongoose.model("Servidores", Servidor);
exports.Servidores = Servidores

var Usuarios = mongoose.model("Usuarios", Usuario);
exports.Usuarios = Usuarios

var Comandos = mongoose.model("Comandos", Comando);
exports.Comandos = Comandos