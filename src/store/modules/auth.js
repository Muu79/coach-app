let timer;
const key = await fetch('https://vue-coach-demo.netlify.app/.netlify/functions/firebaseKey')
const authModule = {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogOut: false,
    };
  },

  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuth(state) {
      return state.token != null;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = rootGetters.coaches;
      const userId = getters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
    didAutoLogOut(state) {
      return state.didAutoLogOut;
    },
  },

  actions: {
    async signUp(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup',
      });
    },
    async logIn(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login',
      });
    },
    async logOut(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);
      context.commit('setUser', {
        token: null,
        userId: null,
      });
    },
    async autoLogOut(context) {
      console.log('auto logout');
      await context.dispatch('logOut');
      context.commit('setDidAutoLogOut');
    },

    async auth(context, payload) {
      const mode = payload.mode;
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + key;
      if (mode === 'signup') {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key;
      }
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        const error = new Error(
          data.message ||
            'Authentication failed. Please check your login credentials.'
        );
        throw error;
      }
      const responseData = await res.json();

      const expiresIn = responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      context.state.didAutoLogOut = false;
      timer = setTimeout(function () {
        context.dispatch('autoLogOut');
      }, expiresIn);

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    autoLogIn(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const remainingTime = +tokenExpiration - new Date().getTime();
      if (remainingTime < 0) {
        return;
      }

      timer = setTimeout(function () {
        context.dispatch('autoLogOut');
      }, remainingTime);

      if (token && userId) {
        context.commit('setUser', {
          token: token,
          userId: userId,
        });
      }
    },
  },

  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
    },
    setDidAutoLogOut(state) {
      state.didAutoLogOut = true;
    },
  },
};

export default authModule;
