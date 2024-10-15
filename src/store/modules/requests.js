import _ from 'lodash';
const url = `https://vue-demo-414b5-default-rtdb.europe-west1.firebasedatabase.app/coach-app/requests/`;
const requestsModule = {
  state() {
    return {
      requests: {
        // c1: [
        //   {
        //     id: 'c1r1',
        //     email: 'mail@mail.com',
        //     phone: '1234567890',
        //     message: 'I need help with my back-end',
        //     coachID: 'c1',
        //   },
        //   {
        //     id: 'c1r2',
        //     email: 'mail2@hotmail.com',
        //     phone: '0987654321',
        //     message: 'I need help with my front-end',
        //     coachID: 'c1',
        //   },
        // ],
        // c2: [
        //   {
        //     id: 'c2r1',
        //     email: 'email3@mail.com',
        //     phone: '1234567890',
        //     message: 'I need help with designing a logo',
        //     coachID: 'c2',
        //   },
        // ],
      },
    };
  },
  mutations: {
    addRequest(state, payload) {
      if (payload.coachID in state.requests) {
        state.requests[payload.coachID].push(payload);
      } else {
        state.requests[payload.coachID] = [payload];
      }
    },
    loadRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async addRequest(context, payload) {
      await fetch(url+`${payload.coachID}.json`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      context.commit('addRequest', payload);
    },
    async loadRequests(context) {
      await fetch(
        url +
          `${context.rootGetters.userId}.json?auth=${context.rootGetters.token}`,
        {
          method: 'GET',
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (!data) return;
          else if (_.isEqual(data, context.state.requests)) return;
          else if (data.error) throw new Error(data.error);
          else context.commit('loadRequests', data);
        })
        .catch((error) => {
          throw new Error(error.message || 'Failed to fetch requests');
        });
    },
    async syncRequests(context) {
      const serverSide = await fetch(
        url +
          `${context.rootGetters.userId}.json?auth=${context.rootGetters.token}`,
        {
          method: 'GET',
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw new Error(error.message || 'Failed to fetch requests');
        });
      if (_.isEqual(serverSide, context.state.requests)) return;
      await fetch(
        url +
          `${context.rootGetters.userId}.json?auth=${context.rootGetters.token}`,
        {
          method: 'PUT',
          body: JSON.stringify(context.state.requests),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    },
    async deleteRequest(context, payload) {
      const newRequests = context.state.requests;
      newRequests[payload.coachID] = newRequests[payload.coachID].filter(
        (request) => request.id !== payload.id
      );
      context.commit('loadRequests', newRequests);
    },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    requestByCoachID(state) {
      return (id) => {
        return state.requests[id];
      };
    },
  },
};
export default requestsModule;
