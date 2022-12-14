import { createStore } from 'vuex'
// GoogleプロバイダをImport
import { GoogleAuthProvider } from "firebase/auth";
// Google認証機能をImport サインインしたらHomeに戻す
import { getAuth, signInWithRedirect, signOut } from "firebase/auth";
// FirestoreをImport
import { getFirestore } from "firebase/firestore";
// Firestore DetabaseにCRUDを実行させるための機能
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

export default createStore({
  state: {
    login_user: null,
    sideNav: false,
    tasks: []
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    // ログインユーザーのidを取得している
    uid: state => state.login_user ? state.login_user.uid : '',
    getAddressById: state => id => state.tasks.find(task => task.id === id)
  },
  mutations: {
    // Googleからログイン情報を取得。
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    toggleSideNav(state) {
      state.sideNav = !state.sideNav
    },
    addTask(state, {id, task}) {
      // taskオブジェクトにidを追加
      task.id = id
      state.tasks.push(task)
    },
    updateTask(state, { id, task }) {
      // tasksの中からパラメーターと一致するtaskオブジェクトのインデックスを取得
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks[index] = task
    }
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    login() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithRedirect(auth, provider);
    },
    logout() {
      const auth = getAuth();
      signOut(auth);
    },
    // toggleSideNavのクリックイベントが呼び出されたら実行
    // commitメソッドでmutationsのtoggleSideNavを発火させる
    toggleSideNav({ commit }) {
      commit('toggleSideNav')
    },
    async addTask({ getters, commit }, task) {
      // firestoreを呼び出し
      const db = getFirestore();
      // firestoreにデータを追加する（addDoc()で実行）
      try {
        if (getters.uid) {
          const docRef = await addDoc(collection(db, `users/${getters.uid}/tasks`), task);
          console.log("Document written with ID: ", docRef.id);
          commit('addTask', {id: docRef.id, task})
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    async fetchTasks({ getters, commit }) {
      const db = getFirestore();
      // Firestoreのコレクションからデータを取得
      const querySnapshot = await getDocs(collection(db, `users/${getters.uid}/tasks`));
      querySnapshot.forEach((doc) => {
        commit('addTask', {id: doc.id, task: doc.data()})
        console.log(`${doc.id} => ${doc.data()}`);
      });
    },

    async updateTask({ getters, commit }, { id, task }) {
      const db = getFirestore();
      // 編集するドキュメントを参照
      const editTask = doc(db, `users/${getters.uid}/tasks`, id);

      await updateDoc(editTask, {
        title: task.title,
        start: task.start,
        end: task.end
      });

      commit('updateTask',{id, task})
    }
  },
  modules: {
  }
})
