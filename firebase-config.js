// ============================================
// FIREBASE CONFIGURATION - Sistema Governo Federal
// ============================================
// Firebase SDK v9+ (Modular)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, onSnapshot, orderBy, Timestamp, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLmX8UGHzmnMkLy16t3SwojA6u67lyvVA",
  authDomain: "governo-chocotone.firebaseapp.com",
  projectId: "governo-chocotone",
  storageBucket: "governo-chocotone.firebasestorage.app",
  messagingSenderId: "829728497507",
  appId: "1:829728497507:web:5689c0ad79c42dbe583d56",
  measurementId: "G-GR6CGD5WFP"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar para uso global
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseUtils = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  Timestamp,
  setDoc
};

// Exportar para uso global
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseUtils = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  Timestamp,
  setDoc
};

// ============================================
// MAPEAMENTO DE USUÁRIOS
// ============================================
window.USER_MAPPING = {
  'Chocotone': {
    email: 'chocotone@gov.br',
    password: 'GovChoco2025!',
    role: 'Presidenta',
    ministries: ['all']
  },
  'Bryan dos Ouros': {
    email: 'bryan@gov.br',
    password: 'ViceGov2025#',
    role: 'Vice-Presidente',
    ministries: ['all']
  },
  '-Furia-': {
    email: 'furia@gov.br',
    password: 'Ministro2025@',
    role: 'Ministro',
    ministries: ['Economia e Trabalho']
  },
  'joaobatistagc': {
    email: 'joao@gov.br',
    password: 'Ministro2025@',
    role: 'Ministra',
    ministries: ['Saúde']
  },
  'Stroch': {
    email: 'stroch@gov.br',
    password: 'Ministro2025@',
    role: 'Ministro',
    ministries: ['Educação, Ciência e Tecnologia']
  },
  'Nyxalis': {
    email: 'nyxalis@gov.br',
    password: 'Ministro2025@',
    role: 'Ministra',
    ministries: ['Cidadania, Desenvolvimento Social, Direitos Humanos e Povos Originários']
  },
  'MalopRRN': {
    email: 'malop@gov.br',
    password: 'Ministro2025@',
    role: 'Ministro',
    ministries: ['Defesa']
  },
  'guguinhoHop': {
    email: 'gugui@gov.br',
    password: 'Ministro2025@',
    role: 'Ministro',
    ministries: ['Justiça e Segurança Pública']
  },
  'Dj.Bigoreia': {
    email: 'bigoreia@gov.br',
    password: 'Ministro2025@',
    role: 'Ministro',
    ministries: ['Infraestrutura']
  },
  'Fabio-Blunt-UK': {
    email: 'fabio@gov.br',
    password: 'Ministro2025@',
    role: 'Ministro',
    ministries: ['Agricultura, Meio Ambiente, Turismo e Desenvolvimento Rural']
  },
  'Brenda.M': {
    email: 'brenda@gov.br',
    password: 'Ministro2025@',
    role: 'Ministra',
    ministries: ['Cultura e Esporte']
  },
  'Stallley': {
    email: 'stallley@gov.br',
    password: 'Ministro2025@',
    role: 'Advogado-Geral',
    ministries: ['Advocacia-Geral da União']
  }
};

console.log('✅ Firebase Config carregado e inicializado!');
