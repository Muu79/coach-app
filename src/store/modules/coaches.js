import _ from 'lodash';
const IDifyCoaches = (coaches) => {
  const payload = {};
  coaches.forEach((coach) => {
    payload[coach.id] = coach;
  });
  return payload;
};
const url =
  'https://vue-demo-414b5-default-rtdb.europe-west1.firebasedatabase.app/coach-app/coaches.json';

const coachesModule = {
  state() {
    return {
      coaches: [
        
      ],
    };
  },
  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload);
    },
    loadCoaches(state, payload) {
      state.coaches = payload;
    },
  },
  actions: {
    addCoach(context, payload) {
      context.commit('addCoach', payload);
    },
    async loadCoaches(context) {
      await fetch(url, {
        method: 'GET',
        auth: null,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if(_.isEqual(data, IDifyCoaches(context.state.coaches))) return;
          else if(data.error) {
            throw new Error(data.error);
          }
          else {
            context.commit('loadCoaches', Object.values(data));
          }
        })
        .catch((error) => {
          throw new Error(error.message || 'Failed to fetch coaches');
        });
    },
    async syncCoaches(context) {
      await fetch(url + `?auth=${context.rootGetters.token}`, {
        method: 'PUT',
        body: JSON.stringify(IDifyCoaches(context.state.coaches)),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    coach(state) {
      return (id) => {
        return state.coaches.find((coach) => coach.id === id);
      }
    }
  },
};

export default coachesModule;
